import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    const [modalAberto, setModalAberto] = useState(false);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [modalConfirmarExclusao, setModalConfirmarExclusao] = useState(false);

    const [titulo, setTitulo] = useState('');
    const [preco, setPreco] = useState('');
    const [ano, setAno] = useState('');
    const [raridade, setRaridade] = useState('');
    const [urlImg, setUrlImg] = useState('');

    const [catalogo, setCatalogo] = useState([]);
    const [itemEditar, setItemEditar] = useState(null);
    const [itemParaExcluir, setItemParaExcluir] = useState(null);

    const carregarCatalogo = () => {
        fetch('https://catalogo-hqs-hnhphhhrgcbngzc8.brazilsouth-01.azurewebsites.net/catalogo/todos')
            .then(response => response.json())
            .then(data => {
                setCatalogo(data);
            })
            .catch(error => {
                console.error('Erro ao carregar o catálogo:', error);
            });
    };

    const salvarCatalogo = () => {
        fetch('https://catalogo-hqs-hnhphhhrgcbngzc8.brazilsouth-01.azurewebsites.net/catalogo/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo,
                preco,
                ano: parseInt(ano),
                raridade,
                urlImg,
            }),
        })
            .then(response => response.json())
            .then(() => {
                setModalAberto(false);
                limparCampos();
                carregarCatalogo();
            })
            .catch(error => {
                console.error('Erro ao salvar:', error);
            });
    };

    const editarCatalogo = () => {
        fetch(`https://catalogo-hqs-hnhphhhrgcbngzc8.brazilsouth-01.azurewebsites.net/catalogo/atualizar/${itemEditar.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo,
                preco,
                ano: parseInt(ano),
                raridade,
                urlImg,
            }),
        })
            .then(response => response.json())
            .then(() => {
                setModalEditarAberto(false);
                setItemEditar(null);
                limparCampos();
                carregarCatalogo();
            })
            .catch(error => {
                console.error('Erro ao atualizar:', error);
            });
    };

    const deletarItem = (id) => {
        fetch(`https://catalogo-hqs-hnhphhhrgcbngzc8.brazilsouth-01.azurewebsites.net/catalogo/deletar/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setCatalogo(catalogo.filter(item => item.id !== id));
                    setModalConfirmarExclusao(false);
                    setItemParaExcluir(null);
                } else {
                    console.error('Erro ao deletar item:', response.status);
                }
            })
            .catch(error => {
                console.error('Erro ao deletar item:', error);
            });
    };

    const abrirModalEditar = (item) => {
        setItemEditar(item);
        setTitulo(item.titulo);
        setPreco(item.preco);
        setAno(item.ano.toString());
        setRaridade(item.raridade);
        setUrlImg(item.urlImg);
        setModalEditarAberto(true);
    };

    const abrirModalExcluir = (item) => {
        setItemParaExcluir(item.id);
        setModalConfirmarExclusao(true);
    };

    const limparCampos = () => {
        setTitulo('');
        setPreco('');
        setAno('');
        setRaridade('');
        setUrlImg('');
    };

    useEffect(() => {
        carregarCatalogo();
    }, []);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View>
                <View style={styles.cabeçalho}>
                    <Image source={require('../../../assets/livro.png')} style={styles.imagemPow} />
                    <Text style={styles.titulo}>Collectify</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Inicial')}>
                    <Text style={styles.voltar}>←</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.listaContainer}>
                {catalogo.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Image source={{ uri: item.urlImg }} style={styles.capa} />
                        <View style={styles.descricao}>
                            <Text style={styles.info}>Título: {item.titulo}</Text>
                            <Text style={styles.info}>Preço: R${item.preco}</Text>
                            <Text style={styles.info}>Ano: {item.ano}</Text>
                            <Text style={styles.info}>Raridade: {item.raridade}</Text>
                            <View style={styles.opcoes}>
                                <TouchableOpacity onPress={() => abrirModalExcluir(item)}>
                                    <Text style={styles.icon}>🗑️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => abrirModalEditar(item)}>
                                    <Text style={styles.icon}>✏️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnAdd} onPress={() => setModalAberto(true)}>
                    <Text style={styles.add}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Modal Cadastro */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAberto}
                onRequestClose={() => setModalAberto(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.modalOverlay} keyboardShouldPersistTaps="handled">
                        <View style={styles.content}>
                            <Text style={styles.tituloModal}>Novo HQ</Text>
                            <View style={styles.inputsContainer}>
                                <TextInput
                                    placeholder="Título da HQ"
                                    style={styles.input}
                                    value={titulo}
                                    onChangeText={setTitulo}
                                />
                                <TextInput
                                    placeholder="Preço"
                                    style={styles.input}
                                    value={preco}
                                    onChangeText={setPreco}
                                />
                                <TextInput
                                    placeholder="Ano de lançamento"
                                    style={styles.input}
                                    value={ano}
                                    onChangeText={setAno}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    placeholder="Raridade"
                                    style={styles.input}
                                    value={raridade}
                                    onChangeText={setRaridade}
                                />
                                <TextInput
                                    placeholder="URL da Imagem"
                                    style={styles.input}
                                    value={urlImg}
                                    onChangeText={setUrlImg}
                                />
                            </View>

                            <TouchableOpacity style={styles.btnSalvar} onPress={salvarCatalogo}>
                                <Text style={styles.salvar}>Adicionar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalAberto(false)}>
                                <Text style={styles.cancelar}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>

            {/* Modal Editar */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditarAberto}
                onRequestClose={() => setModalEditarAberto(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.modalOverlay} keyboardShouldPersistTaps="handled">
                        <View style={styles.content}>
                            <Text style={styles.tituloModal}>Editar HQ</Text>
                            <View style={styles.inputsContainer}>
                                <TextInput
                                    placeholder="Título da HQ"
                                    style={styles.input}
                                    value={titulo}
                                    onChangeText={setTitulo}
                                />
                                <TextInput
                                    placeholder="Preço"
                                    style={styles.input}
                                    value={preco}
                                    onChangeText={setPreco}
                                />
                                <TextInput
                                    placeholder="Ano de lançamento"
                                    style={styles.input}
                                    value={ano}
                                    onChangeText={setAno}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    placeholder="Raridade"
                                    style={styles.input}
                                    value={raridade}
                                    onChangeText={setRaridade}
                                />
                                <TextInput
                                    placeholder="URL da Imagem"
                                    style={styles.input}
                                    value={urlImg}
                                    onChangeText={setUrlImg}
                                />
                            </View>

                            <TouchableOpacity style={styles.btnSalvar} onPress={editarCatalogo}>
                                <Text style={styles.salvar}>Atualizar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalEditarAberto(false)}>
                                <Text style={styles.cancelar}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>

            {/* Modal Confirmação Exclusão */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalConfirmarExclusao}
                onRequestClose={() => setModalConfirmarExclusao(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalConfirmacaoContainer}>
                        <Text style={styles.modalConfirmacaoTexto}>Deseja realmente excluir?</Text>
                        <View style={styles.botoesConfirmacao}>
                            <TouchableOpacity
                                style={styles.btnSim}
                                onPress={() => deletarItem(itemParaExcluir)}
                            >
                                <Text style={styles.textoBotaoConfirmacao}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnNao}
                                onPress={() => setModalConfirmarExclusao(false)}
                            >
                                <Text style={styles.textoBotaoConfirmacao}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cabeçalho: {
        backgroundColor: '#3C3C3C',
        paddingVertical: 30,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    titulo: {
        fontSize: 35,
        color: '#F1C70B',
        fontFamily: 'ComicNeue',
        marginLeft: -35,
        marginTop: 20,
    },
    voltar: {
        fontSize: 35,
        marginLeft: 15,
        marginTop: 5,
        width: 50,
    },
    btnContainer: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnAdd: {
        height: 60,
        width: 250,
        borderRadius: 10,
        backgroundColor: '#F1C70B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    add: {
        fontSize: 40,
        color: '#fff',
        fontFamily: 'ComicNeue',
        textAlign: 'center',
    },
    modalOverlay: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    content: {
        borderColor: '#F1C70B',
        borderRadius: 10,
        borderWidth: 2,
        width: '100%',
        backgroundColor: '#FFF',
        padding: 20,
        alignItems: 'center',
    },
    tituloModal: {
        fontSize: 30,
        color: '#000',
    },
    inputsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#000',
        marginVertical: 5,
        padding: 10,
    },
    btnSalvar: {
        height: 40,
        width: 250,
        borderRadius: 10,
        backgroundColor: '#3044DE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    salvar: {
        color: '#fff',
        fontSize: 20,
    },
    btnCancelar: {
        height: 40,
        width: 250,
        borderRadius: 10,
        backgroundColor: '#FF0000',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelar: {
        color: '#fff',
        fontSize: 20,
    },
    listaContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 50,
    },
    item: {
        borderWidth: 2,
        width: '80%',
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#FFF',
    },
    descricao: {
        margin: 10,
    },
    info: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'ComicNeue',
    },
    opcoes: {
        flexDirection: 'row',
        width: 150,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'center',
    },
    icon: {
        fontSize: 25,
        color: '#000',
    },
    capa: {
        width: 80,
        height: 110,
        resizeMode: 'cover',
        margin: 10,
        borderRadius: 5,
    },

    modalConfirmacaoContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 25,
        width: '80%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },

    modalConfirmacaoTexto: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
        fontWeight: '500',
    },

    botoesConfirmacao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    btnSim: {
        backgroundColor: '#3044DE',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginRight: 10,
        flex: 1,
        alignItems: 'center',
    },

    btnNao: {
        backgroundColor: '#F44336',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
    },

    textoBotaoConfirmacao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },  
});

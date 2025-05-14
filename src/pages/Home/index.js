import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    const [modalAberto, setModalAberto] = useState(false);

    return (
        <View>
            <View>
                <View style={styles.cabeçalho}>
                    <Image source={require('../../../assets/livro.png')} style={styles.imagemPow} />
                    <Text style={styles.titulo}>Quadrinhos</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Inicial')}>
                    <Text style={styles.voltar}>←</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnAdd} onPress={() => setModalAberto(true)}>
                    <Text style={styles.add}>+</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent={true} visible={modalAberto} onRequestClose={() => setModalAberto(false)}>
                <View style={styles.fundoModal}>
                    <View style={styles.content}>
                        <Text style={styles.tituloModal}>Novo HQ</Text>

                        <View style={styles.inputsContainer}>
                            <TextInput
                                placeholder="Título da HQ"
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Preço"
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Ano de lançamento"
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Raridade"
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="URL da Imagem"
                                style={styles.input}
                            />
                        </View>

                        <TouchableOpacity style={styles.btnSalvar}>
                            <Text style={styles.salvar}>Adicionar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnCancelar} onPress={() => setModalAberto(false)}>
                            <Text style={styles.cancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </View>

    );
};

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
        marginTop: 20,
    },
    voltar: {
        fontSize: 35,
        marginLeft: 15,
        marginTop: 5,
        width: 50,
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
    fundoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        borderColor: '#F1C70B',
        borderRadius: 10,
        borderWidth: 2,
        width: '80%',
        height: '60%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 20,
        alignItems: 'center',
    },
    tituloModal: {
        fontSize: 30,
        color: '#000',
    },
    inputsContainer: {
        width: '100%',
        height: '70%',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#000',
        margin: 4,
    },
    btnSalvar:{
        height: 40,
        width: 250,
        borderRadius: 10,
        backgroundColor: '#3044DE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    salvar:{
        color: '#fff',
        fontSize: 20,
    },
    btnCancelar:{
        height: 40,
        width: 250,
        borderRadius: 10,
        backgroundColor: '#FF0000',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelar:{
        color: '#fff',
        fontSize: 20,
    }
});

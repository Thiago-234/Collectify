import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native'; // Importando o hook de navegação

export default function Inicial() {
    const navigation = useNavigation(); // Hook de navegação

    const [fontsLoaded] = useFonts({
        'ComicNeue': require('../../../assets/fonts/ComicNeue-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View style={styles.imagensTopo}>
                <Image source={require('../../../assets/pow.png')} style={styles.imagemPow}/>
                <Image source={require('../../../assets/bang.png')} style={styles.imagemBang}/>
            </View>

            <View>
                <Text style={styles.title}>Collectify</Text>
                <Text style={styles.bemVindo}>Bem Vindo ao Collectify!</Text>
            </View>

            <View style={styles.btnContainer}>
                <Text style={styles.textoColecao}> Sua coleção de quadrinhos{'\n'} está pronta para ser atualizada!</Text>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}> {/*Navegando para a Home/Entrar na lista*/}
                    <Text style={styles.btnText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imagensAbaixo}>
                <Image source={require('../../../assets/wow.png')} style={styles.imagemWow} />
                <Image source={require('../../../assets/oops.png')} style={styles.imagemOops} />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1C70B',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imagensTopo: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    imagemPow: {
        width: 200,
        height: 200,
    },
    imagemBang: {
        width: 170,
        height: 170,
        resizeMode: 'contain',
        marginTop: 60,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        fontFamily: 'ComicNeue',
    },
    bemVindo: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
    },
    textoColecao: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
    },
    btn: {
        marginTop: 20,
        backgroundColor: '#CE161F',
        borderRadius: 10,
        paddingVertical: 15,
        width: 200,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    btnText: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
    },
    imagensAbaixo: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    imagemWow: {
        width: 200,
        height: 200,
    },
    imagemOops: {
        width: 170,
        height: 170,
        resizeMode: 'contain',
        marginTop: 60,
    },
});
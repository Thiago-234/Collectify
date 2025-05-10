import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.cabeçalho}>
                <Image source={require('../../../assets/livro.png')} style={styles.imagemPow} />
                <Text style={styles.titulo}>Quadrinhos</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Inicial')}>
                <Text style={styles.voltar}>←</Text>
            </TouchableOpacity>
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
});

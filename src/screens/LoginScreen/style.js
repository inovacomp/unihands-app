import { StyleSheet } from 'react-native'
import * as colors from '../../Colors';

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.colorGray,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    backgroundOpacity: {
        flex: 1,
        backgroundColor: 'rgba(44, 62, 80,0.6)',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 22,
        textAlign: 'center',
        color: colors.colorWhite,
        fontWeight: 'bold',
        marginBottom: 30
    },
    input: {
        marginVertical: -5,
        marginHorizontal: 10,
        padding: 0,
        borderRadius: 6,
        color:colors.colorWhite
    },
    btnEntrar: {
        justifyContent: 'flex-end',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: colors.colorGreen,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 16,
        color: colors.colorWhite,
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        borderRadius: 50,
        fontWeight:'bold',
        elevation: 3,
    }
})
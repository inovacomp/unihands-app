import { StyleSheet } from 'react-native';
import * as colors from '../../Colors';

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.colorGray
    },
    subTitle: {
        color: colors.colorGreen,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    },
    semestre: {
        paddingVertical: 8,
        textAlign: 'center',
        fontWeight:'bold'
    },
    item: {
        alignItems: "center",
        flexGrow: 1,
        padding: 3,
        flexBasis: 0,
        margin: 3,
        borderRadius: 5

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    aprovado: {
        backgroundColor: colors.colorPassou,
    },
    naoAprovado: {
        backgroundColor: colors.colorWhite,
    },
    itemText: {
        fontSize: 12,
        textAlign: 'center',
        
    },
    itemEmpty: {
        backgroundColor: "transparent"
    },
    loading:{
        flex:1,
        flexDirection:'column',
        backgroundColor: colors.colorGray,
        justifyContent:'center'
    }
});
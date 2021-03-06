import { StyleSheet } from 'react-native';
import * as colors from '../../Colors';

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.colorGray
    },
    semestre: {
        paddingVertical: 8,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 10
    },
    item: {
        alignItems: "center",
        flexGrow: 1,
        padding: 3,
        flexBasis: 0,
        margin: 3,
        borderRadius: 5,
        alignContent: 'center'

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
    preReq: {
        backgroundColor: colors.colorOrange,
    },
    matSelecionada: {
        backgroundColor: colors.colorGreenEsmerald,
        color: colors.colorWhite,
        borderColor: colors.colorWhite,
        borderWidth: 2,
    },
    posReq: {
        backgroundColor: colors.colorBlueMarine,
        color: colors.colorWhite
    },
    itemTitleText: {
        fontSize: 8,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold'
    },
    itemDescText: {
        fontSize: 8,
        textAlign: 'center',
        flex: 1
    },
    // itemEmpty: {
    //     backgroundColor: "#000"
    // },
    loading: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.colorGray,
        justifyContent: 'center'
    },
    contentLegenda: {
        padding: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center',
        borderColor: '#000',
        borderStyle: 'solid',
        borderBottomWidth: 1
    },
    legendaItem: {
        margin: 2,
        width: 20,
        height: 20,
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 50
    },
    txtLegenda: {
        fontSize: 10,
        marginTop: 5
    }
});
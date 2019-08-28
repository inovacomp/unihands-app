import {StyleSheet} from 'react-native'
import * as colors from '../../Colors';

export default style = StyleSheet.create({
    background : {
        flex:1,
        backgroundColor: colors.colorGray,
        flexDirection:'column',
        alignItems:'stretch'
    },
    InfoMateria:{
        backgroundColor:colors.colorWhite,
        marginHorizontal:10,
        marginBottom:1,
        padding:8
    },
    subItemInfoMateriaTitulo:{
        color: colors.colorGreen,
        fontWeight: 'bold',
    },
    subItemInfoMateriaDesc:{
        color: "#808080"
    },
    cabecalho:{
        backgroundColor:colors.colorLightGreen,
        marginHorizontal:10,
        marginBottom:1,
        padding:8,
        color:colors.colorWhite
    },
    cabecalhoTitulo:{
        color: colors.colorWhite,
        fontWeight: 'bold',
    },
    cabecalhoDesc:{
        color: colors.colorWhite
    }
})
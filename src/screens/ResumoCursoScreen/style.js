import {StyleSheet} from 'react-native'
import * as colors from '../../Colors';

export default styles = StyleSheet.create({
    background : {
        flex:1,
        backgroundColor: colors.colorGray,
        flexDirection:'column',
        alignItems:'stretch'
    },
    loading:{
        flex:1,
        flexDirection:'column',
        backgroundColor: colors.colorGray,
        justifyContent:'center'
    },
    infoPessoal:{
        backgroundColor:colors.colorWhite,
        marginHorizontal:10,
        marginBottom:1,
        padding:8
    },
    subItemInfoPessoalTitulo:{
        color: "#009688",
        fontWeight: 'bold',
    },
    subItemInfoPessoalDesc:{
        color: colors.colorGrayDark
    },
    'progress' : {
        color: "#009688",
        textAlign:"center",
        fontWeight: 'bold',
    } 
})
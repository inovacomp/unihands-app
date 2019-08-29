import {StyleSheet} from 'react-native'
import * as colors from '../../Colors';

export default styles = StyleSheet.create({
    background : {
        flex:1,
        backgroundColor: colors.colorGray,
        flexDirection:'column',
        alignItems:'stretch'
    },
    boasvindas:{
        backgroundColor:colors.colorWhite,
        height:30,
        justifyContent:'center',
        marginBottom: 3
    },
    boasvindasTxt:{
        textAlign: 'center',
        color:colors.colorGreen
    },
    content:{
        flex:1,
        flexDirection: 'column'
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
    table:{
        marginHorizontal:10,
        backgroundColor:colors.colorWhite,
        marginTop:5
    },
    rowsTable:{
        textAlign:'center',
        color: "#808080",
        padding:2,
        fontSize:10
    },
    itemList: {
        alignItems: "center",
        backgroundColor: colors.colorGrayDark,
        flexGrow: 1,
        marginHorizontal: 10,
        marginVertical:4,
        padding: 20,
        fontSize:12
    },
    textList: {
        color: "#FFF",
        fontSize:12
    },
    subTitle:{
        color: colors.colorGreen,
        fontWeight:'bold',
        fontSize:16,
        margin:10
    },
    loading:{
        flex:1,
        flexDirection:'column',
        backgroundColor: colors.colorGray,
        justifyContent:'center'
    }
})
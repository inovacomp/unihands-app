import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    background : {
        flex:1,
        backgroundColor: '#E5E5E5',
        flexDirection:'column',
        alignItems:'stretch'
    },
    boasvindas:{
        backgroundColor:'#FFF',
        height:30,
        justifyContent:'center',
        marginBottom: 3
    },
    boasvindasTxt:{
        textAlign: 'center',
        color:"#009688"
    },
    content:{
        flex:1,
        flexDirection: 'column'
    },  
    infoPessoal:{
        backgroundColor:'#FFF',
        marginHorizontal:10,
        marginBottom:1,
        padding:8
    },
    subItemInfoPessoalTitulo:{
        color: "#009688",
        fontWeight: 'bold',
    },
    subItemInfoPessoalDesc:{
        color: "#808080"
    },
    table:{
        marginHorizontal:10,
        backgroundColor:'#FFF',
        marginTop:5
    },
    rowsTable:{
        textAlign:'center',
        color: "#808080",
        padding:2,
        fontSize:12
    },
    itemList: {
        alignItems: "center",
        backgroundColor: "#808080",
        flexGrow: 1,
        marginHorizontal: 10,
        marginVertical:4,
        padding: 20
    },
    textList: {
        color: "#FFF"
    },
    subTitle:{
        color: "#009688",
        fontWeight:'bold',
        fontSize:14,
        margin:10
    }
})
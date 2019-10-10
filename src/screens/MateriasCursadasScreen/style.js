import {StyleSheet} from 'react-native'
import * as colors from '../../Colors';

export default styles = StyleSheet.create({
    background : {
        flex:1,
        backgroundColor: colors.colorGray,
        flexDirection:'column',
        alignItems:'stretch'
    },
    card:{
        margin:10
    },
    subItemTitulo:{
        color: colors.colorBlack,
        marginVertical:4,
        textAlign:"center",
        fontWeight: 'bold',
    },
    content:{
        padding:5,
        borderRadius:5,
        marginBottom:2
    },
    contentMateria:{
        marginVertical:2
    },
    subItemInfoMateriaTitulo:{
        color: colors.colorBlack,
        fontWeight: 'bold',
    },
    subItemInfoMateriaDesc:{
        color: colors.colorBlack
    },
    textCard: {
        color: "#FFF",
        fontSize:12
    },
    loading:{
        flex:1,
        flexDirection:'column',
        backgroundColor: colors.colorGray,
        justifyContent:'center'
    },
    backgroundPassou:{
        backgroundColor:colors.colorPassou
    },
    backgroundPerdeu:{
        backgroundColor:colors.colorPerdeu
    },
    backgroundSemResultado:{
        backgroundColor:colors.colorSemResultado
    },
    
})
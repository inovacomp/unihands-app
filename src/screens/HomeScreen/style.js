import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    background : {
        flex:1,
        backgroundColor: '#DCEDC8',
        flexDirection:'column',
        alignItems:'stretch',
        justifyContent:'center'
    },
    titulo:{
        fontSize:22,
        textAlign:'center'
    },  
    input:{
        backgroundColor: '#FFF',
        margin:10,
        padding:8,
        borderRadius: 6
    },
    btnEntrar: {
        justifyContent: 'flex-end',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#5C6BC0',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 16,
        color: '#FFF',
        margin:10,
        borderRadius: 6
    }
})
import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    background : {
        flex:1,
        backgroundColor: '#E5E5E5',
        flexDirection:'column',
        alignItems:'stretch',
        justifyContent:'center'
    },
    titulo:{
        fontSize:22,
        textAlign:'center',
        color: '#009688',
        fontWeight: 'bold',
        marginBottom: 30
    },  
    textInput:{
        color: '#009688',
        marginVertical: 0,
        marginHorizontal: 5,
        padding:8
    },
    input:{
        backgroundColor: '#FFF',
        marginVertical: -5,
        marginHorizontal: 10,
        padding:8,
        borderRadius: 6
    },
    btnEntrar: {
        justifyContent: 'flex-end',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#009688',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 16,
        color: '#FFF',
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
        borderRadius:50,

        elevation: 3,
    }
})
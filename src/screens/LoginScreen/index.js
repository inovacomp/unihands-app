import React,{Component} from 'react'
import {Text,TextInput,TouchableOpacity,View,ActivityIndicator} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

import styles from './style'

export default class LoginScreen extends Component{

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            cpf: '',
            senha: '',
            success: false,
            showAlert: false,
            msgerro : ''
        };
    }

    showAlert = () => {
    this.setState({
        showAlert: true
    });
    };

    hideAlert = () => {
    this.setState({
        showAlert: false
    });
    };
 
    sendSubmit = () => {
        this.setState({isLoading:true})
        let dados = {
            cpf : this.state.cpf,
            senha: this.state.senha
        }
        axios.post('https://siacapi.ayrtonsilas.com.br/api/get-comprovante',dados)
        .then((response) => {
            if(response.data.ERRO_LOGIN){
                this.setState({
                    success: false
                }) 
                this.showAlert()
            }else{
                this.setState({
                    success:true
                })
                this.props.navigation.navigate('HomeScreen', {
                    cpf: this.state.cpf,
                    senha: this.state.senha,
                    dados: response.data
                })
            }
            this.setState({isLoading:false})
        }).catch(error =>{
            this.setState({
                msgerro: error.message
            })
            this.setState({isLoading:false})
            this.showAlert()
        })
    }

    render(){
        const {showAlert,msgerro} = this.state; 
        return (
            <View style={styles.background}>
                <Text style={styles.titulo}>Seja bem vindo(a) ao ESTUFBA</Text>
                <Text style={styles.textInput}>CPF</Text>
                <TextInput  style={styles.input} placeholder = '' onChangeText = {(cpf) =>this.setState({cpf : cpf})}></TextInput>
                <Text style={styles.textInput}>Senha</Text>
                <TextInput secureTextEntry={true} style={styles.input} placeholder = '' onChangeText = {(senha) =>this.setState({senha : senha})}></TextInput>
                <TouchableOpacity onPress={this.sendSubmit}>
                    <View>
                        <Text style={styles.btnEntrar}>ENTRAR</Text>
                    </View>
                </TouchableOpacity>

                {this.state.isLoading ?  
                    <View>
                    <ActivityIndicator />
                    </View> :
                    null
                    }

                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Erro"
                    message={msgerro}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText="Fechar"
                    cancelButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                />

            </View>
        )
    }
}
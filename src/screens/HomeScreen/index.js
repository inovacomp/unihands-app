import React,{Component} from 'react'
import {Text,TextInput,TouchableOpacity,View,ActivityIndicator} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

import styles from './style'

export default class HomeScreen extends Component{

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            cpf: '06414191558',
            senha: 'COCKNNOT',
            success: false,
            nome: '',
            showAlert: false
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
        let cpf = this.state.cpf
        let senha = this.state.senha
        axios.get('https://ayrtonsilas.com.br/conexao-siac/login.php?cpf='+cpf+'&senha='+senha)
        .then((response) => {
            if(response.data == ''){
                this.setState({
                    success: false
                })
                this.showAlert()
            }else{
                this.setState({
                    nome: JSON.stringify(response.data[0][0]),
                    success:true
                })
                this.props.navigation.navigate('Menu', {
                    cpf: this.state.cpf,
                    senha: this.state.senha,
                    'nome': this.state.nome
                })
            }
            this.setState({isLoading:false})
        })
    }

    render(){
        const {showAlert} = this.state;
        return (
            <View style={styles.background}>
                {this.state.isLoading ? 
                <View>
                <ActivityIndicator />
                </View> :
                null
                }
                
                <Text style={styles.titulo}>Seja bem vindo(a) ao SIAC Mobile</Text>
                <TextInput  style={styles.input} placeholder = 'CPF' onChangeText = {(cpf) =>this.setState({cpf : cpf})}></TextInput>
                <TextInput secureTextEntry={true} style={styles.input} placeholder = 'Senha' onChangeText = {(senha) =>this.setState({senha : senha})}></TextInput>
                <TouchableOpacity onPress={this.sendSubmit}>
                    <View>
                        <Text style={styles.btnEntrar}>ENTRAR</Text>
                    </View>
                </TouchableOpacity>
                <Text>{this.state.success}</Text>


                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Erro"
                    message="Usuário ou Senha incorreto!"
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
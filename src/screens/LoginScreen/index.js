import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

import styles from './style'
import helper from '../../Helper'

export default class LoginScreen extends Component {

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
            showAlert: false,
            msgerro: '',
            internet: false,
            tipoConexao: '',
        };
    }

    async componentDidMount() {
        let internet = await helper.CheckConnectivity();

        this.setState({
            internet: internet.conectado,
            tipoConexao: internet.tipo
        })
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
        if (this.state.cpf == '' || this.state.senha == '') {
            this.setState({
                msgerro: 'Digite o CPF e a Senha!'
            })
            this.showAlert();
            return;
        }

        this.setState({ isLoading: true })
        let dados = {
            cpf: this.state.cpf,
            senha: this.state.senha
        }
        axios.post('https://siacapi.ayrtonsilas.com.br/api/get-dados', dados)
            .then(async (response) => {
                if (response.data.ERRO_LOGIN) {
                    this.setState({
                        success: false,
                        msgerro: 'Erro no CPF e/ou Senha'
                    })
                    this.showAlert()
                } else {
                    await helper.setData('cpf', dados.cpf);
                    await helper.setData('senha', dados.senha);
                    await helper.setData('nome', response.data.COMPROVANTE.NOME);
                    await helper.setData('matricula', response.data.COMPROVANTE.MATRICULA);
                    await helper.setData('curso', response.data.COMPROVANTE.CURSO);
                    await helper.setData('cr', response.data.COMPROVANTE.CR);
                    await helper.setData('materias_comprovante', response.data.COMPROVANTE.MATERIAS_COMPROVANTE);
                    await helper.setData('materias_horarios', response.data.COMPROVANTE.MATERIAS_HORARIOS);

                    this.setState({
                        success: true
                    })

                    this.props.navigation.navigate('HomeScreen')
                }
                this.setState({ isLoading: false })
            }).catch(async (error) => {
                // this.setState({
                //     msgerro: error.message
                // })
                this.setState({ isLoading: false })
                // this.showAlert()
                let cpfVerify = await helper.getData('cpf');
                let senhaVerify = await helper.getData('senha');
                if (cpfVerify != '' && senhaVerify != '' && cpfVerify == dados.cpf && senhaVerify == dados.senha){
                    this.props.navigation.navigate('HomeScreen');
                }

            })
    }

    render() {
        const { showAlert, msgerro } = this.state;
        return (
            <View style={styles.background}>
                <Text style={styles.titulo}>Seja bem vindo(a) ao ESTUFBA</Text>
                <Text style={styles.textInput}>CPF</Text>
                <TextInput style={styles.input} placeholder='' onChangeText={(cpf) => this.setState({ cpf: cpf })}></TextInput>
                <Text style={styles.textInput}>Senha</Text>
                <TextInput secureTextEntry={true} style={styles.input} placeholder='' onChangeText={(senha) => this.setState({ senha: senha })}></TextInput>
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

                <Text style={{ textAlign: "center", fontStyle: 'italic' }}>{this.state.internet ? "Você está Conectado a Internet (" + this.state.tipoConexao + ")" : "Você não está Conectado a Internet"}</Text>

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
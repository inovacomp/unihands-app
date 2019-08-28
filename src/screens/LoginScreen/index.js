import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import styles from './style'
import helper from '../../Helper'
import * as colors from '../../Colors'

export default class LoginScreen extends Component {

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
            msgerro: '',
            internet: false,
            tipoConexao: '',
            disabled: false,
            'txtBtnEntrar': 'Entrar'
        };
    }

    async componentDidMount() {
        this.verificarConexao();
        cpf = await helper.getData('cpf');
        senha = await helper.getData('senha');
        if (cpf != '' && senha != '') {
            this.setState({
                cpf: cpf,
                senha: senha
            });
        }
    }

    async verificarConexao() {
        let internet = await helper.CheckConnectivity();
        this.setState({
            internet: internet.conectado,
            tipoConexao: internet.tipo
        })
    }

    disabled = (x) => {
        this.setState({
            disabled: x
        });
    };

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
        this.setState({
            txtBtnEntrar:'Aguarde...'
        })
        if (this.state.cpf == '' || this.state.senha == '') {
            this.setState({
                msgerro: 'Digite o CPF e a Senha!'
            })
            this.showAlert();
            return;
        }
        this.disabled(true);
        this.verificarConexao();

        this.setState({ isLoading: true })
        let dados = {
            cpf: this.state.cpf,
            senha: this.state.senha
        }
        axios.post('https://siacapi.ayrtonsilas.com.br/api/get-dados', dados,{timeout:10})
            .then(async (response) => {
                if (response.data.ERRO_LOGIN) {
                    this.setState({
                        success: false,
                        msgerro: 'Erro no CPF e/ou Senha'
                    })
                    this.showAlert()
                } else {
                    await helper.setData('dataAtt', helper.getCurrentDate());
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
                this.setState({ isLoading: false });
                this.disabled(true);
                this.setState({
                    txtBtnEntrar:'Entrar'
                })
            }).catch(async (error) => {
                let cpfVerify = await helper.getData('cpf');
                let senhaVerify = await helper.getData('senha');
                if (cpfVerify != '' && senhaVerify != '' && cpfVerify == dados.cpf && senhaVerify == dados.senha) {
                    this.disabled(false);
                    this.props.navigation.navigate('HomeScreen');
                } else {
                    this.setState({
                        msgerro: 'Erro de conexão com a Internet'
                    })
                }
                this.setState({ isLoading: false })
                this.showAlert()
                this.disabled(false);
                this.setState({
                    txtBtnEntrar:'Entrar'
                })
            })
    }

    render() {
        const { showAlert, msgerro } = this.state;
        return (
            <View style={styles.background}>
                {this.state.isLoading ?
                    <View>
                        <ActivityIndicator />
                    </View> :
                    null
                }
                <Text style={styles.titulo}>Seja bem vindo(a) ao ESTUFBA</Text>
                <Text style={styles.textInput}>CPF</Text>
                <TextInput value={this.state.cpf} style={styles.input} placeholder='' onChangeText={(cpf) => this.setState({ cpf: cpf })}></TextInput>
                <Text style={styles.textInput}>Senha</Text>
                <TextInput value={this.state.senha} secureTextEntry={true} style={styles.input} placeholder='' onChangeText={(senha) => this.setState({ senha: senha })}></TextInput>

                <TouchableOpacity disabled={this.state.disabled} onPress={this.sendSubmit}>
                    <View>
                        <Text style={styles.btnEntrar}>{this.state.txtBtnEntrar}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.refreshBg}>
                    <Text style={{ textAlign: "center", fontStyle: 'italic', marginTop: 8 }}> {this.state.internet ? <Text style={{color:colors.colorGreen}}>Você está Conectado a Internet ({this.state.tipoConexao}) </Text> : <Text  style={{color:colors.colorRed}}>Você não está Conectado a Internet</Text>}</Text>
                </View>

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
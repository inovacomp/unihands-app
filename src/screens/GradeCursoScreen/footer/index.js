import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import * as colors from '../../../Colors';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'axios';

export default class FooterGradeCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 50,
            textBtn: 'Ver Detalhes',
            materia: '',
            cargaHoraria: '',
            teorica: '',
            pratica: '',
            estagio: '',
            departamento: '',
            semestreVigente: '',
            ementa: '',
            objetivo: '',
            conteudo: '',
            bibliografia: '',
        };
    }

    //quando clicar no botão ver detalhes carregar os detalhes da matérias
    onClickMateria = async () => {
        length = this.state.length;
        textBtn = this.state.textBtn;
        if (length > 50) {
            length = 50;
            textBtn = 'Ver Detalhes';
            this.setState({
                length: length,
                textBtn: textBtn
            });
        } else {
            length = Dimensions.get('window').height;
            textBtn = 'Fechar Detalhes';
            const httpClient = axios.create();
            httpClient.defaults.timeout = 15000;

            disciplina = this.props.setMateria;
            periodoInicial = this.props.setPeriodoInicial;
            this.setState({
                textBtn: 'Aguarde...'
            })
            await httpClient.get(`https://siacapi.ayrtonsilas.com.br/api/get-info-materia/${disciplina}/${periodoInicial}`)
                .then(async (response) => {
                    console.log(response.data);
                    this.setState({
                        materia: response.data.materia,
                        cargaHoraria: response.data.cargaHorariaTotal,
                        teorica: response.data.teorica,
                        pratica: response.data.pratica,
                        estagio: response.data.estagio,
                        departamento: response.data.departamento,
                        semestreVigente: response.data.semestreVigente,
                        ementa: response.data.ementa,
                        objetivo: response.data.objetivo,
                        conteudo: response.data.conteudo,
                        bibliografia: response.data.bibliografia,
                        length: length,
                        textBtn: textBtn
                    })
                })
                .catch(async (error) => {
                    this.setState({
                        textBtn: 'Erro na Conexão, clique novamente.'
                    })
                });
        }
    }

    render() {
        return (
            <View style={[styles.background, { height: this.state.length }]}>

                <TouchableWithoutFeedback onPress={this.onClickMateria} style={styles.btnAbrir}>
                    <Text style={styles.btnAbrirText}>{this.state.textBtn}
                    </Text>
                </TouchableWithoutFeedback>
                <ScrollView style={{ paddingHorizontal: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.subItemInfoPessoalTitulo}>{this.state.materia}</Text>
                        <Divider style={{ backgroundColor: colors.colorGrayDark }} />
                        <Text style={styles.subItemInfoPessoalDesc}>{this.state.cargaHoraria}</Text>
                    </View>
                    <Divider style={{ backgroundColor: colors.colorGrayDark }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Teórica</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.teorica}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Prática</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.pratica}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Estágio</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.estagio}</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: colors.colorGrayDark }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Departamento</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.departamento}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Semestre Vigente</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.semestreVigente}</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: colors.colorGrayDark }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Ementa</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.ementa}</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: colors.colorGrayDark }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Objetivo</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.objetivo}</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: colors.colorGrayDark }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Conteúdo</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.conteudo}</Text>
                        </View>
                    </View>
                    <Divider style={{ backgroundColor: colors.colorGrayDark }} />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.subItemInfoPessoalTitulo}>Bibliografia</Text>
                            <Text style={styles.subItemInfoPessoalDesc}>{this.state.bibliografia}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.colorWhite,

    },
    btnAbrir: {
        paddingVertical: 20,
        backgroundColor: colors.colorGrayDark,
        alignItems: 'center'
    },
    btnAbrirText: {
        color: colors.colorWhite,
        fontWeight: 'bold',
        fontSize: 12
    },
    subItemInfoPessoalTitulo: {
        color: "#009688",
        fontWeight: 'bold',
    },
    subItemInfoPessoalDesc: {
        color: colors.colorGrayDark,
        textAlign: 'justify'
    }
})
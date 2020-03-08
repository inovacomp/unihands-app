import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import styles from './style';
import helper from '../../Helper';
import * as Progress from 'react-native-progress';

export default class MateriasCursadasScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Resumo do Curso'
    });

    constructor(props) {
        super(props);
        this.state = {
            carregou: false,
            materias: [],
            'totalObrigatoriasCursadas': 0,
            'totalOptativaCursadas': 0,
            'totalChComplementarCursadas': 0,
            'totalObrigatoriaCurso': 0,
            'totalOptativaCurso': 0,
            'totalChComplementarCurso': 0,
            'percentObrigatoria': 0,
            'percentOptativa': 0,
            'percentComplementar': 0
        }
    }

    async componentDidMount() {

        let materias = await helper.getData('materias_cursadas');
        let chComplementar = await helper.getData('ch_complementar');
        let resumo = await helper.getData('RESUMO_CURSO');
        let totalObrigatoriasCursadas = 0;
        let totalOptativaCursadas = 0;
        let totalChComplementarCursadas = 0;
        let totalObrigatoriasCurso = 0;
        let totalOptativaCurso = 0;
        let totalChComplementarCurso = 0;

        materias.filter(x => ((x.NATUREZA == 'OB' && parseFloat(x.NOTA) >= 5) || x.RESULTADO == 'Dispensado'))
            .map(x => {
                if (!isNaN(parseInt(x.CH))) {
                    totalObrigatoriasCursadas += parseInt(x.CH);
                }
            });
        materias.filter(x => x.NATUREZA != 'OB' &&
            x.RESULTADO != 'Reprovado por Nota' && x.RESULTADO != 'Reprovado Frequencia')
            .map(x => {
                if (!isNaN(parseInt(x.CH))) {
                    totalOptativaCursadas += parseInt(x.CH);
                }
            });

        chComplementar.map(x => {
            totalChComplementarCursadas += parseInt(x.CH);
        });

        let ObrigatoriasCurso = resumo.filter(z => z.TIPO == 'OB')[0];
        let OptativaCurso = resumo.filter(z => z.TIPO == 'OP')[0];
        let AtvComplementarCurso = resumo.filter(z => z.TIPO == 'AC')[0];

        if (ObrigatoriasCurso != undefined) {
            totalObrigatoriasCurso = parseInt(ObrigatoriasCurso.VALOR);
        }
        if (OptativaCurso != undefined) {
            totalOptativaCurso = parseInt(OptativaCurso.VALOR);
        }
        if (AtvComplementarCurso != undefined) {
            totalChComplementarCurso = parseInt(AtvComplementarCurso.VALOR);
        }

        this.setState({
            materias: materias,
            carregou: true,
            'totalObrigatoriasCursadas': totalObrigatoriasCursadas,
            'totalOptativaCursadas': totalOptativaCursadas,
            'totalChComplementarCursadas': totalChComplementarCursadas,
            'totalObrigatoriaCurso': totalObrigatoriasCurso,
            'totalOptativaCurso': totalOptativaCurso,
            'totalChComplementarCurso': totalChComplementarCurso,
            'percentObrigatoria': ((totalObrigatoriasCursadas * 100) / totalObrigatoriasCurso) / 100,
            'percentOptativa': ((totalOptativaCursadas * 100) / totalOptativaCurso) / 100,
            'percentComplementar': ((totalChComplementarCursadas * 100) / totalChComplementarCurso) / 100,
            'percentTotal': (((totalObrigatoriasCursadas + totalOptativaCursadas + totalChComplementarCursadas) * 100) / (totalObrigatoriasCurso + totalOptativaCurso + totalChComplementarCurso)) / 100
        });

        helper.eventoAnalytics('Resumo Curso');
    }

    render() {
        if (!this.state.carregou) {
            return (<View style={styles.loading}><ActivityIndicator /></View>)
        } else {
            return (
                <View style={styles.background}>
                    <ScrollView>
                        <View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Total Obrigatórias Cursadas:
                                    </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.totalObrigatoriasCursadas}h
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Total Optativas Cursadas:
                                    </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.totalOptativaCursadas}h
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        CH Complementar Realizada:
                                    </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.totalChComplementarCursadas}h
                                    </Text>
                                </Text>
                            </View>
                            <View><Text></Text></View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Total Obrigatórias do Curso:
                                    </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.totalObrigatoriaCurso}h
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Total Optativas do Curso:
                                    </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.totalOptativaCurso}h
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Total CH Complementar do Curso:
                                    </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.totalChComplementarCurso}h
                                    </Text>
                                </Text>
                            </View>

                        </View>
                        <View><Text></Text></View>
                        <View>
                            <View style={styles.infoPessoal}>
                                <Text style={styles.progress}>
                                    Progresso Obrigatórias: {Math.round(this.state.percentObrigatoria * 100)}%
                                    </Text>
                                <Progress.Bar width={null} height={15} size={100} progress={this.state.percentObrigatoria} />
                            </View>
                        </View>
                        <View>
                            <View style={styles.infoPessoal}>
                                <Text style={styles.progress}>
                                    Progresso Optativas: {Math.round(this.state.percentOptativa * 100)}%
                                    </Text>
                                <Progress.Bar width={null} height={15} size={100} progress={this.state.percentOptativa} />
                            </View>
                        </View>
                        <View>
                            <View style={styles.infoPessoal}>
                                <Text style={styles.progress}>
                                    Progresso Complementar: {Math.round(this.state.percentComplementar * 100)}%
                                    </Text>
                                <Progress.Bar width={null} height={15} size={100} progress={this.state.percentComplementar} />
                            </View>
                        </View>
                        <View>
                            <View style={styles.infoPessoal}>
                                <Text style={styles.progress}>
                                    Progresso Total: {Math.round(this.state.percentTotal * 100)}%
                                    </Text>
                                <Progress.Bar width={null} height={15} size={100} progress={this.state.percentTotal} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}
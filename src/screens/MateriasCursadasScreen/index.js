import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import groupBy from 'json-groupby';
import styles from './style';
import helper from '../../Helper';
import { colorGreen, colorGray } from '../../Colors'


export default class MateriasCursadasScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carregou: false,
            materias: []
        }
    }
    async componentDidMount() {
        let materias = await helper.getData('materias_cursadas');

        materias.map((val, i) => {
            if (val.PERIODO == '') {
                val.PERIODO = materias[i - 1].PERIODO;
            }
        });

        this.setState({
            materias: groupBy(materias, ["PERIODO"]),
            carregou: true
        })
    }

    render() {
        if (!this.state.carregou) {
            return (<View style={styles.loading}><ActivityIndicator /></View>)
        } else {
            return (
                <ScrollView>
                    <View style={styles.background}>
                        <View>
                            <Text style={styles.subTitle}>Matérias Cursadas</Text>
                        </View>
                        {
                            Object.keys(this.state.materias).map((semestre, i) => {
                                return (
                                    <Card key={i} containerStyle={styles.card} title={semestre}>
                                        {
                                            this.state.materias[semestre].map((item, j) => {
                                                estiloNota = parseFloat(item.NOTA) < 5
                                                    || item.RESULTADO == 'Reprovado Frequencia'
                                                    || item.RESULTADO == 'Reprovado por Nota'
                                                    ? styles.backgroundPerdeu : styles.backgroundPassou;

                                                estiloNota = item.CH == '--' && item.RESULTADO == undefined ? styles.backgroundSemResultado : estiloNota;

                                                return (
                                                    <View style={[styles.content, estiloNota]} key={j}>
                                                        <Text style={styles.subItemTitulo}>{item.CODIGO} - {item.NOME}</Text>
                                                        <Text style={styles.contentMateria}>
                                                            <Text style={styles.subItemInfoMateriaTitulo}>
                                                                CH:
                                                        </Text>
                                                            <Text style={styles.subItemInfoMateriaDesc}>
                                                                {' ' + item.CH}
                                                            </Text>
                                                        </Text>
                                                        <Text style={styles.contentMateria}>
                                                            <Text style={styles.subItemInfoMateriaTitulo}>
                                                                Natureza:
                                                        </Text>
                                                            <Text style={styles.subItemInfoMateriaDesc}>
                                                                {' ' + item.NATUREZA}
                                                            </Text>
                                                        </Text>
                                                        <Text style={styles.contentMateria}>
                                                            <Text style={styles.subItemInfoMateriaTitulo}>
                                                                Nota:
                                                        </Text>
                                                            <Text style={styles.subItemInfoMateriaDesc}>
                                                                {' ' + item.NOTA}
                                                            </Text>
                                                        </Text>
                                                        <Text style={styles.contentMateria}>
                                                            <Text style={styles.subItemInfoMateriaTitulo}>
                                                                Resultado:
                                                        </Text>
                                                            <Text style={styles.subItemInfoMateriaDesc}>
                                                                {' ' + item.RESULTADO == undefined ? '' : item.RESULTADO}
                                                            </Text>
                                                        </Text>
                                                    </View>
                                                );
                                            })
                                        }
                                    </Card>
                                );
                            })
                        }
                    </View>
                </ScrollView>
            );
        }
    }
}
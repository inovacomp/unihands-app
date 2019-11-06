import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Input } from 'react-native-elements';
import groupBy from 'json-groupby';
import styles from './style';
import helper from '../../Helper';


export default class MateriasCursadasScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Matérias Cursadas'
    });

    constructor(props) {
        super(props);
        this.state = {
            carregou: false,
            materias: [],
            'search': ''
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
                <View style={styles.background}>
                    <View>
                        <View style={{ margin: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.legendaItem, styles.backgroundPassou]}>
                                </View>
                                <Text>Matérias Passadas</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.legendaItem, styles.backgroundPerdeu]}>
                                </View>
                                <Text>Matérias Perdidas</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.legendaItem, styles.backgroundSemResultado]}>
                                </View>
                                <Text>Matérias Trancadas ou em Curso</Text>
                            </View>
                        </View>
                        <View>
                            <Input
                                placeholder='Buscar...'
                                inputStyle={{ color: 'colorGrayDark', fontSize: 14 }}
                                onChangeText={(txt) => this.setState({ search: txt.toUpperCase() })}
                            />
                        </View>
                    </View>
                    <ScrollView>
                        <View>
                            {
                                Object.keys(this.state.materias).map((semestre, i) => {

                                    filtrados = this.state.materias[semestre].filter(x => x.NOME.includes(this.state.search) || x.CODIGO.includes(this.state.search) || x.NOTA.includes(this.state.search));

                                    return (
                                        <Card key={i} containerStyle={styles.card} title={semestre}>
                                            {

                                                filtrados.map((item, j) => {
                                                    estiloNota = parseFloat(item.NOTA) < 5
                                                        || item.RESULTADO == 'Reprovado Frequencia'
                                                        || item.RESULTADO == 'Reprovado por Nota'
                                                        ? styles.backgroundPerdeu : styles.backgroundPassou;

                                                    estiloNota = item.RESULTADO == 'Trancamento' || (item.CH == '--' && item.RESULTADO == undefined) ? styles.backgroundSemResultado : estiloNota;

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
                </View>
            );
        }
    }
}
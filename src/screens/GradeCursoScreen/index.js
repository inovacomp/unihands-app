import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './style';
import { View, Text, FlatList, ActivityIndicator, Dimensions, TouchableWithoutFeedback } from 'react-native';
import helper from '../../Helper';
import groupBy from 'json-groupby';
import { Button } from 'react-native-elements';
import FooterGradeCurso from './footer/index';


export default class GradeCursoScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Grade do Curso'
    });
    constructor(props) {
        super(props);

        this.state = {
            'materiasObrigatorias': [],
            'materiasCursadas': [],
            'materiaSelecionada': [],
            'materiaSelecionadaPreReq': [],
            carregou: false,
            verEmenta: false,
            perInicial: ''
        };

    }

    async componentDidMount() {
        let materiasObrigatorias = await helper.getData('materiasObrigatorias');
        let materiasCursadas = await helper.getData('materias_cursadas');
        this.setState({
            materiasObrigatorias: groupBy(materiasObrigatorias, ["SEMESTRE"]),
            materiasCursadas: materiasCursadas,
            carregou: true
        })
    }

    //CRIA CAMPOS VAZIOS PARA PREENCHER O GRID
    //https://medium.com/@oieduardorabelo/react-native-criando-grids-com-flatlist-b4eb64e7dcd5
    // createRows = (data, columns) => {
    //     const rows = Math.floor(data.length / columns); // [A]
    //     let lastRowElements = data.length - rows * columns; // [B]
    //     let dataz = [];
    //     dataz.concat(data);
    //     while (lastRowElements !== columns) { // [C]
    //         dataz.push({ // [D]
    //             ID: helper.getRandomInt(100000,200000),
    //             CODIGO: `vazio-${lastRowElements}`,
    //             empty: true
    //         });
    //         lastRowElements += 1; // [E]
    //     }
    //     console.log(dataz);
    //     return dataz; // [F]
    // }

    renderItem = ({ item }) => {
        if (item.empty) {
            return <View style={[styles.item, styles.itemEmpty]} />;
        }

        let materiaPassada = this.state.materiasCursadas.filter(x =>
            x.CODIGO == item.CODIGO
        );
        materiaPassada = materiaPassada[materiaPassada.length - 1];

        let aprovado = styles.naoAprovado;
        if (materiaPassada != undefined) {
            aprovado = parseFloat(materiaPassada.NOTA) < 5
                || materiaPassada.RESULTADO == 'Reprovado Frequencia'
                || materiaPassada.RESULTADO == 'Reprovado por Nota'
                ? styles.naoAprovado : styles.aprovado;

            aprovado = materiaPassada.RESULTADO == 'Trancamento' || (materiaPassada.CH == '--' && materiaPassada.RESULTADO == undefined) ? styles.naoAprovado : aprovado;

        }
        if (this.state.materiaSelecionadaPreReq.includes(item.CODIGO)) {
            aprovado = styles.preReq;
        }
        if (this.state.materiaSelecionada == item.CODIGO) {
            aprovado = styles.matSelecionada;
        }

        return (
            <View key={item.CODIGO} style={[styles.item, styles.shadow, aprovado]}>
                <TouchableWithoutFeedback onPress={x => this.selectedItem(item.CODIGO, item.PRE_REQ, item.PER_INICIAL)}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.itemTitleText}>{item.CODIGO}</Text>
                        <Text style={styles.itemDescText}>{item.NOME}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    selectedItem = (codigo, pre_req, per_inicial) => {
        if (pre_req == '--') {
            pre_req = [];
        }
        this.setState({
            materiaSelecionadaPreReq: pre_req,
            materiaSelecionada: codigo,
            perInicial: per_inicial,
            verEmenta: true
        })
    }

    render() {
        if (!this.state.carregou) {
            return (<View style={styles.loading}><ActivityIndicator /></View>)
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView style={styles.background}>
                        <View style={{ padding: 10 }}>

                            {
                                Object.keys(this.state.materiasObrigatorias).map((semestre, i) => {

                                    return <View key={i + 1000}>
                                        <Text style={styles.semestre}>
                                            {semestre}
                                        </Text>
                                        <FlatList
                                            data={this.state.materiasObrigatorias[semestre]}
                                            keyExtractor={item => item.ID}
                                            numColumns={3}
                                            extraData={this.state}
                                            renderItem={this.renderItem}
                                        />
                                    </View>
                                })
                            }
                        </View>
                    </ScrollView>
                    {this.state.verEmenta ? <FooterGradeCurso setMateria={this.state.materiaSelecionada} setPeriodoInicial={this.state.perInicial} /> : <View></View>}

                </View>
            )
        }
    }
}
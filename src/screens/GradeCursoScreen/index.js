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
            'materiaSelecionadaPosReq': [],
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

    //renderiza cada semestre ou seja a lista de materias de cada semestre
    renderItem = ({ item }) => {
        if (item.empty) {
            return <View style={[styles.item, styles.itemEmpty]} />;
        }

        //pega a matéria já cursada comparando com a grade
        let materia = this.state.materiasCursadas.filter(x =>
            x.CODIGO == item.CODIGO
        );

        //pega o ultimo resultado da matéria que no caso seria o passado
        let materiaPassada = materia[materia.length - 1];

        let corMateria = styles.naoAprovado;
        if (materiaPassada != undefined) {
            corMateria = parseFloat(materiaPassada.NOTA) < 5
                || materiaPassada.RESULTADO == 'Reprovado Frequencia'
                || materiaPassada.RESULTADO == 'Reprovado por Nota'
                ? styles.naoAprovado : styles.aprovado;

            corMateria = materiaPassada.RESULTADO == 'Trancamento' || (materiaPassada.CH == '--' && materiaPassada.RESULTADO == undefined) ? styles.naoAprovado : corMateria;

        }

        //verifica se a materia da lista é pre-requisito da materia que foi clicada
        if (this.state.materiaSelecionadaPreReq.includes(item.CODIGO)) {
            corMateria = styles.preReq;
        }
        //verifica se a materia da lista abre alguma materia
        else if (this.state.materiaSelecionadaPosReq.includes(item.CODIGO)) {
            corMateria = styles.posReq;
        }
        //verifica se a materia da lista é a materia clicada
        else if (this.state.materiaSelecionada == item.CODIGO) {
            corMateria = styles.matSelecionada;
        }

        return (
            <View key={item.CODIGO} style={[styles.item, styles.shadow, corMateria]}>
                <TouchableWithoutFeedback onPress={x => this.selectedItem(item.CODIGO, item.PRE_REQ, item.PER_INICIAL)}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.itemTitleText}>{item.CODIGO}</Text>
                        <Text style={styles.itemDescText}>{item.NOME}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    //materia selecionada com o click
    selectedItem = (codigo, pre_req, per_inicial) => {
        if (pre_req == '--') {
            pre_req = [];
        }

        let pos = [];

        //monta a lista de materias que a materia selecionada abre
        Object.keys(this.state.materiasObrigatorias).map((semestre, i) => {
            this.state.materiasObrigatorias[semestre].map(x => {
                if (x.PRE_REQ.includes(codigo)) {
                    pos.push(x.CODIGO);
                }
            });
        })

        this.setState({
            materiaSelecionadaPreReq: pre_req,
            materiaSelecionadaPosReq: pos,
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
                <View style={styles.background}>
                    <View>
                        <View style={styles.contentLegenda}>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.legendaItem, styles.naoAprovado]}>
                                </View>
                                <Text style={styles.txtLegenda}>Matéria Não Passada</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.legendaItem, styles.aprovado]}>
                                </View>
                                <Text style={styles.txtLegenda}>Matéria Passada</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.legendaItem, styles.matSelecionada]}>
                                </View>
                                <Text style={styles.txtLegenda}>Matéria Selecionada</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.legendaItem, styles.preReq]}>
                                </View>
                                <Text style={styles.txtLegenda}>Pré-requisito</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.legendaItem, styles.posReq]}>
                                </View>
                                <Text style={styles.txtLegenda}>Matéria Liberada</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView>
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
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './style';
import { View, Text, FlatList,ActivityIndicator } from 'react-native';
import helper from '../../Helper';
import groupBy from 'json-groupby';


export default class GradeCursoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'materiasObrigatorias': [],
            'materiasCursadas': [],
            carregou: false
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
    createRows = (data, columns) => {
        const rows = Math.floor(data.length / columns); // [A]
        let lastRowElements = data.length - rows * columns; // [B]
        while (lastRowElements !== columns) { // [C]
            data.push({ // [D]
                ID: `vazio-${lastRowElements}`,
                CODIGO: `vazio-${lastRowElements}`,
                empty: true
            });
            lastRowElements += 1; // [E]
        }
        return data; // [F]
    }

    render() {
        if (!this.state.carregou) {
            return (<View style={styles.loading}><ActivityIndicator /></View>)
        } else {
            return (
                <ScrollView style={styles.background}>
                    <View style={{ padding: 10 }}>
                        <Text style={styles.subTitle}>Grade do Curso</Text>
    
                        {
                            Object.keys(this.state.materiasObrigatorias).map((semestre, i) => {
    
                                return <View>
                                    <Text style={styles.semestre}>
                                        {semestre}
                                    </Text>
                                    <FlatList
                                        data={this.createRows(this.state.materiasObrigatorias[semestre], 3)}
                                        keyExtractor={item => item.ID}
                                        numColumns={3}
                                        renderItem={({ item }) => {
                                            if (item.empty) {
                                                return <View style={[styles.item, styles.itemEmpty]} />;
                                            }
    
                                            let materiaPassada = this.state.materiasCursadas.filter(x =>
                                                x.CODIGO == item.CODIGO
                                            );
                                            materiaPassada = materiaPassada[materiaPassada.length-1];
    
                                            let aprovado = false;
                                            if (materiaPassada != undefined) {
                                                aprovado = parseFloat(materiaPassada.NOTA) < 5
                                                    || materiaPassada.RESULTADO == 'Reprovado Frequencia'
                                                    || materiaPassada.RESULTADO == 'Reprovado por Nota'
                                                    ? false : true;
    
                                                aprovado = materiaPassada.RESULTADO == 'Trancamento' || (materiaPassada.CH == '--' && materiaPassada.RESULTADO == undefined) ? false : aprovado;
    
                                            }
    
                                            return (
                                                <View style={[styles.item, styles.shadow, aprovado ? styles.aprovado : styles.naoAprovado]}>
                                                    <Text style={styles.itemText}>{item.CODIGO}</Text>
                                                    <Text style={styles.itemText}>{item.NOME}</Text>
                                                </View>
                                            );
                                        }}
                                    />
                                </View>
                            })
                        }
    
    
    
    
                    </View>
                </ScrollView>
            )
        }
    }
}
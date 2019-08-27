import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity,ActivityIndicator } from 'react-native'
import styles from './style'
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import helper from '../../Helper';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome :'',
            matricula :'',
            curso :'',
            cr :'',
            materias :'',
            tableHead:'',
            tableData:'',
            carregou : false
        };
    }

    async componentDidMount() {
        let nome = await helper.getData('nome');
        let matricula = await helper.getData('matricula');
        let curso = await helper.getData('curso');
        let cr = await helper.getData('cr');
        let materiasComprovante = await helper.getData('materias_comprovante');
        let materiasHorarios = await helper.getData('materias_horarios');

        let materiasKey = [];
        let materias = [];
        materiasComprovante.forEach((mat, index) => {
            if (!materiasKey.includes(mat.CODIGOMATERIA)) {
                materiasKey.push(mat.CODIGOMATERIA);
                materias.push(mat);
            }
        });

        this.setState({
            nome : nome,
            matricula : matricula,
            curso : curso,
            cr : cr,
            materias : materias,
            'materiasComprovante' : materiasComprovante,
            tableHead: ['', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            tableData: materiasHorarios,
            carregou: true
        })
    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                containerStyle={styles.itemList}
                title={item.CODIGOMATERIA}
                subtitle={item.NOMEMATERIA}
                titleStyle={styles.textList}
                subtitleStyle={styles.textList}
                rightIcon={{ name: "arrow-forward" }}
                onPress={() => this.clickDetalhe(item)} />
        )
    }

    clickDetalhe = (item) => {

        let subDadosMaterias = [];
        this.state.materiasComprovante.map((x) => {
            if (x.CODIGOMATERIA == item.CODIGOMATERIA) {
                let object = {
                    TURMA: x.TURMA,
                    DIA: x.DIA,
                    HORARIO: x.HORARIO,
                    LOCAL: x.LOCAL,
                    DOCENTE: x.DOCENTE
                }
                subDadosMaterias.push(object);
            }
        })

        this.props.navigation.navigate('HomeDetalheScreen', {
            CODIGOMATERIA: item.CODIGOMATERIA,
            NOMEMATERIA: item.NOMEMATERIA,
            CH: item.CH,
            subDadosMaterias: JSON.stringify(subDadosMaterias)
        })
    }

    render() {

        if(!this.state.carregou){
            return( <View style={styles.loading}><ActivityIndicator /></View>)
        }else{
            return (
                <ScrollView>
                    <View style={styles.background}>
                        <View style={styles.boasvindas}>
                            <Text style={styles.boasvindasTxt}>Olá, {this.state.nome}</Text>
                        </View>
                        <View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Matrícula:
                                </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.matricula}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Curso:
                                </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.curso}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.infoPessoal}>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Coeficiente de Rendimento:
                                </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.cr}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.subTitle}>Grade do Semestre</Text>
                        <View style={styles.content}>
                            <Table borderStyle={{ borderColor: '#009688' }} style={styles.table}>
                                <Row textStyle={styles.rowsTable} data={this.state.tableHead} />
                                <Rows textStyle={styles.rowsTable} data={this.state.tableData} />
                            </Table>
                        </View>
    
                        <View>
                            <Text style={styles.subTitle}>Matérias do Semestre</Text>
                            <FlatList
                                data={this.state.materias}
                                keyExtractor={item => item.ID.toString()}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </View>
                </ScrollView>
            )
        }

    }
}
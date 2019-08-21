import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import styles from './style'
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cpf: null,
            senha: null,
            dados: '',
            materias: ''
        };
    }

    componentDidMount() {
        const cpf = this.props.navigation.getParam('cpf')
        const senha = this.props.navigation.getParam('senha')
        const dados = this.props.navigation.getParam('dados')

        let materiasKey = [];
        let materias = [];
        dados.MATERIAS_COMPROVANTE.forEach((mat, index) => {
            if (!materiasKey.includes(mat.CODIGOMATERIA)) {
                materiasKey.push(mat.CODIGOMATERIA);
                materias.push(mat);
            }
        });

        this.setState({
            cpf: cpf,
            senha: senha,
            dados: dados,
            materias: materias,
            tableHead: ['', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            tableData: dados.MATERIAS_HORARIOS
        })
    }


    sendSubmit = () => {
        this.props.navigation.navigate('MateriasPassadas', {
            'cpf': this.state.cpf,
            'senha': this.state.senha
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
                rightIcon={{name:"arrow-forward"}}
                onPress={() => this.clickDetalhe(item)} />
        )
    }

    clickDetalhe = (item) => {

        let subDadosMaterias = [];
        this.state.dados.MATERIAS_COMPROVANTE.map((x) => {
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
        return (
            <ScrollView>
                <View style={styles.background}>
                    <View style={styles.boasvindas}>
                        <Text style={styles.boasvindasTxt}>Olá, {this.state.dados.NOME}</Text>
                    </View>
                    <View>
                        <View style={styles.infoPessoal}>
                            <Text>
                                <Text style={styles.subItemInfoPessoalTitulo}>
                                    Matrícula:
                            </Text>
                                <Text style={styles.subItemInfoPessoalDesc}>
                                    {' ' + this.state.dados.MATRICULA}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.infoPessoal}>
                            <Text>
                                <Text style={styles.subItemInfoPessoalTitulo}>
                                    Curso:
                            </Text>
                                <Text style={styles.subItemInfoPessoalDesc}>
                                    {' ' + this.state.dados.CURSO}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.infoPessoal}>
                            <Text>
                                <Text style={styles.subItemInfoPessoalTitulo}>
                                    Coeficiente de Rendimento:
                            </Text>
                                <Text style={styles.subItemInfoPessoalDesc}>
                                    {' ' + this.state.dados.CR}
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
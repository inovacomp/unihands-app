import React, { Component } from 'react'
import { View, Text,FlatList, TouchableOpacity } from 'react-native'
import styles from './style'
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Comprovante',
    };

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
        dados.MATERIAS_COMPROVANTE.forEach((mat,index) => {
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
          <TouchableOpacity onPress={() => this.clickDetalhe(item)}>
            <View style={styles.itemList}>
                <Text style={styles.textList}>{item.CODIGOMATERIA} - {item.NOMEMATERIA} - {item.DIA}</Text>
            </View>
          </TouchableOpacity>
        )
    }

    clickDetalhe = (item) => {

        let searchMaterias = [];
        this.state.dados.MATERIAS_COMPROVANTE.map((x) => {
            if(x.CODIGOMATERIA == item.CODIGOMATERIA){
                searchMaterias.push(x);
            }
        })

        this.props.navigation.navigate('HomeDetalheScreen',{
            'dados': searchMaterias
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
                    <Table borderStyle={{borderColor: '#009688'}} style={styles.table}>
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
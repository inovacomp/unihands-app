import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native'
import styles from './style'
import { Table, Row, Rows } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import helper from '../../Helper';
import { colorGreen, colorGray } from '../../Colors';
import axios from 'axios';
import { NavigationActions, StackActions } from 'react-navigation';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            matricula: '',
            curso: '',
            cr: '',
            materias: '',
            tableHead: '',
            tableData: '',
            carregou: false,
            dataAtt: ''
        };
    }

    async componentDidMount() {
        let nome = await helper.getData('nome');
        let matricula = await helper.getData('matricula');
        let curso = await helper.getData('curso');
        let cr = await helper.getData('cr');
        let materiasComprovante = await helper.getData('materias_comprovante');
        let materiasHorarios = await helper.getData('materias_horarios');
        let dataAtt = await helper.getData('dataAtt');

        let materiasKey = [];
        let materias = [];
        materiasComprovante.forEach((mat, index) => {
            if (!materiasKey.includes(mat.CODIGOMATERIA)) {
                materiasKey.push(mat.CODIGOMATERIA);
                materias.push(mat);
            }
        });

        this.setState({
            nome: nome,
            matricula: matricula,
            curso: curso,
            cr: cr,
            materias: materias,
            dataAtt: dataAtt,
            materiasComprovante: materiasComprovante,
            tableHead: ['', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            tableData: materiasHorarios,
            carregou: true
        });
        helper.eventoAnalytics('Tela Inicial');
    }

    resetStack = () => {
        this.props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'HomeScreen'
                    }),
                ],
            }))
    }

    refresh = async () => {
        this.setState({
            carregou: !this.state.carregou
        });
        let dados = {
            cpf: await helper.getData('cpf'),
            senha: await helper.getData('senha')
        }
        const httpClient = axios.create();
        httpClient.defaults.timeout = 15000;

        httpClient.post('https://siacapi.ayrtonsilas.com.br/api/get-dados', dados)
            .then(async (response) => {
                if (response.data.ERRO_LOGIN) {
                    alert('Não foi possível atualizar');
                } else {
                    subTotalMateriasCursadas = response.data.COMPONENTES_CURSADOS.MATERIAS_CURSADAS.pop();
                    subTotalChComplementar = response.data.COMPONENTES_CURSADOS.CARGA_HORARIA_COMPLEMENTAR.pop();

                    await helper.setData('dataAtt', helper.getCurrentDate());
                    await helper.setData('cpf', dados.cpf);
                    await helper.setData('senha', dados.senha);
                    await helper.setData('nome', response.data.COMPROVANTE.NOME);
                    await helper.setData('matricula', response.data.COMPROVANTE.MATRICULA);
                    await helper.setData('curso', response.data.COMPROVANTE.CURSO);
                    await helper.setData('cr', response.data.COMPROVANTE.CR);
                    await helper.setData('materias_comprovante', response.data.COMPROVANTE.MATERIAS_COMPROVANTE);
                    await helper.setData('materias_horarios', response.data.COMPROVANTE.MATERIAS_HORARIOS);
                    await helper.setData('materias_cursadas', response.data.COMPONENTES_CURSADOS.MATERIAS_CURSADAS);
                    await helper.setData('ch_complementar', response.data.COMPONENTES_CURSADOS.CARGA_HORARIA_COMPLEMENTAR);
                    await helper.setData('materiasObrigatorias', response.data.MATERIAS_OBRIGATORIAS.MATERIAS_OBRIGATORIAS);
                    await helper.setData('COMPROVANTE_PDF', response.data.COMPROVANTE_PDF);
                    await helper.setData('RESUMO_CURSO', response.data.RESUMO_CURSO);
                    // this.setState({
                    //     carregou: !this.state.carregou
                    // });
                    this.resetStack();
                }
            }).catch(async (error) => {
                alert(error);

                this.setState({
                    carregou: !this.state.carregou
                });
            })
    }

    //renderiza cada item da lista de matérias do semestre
    renderItem = ({ item }) => {
        return (
            <ListItem
                containerStyle={styles.itemList}
                title={item.CODIGOMATERIA}
                subtitle={item.NOMEMATERIA}
                titleStyle={styles.textList}
                subtitleStyle={styles.textList}
                rightIcon={{ name: "arrow-forward" }}
                onPress={() => this.clickDetalhe(item)}
                underlayColor={colorGray}
            />
        )
    }

    //função para ser executada ao clicar em um item da lista de materias do semestre
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

        if (!this.state.carregou) {
            return (<View style={styles.loading}><ActivityIndicator /></View>)
        } else {
            return (
                <ScrollView>
                    <View style={styles.background}>
                        <View style={styles.boasvindas}>
                            <Text style={styles.boasvindasTxt}>Olá, {this.state.nome}</Text>
                        </View>
                        <View>
                            <View style={styles.infoPessoal}>
                                <Button title={'Atualizar'} onPress={this.refresh} style={styles.atualizar}></Button>
                                <Text>
                                    <Text style={styles.subItemInfoPessoalTitulo}>
                                        Ultima Atualização:
                                    </Text>
                                    <Text style={styles.subItemInfoPessoalDesc}>
                                        {' ' + this.state.dataAtt}
                                    </Text>
                                </Text>
                            </View>
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
                            <Table borderStyle={{ borderColor: colorGreen }} style={styles.table}>
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
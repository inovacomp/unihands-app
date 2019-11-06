import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { Divider } from 'react-native-elements';
import styles from './style';
import { colorGreen } from '../../Colors';
import { ScrollView } from 'react-native-gesture-handler';
import FooterGradeCurso from '../GradeCursoScreen/footer';
import helper from '../../Helper';

export default class HomeDetalheScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Detalhe',
        headerLeft: <HeaderBackButton tintColor="white" onPress={() => navigation.goBack(null)} />,
    });
    constructor(props) {
        super(props);

        this.state = {
            subDadosMaterias: [],
            CODIGOMATERIA: '',
            NOMEMATERIA: '',
            CH: '',
            perInicial: '',
            carregou: false
        }
    }
    async componentDidMount() {
        let materiasObrigatorias = await helper.getData('materiasObrigatorias');
        const subDadosMaterias = this.props.navigation.getParam('subDadosMaterias')
        const cod = this.props.navigation.getParam('CODIGOMATERIA');
        const nome = this.props.navigation.getParam('NOMEMATERIA');
        const ch = this.props.navigation.getParam('CH');

        let infoMateria = materiasObrigatorias.filter(x => x.CODIGO == cod);
        let perInicial = '';
        if(infoMateria.length){
            perInicial = infoMateria[0].PER_INICIAL;
        }
        this.setState({
            subDadosMaterias: JSON.parse(subDadosMaterias),
            CODIGOMATERIA: cod,
            NOMEMATERIA: nome,
            CH: ch,
            perInicial: perInicial,
            carregou: true
        })
    }

    //gera a lista de informações de cada dia de aula da matéria
    getContent() {
        return this.state.subDadosMaterias.map((x, index) => {
            return (
                <View>
                    <Text style={styles.InfoMateria}>
                        <Text style={styles.subItemInfoMateriaTitulo}>
                            Turma:
                        </Text>
                        <Text style={styles.subItemInfoMateriaDesc}>
                            {' ' + x.TURMA}
                        </Text>
                    </Text>
                    <Text style={styles.InfoMateria}>
                        <Text style={styles.subItemInfoMateriaTitulo}>
                            Dia:
                        </Text>
                        <Text style={styles.subItemInfoMateriaDesc}>
                            {' ' + x.DIA}
                        </Text>
                    </Text>
                    <Text style={styles.InfoMateria}>
                        <Text style={styles.subItemInfoMateriaTitulo}>
                            Horário:
                        </Text>
                        <Text style={styles.subItemInfoMateriaDesc}>
                            {' ' + x.HORARIO}
                        </Text>
                    </Text>
                    <Text style={styles.InfoMateria}>
                        <Text style={styles.subItemInfoMateriaTitulo}>
                            Local:
                        </Text>
                        <Text style={styles.subItemInfoMateriaDesc}>
                            {' ' + x.LOCAL}
                        </Text>
                    </Text>
                    <Text style={styles.InfoMateria}>
                        <Text style={styles.subItemInfoMateriaTitulo}>
                            Docente:
                        </Text>
                        <Text style={styles.subItemInfoMateriaDesc}>
                            {' ' + x.DOCENTE}
                        </Text>
                    </Text>
                    {index + 1 != this.state.subDadosMaterias.length ? <Divider style={{ height: 1, backgroundColor: colorGreen, marginHorizontal: 10, marginVertical: 5 }} /> : <Text></Text>}
                </View>
            );

        });
    }

    render() {
        if (!this.state.carregou) {
            return (<View style={styles.loading}><ActivityIndicator /></View>)
        } else {
            return (
                <View style={styles.background}>
                    <ScrollView>
                        <View>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={styles.cabecalho}>
                                    <Text style={styles.cabecalhoTitulo}>
                                        Código:
                            </Text>
                                    <Text style={styles.cabecalhoDesc}>
                                        {' ' + this.state.CODIGOMATERIA}
                                    </Text>
                                </Text>
                                <Text style={styles.cabecalho}>
                                    <Text style={styles.cabecalhoTitulo}>
                                        Nome:
                            </Text>
                                    <Text style={styles.cabecalhoDesc}>
                                        {' ' + this.state.NOMEMATERIA}
                                    </Text>
                                </Text>
                                <Text style={styles.cabecalho}>
                                    <Text style={styles.cabecalhoTitulo}>
                                        CH:
                            </Text>
                                    <Text style={styles.cabecalhoDesc}>
                                        {' ' + this.state.CH}
                                    </Text>
                                </Text>
                            </View>
                            {this.getContent()}
    
                        </View>
                    </ScrollView>
                    {
                        this.state.perInicial != '' ? <FooterGradeCurso setMateria={this.state.CODIGOMATERIA} setPeriodoInicial={this.state.perInicial} /> : <View></View>
                    }
                    
                </View>
            )
        }
    }
}


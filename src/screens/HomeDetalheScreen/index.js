import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { HeaderBackButton } from 'react-navigation';
import { Divider } from 'react-native-elements'
import styles from './style'
import {colorGreen} from '../../Colors'

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
            CH: ''
        }
    }
    componentDidMount() {
        const subDadosMaterias = this.props.navigation.getParam('subDadosMaterias')
        const cod = this.props.navigation.getParam('CODIGOMATERIA');
        const nome = this.props.navigation.getParam('NOMEMATERIA');
        const ch = this.props.navigation.getParam('CH');

        this.setState({
            subDadosMaterias: JSON.parse(subDadosMaterias),
            CODIGOMATERIA: cod,
            NOMEMATERIA: nome,
            CH: ch
        })
    }

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
                    {index + 1 != this.state.subDadosMaterias.length ? <Divider style={{ height: 1, backgroundColor: colorGreen, marginHorizontal: 10,marginVertical:5 }} /> : <Text></Text>}
                </View>
            );

        });
    }

    render() {

        return (
            <View style={styles.background}>
                <View style={{marginBottom:5}}>
                    <Text style={styles.cabecalho}>
                        <Text style={styles.cabecalhoTitulo}>
                            Código:
                        </Text>
                        <Text style={styles.cabecalhoDesc}>
                            {' '+this.state.CODIGOMATERIA}
                        </Text>
                    </Text>
                    <Text style={styles.cabecalho}>
                        <Text style={styles.cabecalhoTitulo}>
                            Nome:
                        </Text>
                        <Text style={styles.cabecalhoDesc}>
                            {' '+this.state.NOMEMATERIA}
                        </Text>
                    </Text>
                    <Text style={styles.cabecalho}>
                        <Text style={styles.cabecalhoTitulo}>
                            CH:
                        </Text>
                        <Text style={styles.cabecalhoDesc}>
                            {' '+this.state.CH}
                        </Text>
                    </Text>
                </View>
                {this.getContent()}

            </View>
        )
    }
}


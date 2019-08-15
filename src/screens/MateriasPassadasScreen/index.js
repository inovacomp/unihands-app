import React,{Component} from 'react'
import {View,Text,FlatList,TouchableOpacity,ActivityIndicator} from 'react-native'
import axios from 'axios';

import styles from './style'

export default class MateriasPassadasScreen extends Component{

    constructor(props){
        super(props)

        this.state = {
            isLoading: false,
            cpf: '',
            senha: '',
            materias: []
        }
    }

    async componentDidMount(){
        const cpf = this.props.navigation.getParam('cpf')
        const senha = this.props.navigation.getParam('senha')
        this.setState({
            cpf: cpf,
            senha: senha
        })

        await axios.get('https://ayrtonsilas.com.br/conexao-siac/get-materias-passadas.php?cpf='+cpf+'&senha='+senha)
        .then((response) => {
            this.setState({
                materias: response.data
            })
        })
    }

    getMateria = (item) => {
        this.props.navigation.navigate('MateriaSelecionada',{
            'item': item
        })
    }
    
    renderItem = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => this.getMateria(item)}>
            <View style={styles.item}>
                <Text style={styles.text}>{item.codigo + ' ' + item.nomemateria} {item.res == '--' ? '(Cursando)' : null}</Text>
            </View>
          </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.materias}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
    
}
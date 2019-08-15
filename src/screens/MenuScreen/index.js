import React,{Component} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import styles from './style'

export default class MenuScreen extends Component{
    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props);

        this.state = {
            cpf: null,
            senha: null,
            nome: '',
            materias:''
        };
    }

    componentDidMount() {
        const cpf = this.props.navigation.getParam('cpf')
        const senha = this.props.navigation.getParam('senha')
        const nome = this.props.navigation.getParam('nome')

        this.setState({
            cpf: cpf,
            senha: senha,
            nome: nome,
        })
    }

    sendSubmit = () => {
        this.props.navigation.navigate('MateriasPassadas',{
            'cpf': this.state.cpf,
            'senha': this.state.senha
        })  
    }

    render(){
        return(
            <View style={styles.background}>
                <View style={styles.section01}>
                    <Text style={styles.boasvindas}>
                    {this.state.nome.replace('"','').replace('"','')}
                    </Text>
                </View>
                <View style={styles.btns}>
                    <TouchableOpacity onPress={this.sendSubmit}>
                        <View>
                            <Text style={styles.btn}>Componentes Currículares Cursados</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <Text style={styles.btn}>Coeficiente de Rendimento</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View>
                            <Text style={styles.btn}>Comprovante de Matrícula</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                
            </View>
        )
    }
}
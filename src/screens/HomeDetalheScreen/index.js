import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class HomeDetalheScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dados: null
        }
    }
    componentDidMount() {
        const dados = this.props.navigation.getParam('dados')

        this.setState({
            dados: dados
        })
    }

    render() {
        return (
            <View>
                
                <View>
                    <Text>
                        <Text>
                            Código:
                    </Text>
                        <Text>
                            {JSON.stringify(this.state.dados)}
                        </Text>
                    </Text>
                    <Text>
                        <Text>
                            Nome:
                     </Text>
                        <Text>
                            ####
                    </Text>
                    </Text>
                    <Text>
                        <Text>
                            CH:
                    </Text>
                        <Text>
                            ####
                    </Text>
                    </Text>
                    <Text>
                        <Text>
                            Turma:
                    </Text>
                        <Text>
                            ####
                    </Text>
                    </Text>
                    <Text>
                        <Text>
                            Dia:
                    </Text>
                        <Text>
                            ####
                    </Text>
                    </Text>
                    <Text>
                        <Text>
                            Horário:
                    </Text>
                        <Text>
                            ####
                    </Text>
                    </Text>
                    <Text>
                        <Text>
                            Local:
                    </Text>
                        <Text>
                            ####
                    </Text>
                    </Text>
                    <Text>
                        <Text>
                            Docente:
                    </Text>
                        <Text>
                            ####
                    </Text>
                    </Text>
                </View>
            </View>
        )
    }
}


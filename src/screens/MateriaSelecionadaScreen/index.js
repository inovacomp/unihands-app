import React,{Component} from 'react'
import {View,Text,FlatList} from 'react-native'

import styles from './style'

export default class MateriaSelecionadaScreen extends Component{

    render(){
        return(
            <View>
                <Text>
                Código: {this.props.navigation.getParam('item') ? this.props.navigation.getParam('item').codigo : null}
                </Text>
                <Text>
                Nome da Matéria: {this.props.navigation.getParam('item') ? this.props.navigation.getParam('item').nomemateria : null}
                </Text>
                <Text>
                CH: {this.props.navigation.getParam('item') ? this.props.navigation.getParam('item').ch : null}
                </Text>
                <Text>
                Nota: {this.props.navigation.getParam('item') ? this.props.navigation.getParam('item').nota : null}
                </Text>
                <Text>
                PCH: {this.props.navigation.getParam('item') ? this.props.navigation.getParam('item').pch : null}
                </Text>
                <Text>
                Res: {this.props.navigation.getParam('item') ? this.props.navigation.getParam('item').res : null}
                </Text>

            </View>
            
        )
    }
}
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './style';
import helper from '../../Helper';
import { ScrollView } from 'react-native-gesture-handler';
import {colorGray} from '../../Colors';
import {ListItem} from 'react-native-elements';

export default class ChComplementarScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'CH Complementar'
    });

    constructor(props) {
        super(props);

        this.state = {
            cargaHoraria: [],
            carregou: false
        }
    }

    async componentDidMount() {
        let chComplementar = await helper.getData('ch_complementar');

        this.setState({
            cargaHoraria: chComplementar,
            carregou: true
        });

        helper.eventoAnalytics('CH Complementar');
    }

    //renderiza cada item da lista de carga horarias
    renderItem = ({ item }) => {
        return (
            <ListItem
                containerStyle={styles.itemList}
                title={item.MODALIDADE}
                subtitle={`${item.CH}h`}
                titleStyle={styles.textList}
                subtitleStyle={styles.textList}
                underlayColor={colorGray}
            />
        )
    }

    render() {
        if (!this.state.carregou) {
            return (<View style={styles.loading}><ActivityIndicator /></View>)
        } else {
            if(this.state.cargaHoraria)
                return (
                    <ScrollView style={{flex:1,backgroundColor: colorGray}}>
                        <View style={styles.background}>
                            <FlatList
                                data={this.state.cargaHoraria}
                                keyExtractor={item => item.ID.toString()}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </ScrollView>
                );
            else
                return (<View><Text>Você não possui carga horária complementar.</Text></View>);
        }
    }
}
import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from './style';
import helper from '../../Helper';
import { ScrollView } from 'react-native-gesture-handler';
import {colorGray} from '../../Colors';
import {ListItem} from 'react-native-elements';

export default class ChComplementarScreen extends Component {
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
    }
    renderItem = ({ item }) => {
        return (
            <ListItem
                containerStyle={styles.itemList}
                title={item.MODALIDADE}
                subtitle={item.CH}
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
            return (
                <ScrollView style={{flex:1,backgroundColor: colorGray}}>
                    <View style={styles.background}>
                        <View>
                            <Text style={styles.subTitle}>Carga Horária Complementar</Text>
                        </View>
                        <FlatList
                            data={this.state.cargaHoraria}
                            keyExtractor={item => item.ID.toString()}
                            renderItem={this.renderItem}
                        />
                    </View>
                </ScrollView>
            );
        }
    }
}
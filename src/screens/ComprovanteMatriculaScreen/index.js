import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import helper from '../../Helper';
import * as colors from '../../Colors';

import Pdf from 'react-native-pdf';

export default class ComprovanteMatriculaScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Comprovante de Matrícula'
    });
    constructor(props) {
        super(props);

        this.state = {
            carregou: false,
            pdf: '',
        };
    }
    async componentDidMount() {
        pdf = await helper.getData('COMPROVANTE_PDF');
        this.setState({
            pdf: pdf,
            carregou: true
        });
    }

    render() {
        if (!this.state.carregou) {
            return (<View style={styles.loading}><ActivityIndicator /></View>)
        } else {
            //monta o corpo do relatório com base64
            const source = { uri: "data:application/pdf;base64," + this.state.pdf };
            return (
                <View style={styles.container}>
                    <Pdf
                        source={source}
                        style={styles.pdf} />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loading:{
        flex:1,
        flexDirection:'column',
        backgroundColor: colors.colorGray,
        justifyContent:'center'
    },
});
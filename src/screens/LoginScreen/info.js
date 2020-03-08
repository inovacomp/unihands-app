import React, { Component } from 'react'
import { View, Text, Clipboard } from 'react-native'

export default class InfoLogin extends Component {

    render() {
        return (
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center', padding: 10, color: '#000' }}>COMO USAR?</Text>
                <Text style={{ fontSize: 14, textAlign: 'justify', padding: 10 }}>- Para ter acesso ao aplicativo acesse utilizando seu CPF e sua SENHA do SIAC UFBA.</Text>
                <Text onPress={() => { Clipboard.setString('https://siacapi.ayrtonsilas.com.br/api/apk'); alert('Link Copiado!') }} style={{ fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline', textAlign: 'justify', padding: 10 }}>- Link para download, clique para copiar: https://siacapi.ayrtonsilas.com.br/api/apk </Text>

                <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center', padding: 10 }}>Informações Sobre o Aplicativo</Text>
                <Text style={{ fontSize: 14, textAlign: 'justify', padding: 10 }}>- Esse aplicativo foi desenvolvido para um projeto de conclusão do curso de Sistemas de Informação da UFBA.</Text>
                <Text style={{ fontSize: 14, textAlign: 'justify', padding: 10 }}>- Criado por Ayrton Silas Silva Guimarães.</Text>
                <Text style={{ fontSize: 14, textAlign: 'justify', padding: 10 }}>- Dúvidas, Sugestões, Bugs, etc. Entre em contato através do e-mail: ayrtonsilasguimaraes@gmail.com</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center', padding: 10, color: '#e74c3c' }}>IMPORTANTE!</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'justify', padding: 10 }}>- Esse aplicativo não faz uso, nem armazena nenhum dado do usuário em servidores ou banco de dados.</Text>

            </View>
        )
    }
}
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Mixpanel from 'react-native-mixpanel';

module.exports = {

    async setData(key, value) {
        try {
            await AsyncStorage.setItem('@' + key, JSON.stringify(value));
        } catch (e) {
            // saving error
        }
    },

    async getData(key) {
        try {
            const value = await AsyncStorage.getItem('@' + key);
            if (value !== null) {
                return JSON.parse(value);
            }
            return ''
        } catch (e) {
            // error reading value
        }
    },

    async CheckConnectivity() {
        let retorno = {};
        await NetInfo.fetch().then(state => {
            retorno = { tipo: state.type, conectado: state.isConnected };
        });
        return retorno;
    },

    getCurrentDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        today = dd + '/' + mm + '/' + yyyy + ' ' + h + ':' + m + ':' + s;

        return today;
    },
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    eventoAnalytics(evento) {
        //Init Mixpanel SDK with your project token
        Mixpanel.sharedInstanceWithToken("f90223d3f07f93da87cb27d6946dc732").then(() => {
            //Send and event name with no properties
            Mixpanel.track(evento);
            //Track event with properties
            // x.trackWithProperties('Click Button', { button_type: 'yellow button', button_text: 'magic button' });
        }).catch(function (e) {
            
        });
    },
    saoIguais(objetoA, objetoB) {

        //Busca as chaves do objetoA e objetoB
        //utilizando o "let" o escopo da vari??vel ?? limitado para o bloco.
        //Object.keys retornar?? um array com todas as chaves do objeto.
        let aChaves = Object.keys(objetoA),
            bChaves = Object.keys(objetoB);
    
        //Compara os tamanhos, se forem diferentes retorna falso pois 
        //o numero de propriedades ?? diferente, logo os objetos s??o diferentes
        if (aChaves.length != bChaves.length) {
            return false;
        }
    
        //Verifico se existe algum elemento com valor diferente nos objetos.
        //o array.some executa uma fun????o(passada por par??metro) para cada valor
        //do array. Essa fun????o deve executar um teste, se para algum dos valores
        //o teste ?? verdadeiro, a execu????o ?? interrompida e true ?? retornado.
        //Do contr??rio, se o teste nunca for verdadeiro ele retornar?? false 
        //ap??s executar o teste para todos valores do array.
        //Estou basicamente verficando se existe diferen??a entre dois valores do objeto.
    
        let saoDiferentes = aChaves.some((chave) => {
            return objetoA[chave] !== objetoB[chave];
        });
    
        //como saoDiferentes cont??m true caso os objetos sejam diferentes eu 
        //simplesmente nego esse valor para retornar que os objetos s??o iguais (ou n??o).
        return !saoDiferentes;
    }
}
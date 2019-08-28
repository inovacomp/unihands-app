import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

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

        today = mm + '/' + dd + '/' + yyyy + ' ' + h + ':' + m + ':' + s;

        return today;
    }
}
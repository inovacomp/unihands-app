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
    }
}
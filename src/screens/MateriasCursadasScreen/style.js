import { StyleSheet } from 'react-native'
import * as colors from '../../Colors';

export default styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.colorGray,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    loading: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.colorGray,
        justifyContent: 'center'
    }
})
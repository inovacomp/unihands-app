import {StyleSheet} from 'react-native'
import * as colors from '../../Colors';

export default styles = StyleSheet.create({
    background : {
        flex:1,
        backgroundColor: colors.colorGray,
        flexDirection:'column',
        alignItems:'stretch'
    },
    loading:{
        flex:1,
        flexDirection:'column',
        backgroundColor: colors.colorGray,
        justifyContent:'center'
    },
    itemList: {
        alignItems: "center",
        backgroundColor: colors.colorLightGreen,
        flexGrow: 1,
        marginHorizontal: 10,
        marginVertical:4,
        padding: 20,
        fontSize:12
    },
    textList: {
        color: colors.colorWhite,
        fontSize:12,
        fontWeight:'bold'
    },
})
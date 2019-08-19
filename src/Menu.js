import React from 'react'
import { createDrawerNavigator, createStackNavigator, DrawerActions } from 'react-navigation'
import { Icon, Header } from 'react-native-elements'
import HomeScreen from './screens/HomeScreen'
import HomeDetalheScreen from './screens/HomeDetalheScreen'
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Image,
    Text
} from 'react-native';

import { DrawerItems, SafeAreaView } from 'react-navigation';
const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#009688' }}>
        <ScrollView>
            <View style={{ height: 60, backgroundColor: '#009688', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontWeight:'bold', color:"#FFF"}}>ESTUFBA</Text>
            </View>
            <DrawerItems activeBackgroundColor="#E5E5E5" activeTintColor="#009688" inactiveBackgroundColor="#FFF" inactiveTintColor="#009688" {...props} />
        </ScrollView>
    </SafeAreaView>
)

const defaultOptions = ({ navigation }) => {
    return {
        headerLeft: (
            <Icon
                style={{ paddingLeft: 10 }}
                onPress={() => navigation.openDrawer()}
                name="menu"
                size={30}
                color="#FFF"
            />
        ),
        headerStyle: {
            backgroundColor: '#009688'
        },
        headerTintColor: '#FFF'
    };
}

const ComprovanteStackNavigator = createStackNavigator(
    {
        HomeScreen,
        HomeDetalheScreen
    },
    {
        defaultNavigationOptions: defaultOptions
    }
);
const Pagina2 = createStackNavigator(
    {
        HomeScreen
    },
    {
        defaultNavigationOptions: defaultOptions
    }
);

const MenuContainer = createDrawerNavigator({
    Comprovante: {
        screen: ComprovanteStackNavigator
    },
    Pagina2: {
        screen: Pagina2
    }
}, {
        drawerType:'slide',
        drawerWidth: 200,
        drawerPosition: 'left',
        initialRouteName: 'Comprovante',
        contentComponent: CustomDrawerComponent
    });

export default MenuContainer
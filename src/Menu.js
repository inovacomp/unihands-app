import React from 'react'
import { createDrawerNavigator, createStackNavigator, StackActions,NavigationActions } from 'react-navigation'
import { Icon, Header } from 'react-native-elements'
import HomeScreen from './screens/HomeScreen'
import HomeDetalheScreen from './screens/HomeDetalheScreen'
import {colorGreen,colorWhite} from './Colors'
import {
    View,
    ScrollView,
    Text
} from 'react-native';

import { DrawerItems, SafeAreaView } from 'react-navigation';
const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1,backgroundColor:colorGreen }}>
        <ScrollView>
            <View style={{ height: 60, backgroundColor: colorGreen, alignItems: 'center', justifyContent: 'center' }}>
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
                iconStyle={{ paddingLeft:10 }}
                onPress={() => navigation.openDrawer()}
                name="menu"
                size={30}
                color="#FFF"
                paddingLeft="30"
            />
        ),
        headerRight: (
            <Icon
                iconStyle={{ paddingRight:10 }}
                onPress={() => {
                    navigation.navigate('Welcome')
                }}
                name="exit-to-app"
                size={30}
                color="#FFF"
                paddingLeft="30"
            />
        ),
        headerStyle: {
            backgroundColor: colorGreen
        },
        headerTintColor: colorWhite
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
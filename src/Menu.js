import React from 'react'
import { createDrawerNavigator, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import { Icon, Header } from 'react-native-elements'
import HomeScreen from './screens/HomeScreen'
import HomeDetalheScreen from './screens/HomeDetalheScreen'
import MateriasCursadasScreen from './screens/MateriasCursadasScreen'
import ChComplementarScreen from './screens/ChComplementarScreen'
import GradeCursoScreen from './screens/GradeCursoScreen'
import ComprovanteMatriculaScreen from './screens/ComprovanteMatriculaScreen'
import { colorGreen, colorWhite } from './Colors'
import {
    View,
    ScrollView,
    Text
} from 'react-native';

import { DrawerItems, SafeAreaView } from 'react-navigation';
const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorGreen }}>
        <ScrollView>
            <View style={{ height: 60, backgroundColor: colorGreen, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: "#FFF" }}>SIAC Mobile</Text>
            </View>
            <DrawerItems activeBackgroundColor="#E5E5E5" activeTintColor="#009688" inactiveBackgroundColor="#FFF" inactiveTintColor="#009688" {...props} />
        </ScrollView>
    </SafeAreaView>
)

const defaultOptions = ({ navigation }) => {
    return {
        headerLeft: (
            <Icon
                iconStyle={{ paddingLeft: 10 }}
                onPress={() => navigation.openDrawer()}
                name="menu"
                size={30}
                color="#FFF"
                paddingLeft="30"
            />
        ),
        headerRight: (
            <Icon
                iconStyle={{ paddingRight: 10 }}
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
const MateriasCursadasStackNavigator = createStackNavigator(
    {
        MateriasCursadasScreen
    },
    {
        defaultNavigationOptions: defaultOptions
    }
);
const ChComplementarStackNavigator = createStackNavigator(
    {
        ChComplementarScreen
    },
    {
        defaultNavigationOptions: defaultOptions
    }
);

const GradeCursoStackNavigator = createStackNavigator(
    {
        GradeCursoScreen
    },
    {
        defaultNavigationOptions: defaultOptions
    }
)

const ComprovanteMatriculaStackNavigator = createStackNavigator(
    {
        ComprovanteMatriculaScreen
    },
    {
        defaultNavigationOptions: defaultOptions
    }
)


const MenuContainer = createDrawerNavigator({
    Início: {
        screen: ComprovanteStackNavigator
    },
    "Matérias Cursadas": {
        screen: MateriasCursadasStackNavigator
    },
    "CH Complementar": {
        screen: ChComplementarStackNavigator
    },
    "Grade do Curso": {
        screen: GradeCursoStackNavigator
    },
    "Comprovante de Matrícula": {
        screen: ComprovanteMatriculaStackNavigator
    }
}, {
        drawerType: 'slide',
        drawerWidth: 200,
        drawerPosition: 'left',
        initialRouteName: 'Início',
        contentComponent: CustomDrawerComponent
    });

export default MenuContainer
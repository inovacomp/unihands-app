import {createStackNavigator,createAppContainer} from 'react-navigation'
import HomeScreen from './src/screens/HomeScreen'
import MenuScreen from './src/screens/MenuScreen'
import MateriasPassadasScreen from './src/screens/MateriasPassadasScreen'
import MateriaSelecionadaScreen from './src/screens/MateriaSelecionadaScreen'

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  'Menu': MenuScreen,
  'MateriasPassadas': MateriasPassadasScreen,
  'MateriaSelecionada': MateriaSelecionadaScreen
},{initialRouteName: 'Home'})

//usar o figma para interface
export default createAppContainer(AppNavigator)
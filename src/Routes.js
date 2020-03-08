import LoginScreen from './screens/LoginScreen'
import MenuContainer from './Menu'
import InfoLogin from './screens/LoginScreen/info'
 
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';


const loginNavigator = createStackNavigator({
  LoginScreen,
  InfoLogin
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: loginNavigator },
  Dashboard: { screen: MenuContainer }
},
{
  initialRouteName: 'Welcome'
});
 
const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer; 
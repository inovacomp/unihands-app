import LoginScreen from './screens/LoginScreen'
import MenuContainer from './Menu'
 
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: LoginScreen },
  Dashboard: { screen: MenuContainer }
},
{
  initialRouteName: 'Dashboard'
});
 
const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer; 
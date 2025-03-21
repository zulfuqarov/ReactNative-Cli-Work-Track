import { NavigationContainer } from '@react-navigation/native';
import ContextWork from './src/context/ContextWork'
import StackNavigation from './src/navigation/StackNavigation';
import React from 'react';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
enableScreens();
const App = () => {

  // const [isConnected, setIsConnected] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsConnected(state.isConnected);
  //   });

  //   return () => {
  //     unsubscribe(); 
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isConnected === false) {
  //     Alert.alert("İnternet Bağlantısı Yoxdur", "Lütfən internet bağlantınızı yoxlayın və yenidən cəhd edin.");
  //   }
  // }, [isConnected]);

  // if (isConnected === null) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="blue" />
  //       <Text>İnternet bağlantısı yoxlanılır...</Text>
  //     </View>
  //   );
  // }

  // if (isConnected === false) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text style={{ fontSize: 18, color: 'red' }}>İnternet Bağlantısı Yoxdur</Text>
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <ContextWork>
        <StackNavigation />
      </ContextWork>
      <Toast />
    </NavigationContainer>

  )
}

export default App


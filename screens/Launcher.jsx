import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Register from "./Register";
import UserContext from "../Context/UserContext";
import Menu from "./Menu";
import ThankYou from "./ThankYou";
import Billing from "./Billing";
import Pay from "./Pay";
import Calculator from "./Calculator";


function Launcher() {
  var Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <UserContext.Provider value="">
        <Stack.Navigator>
          {/* <Stack.Screen name="Go-calcualtor" component={Calculator}/> */}
          <Stack.Screen name="Go-Login" component={Login} />
          <Stack.Screen name="Go-Register" component={Register} />
          <Stack.Screen name="Go-Menu" component={Menu} />
         <Stack.Screen name="GO-Billing" component={Billing} />
         <Stack.Screen name ="Go-Pay" component={Pay}/>

          <Stack.Screen name="Go-ThankYou" component={ThankYou}/>
          <Stack.Screen name="Go-Home" component={Home} />
          <Stack.Screen name="Go-About" component={About} />
         </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

export default Launcher;

import { useState } from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";

function TextMap() 
{
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const onRegionChange = (region) => {
    setCurrentRegion(region);
  };
  
 return ( <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
  <Text>lattitubde:{currentRegion.latitude}</Text>
  <Text>longitude:{currentRegion.longitude}</Text>
  <MapView style={{height: "400", width: "300"}} 
  initialRegion={currentRegion}
  onRegionChange={onRegionChange}
  >
   
 </MapView>
   
  </View>
 );
}
export default TextMap;

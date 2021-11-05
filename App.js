import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home"
import Game from "./components/Game"
import { Alert, Image, TouchableOpacity } from 'react-native';

const info_icon = require('./assets/images/info_icon.png')

export default function App() {

  const Stack = createNativeStackNavigator();

  const [english, setEnglish] = useState(true)

  const info_english = ["How to play hangman",
   "In hangman your task is to find the secret word by guessing letters." 
   + "\n\nIf a guessed letter is correct it will be shown in its place in the word." 
   + " \n\nIf the guessed letter is wrong a piece of the stickman is drawn." 
   + " \n\nYou win by guessing all the letters in the word before the stickman is fully drawn."]

   const info_norwegian = ["Hvordan spille hangman", "I hangman er oppgaven å finne det hemmelige ordet ved å gjette bokstaver." 
   + "\n\nHvis en gjettet bokstav er riktig vil den bli vist på dens plass i ordet." 
   + "\n\nHvis den gjettede bokstaven er feil vil en bit av figuren bli tegnet." 
   + "\n\nDu vinner ved å gjette alle bokstavene i ordet før hele figuren er tegnet." ]

  const infoPressed = () => {
    if (english) {
      Alert.alert(info_english[0], info_english[1])
    } else {
      Alert.alert(info_norwegian[0], info_norwegian[1])
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} initialParams={{setAppbarLanguage: setEnglish}}
        options={{
          title: 'Hangman',
          headerRight: () => (
            <TouchableOpacity onPress={() => infoPressed()}>
                <Image  source={info_icon}/>
            </TouchableOpacity>
          ),
          }}/>
        <Stack.Screen name="Game" component={Game} options={{
          title: "Hangman",
          headerRight: () => (
            <TouchableOpacity onPress={() => infoPressed()}>
                <Image  source={info_icon}/>
            </TouchableOpacity>
          ),
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

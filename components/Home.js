import React, {useState} from "react";
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const no = require('../assets/images/flag-icons/no.png')
const uk = require('../assets/images/flag-icons/uk.png')

export default function Home({ navigation, route }) {

    const [english, setEnglish] = useState(true)
    const [wordIndex, setWordIndex] = useState(0)

    const norwegianWords = ["HALLO", "SKOLE", "BIL", "TELEFON", "MODER", "FADER", "BLYANT", "HUS", "AMBULANSE", "DATAMASKIN"]
    const englishWords = ["HELLO", "SCHOOL", "CAR", "PHONE", "MOTHER", "FATHER", "PENCIL", "HOUSE", "AMBULANCE", "COMPUTER"]
    const words = [englishWords, norwegianWords]

    const flagPressed = (bool, index) => {
        setEnglish(bool)
        setWordIndex(index)
        route.params.setAppbarLanguage(bool)
    }
    
    return(
        <View style={styles.container}>
            <Text style={{marginBottom: 40, fontSize: 32}}>{english ? "Welcome to Hangman! Press start game" : "Velkommen til Hangman! Trykk start spillet"}</Text>
            <Button title={english ? "Start game" : "Start spillet"} onPress={() => navigation.navigate('Game', {english: english, words: words[wordIndex]})} />
            <View style={styles.flagContainer}>
                <TouchableOpacity onPress={() => flagPressed(true, 0)}>
                    <Image style={styles.flag} source={uk}/>
                </TouchableOpacity>
                <View style={{width: 40}} />
                <TouchableOpacity onPress={() => flagPressed(false, 1)}>
                    <Image style={styles.flag} source={no}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flagContainer: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        marginTop: 100,
        justifyContent: "space-between"
    },
    flag: {
        height: 50,
        width: 50,
        margin: 0,
    }
  });
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, Button, TouchableHighlight, TextInput } from "react-native";
import * as HangmanImages from '../assets/images/imageObjects'

export default function Game({navigation, route}) {

    const [wrongLetters, setWrongLetters] = useState([])
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [inputLetter, setInputLetter] = useState("");
    const [onFocus, setOnFocus] = useState(false);
    const [won, setWon] = useState(false);
    const [buttonLabel, setButtonLabel] = useState("");
    const [finalMessage, setFinalMessage] = useState("");
    const [hiddenWord, setHiddenWord] = useState("");

    const {english, words} = route.params;

    useEffect(() => {
        if (english) {
            setButtonLabel("Check letter")
        } else {
            setButtonLabel("Sjekk bokstav")
        }
        
        setHiddenWord(words[Math.floor(Math.random()*words.length)])
    }, []);

    const image = "image_" + wrongLetters.length;

    const checkLetter = (letter) => {
        if (won || wrongLetters.length == 6) {
            navigation.navigate('Home')
        }

        if (!letter.match(/[æøåa-z]/i)) return;

        setInputLetter("")
        setGuessedLetters(arr => [...arr, letter.toUpperCase()])

        if (!hiddenWord.includes(letter.toUpperCase()) && !wrongLetters.includes(letter.toUpperCase())) {
            setWrongLetters(arr => [...arr, letter.toUpperCase()])
            if (wrongLetters.length == 5) {
                if (english) {
                    setButtonLabel("Go back")
                    var message = "Unlucky! The correct word was '" + hiddenWord + "'. Press 'Go back' and try again!"
                    setFinalMessage(message)
                } else {
                    setButtonLabel("Gå tilbake")
                    var message = "Uff da! Det riktige ordet var '" + hiddenWord  + "'. Trykk på 'Gå tilbake' og prøv igjen!"
                    setFinalMessage(message)
                }
            }
        }

        let guessedAll = true;
        hiddenWord.split('').forEach(hiddenLetter => {
            if (!guessedLetters.includes(hiddenLetter) && hiddenLetter != letter.toUpperCase()) {
                guessedAll = false;
            }
        });

        if (guessedAll) {
            setWon(true);
            if (english) {
                setButtonLabel("Go back")
                setFinalMessage("Congratulations! Press 'Go back' and try again!")
            } else {
                setButtonLabel("Gå tilbake")
                setFinalMessage("Gratulerer! Trykk på 'Gå tilbake' og prøv igjen!")
            }
        }
    }

    return(
        <View style={styles.container}>
            <Text style={onFocus ? {fontSize: 12} : {fontSize: 18}}>{finalMessage}</Text>
            <Image style={onFocus ? onFocusStyles.hangmanImage : styles.hangmanImage} source={HangmanImages[`${image}`]}/>
            <View style={styles.wordContainer}>
                {hiddenWord.split('').map((letter, key) => (
                    <Text key={key} style={onFocus ? onFocusStyles.text : styles.text}>{guessedLetters.includes(letter) ? letter+" " : "_ "}</Text>
                ))}
            </View>
            <View style={styles.wordContainer}>
                <Text style={onFocus ? onFocusStyles.wrongLetters : styles.wrongLetters} >{english ? "Wrong letters: " : "Feil bokstaver: "}</Text>
                {wrongLetters.map((letter, key) => (
                    <Text key={key} style={onFocus ? onFocusStyles.wrongLetters : styles.wrongLetters}>{guessedLetters.includes(letter) ? letter+" " : "_ "}</Text>
                ))}
            </View>
            <TextInput 
            style={onFocus ? onFocusStyles.input : styles.input} 
            maxLength={1}
            placeholder={english ? "Guess letter" : "Gjett bokstav"}
            value={inputLetter}
            importantForAutofill={"no"}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            onChangeText={setInputLetter}
            />
            <TouchableHighlight style={styles.checkButton}>
                <Button 
                title={buttonLabel}
                disabled={!inputLetter && !won && wrongLetters.length < 6} 
                onPress={() => checkLetter(inputLetter)} 
                />       
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "100%", 
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    wordContainer: {
       flexDirection: "row",
    },
    hangmanImage: {
        width: 250,
        height: 250,
        marginLeft: 25,
        marginTop: 30,
    },
    text: {
        fontSize: 24,
        marginTop: 25
    },
    wrongLetters: {
        fontSize: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginTop: 45,
      },
    checkButton: {
        marginTop: 5,
    },
  });

  const onFocusStyles = StyleSheet.create({
    hangmanImage: {
        width: 100,
        height: 100,
        marginLeft: 25,
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginTop: 10
    },
    wrongLetters: {
        fontSize: 12,
    },
    input: {
        height: 35,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
      },
  });
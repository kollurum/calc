import React from 'react';
import {SafeAreaView, StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import CalculatorScreeen from './screens/CalculatorScreeen';


const App=()=>{
  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <CalculatorScreeen/>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    
  );
 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
    margin:20,
    flex:1
  },
});

export default App;
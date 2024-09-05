import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

// Home Screen component
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

// Details Screen component
const DetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Details Screen</Text>
      <Button title="Go back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

// Main App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid, // Fade-in transition effect
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  Easing,
  Text,
  Image,
  ImageBackground,
} from "react-native";

const App = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [seconds, setSeconds] = useState(4); // Initial seconds for inhale phase
  const [phase, setPhase] = useState("Inhale"); // Track the current phase

  useEffect(() => {
    const startBreathing = () => {
      // Inhale phase
      Animated.timing(scaleValue, {
        toValue: 1.5, // Expand to 1.5x the original size
        duration: 4000, // Inhale for 4 seconds
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setPhase("Hold");
        setSeconds(7);

        // Hold phase
        setTimeout(() => {
          setPhase("Exhale");
          setSeconds(8);

          // Exhale phase
          Animated.timing(scaleValue, {
            toValue: 1, // Shrink back to original size
            duration: 8000, // Exhale for 8 seconds
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(() => {
            setPhase("Inhale");
            setSeconds(4);
            startBreathing(); // Repeat the cycle
          });
        }, 7000); // Wait for hold phase to complete
      });
    };

    startBreathing();
  }, [scaleValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 1) {
          return prevSeconds - 1;
        } else {
          if (phase === "Inhale") {
            return 7;
          } else if (phase === "Hold") {
            return 8;
          } else {
            return 4;
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [phase]);

  const getCircleColor = () => {
    if (phase === "Exhale") {
      return "#4194cb"; // Circle color during Exhale phase
    } else if (phase === "Hold") {
      return "#235284"; // Circle color during Hold phase
    }
    return "lightblue"; // Default color for Inhale phase
  };

  return (
    <ImageBackground
      source={{
        uri: "https://iphoneswallpapers.com/wp-content/uploads/2023/05/Night-Sky-Mountains-iPhone-Wallpaper-HD.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.headingText}>
          Whatever happens, today is the Great Day ... !!!
        </Text>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale: scaleValue }],
              backgroundColor: getCircleColor(),
            },
          ]}
        >
          {phase === "Inhale" && (
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/022/538/030/original/yellow-face-wow-emoji-surprised-shocked-emoticon-3d-render-illustration-free-png.png",
              }} // Your image URL for Inhale
              style={styles.image}
              resizeMode="contain"
            />
          )}
          {phase === "Hold" && (
            <Image
              source={{
                uri: "https://clipart-library.com/images/8ixrrRA4T.png",
              }} // Your image URL for Hold
              style={styles.image}
              resizeMode="contain"
            />
          )}
          {phase === "Exhale" && (
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/014/524/914/non_2x/cartoon-emoticon-illustration-free-png.png",
              }} // Your image URL for Exhale
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </Animated.View>
        <Text style={styles.phaseText}>{phase}</Text>
        <Text style={styles.timerText}>{seconds} seconds</Text>
      </View>
    </ImageBackground>
  );
};

const styles = {
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50, // Add padding for spacing from the top
  },
  headingText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginTop: -250,
    marginBottom: 200, // Space below the heading
    textAlign: "center",
    alignSelf: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center", // Center the image vertically
    alignItems: "center", // Center the image horizontally
  },
  image: {
    width: 60, // Adjust the size as needed
    height: 60, // Adjust the size as needed
    position: "absolute", // Position absolute to overlap with the circle
  },
  phaseText: {
    marginTop: "10%",
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  timerText: {
    marginTop: "5%",
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
};

export default App;

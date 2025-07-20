import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface PrincipalButtonProps {
  title: string;
  onPress: () => void;
  service: "eneo" | "canal" | "dailyReport";
}

const PrincipalButton = ({ title, onPress, service }: PrincipalButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.button,
        {
          backgroundColor:
            service === "eneo"
              ? Colors.dark.pink
              : service === "canal"
              ? Colors.dark.yellow
              : Colors.dark.blueColor,
        },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrincipalButton;

const styles = StyleSheet.create({
  button: {
    width: "95%",
    height: 55,
    borderColor: Colors.dark.borderColor,
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

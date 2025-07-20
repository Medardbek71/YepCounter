import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import PrincipalButton from "@/components/PrincipalButton";

const addCompter = () => {
  const [compterNumber, setCompterNumber] = useState<string>("");
  const [compterLabel, setCompterLabel] = useState<string>("");

  const handleAction = () => {
    alert("la souris");
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/eneo-logo.svg")}
            style={{
              width: 150,
              height: 70,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 36 }}>Ajouter un</Text>
          <Text style={{ fontSize: 36 }}>compteur</Text>
        </View>
        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Enter le numero du compteur prepayé</Text>
          <TextInput
            value={compterNumber}
            onChangeText={(text) => setCompterNumber(text)}
            placeholder="014XXXXXX"
            keyboardType="numeric"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Entrer le Nom du compteur</Text>
          <TextInput
            value={compterLabel}
            onChangeText={(text) => setCompterLabel(text)}
            placeholder="prépayer de maman sarah"
            style={styles.textInput}
          />
        </View>
      </View>
      <PrincipalButton
        title="Ajouter"
        onPress={handleAction}
        service={"eneo"}
      />
    </View>
  );
};

export default addCompter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  label: {
    marginLeft: 15,
    fontSize: 15,
  },
  textInput: {
    borderColor: Colors.dark.pink,
    borderWidth: 1,
    marginTop: 10,
    width: "95%",
    height: 50,
    padding: 4,
    borderRadius: 5,
    alignSelf: "center",
  },
  textInputLabel: {
    marginBottom: 20,
  },
});

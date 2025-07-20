import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PrincipalButton from "@/components/PrincipalButton";
import { Image } from "expo-image";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

const rechargeCompter = () => {
  const [amount, setAmount] = useState<number>();
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
          <Text style={{ fontSize: 36 }}>Compteur de Maman sarah</Text>
        </View>
        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Numero de compteur</Text>
          <Text style={styles.label}>014XXXXXXXXX</Text>
        </View>
        <View>
          <Text style={styles.label}>Entrer le montant de la recharge</Text>
          <TextInput
            value={amount?.toString()}
            onChangeText={() => setAmount(amount)}
            placeholder="1500 FCFA"
            style={styles.textInput}
            keyboardType="numeric"
          />
          <Text style={[styles.label, { marginTop: 20 }]}>
            Montant TTC: 1 500 FCFA
          </Text>
        </View>
      </View>
      <PrincipalButton
        title="Recharger"
        onPress={handleAction}
        service={"eneo"}
      />
    </View>
  );
};

export default rechargeCompter;

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

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import React, { useState } from "react";
import PrincipalButton from "@/components/PrincipalButton";
import Colors from "@/constants/Colors";

const daily_report = () => {
  const [amount, setAmount] = useState<number>();
  const [reason, setReason] = useState<string>();
  const handleAction = () => {
    alert("Moussa");
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/money.png")}
            style={{
              width: 120,
              height: 70,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 36 }}>Bilan de la journée</Text>
          <Text style={{ fontSize: 15 }}>Mardi le 15 juillet 2025</Text>
        </View>
        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Montant de la dépense</Text>
          <TextInput
            value={reason}
            onChangeText={(text) => setReason(text)}
            placeholder="200 Francs"
            keyboardType="numeric"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Raison de dépense</Text>
          <TextInput
            value={amount?.toString()}
            onChangeText={() => setAmount(amount)}
            placeholder="transport , alimentation , internet"
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity
          onPress={() => alert("ajouter")}
          style={styles.addButton}
        >
          <Text>ajouter a la liste</Text>
        </TouchableOpacity>
        <Text> 0 dépenses ajouter a la liste</Text>
      </View>
      <PrincipalButton
        title="Terminer"
        onPress={handleAction}
        service={"dailyReport"}
      />
    </View>
  );
};

export default daily_report;

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
    borderColor: Colors.dark.blueColor,
    borderWidth: 1,
    marginTop: 10,
    width: "95%",
    height: 50,
    padding: 4,
    borderRadius: 5,
    alignSelf: "center",
  },
  textInputLabel: {
    marginVertical: 20,
    marginBottom: 20,
  },
  addButton: {
    width: "50%",
    height: 60,
    borderRadius: 20,
    padding: 10,
    margin: 20,
    borderWidth: 2,
    borderColor: "black",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

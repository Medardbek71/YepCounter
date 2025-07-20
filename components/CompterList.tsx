import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const CompterList = () => {
  return (
    <View>
      <Text style={{ marginVertical: 20 }}>Liste des comptes disponibles</Text>
      <TouchableOpacity
        onPress={() => router.push("/rechargeCompter")}
        style={styles.compterItem}
      >
        <Text style={{ fontWeight: 700 }}>Compteur de maman sarah</Text>
        <Text style={{ fontWeight: 300 }}>
          Derniere recharge le: 12/10/2025
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/rechargeCompter")}
        style={styles.compterItem}
      >
        <Text style={{ fontWeight: 700 }}>Compteur de maman sarah</Text>
        <Text style={{ fontWeight: 300 }}>
          Derniere recharge le: 12/10/2025
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/rechargeCompter")}
        style={styles.compterItem}
      >
        <Text style={{ fontWeight: 700 }}>Compteur de maman sarah</Text>
        <Text style={{ fontWeight: 300 }}>
          Derniere recharge le: 12/10/2025
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/rechargeCompter")}
        style={styles.compterItem}
      >
        <Text style={{ fontWeight: 700 }}>Compteur de maman sarah</Text>
        <Text style={{ fontWeight: 300 }}>
          Derniere recharge le: 12/10/2025
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompterList;

const styles = StyleSheet.create({
  compterItem: {
    width: "97%",
    height: 75,
    borderColor: Colors.dark.borderColor,
    borderWidth: 2,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "center",
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: Colors.dark.pink,
  },
});

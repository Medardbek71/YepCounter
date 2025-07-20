import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const CanalList = () => {
  return (
    <View>
      <Text style={{ marginVertical: 20 }}>Liste des comptes disponibles</Text>
      <TouchableOpacity
        onPress={() => router.push("/rechargeCanal")}
        style={styles.canalItem}
      >
        <Text style={{ fontWeight: 700 }}>Télé du salon</Text>
        <Text style={{ fontWeight: 300 }}>
          Derniere recharge le: 12/10/2025
        </Text>
        <Text style={{ fontWeight: 300 }}>Access +</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/rechargeCanal")}
        style={styles.canalItem}
      >
        <Text style={{ fontWeight: 700 }}>Télé du salon</Text>
        <Text style={{ fontWeight: 300 }}>
          Derniere recharge le: 12/10/2025
        </Text>
        <Text style={{ fontWeight: 300 }}>Access +</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/rechargeCanal")}
        style={styles.canalItem}
      >
        <Text style={{ fontWeight: 700 }}>Télé du salon</Text>
        <Text style={{ fontWeight: 300 }}>
          Derniere recharge le: 12/10/2025
        </Text>
        <Text style={{ fontWeight: 300 }}>Access +</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/rechargeCanal")}
        style={styles.canalItem}
      >
        <Text style={{ fontWeight: 700 }}>Télé du salon</Text>
        <Text style={{ fontWeight: 300 }}>
          Derniere recharge le: 12/10/2025
        </Text>
        <Text style={{ fontWeight: 300 }}>Access +</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CanalList;

const styles = StyleSheet.create({
  canalItem: {
    width: "97%",
    height: 80,
    borderColor: Colors.dark.borderColor,
    borderWidth: 2,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "center",
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: Colors.dark.yellow,
  },
});

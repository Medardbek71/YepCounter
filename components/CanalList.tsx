import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import databaseService from "@/services/DatabaseService";

const CanalList = () => {
  const [listOfCanal, setListOfCanal] = useState([]);
  useEffect(() => {
    const loadAllCanal = async (): Promise<void> => {
      const response = await databaseService.getAllCanal();
      if (response.success) {
        setListOfCanal(response.data);
        console.log("Voici la listes des abonement disponibles", listOfCanal);
      } else {
        console.error(response.error);
      }
    };
    loadAllCanal();
  }, []);
  return (
    <View>
      <Text style={{ marginVertical: 20, fontFamily: "SpaceGrotesk" }}>
        Liste des comptes disponibles
      </Text>
      {listOfCanal.map((canal) => {
        return (
          <TouchableOpacity
            key={canal.id}
            onPress={() =>
              router.push({
                pathname: "/rechargeCanal",
                params: {
                  data: JSON.stringify(canal),
                },
              })
            }
            style={styles.canalItem}
          >
            <Text style={{ fontWeight: 700 }}>{canal.label}</Text>
            <Text style={{ fontWeight: 300 }}>
              Derniere recharge le: 12/10/2025
            </Text>
            <Text style={{ fontWeight: 300 }}>Access +</Text>
          </TouchableOpacity>
        );
      })}
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

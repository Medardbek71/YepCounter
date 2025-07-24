import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import databaseService from "@/services/DatabaseService";

const CompterList = () => {
  const [compterList, setCompterList] = useState([]);
  useEffect(() => {
    const loadCompter = async (): Promise<void> => {
      const response = await databaseService.getAllCompter();
      if (response.success) {
        setCompterList(response.data);
        console.log(compterList);
      } else {
        console.log(response.error);
      }
    };
    loadCompter();
  }, []);
  return (
    <View>
      <Text style={{ marginVertical: 20 }}>Liste des comptes disponibles</Text>
      {compterList.map((compter) => {
        return (
          <TouchableOpacity
            key={compter.id}
            onPress={() =>
              router.push({
                pathname: "/rechargeCompter",
                params: {
                  compterData: compter,
                },
              })
            }
            style={styles.compterItem}
          >
            <Text style={{ fontWeight: 700 }}>{compter.label}</Text>
            <Text style={{ fontWeight: 300 }}>
              Derniere recharge le: 12/10/2025
            </Text>
          </TouchableOpacity>
        );
      })}
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

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import PrincipalButton from "@/components/PrincipalButton";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";

const RechargeCanal = () => {
  const { data } = useLocalSearchParams();
  console.log(data);
  const rechargeInfo = data ? JSON.parse(data as any) : null;

  const handleAction = () => {
    alert("la souris");
  };

  const formuleList = {
    Access: 5000,
    Évasion: 10000,
    "Access+": 15000,
    "Évasion+": 22500,
  };

  const entries = Object.entries(formuleList);
  const [formuleModalVisibility, setFormuleModalVisibility] =
    useState<boolean>(false);
  const [actualFormule, setActualFormule] = useState<object>([]);

  const handleFormuleModalVisibility = () => {
    setFormuleModalVisibility(!formuleModalVisibility);
  };

  const handleNewFormule = (title: string, price: number) => {
    setActualFormule({
      title: title,
      price: price,
    });
    handleFormuleModalVisibility();
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/canal-logo.svg")}
            style={{
              width: 150,
              height: 40,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        <View style={{ margin: 15, marginTop: 50 }}>
          <Text style={{ fontSize: 36 }}>{rechargeInfo.label}</Text>
        </View>
        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Numéro de réabonnement</Text>
          <Text style={styles.label}>{rechargeInfo.abonementNumber}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: 70,
            }}
          >
            <Text style={styles.label}>Formule choisi</Text>
            <Text style={styles.label}>{actualFormule.title || "Access"}</Text>
            <Text style={[styles.label]}>
              {actualFormule.price || "5 000"} FCFA
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => handleFormuleModalVisibility()}>
              <Image
                source={require("@/assets/images/change.svg")}
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {formuleModalVisibility && (
        <View style={styles.formuleModal}>
          {entries.map(([key, value], index) => (
            <TouchableOpacity
              key={index}
              style={styles.formuleItem}
              onPress={() => handleNewFormule(key, value)}
            >
              <Text>{key}:</Text>
              <Text>{value} FCFA</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <PrincipalButton
        title="Souscrire"
        onPress={handleAction}
        service="canal"
      />
    </View>
  );
};

export default RechargeCanal;

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
  formuleModal: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 20,
    margin: 20,
  },
  formuleItem: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    margin: 10,
  },
});

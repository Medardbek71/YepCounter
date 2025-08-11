import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import PrincipalButton from "@/components/PrincipalButton";
import Colors from "@/constants/Colors";
import databaseService from "@/services/DatabaseService";
import { router } from "expo-router";
import { getDateDuJour } from "@/utils/date";
import * as Notifications from "expo-notifications";

const daily_report = () => {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (Response) => {
        router.push("/daily_report");
      }
    );
    subscription.remove();
  }, []);

  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [reason, setReason] = useState<string>("");

  const handleAction = async (): Promise<void> => {
    try {
      if (reason.trim() === "" || !amount || amount <= 0) {
        Alert.alert("Les champs ne sont pas correctement remplis");
      } else {
        const response = await databaseService.createReport(
          amount as number,
          reason.trim()
        );

        if (response.success) {
          router.back();
        }
      }
    } catch (error) {
      console.log("Une erreur c'est produite");
      console.error(error);
    }
  };

  const addReport = async (): Promise<void> => {
    try {
      if (reason.trim() === "" || !amount || amount <= 0) {
        Alert.alert("Les champs ne sont pas correctement remplis");
      } else {
        const response = await databaseService.createReport(
          amount as number,
          reason.trim()
        );

        setAmount(undefined), setReason("");
      }
    } catch (error) {
      console.error(error);
    }
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
          <Text style={{ fontSize: 15 }}>{getDateDuJour()}</Text>
        </View>
        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Montant de la dépense</Text>
          <TextInput
            value={amount?.toString()}
            onChangeText={(text) => {
              const numericValue = parseInt(text);
              setAmount(isNaN(numericValue) ? undefined : numericValue);
            }}
            placeholder="200 Francs"
            keyboardType="numeric"
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.label}>Raison de dépense</Text>
          <TextInput
            value={reason}
            onChangeText={(text) => setReason(text)}
            placeholder={"transport , alimentation , internet"}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={() => addReport()} style={styles.addButton}>
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
    color: "black",
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

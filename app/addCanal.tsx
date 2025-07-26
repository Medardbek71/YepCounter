import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import PrincipalButton from "@/components/PrincipalButton";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import databaseService from "@/services/DatabaseService";
import { router } from "expo-router";

const addCanal = () => {
  const [suscriberNumber, setSuscriberNumber] = useState<string>("");
  const [suscriberLabel, setSuscriberLabel] = useState<string>("");

  const validateInputs = (): boolean => {
    if (!suscriberNumber || suscriberNumber.trim() === "") {
      Alert.alert("Erreur", "Veuillez entrer votre numéro de réabonnement");
      return false;
    }

    if (!suscriberLabel.trim()) {
      Alert.alert("Erreur", "Veuillez donner un titre à votre décodeur");
      return false;
    }

    const cleanNumber = suscriberNumber.trim();
    if (!cleanNumber.startsWith("2") || cleanNumber.length !== 14) {
      Alert.alert("Erreur", "Le numéro de réabonnement est incorrect");
      return false;
    }

    if (!/^\d{14}$/.test(cleanNumber)) {
      Alert.alert("Erreur", "Le numéro doit contenir uniquement des chiffres");
      return false;
    }

    return true;
  };

  const handleAction = async (): Promise<void> => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await databaseService.createCanal(
        suscriberLabel.trim(),
        Number(suscriberNumber.trim())
      );

      if (response.success) {
        console.log("Abonement créé avec l'ID:", response.insertedId);

        Alert.alert("Succès", "Abonnement ajouté avec succès !", [
          {
            text: "OK",
            onPress: () => {
              router.back();
            },
          },
        ]);

        setSuscriberNumber("");
        setSuscriberLabel("");
      } else {
        console.error("Erreur lors de l'ajout:", response.error);
        Alert.alert(
          "Erreur",
          "Impossible d'ajouter le compteur. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      Alert.alert(
        "Erreur",
        "Une erreur inattendue s'est produite. Veuillez réessayer."
      );
    }
  };

  const handleNumberChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length <= 14) {
      setSuscriberNumber(numericText);
    }
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
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 36 }}>Ajouter un</Text>
          <Text style={{ fontSize: 36 }}>décodeur</Text>
        </View>
        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Entrer le numéro de réabonnement</Text>
          <TextInput
            value={suscriberNumber}
            onChangeText={handleNumberChange}
            placeholder="014XXXXXX"
            keyboardType="numeric"
            style={styles.textInput}
            maxLength={14}
          />
          {suscriberNumber && (
            <Text style={{ textAlign: "right", marginRight: 15 }}>
              {suscriberNumber.length}/14
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.label}>Entrer un libellé</Text>
          <TextInput
            value={suscriberLabel}
            onChangeText={setSuscriberLabel}
            placeholder="télé du salon"
            style={styles.textInput}
          />
        </View>
      </View>
      <PrincipalButton
        title="Enregistrer"
        onPress={handleAction}
        service={"canal"}
      />
    </View>
  );
};

export default addCanal;

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
    borderColor: Colors.dark.yellow,
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

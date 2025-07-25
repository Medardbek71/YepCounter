import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import PrincipalButton from "@/components/PrincipalButton";
import databaseService from "@/services/DatabaseService";

const addCompter = () => {
  const [compterNumber, setCompterNumber] = useState<string>("");
  const [compterLabel, setCompterLabel] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateInputs = (): boolean => {
    if (!compterNumber.trim()) {
      Alert.alert("Erreur", "Veuillez entrer le numéro du compteur");
      return false;
    }

    if (!compterLabel.trim()) {
      Alert.alert("Erreur", "Veuillez entrer le nom du compteur");
      return false;
    }

    if (!compterNumber.startsWith("014") || (compterNumber.length !== 12)) {
      Alert.alert("Erreur", "Le numero de compteur est incorrecte");
      return false;
    }

    if (!/^\d+$/.test(compterNumber)) {
      Alert.alert(
        "Erreur",
        "Le numéro du compteur ne doit contenir que des chiffres"
      );
      return false;
    }

    return true;
  };

  // ✅ Fonction pour ajouter un compteur (appelée par le bouton)
  const handleAddCompter = async (): Promise<void> => {
    // Validation des entrées
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);

      // Garder le numéro en string pour préserver les zéros en tête (01423)
      const response = await databaseService.createCompter(
        compterLabel.trim(),
        compterNumber.trim()
      );

      if (response.success) {
        console.log("Compteur créé avec l'ID:", response.insertedId);

        // Afficher un message de succès
        Alert.alert("Succès", "Compteur ajouté avec succès !", [
          {
            text: "OK",
            onPress: () => {
              // Retourner à la page précédente
              router.back();
            },
          },
        ]);

        // Réinitialiser les champs
        setCompterNumber("");
        setCompterLabel("");
      } else {
        console.error("Erreur lors de l'ajout:", response.error);
        Alert.alert(
          "Erreur",
          "Impossible d'ajouter le compteur. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
      Alert.alert("Erreur", "Une erreur inattendue s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {/* ✅ Bouton de retour ajouté */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("@/assets/images/eneo-logo.svg")}
            style={styles.logo}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Ajouter un</Text>
          <Text style={styles.title}>compteur</Text>
        </View>

        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Entrer le numéro du compteur prépayé</Text>
          <TextInput
            value={compterNumber}
            onChangeText={(text) =>
              setCompterNumber(text.replace(/[^0-9]/g, ""))
            }
            placeholder="014XXXXXX"
            keyboardType="numeric"
            style={styles.textInput}
            maxLength={12}
            editable={!loading}
          />
        </View>

        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Entrer le nom du compteur</Text>
          <TextInput
            value={compterLabel}
            onChangeText={(text) => setCompterLabel(text)}
            placeholder="Prépayé de maman Sarah"
            style={styles.textInput}
            maxLength={50}
            editable={!loading}
          />
        </View>
      </View>

      {/* ✅ Bouton avec fonction correcte */}
      <PrincipalButton
        title={loading ? "Ajout en cours..." : "Ajouter"}
        onPress={handleAddCompter}
        service="eneo"
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
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: Colors.dark.pink,
  },
  logo: {
    width: 150,
    height: 70,
    alignSelf: "center",
  },
  titleContainer: {
    margin: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  label: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "500",
  },
  textInput: {
    borderColor: Colors.dark.pink,
    borderWidth: 1,
    marginTop: 10,
    width: "95%",
    height: 50,
    padding: 12,
    borderRadius: 5,
    alignSelf: "center",
    fontSize: 16,
  },
  textInputLabel: {
    marginBottom: 20,
  },
});

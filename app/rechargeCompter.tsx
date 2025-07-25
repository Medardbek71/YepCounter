// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import PrincipalButton from "@/components/PrincipalButton";
// import { Image } from "expo-image";
// import React, { useState } from "react";
// import Colors from "@/constants/Colors";
// import { useLocalSearchParams } from "expo-router";

// const rechargeCompter = () => {
//   const [amount, setAmount] = useState<number>();
//   const { data } = useLocalSearchParams();
//   const compterData = data ? JSON.parse(data as string) : null;
//   const handleAction = () => {
//     alert("la souris");
//   };
//   return (
//     <View style={styles.container}>
//       <View>
//         <TouchableOpacity>
//           <Image
//             source={require("@/assets/images/eneo-logo.svg")}
//             style={{
//               width: 150,
//               height: 70,
//               alignSelf: "center",
//             }}
//           />
//         </TouchableOpacity>
//         <View style={{ margin: 15 }}>
//           <Text style={{ fontSize: 36 }}>{compterData.label}</Text>
//         </View>
//         <View style={styles.textInputLabel}>
//           <Text style={styles.label}>Numero de compteur</Text>
//           <Text style={styles.label}>{compterData.number}</Text>
//         </View>
//         <View>
//           <Text style={styles.label}>Entrer le montant de la recharge</Text>
//           <TextInput
//             value={amount?.toString()}
//             onChangeText={(text) => setAmount(Number(text))}
//             placeholder="1500 FCFA"
//             style={styles.textInput}
//             keyboardType="numeric"
//           />
//           <Text style={[styles.label, { marginTop: 20 }]}>
//             Montant TTC: 1 500 FCFA
//           </Text>
//         </View>
//       </View>
//       <PrincipalButton
//         title="Recharger"
//         onPress={handleAction}
//         service={"eneo"}
//       />
//     </View>
//   );
// };

// export default rechargeCompter;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     flex: 1,
//     padding: 20,
//     paddingTop: 20,
//   },
//   label: {
//     marginLeft: 15,
//     fontSize: 15,
//   },
//   textInput: {
//     borderColor: Colors.dark.pink,
//     borderWidth: 1,
//     marginTop: 10,
//     width: "95%",
//     height: 50,
//     padding: 4,
//     borderRadius: 5,
//     alignSelf: "center",
//   },
//   textInputLabel: {
//     marginBottom: 20,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import PrincipalButton from "@/components/PrincipalButton";
import { Image } from "expo-image";
import React, { useState, useMemo } from "react";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";

const rechargeCompter = () => {
  const [amount, setAmount] = useState<number>();
  const { data } = useLocalSearchParams();
  const [tax, setTax] = useState<number>();
  const compterData = data ? JSON.parse(data as string) : null;

  // ✅ Calcul automatique du montant TTC (montant + 10%)
  const montantTTC = useMemo(() => {
    if (!amount || amount <= 0) return 0;
    else {
      if (amount < 5000) {
        setTax(100);
        return amount + 100;
      } else if (amount < 10000) {
        setTax(200);
        return amount + 200;
      } else if (amount < 50000) {
        setTax(400);
        return amount + 400;
      } else if (amount < 100000) {
        setTax(500);
        return amount + 500;
      } else {
        setTax(750);
        return amount + 750;
      }
      // return Math.round(amount * 1.1); // +10% arrondi
    }
  }, [amount]);

  // ✅ Fonction pour valider le montant
  const validateAmount = (): boolean => {
    if (!amount || isNaN(amount)) {
      Alert.alert("Erreur", "Veuillez entrer un montant valide");
      return false;
    }

    if (amount < 1000) {
      Alert.alert("Erreur", "Le montant minimum de recharge est de 1000 FCFA");
      return false;
    }

    return true;
  };

  // ✅ Fonction pour gérer les changements du montant
  const handleAmountChange = (text: string) => {
    // Ne garder que les chiffres
    const numbersOnly = text.replace(/[^0-9]/g, "");
    const numericValue = numbersOnly ? Number(numbersOnly) : undefined;
    setAmount(numericValue);
  };

  // ✅ Fonction pour traiter la recharge
  const handleAction = () => {
    if (!validateAmount()) {
      return;
    }

    // Si la validation passe, continuer avec la recharge
    Alert.alert(
      "Confirmation",
      `Recharge de ${amount} FCFA\n` +
        `Prix TTC : ${montantTTC} FCFA \n` +
        `Compteur N: ${compterData?.number} `,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Confirmer",
          onPress: () => {
            // Ici vous pouvez ajouter la logique de recharge
            console.log("Recharge confirmée:", {
              amount,
              montantTTC,
              compter: compterData,
            });
          },
        },
      ]
    );
  };

  // ✅ Formatage du montant pour l'affichage
  const formatAmount = (value: number): string => {
    return value.toLocaleString("fr-FR") + " FCFA";
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
          <Text style={{ fontSize: 36 }}>
            {compterData?.label || "Compteur"}
          </Text>
        </View>

        <View style={styles.textInputLabel}>
          <Text style={styles.label}>Numéro de compteur</Text>
          <Text style={[styles.label]}>{compterData?.number || "N/A"}</Text>
        </View>

        <View>
          <Text style={styles.label}>Entrer le montant de la recharge</Text>
          <TextInput
            value={amount?.toString() || ""}
            onChangeText={handleAmountChange}
            placeholder="1000"
            style={[styles.textInput]}
            keyboardType="numeric"
          />

          {/* ✅ Message d'aide */}
          {amount && amount > 0 && amount < 1000 && (
            <Text style={styles.errorText}>Montant minimum : 1 000 FCFA</Text>
          )}

          {/* ✅ Affichage du montant TTC calculé automatiquement */}
          {amount && amount >= 1000 && (
            <Text style={[styles.label, { marginTop: 20 }]}>
              Montant TTC:{" "}
              {montantTTC > 0 ? formatAmount(montantTTC) : "0 FCFA"}
            </Text>
          )}

          {/* ✅ Détail du calcul */}
          {amount && amount >= 1000 && (
            <Text style={styles.calculDetail}>
              ({formatAmount(amount)} + {tax} = {formatAmount(montantTTC)})
            </Text>
          )}
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
    justifyContent: "space-between",
  },
  label: {
    marginLeft: 15,
    fontSize: 15,
  },
  compterNumber: {
    fontWeight: "bold",
    color: Colors.dark.pink,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
    marginTop: 5,
    fontStyle: "italic",
  },
  calculDetail: {
    color: "gray",
    fontSize: 12,
    marginLeft: 15,
    marginTop: 5,
    fontStyle: "italic",
  },
});

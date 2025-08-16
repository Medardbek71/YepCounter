import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import databaseService from "@/services/DatabaseService";

// Interface pour typer vos compteurs
interface CompterInterface {
  id: number;
  label: string;
  number: string;
  createdAt?: string;
  updatedAt?: string;
}

const CompterList = () => {
  const [compterList, setCompterList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const fetchAllCompter = async () => {
        try {
          setLoading(true); // ✅ Mettre loading à true au début
          const compter = await databaseService.getAllCompter();
          setCompterList(compter);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); // ✅ Mettre loading à false à la fin
        }
      };
      fetchAllCompter();
    }, []) // ✅ Tableau de dépendances ajouté
  );

  // Gestion du loading
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.dark.pink} />
        <Text style={styles.loadingText}>Chargement des compteurs...</Text>
      </View>
    );
  }

  // ✅ Gestion améliorée du cas où il n'y a pas de compteurs
  if (!compterList || !compterList.data || compterList.data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Aucun compteur disponible</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Liste des comptes disponibles</Text>
      </View>

      {compterList.data.map((compter: CompterInterface) => {
        // ✅ Type corrigé
        return (
          <TouchableOpacity
            key={compter.id}
            onPress={() =>
              router.push({
                pathname: "/rechargeCompter",
                params: {
                  data: JSON.stringify(compter),
                },
              })
            }
            style={styles.compterItem}
          >
            <Text style={styles.compterLabel}>{compter.label}</Text>
            <Text style={styles.compterNumber}>Numéro: {compter.number}</Text>
            <Text style={styles.compterDate}>
              {compter.updatedAt
                ? `Dernière mise à jour: ${new Date(
                    compter.updatedAt
                  ).toLocaleDateString()}`
                : "Dernière recharge le: 12/10/2025"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CompterList;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    fontFamily: "SpaceGrotesk",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SpaceGrotesk",
  },
  refreshButton: {
    padding: 8,
  },
  refreshButtonText: {
    fontSize: 20,
  },
  compterItem: {
    width: "97%",
    minHeight: 75,
    borderColor: Colors.dark.borderColor,
    borderWidth: 2,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
    paddingVertical: 8,
    marginVertical: 5,
    backgroundColor: Colors.dark.pink,
  },
  compterLabel: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
    fontFamily: "SpaceGrotesk",
  },
  compterNumber: {
    fontWeight: "500",
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
    fontFamily: "SpaceGrotesk",
  },
  compterDate: {
    fontWeight: "300",
    fontSize: 12,
    color: "#666",
    fontFamily: "SpaceGrotesk",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    fontFamily: "SpaceGrotesk",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "SpaceGrotesk",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "SpaceGrotesk",
  },
  retryButton: {
    backgroundColor: Colors.dark.pink,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    fontFamily: "SpaceGrotesk",
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "SpaceGrotesk",
  },
});

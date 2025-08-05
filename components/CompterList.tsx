import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { useCompter } from "@/hooks/useCompter";

// Interface pour typer vos compteurs
interface Compter {
  id: number;
  label: string;
  number: string;
  createdAt?: string;
  updatedAt?: string;
}

const CompterList = () => {
  // ✅ Utilisation correcte du hook
  const { compter: compters, loading, error, refreshCompter } = useCompter();

  console.log(compters["data"]);

  // Gestion du loading
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.dark.pink} />
        <Text style={styles.loadingText}>Chargement des compteurs...</Text>
      </View>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erreur: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshCompter}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Gestion du cas où il n'y a pas de compteurs
  if (!compters || compters.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Aucun compteur disponible</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshCompter}>
          <Text style={styles.retryButtonText}>Actualiser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Liste des comptes disponibles</Text>
        <TouchableOpacity onPress={refreshCompter} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>🔄</Text>
        </TouchableOpacity>
      </View>

      {compters["data"].map((compter: Compter) => {
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
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
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
  },
  compterNumber: {
    fontWeight: "500",
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  compterDate: {
    fontWeight: "300",
    fontSize: 12,
    color: "#666",
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
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.dark.pink,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

import React, { useCallback, useState } from "react";
import { Text } from "@/components/Themed";
import { useFocusEffect } from "expo-router";
import databaseService from "@/services/DatabaseService";

const MonthlySpendedAmount = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  useFocusEffect(
    useCallback(() => {
      const getAllReport = async () => {
        try {
          setLoading(true);
          const response = await databaseService.getAllReport();
          setReports(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      getAllReport();
    }, [])
  );

  // Calcul du montant dépensé
  const calculateMonthlyAmount = () => {
    try {
      if (!reports || reports.length === 0) {
        return "0 FCFA";
      }
      // CORRECTION: Vérification du type et de la structure des données
      const total = reports.reduce((sum, item) => {
        const amount =
          typeof item === "object" && item !== null ? (item as any).amount : 0;
        return sum + (amount || 0);
      }, 0);

      return `${total.toLocaleString()} FCFA`;
    } catch (error) {
      console.error("Erreur lors du calcul:", error);
      return "Erreur de calcul";
    }
  };

  return <Text>{calculateMonthlyAmount()}</Text>;
};

export default MonthlySpendedAmount;

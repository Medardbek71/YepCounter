import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import databaseService from "@/services/DatabaseService";
import { formatNumber } from "@/utils/formatNumber";

const MonthlySpendedAmount = () => {
  const [totalMonthlySpend, setTotalMonthlySpend] = useState();
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await databaseService.getMonthlySpended();
        if (response.success) {
          setTotalMonthlySpend(response.data);
          console.log(
            "voici la somme totale dépensé depuis le début du mois",
            totalMonthlySpend
          );
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);
  return <Text>{formatNumber(totalMonthlySpend)} FCFA</Text>;
};

export default MonthlySpendedAmount;

const styles = StyleSheet.create({});

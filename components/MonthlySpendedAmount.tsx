import React, { useEffect, useState } from "react";
import { Text } from "@/components/Themed";
import { useCompter } from "@/hooks/useCompter";

const MonthlySpendedAmount = () => {
  const { compter, loading, error } = useCompter();
  console.log(compter);
  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>Erreur: {error}</Text>;
  }

  // Exemple de calcul du montant dépensé (à adapter selon votre logique métier)
  const calculateMonthlyAmount = () => {
    try {
      if (!compter || compter.length === 0) {
        return "0 FCFA";
      }
      console.log(compter['data']);
      const total = compter["data"].reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      );
      return `${total.toLocaleString()} FCFA`;
    } catch (error) {
      console.error(error);
    }
  };

  return <Text>{calculateMonthlyAmount()}</Text>;
};

export default MonthlySpendedAmount;

// import React, { useEffect, useState } from "react";
// import { Text } from "@/components/Themed";
// import { useReport } from "@/hooks/useReport";

// const MonthlySpendedAmount = () => {
//   const { reports, loading, error } = useReport();
//   // console.log(reports, loading, error);
//   if (loading) {
//     return <Text>Chargement...</Text>;
//   }

//   if (error) {
//     return <Text>Erreur: {error}</Text>;
//   }

//   // Exemple de calcul du montant dépensé (à adapter selon votre logique métier)
//   const calculateMonthlyAmount = () => {
//     try {
//       if (!reports || reports.length === 0) {
//         return "0 FCFA";
//       }
//       const total = reports.reduce((sum, item) => sum + (item.amount || 0), 0);
//       return `${total.toLocaleString()} FCFA`;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return <Text>{calculateMonthlyAmount()}</Text>;
// };

// export default MonthlySpendedAmount;

import React from "react";
import { Text } from "@/components/Themed";
import { useReport } from "@/hooks/useReport";

const MonthlySpendedAmount = () => {
  const { reports, loading, error } = useReport();

  console.log(
    "Debug - reports:",
    reports,
    "loading:",
    loading,
    "error:",
    error
  );

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>Erreur: {error}</Text>;
  }

  // Calcul du montant dépensé
  const calculateMonthlyAmount = () => {
    try {
      if (!reports || reports.length === 0) {
        return "0 FCFA";
      }
      console.log("Je suis le plus bon");

      // CORRECTION: Vérification du type et de la structure des données
      const total = reports["data"].reduce((sum, item) => {
        const amount =
          typeof item === "object" && item !== null ? (item as any).amount : 0;
        console.log(amount);
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

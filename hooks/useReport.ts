import { getAllReport } from "../store/slices/reportSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useCallback } from "react";

export const useReport = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { reports, loading, error } = useSelector(
    (state: RootState) => state.report
  );

  // Création d'une fonction de rechargement mémoïsée
  const refetch = useCallback(async () => {
    try {
      await dispatch(getAllReport()).unwrap();
    } catch (error) {
      console.error("Erreur lors du rechargement des bilans", error);
      throw error;
    }
  }, [dispatch]);

  // Chargement initial
  useEffect(() => {
    refetch();
  }, [refetch]);

  const getMonthlySpended = async () => {
    try {
      const results = await dispatch(getAllReport()).unwrap();
      return results;
    } catch (error) {
      console.error(
        "Nous rencontrons une erreur lors de la récupération des bilans",
        error
      );
      throw error;
    }
  };

  return {
    reports,
    loading,
    error,
    refetch, // On expose la fonction de rechargement
    getMonthlySpended, // On conserve la fonction existante
  };
};

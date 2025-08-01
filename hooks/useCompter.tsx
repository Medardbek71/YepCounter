import {
  fetchData,
  createCompter,
  getCompterById,
  deleteCompter,
} from "@/store/slices/eneoSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store"; // Vous devez créer ces types

interface CreateCompterParams {
  label: string;
  number: string;
}

export const useCompter = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Correction: Utiliser le bon chemin du state et les bons noms de propriétés
  const { data, loading, error, lastUpdated } = useSelector(
    (state: RootState) => state.eneo
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleNewCompter = async (newCompter: CreateCompterParams) => {
    try {
      // ✅ Correction: unwrap() pour gérer les erreurs des thunks
      const result = await dispatch(createCompter(newCompter)).unwrap();
      return result;
    } catch (error) {
      console.error("Erreur dans l'ajout du nouveau compter", error);
      throw error;
    }
  };

  const handleGetCompterById = async (id: number) => {
    try {
      const result = await dispatch(getCompterById({ id })).unwrap();
      return result;
    } catch (error) {
      console.error(
        "Nous rencontrons une erreur pour récupérer le compteur",
        error
      );
      throw error;
    }
  };

  const handleDeleteCompter = async (id: number) => {
    try {
      const result = await dispatch(deleteCompter({ id })).unwrap();
      return result;
    } catch (error) {
      console.error(
        "Nous rencontrons des problèmes pour supprimer le compteur",
        error
      );
      throw error;
    }
  };

  // ✅ Correction: Appeler la fonction fetchData
  const refreshCompter = () => {
    dispatch(fetchData());
  };

  return {
    // ✅ Correction: Retourner 'data' au lieu de 'compter' qui n'existe pas
    compter: data,
    loading,
    error,
    lastUpdated, // ✅ Correction: Orthographe
    createCompter: handleNewCompter,
    getCompterById: handleGetCompterById,
    deleteCompter: handleDeleteCompter,
    refreshCompter,
  };
};

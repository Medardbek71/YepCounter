import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import databaseService from "@/services/DatabaseService";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SpaceGrotesk: require("../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
    SpaceGroteskBold: require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [isDbInitialized, setDbInitialized] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    const setupDb = async (): Promise<void> => {
      try {
        console.log("Initialisation de la base de donnée...");
        await databaseService.initDb();
        setDbInitialized(true);
      } catch (error) {
        console.error("Database error:", error);
        setDbError(error instanceof Error ? error.message : "Erreur inconnue");
      }
    };
    setupDb();
  }, []);

  if (dbError) {
    return (
      <SafeAreaView>
        <Text>Erreur d'initialisation de la base : {dbError}</Text>
      </SafeAreaView>
    );
  }

  if (!isDbInitialized) {
    return (
      <SafeAreaView>
        <Text>Chargement de la base de données...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarBackground: () => null,
        sceneContainerStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          width: "60%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: 40,
          backgroundColor: "#fff",
          bottom: 50,
          elevation: 10,
        },
        tabBarIconStyle: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: 75,
          height: 50,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          color: "white",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Statistique",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

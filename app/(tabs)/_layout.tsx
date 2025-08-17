import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { View } from "react-native";

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
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: 70,
          width: "100%",
          borderTopWidth: 0,
          bottom: 50,
          backgroundColor: "transparent",
          elevation: 0,
        },
        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
          width: 50,
          height: 50,
        },
        tabBarItemStyle: {
          flex: 1,
          width: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              backgroundColor: "#a3ba64",
              borderRadius: 45,
              height: 75,
              width: "70%",
              borderColor: "black",
              borderWidth: 1,
              padding: 10,
            }}
          />
        ),
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

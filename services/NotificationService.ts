import * as Notifications from "expo-notifications";

export const initializeNotifications = () => {
  // First, set the handler that will cause the notification
  // to show the alert
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  Notifications.requestPermissionsAsync();
  Notifications.scheduleNotificationAsync({
    content: {
      body: "⏰ C'est déja l'heure du bilan",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 20,
      minute: 0,
    },
  });
  console.log("Notification quotidienne programmée");
};

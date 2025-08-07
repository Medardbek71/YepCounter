import * as Notifications from "expo-notifications";

export const initializeNotifications = () => {
  // First, set the handler that will cause the notification
  // to show the alert
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

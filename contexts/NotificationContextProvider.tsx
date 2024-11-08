import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { NotificationContext } from "./NotificationContext";
import { registerForPushNotificationsAsync } from "@/common/utils/notifications";

const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [pushToken, setPushToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const unsubscribe = () => {
    Notifications.removeNotificationSubscription(
      notificationListener.current as Notifications.Subscription
    );
    Notifications.removeNotificationSubscription(
      responseListener.current as Notifications.Subscription
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        unsubscribe,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;

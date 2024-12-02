import React, { createContext, useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/common/utils/notifications';

interface NotificationContextProps {
  unsubscribe: () => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
  unsubscribe: () => {},
});

const NotificationsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [_expoPushToken, setExpoPushToken] = useState('');
  const [_notification, setNotification] = useState<Notifications.Notification>();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => token && setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const unsubscribe = () => {
    Notifications.removeNotificationSubscription(notificationListener.current as Notifications.Subscription);
    Notifications.removeNotificationSubscription(responseListener.current as Notifications.Subscription);
  };

  return (
    <NotificationContext.Provider
      value={{
        unsubscribe,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationsContextProvider;

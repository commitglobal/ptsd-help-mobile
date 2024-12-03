import React, { createContext, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/common/utils/notifications';
import { router } from 'expo-router';

interface NotificationContextProps {
  unsubscribe: () => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
  unsubscribe: () => {},
});

const NotificationsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  // register for push notifications
  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // redirect to the url from the notification
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  const unsubscribe = () => {
    try {
      Notifications.removeNotificationSubscription(notificationListener.current as Notifications.Subscription);
      Notifications.removeNotificationSubscription(responseListener.current as Notifications.Subscription);
    } catch (e) {
      console.error(e);
    }
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

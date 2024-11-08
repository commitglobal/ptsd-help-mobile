import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      showBadge: true,
    });
  }

  if (Device.isDevice) {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.error("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId,
        })
      ).data;
    } catch (err) {
      console.log(err);
    }
  } else {
    console.error("Must use physical device for Push Notifications");
  }

  return token;
}


export async function schedulePushNotification(
  className: string,
  slot: string,
  type: string,
  time: Date,
  day: string
) {
    console.log('scheduling notification')
    time = new Date(time.getTime() - 5 * 60000);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = days.indexOf(day) + 1;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: className + " " + type,
        body: slot,
        // sound: 'default',
      },
      trigger: {
        weekday: weekday,
        hour: hours,
        minute: minutes,
        repeats: true,
      },
  });
  console.log("notif id on scheduling", id);
  return id;
}

schedulePushNotification("Math", "10:00 AM", "Lecture", new Date(), "Monday");
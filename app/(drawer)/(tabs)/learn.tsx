import Button from "@/components/Button";
import { Screen } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import { useCalendar } from "@/hooks/useCalendar";
import { useSendSMS } from "@/hooks/useSMS";
import React from "react";

const Learn = () => {

  const { sendSMS } = useSendSMS();

  const handleSendSMS = () => {
    const message = "Hello! Don't forget our hot meeting tomorrow at 10 AM.";
    sendSMS(message);
  };



  const { openCalendarAddEvent } = useCalendar();

  const handleOpenCalendar = () => {
    const eventDetails = {
      title: 'Este asta ce ti-ai dorit de la viata?',
      location: 'Conference Room B',
      startDate: new Date('2024-11-10T14:00:00'),
      endDate: new Date('2024-11-10T15:00:00'),
    };

    openCalendarAddEvent(eventDetails);
  };


  return (
    <Screen>
      <Button onPress={handleOpenCalendar} >Open Calendar Add Event</Button>
      <Button onPress={handleSendSMS} >Send SMS</Button>
    </Screen>
  );
};

export default Learn;

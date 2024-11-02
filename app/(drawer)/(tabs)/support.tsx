import React from "react";
import { Screen as ScreenComponent } from "@/components/Screen";
import { Typography } from "@/components/Typography";
import { FlatList } from "react-native";

const mockData = [
  {
    id: 1,
    text: "First item text",
  },
  {
    id: 2,
    text: "Second item text",
  },
  {
    id: 3,
    text: "Third item text",
  },
  {
    id: 4,
    text: "Fourth item text",
  },
  {
    id: 5,
    text: "Fifth item text",
  },
];

export default function Support() {
  return (
    <ScreenComponent contentContainerStyle={{ padding: "$md" }}>
      <Typography preset="heading">Screen without header</Typography>
      <FlatList
        data={mockData}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => <Typography>{item.text}</Typography>}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </ScreenComponent>
  );
}

import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";

import React from "react";
import { Separator } from "tamagui";

export default function Play() {
  return (
    <>
      <Header
        title="Header title"
        titleProps={{ color: "white" }}
        statusBarStyle="light"
        iconLeft={<Icon icon="chevronLeft" color="white" />}
        onLeftPress={() => {
          console.log("left pressed");
        }}
        iconRight={<Icon icon="heart" color="white" />}
        onRightPress={() => {
          console.log("right pressed");
        }}
      />
    </>
  );
}

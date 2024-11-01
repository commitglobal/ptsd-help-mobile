import React from "react";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

export default function HeaderImageSkeletonLoader() {
  return (
    <MotiView
      from={{
        opacity: 0.5,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Skeleton colorMode="light" width={"100%"} height={"100%"} radius={3} />
    </MotiView>
  );
}

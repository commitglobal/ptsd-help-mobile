import React from "react";
import { Screen as ScreenComponent } from "@/components/Screen";
import { Typography } from "@/components/Typography";


export default function About() {
    return (
        <ScreenComponent contentContainerStyle={{ padding: "$md" }}>
            <Typography preset="heading">About</Typography>
        </ScreenComponent>
    );
}

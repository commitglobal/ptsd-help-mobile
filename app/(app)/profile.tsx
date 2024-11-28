import React from "react";
import { Screen as ScreenComponent } from "@/components/Screen";
import { Typography } from "@/components/Typography";

export default function Profile() {
	return (
		<ScreenComponent contentContainerStyle={{ padding: "$md" }}>
			<Typography preset="heading">My Profile</Typography>
		</ScreenComponent>
	);
}

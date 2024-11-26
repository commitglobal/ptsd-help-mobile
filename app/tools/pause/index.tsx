import { Stack, useRouter } from "expo-router";
import { TOOLS_TRANSLATIONS_CONFIG } from "@/_config/translations.config";
import { useTranslation } from "react-i18next";
import { TOOLS_MEDIA_MAPPER } from "@/_config/media.mapper";
import { useToolManagerContext } from "@/contexts/ToolManagerContextProvider";
import { Icon } from "@/components/Icon";
import { ScreenWithChangingText } from "@/components/ScreenWithChangingText";
import { Typography } from "@/components/Typography";
import { YStack } from "tamagui";
import Button from "@/components/Button";
import { useEffect, useState } from "react";

const PAUSE_TIME = 10
export default function Pause() {
	const [isPauseActive, setIsPauseActive] = useState(false);
	const [timeLeft, setTimeLeft] = useState(PAUSE_TIME);
	const { t } = useTranslation('tools');
	const router = useRouter();

	const { finishTool } = useToolManagerContext();

	const translationsKeys = TOOLS_TRANSLATIONS_CONFIG.PAUSE
	const mediaMapper = TOOLS_MEDIA_MAPPER.PAUSE;

	const items = t(translationsKeys.repeater, {
		returnObjects: true,
	}) as Record<string, { title: string; description: string }>;

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isPauseActive) {
			interval = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev > 0) {
						return prev - 1;
					} else {
						clearInterval(interval);
						setIsPauseActive(false);
						return PAUSE_TIME;
					}
				});

			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isPauseActive]);

	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<ScreenWithChangingText
				headerProps={{
					title: t(translationsKeys.label),
					iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
					onLeftPress: () => router.back(),
				}}
				staticText={t(translationsKeys.helper)}
				items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
				imageUrl={mediaMapper.headerImageURI}
				footerProps={{ onMainAction: () => finishTool() }}

			>
				<YStack alignItems='center' justifyContent='center' gap='$4' marginBottom='$12' marginTop='auto'>
					{!isPauseActive && (
						<Button onPress={() => setIsPauseActive(true)}>
							{t(translationsKeys.takeBreak)}
						</Button>
					)}
					{isPauseActive && (
						<Typography preset='heading'>
							{`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
						</Typography>
					)}
				</YStack>
			</ScreenWithChangingText>
		</>
	);
};

import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
export default function HelpSleep() {
  const { t } = useTranslation('tools');
  const router = useRouter();

  const { finishTool } = useToolManagerContext();

  const { mediaMapping } = useAssetsManagerContext();
  const { toolsTranslationKeys } = useTranslationKeys();

  const items = t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HELP.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenWithChangingText
        headerProps={{
          title: t(toolsTranslationKeys.SLEEP.subcategories.SLEEP_HELP.label),
          iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
          onLeftPress: () => router.back(),
        }}
        staticText={''}
        items={Object.values(items).map((item) => ({ ...item, id: item.title }))}
        imageUrl={mediaMapping['SLEEP.SLEEP_HELP.CATEGORY_ICON']}
        footerProps={{ onMainAction: () => finishTool() }}></ScreenWithChangingText>
    </>
  );
}

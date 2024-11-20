import { TOOLS_MEDIA_MAPPER } from '@/_config/media.mapper';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { Icon } from '@/components/Icon';
import { ScreenWithChangingText } from '@/components/ScreenWithChangingText';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const HealthyArguments = () => {
  const { t } = useTranslation('tools');
  const router = useRouter();

  const translationsKeys = TOOLS_TRANSLATIONS_CONFIG.RELATIONSHIPS.subcategories.HEALTHY_ARGUMENTS;
  const mediaMapper = TOOLS_MEDIA_MAPPER.RELATIONSHIPS.HEALTHY_ARGUMENTS;

  const items = t(translationsKeys.repeater, {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

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
        items={Object.values(items).map((item) => ({ ...item, id: item.description }))}
        imageUrl={mediaMapper.headerImageURI}
      />
    </>
  );
};

export default HealthyArguments;

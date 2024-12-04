import React, { useRef } from 'react';
import { Screen } from '@/components/Screen';
import { ScrollView, XStack } from 'tamagui';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import TextFormInput from '@/components/TextFormInput';
import { TextInput } from 'react-native';
import { scrollToItem } from '@/helpers/scrollToItem';
import { Controller, useForm } from 'react-hook-form';
import { RID } from '@/db/repositories/rid.repository';
import { useRIDContext } from '@/contexts/RIDContextProvider';

const Decide = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const scrollViewRef = useRef<ScrollView>(null);
  const decisionRef = useRef<TextInput>(null);

  const { setDecision } = useRIDContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RID>();

  const handleFocus = () => {
    if (scrollViewRef.current && decisionRef.current) {
      scrollToItem(scrollViewRef, decisionRef);
    }
  };

  const onSubmit = (data: RID) => {
    const { decision } = data;
    setDecision(decision);
    router.push('/tools/rid/summary');
  };

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.RID.ridDecide),
        iconLeft: <Icon icon='chevronLeft' width={24} height={24} />,
        onLeftPress: router.back,
      }}
      footerProps={{
        mainActionLabel: t(toolsTranslationKeys.RID.continue),
        onMainAction: handleSubmit(onSubmit),
      }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ padding: '$md', gap: '$sm' }}
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        <XStack justifyContent='center'>
          <Typography preset='heading'>{t(toolsTranslationKeys.RID.r)}</Typography>
          <Typography preset='heading'>{t(toolsTranslationKeys.RID.i)}</Typography>
          <Typography preset='heading' color='$tomato10'>
            {t(toolsTranslationKeys.RID.d)}
          </Typography>
        </XStack>
        <Typography preset='subheading' textAlign='center'>
          {t(toolsTranslationKeys.RID.decideNext)}
        </Typography>

        <Typography>{t(toolsTranslationKeys.RID.finalStep)}</Typography>

        <Controller
          control={control}
          name='decision'
          rules={{ required: { value: true, message: t('general.required', { ns: 'translation' }) } }}
          render={({ field: { onChange, value } }) => (
            <TextFormInput
              ref={decisionRef}
              label={t(toolsTranslationKeys.RID.whatWillYouDecide)}
              placeholder={t(toolsTranslationKeys.RID.decisionPlaceholder)}
              onFocus={handleFocus}
              onChangeText={onChange}
              value={value || ''}
              errorMessage={errors.decision?.message as string}
            />
          )}
        />
      </ScrollView>
    </Screen>
  );
};

export default Decide;

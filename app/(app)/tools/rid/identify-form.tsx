import React, { useRef } from 'react';
import { Screen } from '@/components/Screen';
import useTranslationKeys from '@/hooks/useTranslationKeys';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { ScrollView, XStack } from 'tamagui';
import { Typography } from '@/components/Typography';
import TextFormInput from '@/components/TextFormInput';
import { TextInput } from 'react-native';
import { scrollToItem } from '@/helpers/scrollToItem';
import { Controller, useForm } from 'react-hook-form';
import { RID } from '@/db/repositories/rid.repository';
import { useRIDContext } from '@/contexts/RIDContextProvider';

const RIDIdentifyForm = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const scrollViewRef = useRef<ScrollView>(null);
  const triggerRef = useRef<TextInput>(null);
  const differentRef = useRef<TextInput>(null);

  const { setTrigger, setDifference } = useRIDContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RID>();

  const handleScroll = (ref: React.RefObject<TextInput>) => {
    if (scrollViewRef.current && ref.current) {
      scrollToItem(scrollViewRef, ref);
    }
  };

  const onSubmit = (data: any) => {
    const { trigger, difference } = data;
    setTrigger(trigger);
    setDifference(difference);
    router.push('/tools/rid/decide');
  };

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.RID.ridIdentify),
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
          <Typography preset='heading' color='$tomato10'>
            {t(toolsTranslationKeys.RID.i)}
          </Typography>
          <Typography preset='heading'>{t(toolsTranslationKeys.RID.d)}</Typography>
        </XStack>
        <Typography preset='subheading' textAlign='center'>
          {t(toolsTranslationKeys.RID.identifyTrigger)}
        </Typography>

        <Controller
          name='trigger'
          control={control}
          rules={{ required: { value: true, message: t('general.required', { ns: 'translation' }) } }}
          render={({ field: { onChange, value } }) => (
            <TextFormInput
              label={t(toolsTranslationKeys.RID.trigger)}
              placeholder={t(toolsTranslationKeys.RID.triggerPlaceholder)}
              ref={triggerRef}
              onFocus={() => handleScroll(triggerRef)}
              onChangeText={onChange}
              value={value || ''}
              errorMessage={errors.trigger?.message as string}
            />
          )}
        />
        <Controller
          name='difference'
          control={control}
          rules={{ required: { value: true, message: t('general.required', { ns: 'translation' }) } }}
          render={({ field: { onChange, value } }) => (
            <TextFormInput
              label={t(toolsTranslationKeys.RID.different)}
              placeholder={t(toolsTranslationKeys.RID.placeholder)}
              ref={differentRef}
              onFocus={() => handleScroll(differentRef)}
              onChangeText={onChange}
              value={value || ''}
              errorMessage={errors.difference?.message as string}
            />
          )}
        />
      </ScrollView>
    </Screen>
  );
};

export default RIDIdentifyForm;

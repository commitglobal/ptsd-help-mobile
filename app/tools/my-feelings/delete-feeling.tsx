import React, { useState } from 'react';
import { Screen } from '@/components/Screen';
import { router, useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { ScrollView, XStack, YStack, Circle, Spinner } from 'tamagui';
import { format } from 'date-fns';
import { useFeeling } from '@/services/feelings.service';
import feelingsRepository from '@/db/repositories/feelings.repository';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';

export default function DeleteFeeling() {
  const { t } = useTranslation('tools');
  const translationKey = TOOLS_TRANSLATIONS_CONFIG.MY_FEELINGS;
  const feelingsTranslationKey = TOOLS_TRANSLATIONS_CONFIG.FEELINGS;

  const [deleteFeelingModalOpen, setDeleteFeelingModalOpen] = useState(false);
  const { feelingId } = useLocalSearchParams();
  const { data: feeling, isLoading } = useFeeling(Number(feelingId));

  const handleDeleteFeeling = async () => {
    try {
      await feelingsRepository.deleteFeeling(Number(feelingId));
      router.back();
    } catch (error) {
      console.error('Error deleting feeling', error);
    }
  };

  return (
    <>
      <Screen
        headerProps={{
          title: t(translationKey.feelingsSummary),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} onPress={router.back} />,
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}
        footerProps={{
          onMainAction: () => setDeleteFeelingModalOpen(true),
          mainActionLabel: t(translationKey.delete),
        }}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 8 }}>
          {isLoading ? (
            <YStack flex={1} justifyContent='center' alignItems='center'>
              <Spinner size='large' color='$blue11' />
            </YStack>
          ) : feeling ? (
            <>
              <Typography textAlign='center'>{t(translationKey.feelingsSummaryDescription)}</Typography>
              <Typography textAlign='center' fontWeight='bold'>
                {format(new Date(feeling.createdAt), 'EEEE, MMM. d, yyyy')}
              </Typography>

              {/* my feelings section */}
              <Typography preset='subheading' color='$blue11' marginTop='$md'>
                {t(translationKey.myFeelings)}
              </Typography>
              {feeling.feelings.map((feeling) => (
                <YStack key={feeling.mainFeeling} gap='$xxs'>
                  <Typography preset='subheading'>{t(feelingsTranslationKey[feeling.mainFeeling].MAIN)}</Typography>
                  {feeling.secondaryFeelings.length !== 0 &&
                    feeling.secondaryFeelings.map((secondaryFeeling) => {
                      return (
                        <XStack key={secondaryFeeling} alignItems='center' gap='$xxs'>
                          <Circle size={8} backgroundColor='$blue11' />
                          <Typography>{t(secondaryFeeling)}</Typography>
                        </XStack>
                      );
                    })}
                </YStack>
              ))}

              {/* emotion intensity */}
              <Typography preset='subheading' color='$blue11' marginTop='$md'>
                {t(translationKey.emotionIntensity)}
              </Typography>
              <Typography>{feeling.discomfort}%: </Typography>
            </>
          ) : null}
        </ScrollView>
      </Screen>
      {deleteFeelingModalOpen && (
        <DeleteConfirmationModal setModalOpen={setDeleteFeelingModalOpen} handleDelete={handleDeleteFeeling} />
      )}
    </>
  );
}

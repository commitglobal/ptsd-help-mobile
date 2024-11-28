import React, { useState } from 'react';
import { Screen } from '@/components/Screen';
import { router, useLocalSearchParams } from 'expo-router';
import { Typography } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { useTranslation } from 'react-i18next';
import { ScrollView, XStack, YStack, Circle, Spinner } from 'tamagui';
import { format } from 'date-fns';
import { useFeeling } from '@/services/feelings.service';
import feelingsRepository from '@/db/repositories/feelings.repository';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';
import { getDiscomfortLevel, useDiscomfortLevels } from '@/contexts/FeelingsContextProvider';
import { GenericError } from '@/components/GenericError';
import { MainFeeling } from '@/enums/MainFeeling';
import useTranslationKeys from '@/hooks/useTranslationKeys';

export default function DeleteFeeling() {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();

  const [deleteFeelingModalOpen, setDeleteFeelingModalOpen] = useState(false);
  const { feelingId } = useLocalSearchParams();
  const { data: feeling, isLoading, error } = useFeeling(Number(feelingId));
  const discomfortLevels = useDiscomfortLevels();
  const currentDiscomfortLevel = getDiscomfortLevel(feeling?.discomfort ?? 0, discomfortLevels);

  const handleDeleteFeeling = async () => {
    try {
      await feelingsRepository.deleteFeeling(Number(feelingId));
      router.back();
    } catch (error) {
      console.error('Error deleting feeling', error);
    }
  };

  if (error) {
    return (
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.MY_FEELINGS.feelingsSummary),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} onPress={router.back} />,
        }}
        contentContainerStyle={{ backgroundColor: 'white', padding: 24 }}>
        <GenericError />
      </Screen>
    );
  }

  return (
    <>
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.MY_FEELINGS.feelingsSummary),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} onPress={router.back} />,
        }}
        contentContainerStyle={{ backgroundColor: 'white' }}
        footerProps={{
          onMainAction: () => setDeleteFeelingModalOpen(true),
          mainActionLabel: t(toolsTranslationKeys.MY_FEELINGS.delete),
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
              <Typography textAlign='center'>
                {t(toolsTranslationKeys.MY_FEELINGS.feelingsSummaryDescription)}
              </Typography>
              <Typography textAlign='center' fontWeight='bold'>
                {format(new Date(feeling.createdAt), 'EEEE, MMM. d, yyyy')}
              </Typography>

              {/* my feelings section */}
              <Typography preset='subheading' color='$blue11' marginTop='$md'>
                {t(toolsTranslationKeys.MY_FEELINGS.myFeelings)}
              </Typography>
              {Object.keys(feeling.feelings).map((mainFeeling) => (
                <YStack key={mainFeeling} gap='$xxs'>
                  <Typography preset='subheading'>
                    {t(toolsTranslationKeys.FEELINGS[mainFeeling as MainFeeling].MAIN)}
                  </Typography>
                  {feeling.feelings[mainFeeling as MainFeeling]?.length !== 0 &&
                    feeling.feelings[mainFeeling as MainFeeling]?.map((secondaryFeeling) => {
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
                {t(toolsTranslationKeys.MY_FEELINGS.emotionIntensity)}
              </Typography>
              <Typography>
                {feeling.discomfort}%: {currentDiscomfortLevel}
              </Typography>
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

import useTranslationKeys from '@/hooks/useTranslationKeys';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { BulletPoint } from '@/components/BulletPoint';
import { Icon } from '@/components/Icon';
import { ScrollView, Spinner, YStack } from 'tamagui';
import { useRID } from '@/services/rid.service';
import { format } from 'date-fns';
import { GenericError } from '@/components/GenericError';
import ridRepository from '@/db/repositories/rid.repository';
import { DeleteConfirmationModal } from '@/components/DeleteConfirmationModal';

const RIDId = () => {
  const { t } = useTranslation('tools');
  const { toolsTranslationKeys } = useTranslationKeys();
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const { data: rid, isLoading, error } = useRID(Number(id));
  const [deleteFeelingModalOpen, setDeleteFeelingModalOpen] = useState(false);

  const handleDeleteRID = async () => {
    try {
      await ridRepository.deleteRID(Number(id));
      router.back();
    } catch (error) {
      console.error('Error deleting RID', error);
    }
  };

  if (error) {
    return (
      <Screen
        headerProps={{
          title: t(toolsTranslationKeys.RID.ridSummary),
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
          title: t(toolsTranslationKeys.RID.ridSummary),
          iconLeft: <Icon icon='chevronLeft' width={24} height={24} />,
          onLeftPress: router.back,
        }}
        footerProps={{
          mainActionLabel: t(toolsTranslationKeys.RID.delete),
          onMainAction: () => setDeleteFeelingModalOpen(true),
        }}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 8 }}>
          {isLoading ? (
            <YStack flex={1} justifyContent='center' alignItems='center'>
              <Spinner size='large' color='$blue11' />
            </YStack>
          ) : rid ? (
            <>
              <Typography fontWeight='bold'>{t(toolsTranslationKeys.RID.date)}</Typography>
              <BulletPoint text={format(new Date(rid?.createdAt || ''), 'dd.MM.yyyy')} />
              <Typography fontWeight='bold'>{t(toolsTranslationKeys.RID.triggeredHow)}</Typography>
              <BulletPoint text={rid.trigger} />
              <Typography fontWeight='bold'>{t(toolsTranslationKeys.RID.differentSituation)}</Typography>
              <BulletPoint text={rid?.difference} />
              <Typography fontWeight='bold'>{t(toolsTranslationKeys.RID.youDecided)}</Typography>
              <BulletPoint text={rid?.decision} />
            </>
          ) : null}
        </ScrollView>
      </Screen>
      {deleteFeelingModalOpen && (
        <DeleteConfirmationModal setModalOpen={setDeleteFeelingModalOpen} handleDelete={handleDeleteRID} />
      )}
    </>
  );
};

export default RIDId;

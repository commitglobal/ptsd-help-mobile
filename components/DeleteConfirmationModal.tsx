import React from 'react';
import { Modal } from '@/components/Modal';
import { Typography } from '@/components/Typography';
import { YStack, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import Button from './Button';

export const DeleteConfirmationModal = ({
  setModalOpen,
  handleDelete,
}: {
  setModalOpen: (open: boolean) => void;
  handleDelete: () => void;
}) => {
  const { t } = useTranslation('tools');

  return (
    <Modal open onOpenChange={setModalOpen}>
      <YStack minHeight={100}>
        <Typography>{t('common.delete-confirmation', { ns: 'translation' })}</Typography>
        <XStack justifyContent='flex-end' gap='$md'>
          <Button preset='chromeless' onPress={() => setModalOpen(false)}>
            {t('common.no', { ns: 'translation' })}
          </Button>
          <Button preset='chromeless' textStyle={{ color: 'red' }} onPress={handleDelete}>
            {t('common.yes', { ns: 'translation' })}
          </Button>
        </XStack>
      </YStack>
    </Modal>
  );
};

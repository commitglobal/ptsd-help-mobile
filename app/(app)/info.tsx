import React, { useCallback, useMemo } from 'react';
import { Screen } from '@/components/Screen';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@/components/Typography';
import { Accordion, ScrollView, Square } from 'tamagui';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { BulletPoint } from '@/components/BulletPoint';

interface ContentItem {
  type: 'text' | 'list';
  content: string | string[];
}

export default function InfoScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const sections = useMemo(() => t('info.content', { returnObjects: true }), [t]);
  const sectionEntries = useMemo(
    () =>
      Object.entries(sections).map(([key, section]) => ({
        id: key,
        title: section.title,
        content: section.content,
      })),
    [sections]
  );

  const renderContent = useCallback((content: ContentItem[]) => {
    return content.map((item: ContentItem, index: number) => {
      if (item.type === 'text') {
        return (
          <Typography key={index} color='$gray11'>
            {item.content}
          </Typography>
        );
      } else if (item.type === 'list') {
        return (item.content as string[]).map((item: string, index: number) => (
          <BulletPoint text={item} key={index} textStyle={{ color: '$gray11' }} />
        ));
      }
      return null;
    });
  }, []);

  return (
    <Screen
      headerProps={{
        title: t('info.title'),
        paddingTop: Platform.OS === 'ios' ? '$md' : insets.top + 16,
        iconRight: <Icon icon='x' width={24} height={24} color='$gray12' />,
        onRightPress: () => router.back(),
      }}>
      <ScrollView
        contentContainerStyle={{ padding: '$md', paddingBottom: insets.bottom + 16, backgroundColor: '$gray3' }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Accordion flex={1} type='multiple' gap='$md'>
          {sectionEntries.map((section) => (
            <Accordion.Item value={section.id} key={section.id}>
              <Accordion.Trigger
                flexDirection='row'
                justifyContent='space-between'
                borderRadius={8}
                // @ts-ignore
                elevation={1}
                shadowColor='$blue12'
                shadowOffset={{ width: 0, height: 2 }}
                shadowRadius={4}
                shadowOpacity={0.2}
                borderWidth={0}
                pressStyle={{
                  backgroundColor: '$gray1',
                }}
                zIndex={1000}>
                {({ open }: { open: boolean }) => (
                  <>
                    <Typography color='$gray12'>{section.title}</Typography>
                    <Square animation='quick' rotate={open ? '180deg' : '0deg'}>
                      <Icon icon='chevronLeft' width={16} height={16} rotate={'270deg'} />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>

              <Accordion.Content marginTop={-10} paddingTop={20} gap='$md' backgroundColor='white' borderRadius={8}>
                {renderContent(section.content)}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScrollView>
    </Screen>
  );
}

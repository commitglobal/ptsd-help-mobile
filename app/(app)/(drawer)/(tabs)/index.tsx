import { ScrollView, XStack } from 'tamagui';
import React from 'react';
import { Typography } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { useRouter, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen } from '@/components/Screen';
import { DrawerActions } from '@react-navigation/native';
import { MonthlyEvaluationCard } from '@/components/MonthlyEvaluationCard';
import { FavoritesHorizontalList } from '@/components/FavoritesHorizontalList';
import { SymptomsHorizontalList } from '@/components/SymptomsHorizontalList';
import { LearnHorizontalList } from '@/components/LearnHorizontalList';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const router = useRouter();

  const { learnContent } = useAssetsManagerContext();

  return (
    <Screen
      headerProps={{
        title: t('general.ptsd-help'),
        iconLeft: <Icon icon='menuAlt2' width={24} height={24} color='$gray12' />,
        onLeftPress: () => navigation.dispatch(DrawerActions.openDrawer),
      }}
      contentContainerStyle={{ backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{ padding: '$md', gap: '$lg', flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/* symptoms */}
        <XStack gap='$md' alignItems='center'>
          <Typography preset='default' flex={1}>
            {t('dashboard.feeling')}
          </Typography>
          <XStack
            //  margin and padding account for the pressArea
            marginVertical={-16}
            padding='$md'
            pressStyle={{
              opacity: 0.5,
            }}
            onPress={() =>
              router.push({
                pathname: '/manage',
                params: { tabId: 'symptoms' },
              })
            }>
            <Typography preset='default' color='$blue11' fontWeight='bold'>
              {t('dashboard.see-all')}
            </Typography>
          </XStack>
        </XStack>
        <XStack marginHorizontal={-32}>
          <SymptomsHorizontalList />
        </XStack>

        {/* monthly evaluation */}
        {/* //todo: on press */}
        <MonthlyEvaluationCard onPress={() => {}} />

        {/* learn about ptsd */}
        <XStack gap='$md' alignItems='center'>
          <Typography preset='default' flex={1}>
            {t('dashboard.learn')}
          </Typography>
          <XStack
            //  margin and padding account for the pressArea
            marginVertical={-16}
            padding='$md'
            pressStyle={{
              opacity: 0.5,
            }}
            onPress={() =>
              router.push({
                pathname: '/content/category',
                params: { type: 'learn', pageId: learnContent.pages[0].id },
              })
            }>
            <Typography preset='default' color='$blue11' fontWeight='bold'>
              {t('dashboard.see-all')}
            </Typography>
          </XStack>
        </XStack>
        <XStack marginHorizontal={-32}>
          <LearnHorizontalList />
        </XStack>

        {/* favorite tools */}
        <Typography>{t('dashboard.favorite-instruments')}</Typography>
        <XStack marginHorizontal={-32}>
          <FavoritesHorizontalList />
        </XStack>
      </ScrollView>
    </Screen>
  );
}

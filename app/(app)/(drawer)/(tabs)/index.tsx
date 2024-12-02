import { ScrollView, XStack } from 'tamagui';
import React from 'react';
import Button from '@/components/Button';
import { Typography } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { useRouter, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Screen } from '@/components/Screen';
import { DrawerActions } from '@react-navigation/native';
import { CircleHorizontalScrollView } from '@/components/CircleHorizontalScrollView';
import { MonthlyEvaluationCard } from '@/components/MonthlyEvaluationCard';
import { CardsHorizontalScrollView } from '@/components/CardsHorizontalScrollView';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const router = useRouter();

  const feelings = [
    { label: t('symptoms.trauma'), icon: 'zap' },
    { label: t('symptoms.avoiding-triggers'), icon: 'circleSlash' },
    { label: t('symptoms.disconnected-people'), icon: 'usersRound' },
    { label: t('symptoms.disconnected-reality'), icon: 'unplug' },
    { label: t('symptoms.sad-hopeless'), icon: 'cloudDrizzle' },
    { label: t('symptoms.worried-anxious'), icon: 'lifeboat' },
    { label: t('symptoms.angry'), icon: 'angry' },
  ];

  const questions = [
    { title: 'What is PTSD?' },
    { title: 'How long does PTSD last?' },
    { title: 'Problems related to PTSD' },
    { title: 'PTSD and relationships' },
  ];

  const favoriteInstruments = [
    { label: 'Tool 1', icon: 'bike' },
    { label: 'Tool 2', icon: 'chatBubble' },
    { label: 'Tool 3', icon: 'bike' },
  ];

  return (
    <Screen
      headerProps={{
        title: t('general.ptsd-help'),
        iconLeft: <Icon icon='menuAlt2' width={24} height={24} color='$gray12' />,
        onLeftPress: () => navigation.dispatch(DrawerActions.openDrawer),
      }}
      contentContainerStyle={{ backgroundColor: 'white' }}>
      <ScrollView
        contentContainerStyle={{ padding: '$lg', gap: '$md', flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
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
          {/* //todo: on press */}
          <CircleHorizontalScrollView items={feelings} onItemPress={() => {}} />
        </XStack>

        {/* monthly evaluation */}
        {/* //todo: on press */}
        <MonthlyEvaluationCard onPress={() => {}} />

        {/* learn about ptsd */}
        <XStack marginTop='$md'>
          <Typography flex={1}>{t('dashboard.learn')}</Typography>
          <Typography color='$blue11' fontWeight='bold'>
            {t('dashboard.see-all')}
          </Typography>
        </XStack>

        <XStack marginHorizontal={-32}>
          <CardsHorizontalScrollView items={questions} />
        </XStack>

        {/* favorite instruments */}

        <Typography marginTop='$md'>{t('dashboard.favorite-instruments')}</Typography>
        <XStack marginHorizontal={-32}>
          <CircleHorizontalScrollView
            items={favoriteInstruments}
            // todo: on press
            onItemPress={() => {}}
          />
        </XStack>

        <Button onPress={() => router.push('/onboarding')}>Go to onboarding</Button>
        <Button onPress={() => router.push('/tools/relationships/iMessages')}>Go to iMessages</Button>
      </ScrollView>
    </Screen>
  );
}

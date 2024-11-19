import React, { useState } from 'react';
import { Typography } from './Typography';

import { FlashList } from '@shopify/flash-list';
import { XStack, Card, YStack, YStackProps } from 'tamagui';
import MediaPlayer from './MediaPlayer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';

export interface AudioFile {
  id: string;
  label: string;
  uri: string;
  isVideo: boolean;
}

interface ListAudioCardProps extends YStackProps {
  item: { id: string; label: string };
  selected: boolean;
}

const ListAudioCard = ({ item, selected, ...rest }: ListAudioCardProps) => {
  return (
    <Card {...rest} backgroundColor={selected ? '$blue9' : '$white'} pressStyle={{ opacity: 0.5 }}>
      <XStack alignItems='center' gap='$md' padding='$sm'>
        <Typography flex={1} color={selected ? '#fff' : '$black'}>
          {item.label}
        </Typography>
      </XStack>
    </Card>
  );
};

export const AudioPlaylistPlayer = ({ audios }: { audios?: AudioFile[] }) => {
  const [selectedAudio, setSelectedAudio] = useState<AudioFile | null>(null);

  const insets = useSafeAreaInsets();

  return (
    <YStack flex={1} backgroundColor='white'>
      {!selectedAudio && (
        <XStack
          backgroundColor='$blue4'
          alignItems='center'
          gap='$md'
          marginHorizontal='$md'
          padding='$md'
          borderRadius='$md'>
          <Icon icon='musicalNote' width={24} height={24} color='$blue9' />
          <Typography color='$blue10' fontWeight='bold'>
            Select an audio to play
          </Typography>
        </XStack>
      )}

      {/* flashlist */}
      <YStack flex={1}>
        <FlashList
          bounces={false}
          data={audios}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ListAudioCard
              key={item.id}
              item={item}
              onPress={() => setSelectedAudio(item)}
              selected={selectedAudio?.id === item.id}
            />
          )}
          extraData={selectedAudio}
          ItemSeparatorComponent={() => <YStack height={8} />}
          estimatedItemSize={80}
        />
      </YStack>

      {/* selected audio label */}
      {selectedAudio && (
        <XStack backgroundColor='$blue4' justifyContent='center' alignItems='center' padding='$sm' width='100%'>
          <Typography color='$blue9' fontWeight='bold' textAlign='center' b>
            {selectedAudio.label}
          </Typography>
        </XStack>
      )}

      {/* media player controls */}
      {selectedAudio && (
        <XStack
          flex={0.3}
          marginBottom={insets.bottom + 16}
          justifyContent='center'
          alignItems='center'
          marginHorizontal='$md'
          padding='$md'>
          <MediaPlayer mediaURI={selectedAudio?.uri} isVideo={false} />
        </XStack>
      )}
    </YStack>
  );
};

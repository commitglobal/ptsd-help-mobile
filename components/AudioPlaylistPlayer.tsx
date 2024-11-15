import React, { useState } from "react"
import { Typography } from "./Typography"

import { FlashList } from "@shopify/flash-list";
import { XStack, Card, YStack, YStackProps } from "tamagui";
import MediaPlayer from "./MediaPlayer";

export interface AudioFile {
  id: string;
  label: string;
  uri: string;
  isVideo: boolean;
}



interface ListAudioCardProps extends YStackProps {
  item: { id: string; label: string; };
  selected: boolean;
}

const ListAudioCard = ({ item, selected, ...rest }: ListAudioCardProps) => {
  return (
    <Card {...rest} backgroundColor={selected ? '$blue9' : '$white'}>
      <XStack alignItems="center" gap="$md" padding="$sm">
        <Typography flex={1} color={selected ? '#fff' : '$black'} >{item.label}</Typography>
      </XStack>
    </Card>
  );
};


export const AudioPlaylistPlayer = ({ audios }: { audios?: AudioFile[] }) => {
  const [selectedAudio, setSelectedAudio] = useState<AudioFile | null>(null);

  return (
    <YStack display="flex" flexDirection="column" height="100%" marginTop={0} paddingTop={0} backgroundColor="white">
      <FlashList
        bounces={false}
        data={audios}
        contentContainerStyle={{ padding: 8, }}
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
      <YStack display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='40%'>
        {selectedAudio && <YStack alignItems='center' justifyContent='center' backgroundColor='$blue9' width='100%' height={48}>
          <Typography color='white' fontSize={16} fontWeight='bold' >{selectedAudio.label}</Typography>
        </YStack>}
        {selectedAudio && <MediaPlayer mediaURI={selectedAudio.uri} isVideo={false} />}
        {!selectedAudio && <Typography>Select an audio to play</Typography>}
      </YStack>
    </YStack >
  )
}
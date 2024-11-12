import React, { useEffect, useState } from "react"
import { Typography } from "./Typography"
import { Screen } from "./Screen"
import { FlashList } from "@shopify/flash-list";
import { ListCard } from "./ListCard";
import { XStack, Card, YStack, YStackProps } from "tamagui";
import MediaPlayer from "./MediaPlayer";

export interface AudioFile {
  id: string;
  label: string;
  uri: string;
  isVideo: boolean;
}

export const PLAYLIST: AudioFile[] = [
  {
    id: "1",
    label: "Comfdsafda”",
    uri: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
    isVideo: false
  },
  {
    id: "2",
    label: "Comfort Fit - “Sorry”",
    uri: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    isVideo: false
  },
  {
    id: "3",
    label: "Mildred Bailey – “All Of Me”",
    uri: "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
    isVideo: false
  },
  {
    id: "4",
    label: "Podington Bear - “Rubber Robot”",
    uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
    isVideo: false
  },
  {
    id: "5",
    label: "Podington B",
    uri: "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
    isVideo: false
  },

  {
    id: "6",
    label: "Podington B fdsafdsa",
    uri: "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
    isVideo: false
  },
  {
    id: "7",
    label: "Podington Thrust",
    uri: "http://commondatastorage.googleapis.com/codeskulptor-assets/sounddogs/thrust.mp3",
    isVideo: false
  },
  {
    id: "8",
    label: "Podingfdsafdsaton B",
    uri: "http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3",
    isVideo: false
  },


];

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


export const AudioPlaylistPlayer = ({ audios = PLAYLIST }: { audios?: AudioFile[] }) => {
  const [selectedAudio, setSelectedAudio] = useState<AudioFile | null>(null);

  useEffect(() => {
    console.log(selectedAudio);
  }, [selectedAudio]);

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
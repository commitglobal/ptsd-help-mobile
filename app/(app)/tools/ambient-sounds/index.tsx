import useTranslationKeys from '@/hooks/useTranslationKeys';
import { AudioFile, AudioPlaylistPlayer } from '@/components/AudioPlaylistPlayer';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';
import { useAssetsManagerContext } from '@/contexts/AssetsManagerContextProvider';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function AmbientSounds() {
  const router = useRouter();
  const { finishTool } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const { mediaMapping } = useAssetsManagerContext();

  const { toolsTranslationKeys } = useTranslationKeys();

  const PLAYLIST: AudioFile[] = [
    {
      id: '1',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.beach),
      uri: mediaMapping['AMBIENT_SOUNDS.BEACH.soundURI'],
      isVideo: false,
    },
    {
      id: '2',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.birds),
      uri: mediaMapping['AMBIENT_SOUNDS.BIRDS.soundURI'],
      isVideo: false,
    },
    {
      id: '3',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.countryRoad),
      uri: mediaMapping['AMBIENT_SOUNDS.COUNTRY_ROAD.soundURI'],
      isVideo: false,
    },
    {
      id: '4',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.crickets),
      uri: mediaMapping['AMBIENT_SOUNDS.CRICKETS.soundURI'],
      isVideo: false,
    },
    {
      id: '5',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.drippingWater),
      uri: mediaMapping['AMBIENT_SOUNDS.DRIPPING_WATER.soundURI'],
      isVideo: false,
    },

    {
      id: '6',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.forest),
      uri: mediaMapping['AMBIENT_SOUNDS.FOREST.soundURI'],
      isVideo: false,
    },
    {
      id: '7',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.frogs),
      uri: mediaMapping['AMBIENT_SOUNDS.FROGS.soundURI'],
      isVideo: false,
    },
    {
      id: '8',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.marsh),
      uri: mediaMapping['AMBIENT_SOUNDS.MARSH.soundURI'],
      isVideo: false,
    },
    {
      id: '9',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.publicPool),
      uri: mediaMapping['AMBIENT_SOUNDS.PUBLIC_POOL.soundURI'],
      isVideo: false,
    },
    {
      id: '10',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.rain),
      uri: mediaMapping['AMBIENT_SOUNDS.RAIN.soundURI'],
      isVideo: false,
    },
    {
      id: '11',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.runningWater),
      uri: mediaMapping['AMBIENT_SOUNDS.RUNNING_WATER.soundURI'],
      isVideo: false,
    },
    {
      id: '12',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.streamWater),
      uri: mediaMapping['AMBIENT_SOUNDS.STREAM_WATER.soundURI'],
      isVideo: false,
    },
    {
      id: '13',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.waterfall),
      uri: mediaMapping['AMBIENT_SOUNDS.WATERFALL.soundURI'],
      isVideo: false,
    },
    {
      id: '14',
      label: t(toolsTranslationKeys.AMBIENT_SOUNDS.wind),
      uri: mediaMapping['AMBIENT_SOUNDS.WIND.soundURI'],
      isVideo: false,
    },
  ];

  return (
    <Screen
      headerProps={{
        title: t(toolsTranslationKeys.AMBIENT_SOUNDS.label, { ns: 'tools' }),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{
        onMainAction: () => finishTool(),
      }}>
      <AudioPlaylistPlayer audios={PLAYLIST} />
    </Screen>
  );
}

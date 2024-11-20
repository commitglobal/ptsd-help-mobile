import { TOOLS_MEDIA_MAPPER } from '@/_config/media.mapper';
import { TOOLS_TRANSLATIONS_CONFIG } from '@/_config/translations.config';
import { AudioFile, AudioPlaylistPlayer } from '@/components/AudioPlaylistPlayer';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';
import { useToolManagerContext } from '@/contexts/ToolManagerContextProvider';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function AmbientSounds() {
  const router = useRouter();
  const { finishTool } = useToolManagerContext();
  const { t } = useTranslation('tools');

  const translationKeys = TOOLS_TRANSLATIONS_CONFIG.AMBIENT_SOUNDS;
  const mediaMapper = TOOLS_MEDIA_MAPPER.AMBIENT_SOUNDS;

  const PLAYLIST: AudioFile[] = [
    {
      id: '1',
      label: t(translationKeys.beach),
      uri: mediaMapper.BEACH.soundURI,
      isVideo: false,
    },
    {
      id: '2',
      label: t(translationKeys.birds),
      uri: mediaMapper.BIRDS.soundURI,
      isVideo: false,
    },
    {
      id: '3',
      label: t(translationKeys.countryRoad),
      uri: mediaMapper.COUNTRY_ROAD.soundURI,
      isVideo: false,
    },
    {
      id: '4',
      label: t(translationKeys.crickets),
      uri: mediaMapper.CRICKETS.soundURI,
      isVideo: false,
    },
    {
      id: '5',
      label: t(translationKeys.drippingWater),
      uri: mediaMapper.DRIPPING_WATER.soundURI,
      isVideo: false,
    },

    {
      id: '6',
      label: t(translationKeys.forest),
      uri: mediaMapper.FOREST.soundURI,
      isVideo: false,
    },
    {
      id: '7',
      label: t(translationKeys.frogs),
      uri: mediaMapper.FROGS.soundURI,
      isVideo: false,
    },
    {
      id: '8',
      label: t(translationKeys.marsh),
      uri: mediaMapper.MARSH.soundURI,
      isVideo: false,
    },
    {
      id: '9',
      label: t(translationKeys.publicPool),
      uri: mediaMapper.PUBLIC_POOL.soundURI,
      isVideo: false,
    },
    {
      id: '10',
      label: t(translationKeys.rain),
      uri: mediaMapper.RAIN.soundURI,
      isVideo: false,
    },
    {
      id: '11',
      label: t(translationKeys.runningWater),
      uri: mediaMapper.RUNNING_WATER.soundURI,
      isVideo: false,
    },
    {
      id: '12',
      label: t(translationKeys.streamWater),
      uri: mediaMapper.STREAM_WATER.soundURI,
      isVideo: false,
    },
    {
      id: '13',
      label: t(translationKeys.waterfall),
      uri: mediaMapper.WATERFALL.soundURI,
      isVideo: false,
    },
    {
      id: '14',
      label: t(translationKeys.wind),
      uri: mediaMapper.WIND.soundURI,
      isVideo: false,
    },
  ];

  return (
    <Screen
      headerProps={{
        title: t(translationKeys.label, { ns: 'tools' }),
        iconLeft: <Icon icon='chevronLeft' color='$gray12' width={24} height={24} />,
        onLeftPress: () => router.back(),
      }}
      footerProps={{
        onMainAction: () => finishTool(),
      }}>
      {/* TODO: add real audios */}
      <AudioPlaylistPlayer audios={PLAYLIST} />
    </Screen>
  );
}

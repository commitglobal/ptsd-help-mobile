import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableHighlight, Image, Text } from 'react-native';
import { Asset } from 'expo-asset';
import Slider from '@react-native-community/slider';

class Icon {
  module: any;
  width: number;
  height: number;
  constructor(module: any, width: number, height: number) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_TRACK_1 = new Icon(require('@/assets/images/media-player/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('@/assets/images/media-player/thumb_1.png'), 18, 19);

const ICON_PLAY_BUTTON = new Icon(require('@/assets/images/media-player/play_button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('@/assets/images/media-player/pause_button.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('@/assets/images/media-player/stop_button.png'), 22, 22);
const ICON_MUTED_BUTTON = new Icon(require('@/assets/images/media-player/muted_button.png'), 67, 58);
const ICON_UNMUTED_BUTTON = new Icon(require('@/assets/images/media-player/unmuted_button.png'), 67, 58);

const ICON_FULLSCREEN_BUTTON = new Icon(require('@/assets/images/media-player/fullscreen_button.png'), 67, 58);

const { width: DEVICE_WIDTH } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const BUFFERING_STRING = 'Buffering ...';

export default function VideoScreen({ videoURI }: { videoURI: string | null }) {
  const ref = useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  const player: VideoPlayer = useVideoPlayer(videoURI, (player) => {
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener('playingChange', (isPlaying) => {
      setIsLoading(false);
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(player.currentTime / player.duration);
      }, 500);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, player]);

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    player.pause();
    setIsPlaying(false);
  };

  const handleFullscreen = () => {
    ref.current?.enterFullscreen();
    setIsFullscreen(!isFullscreen);
  };

  const handleFullscreenExit = () => {
    setIsFullscreen(false);
  };

  const handleSeekSliderValueChange = () => {
    player.pause();
  };

  const handleSeekSliderSlidingComplete = (value: number) => {
    player.currentTime = value * player.duration;
    player.play();
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const getTimestamp = (progress: number) => {
    const currentTime = Math.floor(progress * player.duration);
    const duration = Math.floor(player.duration);
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = currentTime % 60;
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = duration % 60;
    return `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.contentContainer}>
      <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        allowsFullscreen
        nativeControls={isFullscreen}
        onFullscreenExit={handleFullscreenExit}
      />
      <View
        style={[
          styles.playbackContainer,
          {
            opacity: isLoading ? DISABLED_OPACITY : 1.0,
          },
        ]}>
        <Slider
          style={styles.playbackSlider}
          trackImage={ICON_TRACK_1.module}
          thumbImage={ICON_THUMB_1.module}
          minimumTrackTintColor='#000000'
          maximumTrackTintColor='gray'
          value={progress}
          onValueChange={handleSeekSliderValueChange}
          onSlidingComplete={handleSeekSliderSlidingComplete}
          disabled={isLoading}
        />
        <View style={styles.timestampRow}>
          <Text style={[styles.text, styles.buffering]}>{isLoading ? BUFFERING_STRING : ''}</Text>
          <Text style={[styles.text, styles.timestamp]} key={player.currentTime}>
            {getTimestamp(progress)}
          </Text>
        </View>
      </View>
      <View style={[styles.buttonsContainerBase, styles.buttonsContainerTopRow]}>
        <TouchableHighlight underlayColor={BACKGROUND_COLOR} onPress={handleMute}>
          <Image style={styles.button} source={isMuted ? ICON_MUTED_BUTTON.module : ICON_UNMUTED_BUTTON.module} />
        </TouchableHighlight>
        <TouchableHighlight underlayColor={BACKGROUND_COLOR} onPress={handlePlayPause} disabled={isLoading}>
          <Image style={styles.button} source={isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module} />
        </TouchableHighlight>
        <TouchableHighlight underlayColor={BACKGROUND_COLOR} onPress={handleStop} disabled={isLoading}>
          <Image style={styles.button} source={ICON_STOP_BUTTON.module} />
        </TouchableHighlight>
        {!isFullscreen && (
          <TouchableHighlight underlayColor={BACKGROUND_COLOR} onPress={handleFullscreen}>
            <Image style={styles.button} source={ICON_FULLSCREEN_BUTTON.module} />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    marginTop: 100,
    width: DEVICE_WIDTH,
    height: '110%',
  },

  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_THUMB_1.height * 2.0,
    marginBottom: 30,
  },
  playbackSlider: {
    alignSelf: 'center',
    width: DEVICE_WIDTH - 30,
    maxWidth: 400,
  },
  timestampRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    minHeight: FONT_SIZE,
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
  },
  buffering: {
    textAlign: 'left',
    paddingLeft: 20,
  },
  timestamp: {
    textAlign: 'right',
    paddingRight: 20,
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    // maxHeight: 32,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
});

import React from "react";
import { Dimensions, StyleSheet, Text, TouchableHighlight, Image } from "react-native";
import { View } from "tamagui";
import {
    Audio,
    AVPlaybackStatus,
    InterruptionModeAndroid,
    InterruptionModeIOS,
    ResizeMode,
    Video
} from "expo-av";
import Slider from "@react-native-community/slider";
import { Asset } from "expo-asset";
import { Typography } from "./Typography";
export const PLAYLIST = [
    {
        name: "Dragostea",
        uri: "https://d2c5tif9s6pex6.cloudfront.net/o5jeis%2Ffile%2F7ce1f6683e48fa92fc0cc410a24fe322_c769e1e2057ef81f8bfbfd3652cb1e60.mp3?response-content-disposition=inline%3Bfilename%3D%227ce1f6683e48fa92fc0cc410a24fe322_c769e1e2057ef81f8bfbfd3652cb1e60.mp3%22%3B&response-content-type=audio%2Fmpeg&Expires=1731356418&Signature=YfSJyT7CNOgRjS8Sie0k1-mow8-Ft-MaulxjKEcy9ovDb~-n9yRedwFiTD-iSLlEuvoN8Vz67-9OxhJjxIi-rzphbl9ay8FPgSI-O9fnmKVe3vKccw1qCoI6M8oNiUm9cAYcrFiMII5cHMi~SskEDDakihMoyjVtuEwFX66TdZpSk6G0hQn21i-KvHknyk9SeRysVWyKJhiHHCxX7In~mn88I0GuBOa6lPDBkexLrTieKgwwz74V3FNvazgaqTs9S6hsdAh-s1-KyYOU9noUowlfJHq~pmaOIYzb-xkYd5B6edWMuKNaY9pVQXKh4GRJ8~JAPd0wt20GTJlvtUInCw__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ",
        isVideo: false
    },
    {
        name: "Comfort Fit - “Sorry”",
        uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
        isVideo: false
    },
    {
        name: "Big Buck Bunny",
        uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        isVideo: true
    },
    {
        name: "Mildred Bailey – “All Of Me”",
        uri: "https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3",
        isVideo: false
    },
    {
        name: "Popeye - I don't scare",
        uri: "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
        isVideo: true
    },
    {
        name: "Podington Bear - “Rubber Robot”",
        uri: "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3",
        isVideo: false
    }
];


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

const ICON_TRACK_1 = new Icon(require("@/assets/images/media-player/track_1.png"), 166, 5);
const ICON_THUMB_1 = new Icon(require("@/assets/images/media-player/thumb_1.png"), 18, 19);

const ICON_PLAY_BUTTON = new Icon(
    require("@/assets/images/media-player/play_button.png"),
    34,
    51
);
const ICON_PAUSE_BUTTON = new Icon(
    require("@/assets/images/media-player/pause_button.png"),
    34,
    51
);
const ICON_STOP_BUTTON = new Icon(
    require("@/assets/images/media-player/stop_button.png"),
    22,
    22
);
const ICON_MUTED_BUTTON = new Icon(
    require("@/assets/images/media-player/muted_button.png"),
    67,
    58
);
const ICON_UNMUTED_BUTTON = new Icon(
    require("@/assets/images/media-player/unmuted_button.png"),
    67,
    58
);

const ICON_FULLSCREEN_BUTTON = new Icon(
    require("@/assets/images/media-player/fullscreen_button.png"),
    67,
    58
);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFFFFF";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "Loading ...";
const BUFFERING_STRING = "Buffering ...";
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

interface PlaybackStatus {
    isLoaded: boolean;
    positionMillis?: number;
    durationMillis?: number;
    shouldPlay?: boolean;
    isPlaying?: boolean;
    isBuffering?: boolean;
    rate?: number;
    isMuted?: boolean;
    volume?: number;
    isLooping?: boolean;
    shouldCorrectPitch?: boolean;
    didJustFinish?: boolean;
}

interface VideoReadyForDisplayEvent {
    naturalSize: {
        width: number;
        height: number;
    };
}

interface AppState {
    showVideo: boolean;
    playbackInstanceName: string;
    loopingType: number;
    muted: boolean;
    playbackInstancePosition: number | null;
    playbackInstanceDuration: number | null;
    shouldPlay: boolean;
    isPlaying: boolean;
    isBuffering: boolean;
    isLoading: boolean;
    fontLoaded: boolean;
    shouldCorrectPitch: boolean;
    volume: number;
    rate: number;
    videoWidth: number;
    videoHeight: number;
    poster: boolean;
    useNativeControls: boolean;
    fullscreen: boolean;
    throughEarpiece: boolean;

    loadingError: boolean;
}

export type MediaPlayerProps = {
    mediaURI: string;
    isVideo: boolean;
}

export default class MediaPlayer extends React.Component<MediaPlayerProps, AppState> {
    private isSeeking: boolean;
    private shouldPlayAtEndOfSeek: boolean;
    private playbackInstance: any;
    private _video: any;

    private isUnmounting: boolean = false;

    constructor(props: MediaPlayerProps) {
        super(props);

        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.playbackInstance = null;
        this.state = {
            showVideo: false,
            playbackInstanceName: LOADING_STRING,
            loopingType: LOOPING_TYPE_ALL,
            muted: false,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            fontLoaded: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            videoWidth: DEVICE_WIDTH,
            videoHeight: VIDEO_CONTAINER_HEIGHT,
            poster: false,
            useNativeControls: false,
            fullscreen: false,
            throughEarpiece: false,

            loadingError: false
        };
    }

    componentDidMount() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            playThroughEarpieceAndroid: false
        });
    }

    componentDidUpdate(prevProps: Readonly<MediaPlayerProps>, _prevState: Readonly<AppState>, _snapshot?: any): void {
        if (prevProps.mediaURI !== this.props.mediaURI) {
            this._loadNewPlaybackInstance(true);
        }
    }

    async componentWillUnmount() {
        this.isUnmounting = true;
        if (this.playbackInstance) {
            await Promise.all([
                this.playbackInstance.setStatusAsync({ shouldPlay: false }),
                this.playbackInstance.stopAsync(),
                this.playbackInstance.unloadAsync()
            ]);
            this.playbackInstance = null;
        }

    }

    async _loadNewPlaybackInstance(playing: boolean) {
        if (this.isUnmounting) {
            return;
        }
        this.setState({ loadingError: false });
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance = null;
        }

        const source = { uri: this.props.mediaURI };
        const initialStatus = {
            shouldPlay: playing,
            rate: this.state.rate,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
            volume: this.state.volume,
            isMuted: this.state.muted,
            isLooping: this.state.loopingType === LOOPING_TYPE_ONE
        };

        if (this.props.isVideo) {
            await this._video.loadAsync(source, initialStatus);
            this.playbackInstance = this._video;
        } else {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    source,
                    initialStatus,
                    this._onPlaybackStatusUpdate
                );
                this.playbackInstance = sound;
            } catch {
                this.setState({ loadingError: true });
            }
        }

        this._updateScreenForLoading(false);
    }



    _mountVideo = (component: any) => {
        this._video = component;
        this._loadNewPlaybackInstance(true);
    };

    _updateScreenForLoading(isLoading: boolean) {
        if (isLoading) {
            this.setState({
                showVideo: false,
                isPlaying: false,
                playbackInstanceName: LOADING_STRING,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true
            });
        } else {
            this.setState({
                playbackInstanceName: this.props.mediaURI,
                showVideo: this.props.isVideo,
                isLoading: false
            });
        }
    }

    _onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis || -1, // TODO: watch again to this
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
                shouldCorrectPitch: status.shouldCorrectPitch
            });
            if (status.didJustFinish && !status.isLooping) {
                this.playbackInstance.stopAsync();
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    _onLoadStart = () => {
        console.log(`ON LOAD START`);
    };

    _onLoad = (status: PlaybackStatus) => {
        console.log(`ON LOAD : ${JSON.stringify(status)}`);
    };

    _onError = (error: string) => {
        console.log(`ON ERROR : ${error}`);
    };

    _onReadyForDisplay = (event: VideoReadyForDisplayEvent) => {
        const widestHeight =
            (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
        if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
            this.setState({
                videoWidth:
                    (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
                    event.naturalSize.height,
                videoHeight: VIDEO_CONTAINER_HEIGHT
            });
        } else {
            this.setState({
                videoWidth: DEVICE_WIDTH,
                videoHeight:
                    (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
            });
        }
    };

    _onFullscreenUpdate = (event: { fullscreenUpdate: any }) => {
        console.log(
            `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
        );
    };

    _onPlayPausePressed = () => {
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
            } else {
                this.playbackInstance.playAsync();
            }
        }
    };

    _onStopPressed = () => {
        if (this.playbackInstance != null) {
            this.playbackInstance.stopAsync();
        }
    };

    _onMutePressed = () => {
        if (this.playbackInstance != null) {
            this.playbackInstance.setIsMutedAsync(!this.state.muted);
        }
    };

    _onSeekSliderValueChange = (_value: number) => {
        if (this.playbackInstance != null && !this.isSeeking) {
            this.isSeeking = true;
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
            this.playbackInstance.pauseAsync();
        }
    };

    _onSeekSliderSlidingComplete = async (value: number) => {
        if (this.playbackInstance != null) {
            this.isSeeking = false;
            const seekPosition = value * (this.state.playbackInstanceDuration || 0);
            if (this.shouldPlayAtEndOfSeek) {
                this.playbackInstance.playFromPositionAsync(seekPosition);
            } else {
                this.playbackInstance.setPositionAsync(seekPosition);
            }
        }
    };

    _getSeekSliderPosition() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return (
                this.state.playbackInstancePosition /
                this.state.playbackInstanceDuration
            );
        }
        return 0;
    }

    _getMMSSFromMillis(millis: number) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = (number: number) => {
            const string = number.toString();
            if (number < 10) {
                return "0" + string;
            }
            return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
    }

    _getTimestamp() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return `${this._getMMSSFromMillis(
                this.state.playbackInstancePosition
            )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
        }
        return "";
    }

    _onFullscreenPressed = () => {
        try {
            this._video.presentFullscreenPlayer();
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {/* VIDEO CONTAINER */}
                <View style={this.props.isVideo ? styles.videoContainer : {}}>
                    <Video
                        ref={this._mountVideo}
                        style={[
                            styles.video,
                            {
                                opacity: this.state.showVideo ? 1.0 : 0.0,
                                width: this.state.videoWidth,
                                height: this.props.isVideo ? this.state.videoHeight : 0
                            }
                        ]}
                        resizeMode={ResizeMode.CONTAIN}
                        onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad}
                        onError={this._onError}
                        onFullscreenUpdate={this._onFullscreenUpdate}
                        onReadyForDisplay={this._onReadyForDisplay}
                        useNativeControls={this.state.useNativeControls}
                    />
                </View>
                {/* PLAYBACK CONTAINER - TRACK LINE + TIMER */}
                <View
                    style={[
                        styles.playbackContainer,
                        {
                            opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
                        }
                    ]}
                >
                    <Slider
                        style={styles.playbackSlider}
                        trackImage={ICON_TRACK_1.module}
                        thumbImage={ICON_THUMB_1.module}
                        minimumTrackTintColor="#000000"
                        maximumTrackTintColor="gray"
                        value={this._getSeekSliderPosition()}
                        onValueChange={this._onSeekSliderValueChange}
                        onSlidingComplete={this._onSeekSliderSlidingComplete}
                        disabled={this.state.isLoading}
                    />
                    <View style={styles.timestampRow}>
                        <Text
                            style={[
                                styles.text,
                                styles.buffering,
                            ]}
                        >
                            {this.state.isBuffering ? BUFFERING_STRING : ""}
                        </Text>
                        <Text
                            style={[
                                styles.text,
                                styles.timestamp,
                            ]}
                        >
                            {this._getTimestamp()}
                        </Text>
                    </View>
                </View>
                {/* BUTTONS CONTAINER - PLAY, PAUSE, STOP, MUTE, FULLSCREEN */}
                <View
                    style={[
                        styles.buttonsContainerBase,
                        styles.buttonsContainerTopRow,
                        {
                            opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
                        }
                    ]}
                >
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        onPress={this._onMutePressed}
                    >
                        <Image
                            style={styles.button}
                            source={
                                this.state.muted
                                    ? ICON_MUTED_BUTTON.module
                                    : ICON_UNMUTED_BUTTON.module
                            }
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        onPress={this._onPlayPausePressed}
                        disabled={this.state.isLoading}
                    >
                        <Image
                            style={styles.button}
                            source={
                                this.state.isPlaying
                                    ? ICON_PAUSE_BUTTON.module
                                    : ICON_PLAY_BUTTON.module
                            }
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        onPress={this._onStopPressed}
                        disabled={this.state.isLoading}
                    >
                        <Image style={styles.button} source={ICON_STOP_BUTTON.module} />
                    </TouchableHighlight>
                    {this.state.showVideo && (
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            onPress={this._onFullscreenPressed}
                        >
                            <Image style={styles.button} source={ICON_FULLSCREEN_BUTTON.module} />
                        </TouchableHighlight>
                    )}

                </View>
                {this.state.loadingError && <Typography color="red">Errored loading media</Typography>}
                <View />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: BACKGROUND_COLOR
    },
    videoContainer: {
        height: VIDEO_CONTAINER_HEIGHT,
    },
    video: {
        maxWidth: DEVICE_WIDTH
    },
    playbackContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        minHeight: ICON_THUMB_1.height * 2.0,
        maxHeight: ICON_THUMB_1.height * 2.0,
        marginBottom: 30,
    },
    playbackSlider: {
        alignSelf: "center",
        width: DEVICE_WIDTH - 30,
        maxWidth: 400,
    },
    timestampRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
        minHeight: FONT_SIZE
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE
    },
    buffering: {
        textAlign: "left",
        paddingLeft: 20
    },
    timestamp: {
        textAlign: "right",
        paddingRight: 20
    },
    button: {
        backgroundColor: BACKGROUND_COLOR
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonsContainerTopRow: {
        maxHeight: ICON_PLAY_BUTTON.height,
        // maxHeight: 32,
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0
    },
});

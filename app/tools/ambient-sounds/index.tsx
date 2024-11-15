import { AudioFile, AudioPlaylistPlayer } from "@/components/AudioPlaylistPlayer";
import { Icon } from "@/components/Icon";
import { Screen } from "@/components/Screen";
import { useToolManagerContext } from "@/contexts/ToolManagerContextProvider";
import { useRouter } from "expo-router";

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

export default function AmbientSounds() {
	const router = useRouter();
	const { finishTool } = useToolManagerContext();

	return (
		<Screen
			headerProps={{
				title: 'Ambient Sounds',
				iconLeft: <Icon icon='chevronLeft' color='white' width={24} height={24} />,
				onLeftPress: () => router.back(),
				onRightPress: () => finishTool(),
				iconRight: <Icon icon='check' color='white' width={24} height={24} />,
			}}>
			{/* TODO: add real audios */}
			<AudioPlaylistPlayer audios={PLAYLIST} />
		</Screen>
	)
}

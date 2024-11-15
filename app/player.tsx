import MediaPlayer, { PLAYLIST } from "@/components/MediaPlayer";
import { ScreenWithImageHeader } from "@/components/ScreenWithImageHeader";


export default function Player() {
    return (<ScreenWithImageHeader imageUrl={'https://plus.unsplash.com/premium_vector-1730376548370-6371f7576b4c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}>
        <MediaPlayer mediaURI={PLAYLIST[0].uri} isVideo={PLAYLIST[0].isVideo} />
    </ScreenWithImageHeader>
    );
}

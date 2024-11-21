import { Screen } from '@/components/Screen';
import { Typography } from '@/components/Typography';
import { fs } from '@/common/fs/downloadAndUnzip';
import { useEffect, useState } from 'react';
// import { Image } from 'react-native';
import MediaPlayer from '@/components/MediaPlayer';
// import { Image } from 'expo-image';

const PUBLIC_ASSETS = {
  zip: 'https://publicbucketdata.s3.us-east-2.amazonaws.com/assets.zip',
  video: 'https://publicbucketdata.s3.us-east-2.amazonaws.com/test.mp4',
  audio: 'https://publicbucketdata.s3.us-east-2.amazonaws.com/emotional_discomfort.mp3',
  image: 'https://publicbucketdata.s3.us-east-2.amazonaws.com/timeout.jpg',
};

export default function Learn() {
  const loadFiles = async () => {
    const result = await fs.downloadAndUnzipFile(PUBLIC_ASSETS.zip);
    console.log(result);
  };

  loadFiles();

  const [video, setVideo] = useState<string | null>(null);

  useEffect(() => {
    initVideo();
  }, [video]);

  const initVideo = async () => {
    const { uri } = await fs.downloadFile(PUBLIC_ASSETS.video);
    setVideo(uri);
  };

  return (
    <Screen>
      <Typography>Learn</Typography>
      {/* <MediaPlayer mediaURI={video || ''} isVideo={false} /> */}
      <MediaPlayer mediaURI={video || ''} isVideo={true} />
      {/* <Image source={{ uri: video || '' }} /> */}
      {/* {video && <Image source={{ uri: video || '' }} style={{ width: 100, height: 100 }} />} */}
    </Screen>
  );
}

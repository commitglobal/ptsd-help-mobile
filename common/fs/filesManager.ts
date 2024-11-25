import * as FileSystem from 'expo-file-system';
import { useQuery } from '@tanstack/react-query';

interface DownloadResult {
  uri: string;
}

// export async function downloadFile(url: string): Promise<DownloadResult> {
//   try {
//     const fileName = url.split('/').pop() || 'downloaded-file';
//     const fileUri = `${FileSystem.documentDirectory}${fileName}`;

//     const downloadResumable = FileSystem.createDownloadResumable(url, fileUri, {}, (downloadProgress) => {
//       const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
//       console.log(`Download progress: ${(progress * 100).toFixed(2)}%`);
//     });

//     const { uri } = (await downloadResumable.downloadAsync()) ?? { uri: '' };
//     if (!uri) throw new Error('Download failed');

//     return { uri };
//   } catch (error) {
//     throw new Error(`Download failed: ${(error as Error).message}`);
//   }
// }

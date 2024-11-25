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

export const downloadAssetIfNeeded = async (url: string, destinationFolder: string, fileName: string) => {
  const filePath = `${destinationFolder}${fileName}`;

  if (await fileExists(filePath)) {
    console.log(`File already exists: ${filePath}`);
    return filePath;
  }

  try {
    const folderInfo = await FileSystem.getInfoAsync(destinationFolder);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(destinationFolder, { intermediates: true });
    }

    const result = await FileSystem.downloadAsync(url, filePath);
    console.log(`Downloaded: ${result.uri}`);
    return result.uri;
  } catch (error) {
    console.error(`Error downloading asset: ${url}`, error);
    return null;
  }
};

export const fileExists = async (filePath: string) => {
  const fileInfo = await FileSystem.getInfoAsync(filePath);
  return fileInfo.exists;
};

import * as FileSystem from 'expo-file-system';
import { unzipSync } from 'fflate';
import { Buffer } from 'buffer';

interface UnzipResult {
  dirUri: string;
  files: string[];
}

interface DownloadResult {
  uri: string;
}

export async function downloadFile(url: string): Promise<DownloadResult> {
  try {
    const fileName = url.split('/').pop() || 'downloaded-file';
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    const downloadResumable = FileSystem.createDownloadResumable(url, fileUri, {}, (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      console.log(`Download progress: ${(progress * 100).toFixed(2)}%`);
    });

    const { uri } = (await downloadResumable.downloadAsync()) ?? { uri: '' };
    if (!uri) throw new Error('Download failed');

    return { uri };
  } catch (error) {
    throw new Error(`Download failed: ${(error as Error).message}`);
  }
}

// https://stackoverflow.com/questions/78464789/having-trouble-downloading-and-unzipping-image-file-in-react-native-expo-app
async function downloadAndUnzipFile(url: string): Promise<UnzipResult> {
  try {
    const DIR_NAME = 'ptsd-assets';
    const dirUri = `${FileSystem.documentDirectory}${DIR_NAME}`;
    const zipPath = `${FileSystem.documentDirectory}assets.zip`;

    // Download file
    console.log('Downloading from', url);
    const { uri } = await FileSystem.downloadAsync(url, zipPath);
    console.log('Downloaded to', uri);

    // Read and convert to Uint8Array
    const zipBase64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const zipData = new Uint8Array(Buffer.from(zipBase64, 'base64'));

    console.log('zipData', zipData);

    // Create/reset directory
    const dirInfo = await FileSystem.getInfoAsync(dirUri);
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(dirUri, { idempotent: true });
    }
    await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });

    console.log('dirInfo', dirInfo);

    // Unzip and save files
    const unzipped = unzipSync(zipData);
    console.log('Files unzipped:', Object.keys(unzipped));

    const savedFiles = await Promise.all(
      Object.entries(unzipped).map(async ([fileName, data]) => {
        const filePath = `${dirUri}/${fileName}`;
        const base64Content = Buffer.from(data).toString('base64');
        await FileSystem.writeAsStringAsync(filePath, base64Content, {
          encoding: FileSystem.EncodingType.Base64,
        });
        console.log(`Saved ${fileName} to ${filePath}`);
        return filePath;
      })
    );

    // Cleanup
    await FileSystem.deleteAsync(zipPath);

    return { dirUri, files: savedFiles };
  } catch (error) {
    console.error('Failed to handle zip file:', error);
    throw error;
  }
}

export const fs = { downloadAndUnzipFile, downloadFile };

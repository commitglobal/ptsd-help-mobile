export type DownloadProgress = {
  filesDownloaded: number;
  totalNumberOfFiles: number;
};

export class DownloadProgressTracker {
  private filesDownloaded: number = 0;
  private totalNumberOfFiles: number = 0;
  private onProgressCallback?: (progress: DownloadProgress) => void;

  constructor(onProgress?: (progress: DownloadProgress) => void) {
    this.onProgressCallback = onProgress;
  }

  setTotalFiles(total: number) {
    this.totalNumberOfFiles = total;
    this.notifyProgress();
  }

  incrementDownloaded() {
    this.filesDownloaded++;
    this.notifyProgress();
  }

  private notifyProgress() {
    this.onProgressCallback?.({
      filesDownloaded: this.filesDownloaded,
      totalNumberOfFiles: this.totalNumberOfFiles,
    });
  }
}

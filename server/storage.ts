// This media downloader API is stateless and doesn't require storage
// All operations are performed on-demand without persisting data

export interface IStorage {
  // No storage methods needed for this stateless API
}

export class MemStorage implements IStorage {
  constructor() {
    // No storage needed for media downloader
  }
}

export const storage = new MemStorage();

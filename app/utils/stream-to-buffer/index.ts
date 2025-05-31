import stream from "stream";
export const streamToBuffer = // Helper to convert stream to buffer
  async (readableStream: stream.Readable): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      readableStream.on("data", (chunk) => chunks.push(chunk));
      readableStream.on("end", () => resolve(Buffer.concat(chunks)));
      readableStream.on("error", reject);
    });
  };

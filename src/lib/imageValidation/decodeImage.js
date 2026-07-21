// Decodes a File into an HTMLImageElement so dimensions/pixels can be inspected.
// Rejects anything the browser can't actually decode as an image (corrupt file,
// mislabeled MIME type, non-image binary renamed with an image extension, etc).
export function decodeImage(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not decode file as an image"));
    };

    img.src = objectUrl;
  });
}

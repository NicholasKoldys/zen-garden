onmessage = async ( event ) => {

  console.log( event.data );
  if( !event.data || !event.data.id || event.data?.id != "image" ) return;
  const { imageData, width, height } = event.data;

  try {
    const processedImageData = await sobelEdgeDetection(imageData, width, height, (progress) => {
      postMessage({ type: 'progress', progress });
    });

    postMessage({ type: 'result', imageData: processedImageData, width, height });

  } catch (error) {
    postMessage({ type: 'error', error: error });
  }
};


async function sobelEdgeDetection(imageData, width, height, reportProgress) {
  const data = imageData.data;
  const grayscale = new Uint8ClampedArray( width * height );
  const edges = new Uint8ClampedArray( width * height * 4 ); // RGBA for canvas

  // color conversion
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    grayscale[i / 4] = gray;
  }

  // Sobel Constants
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

  for( let y = 1; y < height - 1; y++ ) {
    for( let x = 1; x < width - 1; x++ ) {
      let gx = 0;
      let gy = 0;

      for( let i = -1; i <= 1; i++ ) {
        for( let j = -1; j <= 1; j++ ) {
          const pixel = grayscale[(y + i) * width + (x + j)];
          gx += sobelX[(i + 1) * 3 + (j + 1)] * pixel;
          gy += sobelY[(i + 1) * 3 + (j + 1)] * pixel;
        }
      }

      const magnitude = Math.sqrt(gx * gx + gy * gy);
      const edgeValue = Math.min(255, magnitude);

      const index = (y * width + x) * 4;
      edges[index] = edgeValue;     // Red
      edges[index + 1] = edgeValue; // Green
      edges[index + 2] = edgeValue; // Blue
      edges[index + 3] = 255;       // Alpha
    }
    if( reportProgress ) {
       reportProgress( Math.round( ( y / (height - 1) ) * 100 ) );
    }
  }

  return { data: edges };
}

export {};
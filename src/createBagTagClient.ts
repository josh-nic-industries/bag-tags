import createCanvasFromBagTagInformation from './createBagTag.ts'

import helvetica1 from '../public/Helvetica_Bold_Condensed.ttf'
import helvetica2 from '../public/Helvetica_Bold_Condensed.ttf'


const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
  });
};

const loadFont = async (name: string, src: string) => {
      const font = new FontFace(name, `url("${src}")`, {});
      await font.load()
      document.fonts.add(font);
}

export default async function loadAndDisplayImage (imgQuerySelector: string) {
  await loadFont ('Helvetica CBI', helvetica1)
  await loadFont ('Helvetica BC', helvetica2)
  const base64Img = await createCanvasFromBagTagInformation('H-200', 'Cool Coating', '20 minutes lol', '12345', '2021-09-01', '12345', '1', createCanvas, loadImage)
  //set #bagTag src to base64Img
  const img = document.querySelector<HTMLImageElement>(imgQuerySelector)!
  img.src = base64Img

  return null
}


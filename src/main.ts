import './style.css'
import createCanvasFromBagTagInformation from './createBagTag.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <img id='bagTag' />
`

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

export default function loadAndDisplayImage = async (imgQuerySelector: string) => {
  await loadFont ('Helvetica CBI', '/public/Helvetica Condensed Bold Italic.ttf')
  await loadFont ('Helvetica BC', '/public/Helvetica_Bold_Condensed.ttf')
  const base64Img = await createCanvasFromBagTagInformation('H-200', 'Cool Coating', '20 minutes lol', '12345', '2021-09-01', '12345', '1', createCanvas, loadImage)
  //set #bagTag src to base64Img
  const img = document.querySelector<HTMLImageElement>(imgQuerySelector)!
  img.src = base64Img

  return null
}


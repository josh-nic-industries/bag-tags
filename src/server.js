import createCanvasFromBagTagInformation from './createBagTag.js'

import base64ToZpl from './base64ToZpl';
/*import { createCanvas, loadImage, registerFont } from 'canvas'


registerFont(__dirname + '../public/Helvetica LT Condensed Bold Italic.ttf', { family: 'Helvetica CBI' })
registerFont(__dirname + '../public/Helvetica_Bold_Condensed.ttf', { family: 'Helvetica BC' })*/

export default async function createImage (createCanvas, loadImage) {
  const base64Img = await createCanvasFromBagTagInformation('H-200', 'Cool Coating', '20 minutes lol', '12345', '2021-09-01', '12345', '1', createCanvas, loadImage)
   return base64ToZpl(Buffer.from(base64Img, 'base64'))
}



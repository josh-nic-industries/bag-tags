import createCanvasFromBagTagInformation from './createBagTag'

import helvetica1 from '../public/Helvetica LT Condensed Bold Italic.ttf'
import helvetica2 from '../public/Helvetica_Bold_Condensed.ttf'
import base64ToZpl from './base64ToZpl';

const { createCanvas, loadImage, registerFont } = require('canvas');

registerFont(helvetica1, { family: 'Helvetica CBI' })
registerFont(helvetica2, { family: 'Helvetica BC' })

export default async function createImage (imgQuerySelector: string) {
  const base64Img = await createCanvasFromBagTagInformation('H-200', 'Cool Coating', '20 minutes lol', '12345', '2021-09-01', '12345', '1', createCanvas, loadImage)
   return base64ToZpl(Buffer.from(base64Img, 'base64'))
}



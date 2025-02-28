import { createCanvas, loadImage, registerFont } from 'canvas'
import fs from 'fs'
import { PNG } from 'pngjs'
import { rgbaToZ64 } from 'zpl-image'
import QRCode from 'qrcode'

export type GeneratedBagTagItem = {
    zplCommand: string
    base64TagImage: string
}

registerFont(__dirname + '/assets/Helvetica LT Condensed Bold Italic.ttf', {
    family: 'Helvetica CBI',
})

registerFont(__dirname + '/assets/Helvetica_Bold_Condensed.ttf', {
    family: 'Helvetica BC',
})

export async function generateQrCode(sku: string) {
    const text = `https://www.prismaticpowders.com/shop/powder-coating-colors/${sku}/illusion-cherry`

    const utm = `?utm_source=prismatic&utm_medium=direct&utm_campaign=bag_tag&utm_term=${sku}`

    return await QRCode.toDataURL(text + utm + sku, { errorCorrectionLevel: 'L', width: 300 })
}

/**
 * Draws text on a canvas with word wrapping based on character limits.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {string} text - The text to write.
 * @param {number} x - The x coordinate where to start writing the text.
 * @param {number} y - The y coordinate where to start writing the text.
 * @param {number} maxCharsPerLine - The maximum number of characters allowed per line.
 * @param {number} lineHeight - The line height (usually the font size or a bit larger).
 */
function wrapTextByCharacterLimit(
    ctx: any,
    text: string,
    x: number,
    y: number,
    maxCharsPerLine: number,
    lineHeight: number
) {
    const words = text.split(' ')
    let line = ''

    for (const word of words) {
        if ((line + word).length > maxCharsPerLine) {
            // Check if adding this word would exceed the character limit
            if (line !== '') {
                ctx.fillText(line, x, y)
                line = word + ' ' // Start a new line with the current word
                y += lineHeight
            } else {
                // If the line is empty and the word is longer than the max length, we need to handle it specially
                const splitPoint = maxCharsPerLine - 1
                ctx.fillText(word.substring(0, splitPoint) + '-', x, y) // Hyphenate
                line = word.substring(splitPoint) + ' '
                y += lineHeight
            }
        } else {
            line += word + ' '
        }
    }

    if (line.trim() !== '') {
        ctx.fillText(line, x, y)
    }

    return y
}

// Main function to create a canvas from bag tag information
export async function createCanvasFromBagTagInformation(
    sku, 
    skuDescription, 
    qrCodeBase64Image, 
    cureSchedule, 
    customerId, 
    date, 
    order, 
    unit,
    createCanvas, // passed in as a param
    loadImage     // passed in as a param
) {
    // Define canvas dimensions
    const width = 832;
    const height = 432;

    // Create canvas using the passed in createCanvas function
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    try {
        // Draw a black rectangle as the background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        // Load the first image (background)
        const image1 = await loadImage('assets/Pris_Black_Label_832x412px.png');
        const img = await loadImage(qrCodeBase64Image);

        // Draw the background image
        ctx.drawImage(image1, 0, 0, width, height);

        // Draw the QR code image
        ctx.drawImage(img, 625, 80, 200, 200);

        // Add text
        ctx.fillStyle = 'black';
        ctx.font = '50px Helvetica BC';

        let y = wrapTextByCharacterLimit(ctx, skuDescription, 40, 180, 19, 55);
        y = y === 180 ? 190 : y;

        ctx.font = '28px Helvetica CBI';
        y = y + 35;

        ctx.fillText(`(${sku})`, 40, y);
        y = y + 35;
        ctx.fillText(`CURE SCHEDULE: ${cureSchedule}`, 40, y);

        ctx.font = '14px Helvetica CBI';
        y = y + 20;
        ctx.fillText('(CURE TIME BEGINS ONCE PART REACHES TEMPERATURE)', 40, y);

        // Below QR code text
        ctx.font = '20px Helvetica CBI';
        ctx.fillText('Product Information', 642, 290);

        // Footer text (customer info)
        ctx.fillStyle = 'white';
        ctx.font = '27px Helvetica BC';
        ctx.fillText(`${customerId}`, 50, 385);
        ctx.fillText(`${date}`, 250, 385);
        ctx.fillText(`${order}`, 450, 385);
        ctx.fillText(`${unit}`, 650, 385);

        // Convert canvas to base64 PNG
        const base64Image = canvas.toDataURL('image/png');

        // Generate ZPL command (you may need to adjust this part if needed)
        const pngData = dataURLToPNG(base64Image);
        let res = rgbaToZ64(pngData.data, pngData.width, { black: 47 });

        let zpl = `^XA^GFA,${res.length},${res.length},${res.rowlen},${res.z64};^XZ`;

        console.log('canvas finished zpl command: ', zpl);

        // Return the result
        return {
            zplCommand: zpl,
            base64TagImage: base64Image,
        };
    } catch (e) {
        console.log('createCanvasFromBagTagInformation error', e);
        return null;
    }
}
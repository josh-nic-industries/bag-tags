import QRCode from 'qrcode'

const base64img = 'data:image/png;base64,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VnnuxRTLEekLm/gRYsEkmdUKsK416VIi+C5EurfdQ//zrETwvPJcaa3j7Ej0WX6pu7jyXCx11wskBoW6sMPtyDDf9nms6bozKs9BocqklpyflUkieKG1hpojoUAYzPnpkVjqrlR5ri5s4vszWSDrP4Ol7kChyqTGPc/noOTkKK01BBxEn5VVnovnr6XKc1VYn0YhTOriz6BECQRVJjUmgs+hUHkuCIGDwlJ3PoVIDsyCQO54NCgsVp7v15lJ8VJ3JN6BpMqkhpyfuXTJB5Zaa4i8bVZZzo9/HluqPG9e6k6Y5Kdg6lpE8MFTZdLyIimV50prDTnae6GAf/rkBnWH4b9RjLxPtXAPp5wkMhH8vHSYWIkr/Db9jO2wUDhr64OkxqTGyvM5iDidunKWiKrHM6sxSj/urBQN4uKC3/h4lIIxmhSSzBWT/DWYJoGkxqTGyvM5iMpzdf6yTlrzU9yaQ7j95MOFyXZNUarF7kE/PuY9hKiGeCZ10k4GGKgxqXELsjmItunGW9qd3G6HPuewT7uF42OfWdQ99zP9DzfJrx/98q+l4+cHRWf2z6/62zmmg771fthS7Y7qJMipMamt8nwWL29lhNNhc+D5LARqTFpepJeXxtbttpubQ/eubwOuhgqTGivP5/Dy0tj2+83T055OCTwVJjVWns/h5bXI/ePmbvP48u4blqLCpIbFH+fy8tLY7nd395vDy5vewVJUmNSw+ONcXuDzmePdhiAejNTMk5bnO/yDARahfndMACiDSQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYAEmAViASQAWYBKABZgEYMFo0n91ADCX/w4m/XYFAHP5XfgJkwDmg0kAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFmASgAWYBGABJgFYgEkAFowm/f4d3gXAS+cP449/fGc3AfDi+dP445/f3V0AvHTejD8yvAOYyx/iF9++o5sAeOn85U3y8neF0wDgIiLy/eZ/3s1tALxs/iQPvCHqANDKH7Vnsb9lhAfQwl++faP/4vd/pWMCqON/v/2/d30LAAAAAAAA18z/A3QqaceOcNMjAAAAHXRFWHRTb2Z0d2FyZQBAbHVuYXBhaW50L3BuZy1jb2RlY/VDGR4AAAAASUVORK5CYII='


export async function generateQrCode(sku) {
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
    ctx,
    text,
    x,
    y,
    maxCharsPerLine,
    lineHeight
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
export default async function createCanvasFromBagTagInformation(
    sku, 
    skuDescription, 
    cureSchedule, 
    customerId, 
    date, 
    order, 
    unit,
    createCanvas, // passed in as a param
    loadImage,    // passed in as a param
) {
    // Define canvas dimensions
    const width = 832;
    const height = 432;

    // Create canvas using the passed in createCanvas function
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    try {
        debugger
        // Draw a black rectangle as the background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);

        // Load the first image (background)
        const image1 = await loadImage(base64img);
        const qrCode = await generateQrCode(sku);
        const img = await loadImage(qrCode);

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


        return base64Image
    } catch (e) {
        console.log('createCanvasFromBagTagInformation error', e);
        debugger
        return null;
    }
}
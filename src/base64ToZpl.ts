import { PNG } from 'pngjs'
import { rgbaToZ64 } from 'zpl-image'

export default function base64ToZpl(buffer: Buffer) {
    let png = PNG.sync.read(buffer)

    let res = rgbaToZ64(png.data, png.width, { black: 47 })

    let zpl = `^XA^GFA,${res.length},${res.length},${res.rowlen},${res.z64};^XZ`

    const base64Image = buffer.toString('base64')

    console.log('canvas finished zlp command: ', zpl)
    return {
        zplCommand: zpl,
        base64TagImage: base64Image,
    }
}
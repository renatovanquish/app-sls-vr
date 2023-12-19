export const useImageResize = () => {

  const resize = async (src: any, maxSize: number) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        if (img.width > img.height) {
          const widthMain = maxSize
          const scaleFactorMain = widthMain / img.width
          canvas.width = widthMain
          canvas.height = img.height * scaleFactorMain
        } else {
          const heightMain = maxSize
          const scaleFactorMain = heightMain / img.height
          canvas.width = img.width * scaleFactorMain
          canvas.height = heightMain
        }
        const ctxMain = canvas.getContext('2d') as any
        ctxMain.fillRect(0, 0, canvas.width, canvas.height)
        ctxMain.drawImage(img, 0, 0, canvas.width, canvas.height)
        ctxMain.canvas.toBlob(async (blob: any) => {
          resolve(blob)
        }, 'image/*', 0.75)
      }
      img.onerror = reject
      img.src = src
    })
  }

  return { resize }
}

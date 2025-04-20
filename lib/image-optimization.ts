import sharp from 'sharp'

export async function optimizeImage(file: File): Promise<File> {
  const buffer = await file.arrayBuffer()
  const optimized = await sharp(buffer)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer()
  
  return new File([optimized], file.name, { type: 'image/jpeg' })
}

export function generateBlurDataURL(width: number, height: number): string {
  // Generate a placeholder blur data URL
  return `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="%23f0f0f0"/></svg>`
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}



import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

export const useStorage = () => {
  /**
   * UPLOAD PUBLIC
   */
  const uploadPublic = async (fileName: string, file: any) => {
    try {
      const r = await Storage.put(fileName, file, {
        level: 'public',
        progressCallback(progress: { loaded: any; total: any }) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
        },
      })

      return r
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * DOWNLOAD PUBLIC
   */
  const downloadPublic = async (key: string) => {
    try {
      const url = await Storage.get(key, {
        level: 'public',
        expires: 86400, // in seconds
      })
      return url
    } catch (error) {
      console.log(error)
    }
  }

  return { uploadPublic, downloadPublic }
}

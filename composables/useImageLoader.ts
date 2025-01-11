import { ref } from 'vue'

export function useImageLoader() {
  const imageLoaded = ref(false)
  const imageError = ref(false)

  const onLoad = () => {
    imageLoaded.value = true
  }

  const onError = () => {
    imageError.value = true
  }

  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        onLoad()
        resolve()
      }
      img.onerror = () => {
        onError()
        reject()
      }
    })
  }

  return {
    imageLoaded,
    imageError,
    loadImage,
    onLoad,
    onError
  }
} 
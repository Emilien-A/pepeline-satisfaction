export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Erreur Vue globale :', error)
    console.error('Instance :', instance)
    console.error('Info :', info)
    
    // Vous pouvez ajouter ici une logique pour envoyer l'erreur à un service de monitoring
  }

  // Gestion des erreurs non capturées
  if (process.client) {
    window.onerror = function(msg, url, line, col, error) {
      console.error('Erreur globale :', {
        message: msg,
        url: url,
        line: line,
        col: col,
        error: error
      })
      return false
    }

    window.addEventListener('unhandledrejection', function(event) {
      console.error('Promise non gérée :', event.reason)
    })
  }
}) 
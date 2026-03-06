// Storage polyfill — uses localStorage when window.storage (Claude artifact API) is not available
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      try {
        const val = localStorage.getItem(key)
        return val ? { key, value: val } : null
      } catch { return null }
    },
    set: async (key, value) => {
      try {
        localStorage.setItem(key, value)
        return { key, value }
      } catch { return null }
    },
    delete: async (key) => {
      try {
        localStorage.removeItem(key)
        return { key, deleted: true }
      } catch { return null }
    },
    list: async (prefix) => {
      try {
        const keys = Object.keys(localStorage).filter(k => !prefix || k.startsWith(prefix))
        return { keys }
      } catch { return { keys: [] } }
    }
  }
}

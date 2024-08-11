import { defineStore } from 'pinia';

interface GlobalError {
  code?: number | string
  message?: string
}

export const useGlobalStore = defineStore('global', {
  state: () => ({
    error: <GlobalError>{}
  }),

  getters: {
    hasError (): boolean {
      return !!this.error.message
    }
  },

  actions: {
    clearError () {
      this.error = {}
    },
    setError (error: GlobalError) {
      this.error = error
    }
  }
});

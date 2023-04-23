import {defineStore} from "pinia";
import {Glossary} from "~/types";

export const useStore = defineStore('default', {
  state: () => ({
    theme: 'light' as 'light' | 'dark',
    glossary: new Map()
  }),
  actions: {
    setLightTheme() {
      this.theme = "light"
    },
    setDarkTheme() {
      this.theme = "dark"
    },
    setGlossary(words: Glossary[]) {

      for (const word of words) {
        this.glossary.set(word.word, word)
      }
    }
  }
})
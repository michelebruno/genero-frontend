import {defineStore} from "pinia";

export const useStore = defineStore('default', {
  state: ()=>({
    theme: 'light' as 'light'|'dark'
  }),
  actions:{
    setLightTheme(){
      this.theme = "light"
    },
    setDarkTheme(){
      this.theme = "dark"
    },
  }
})
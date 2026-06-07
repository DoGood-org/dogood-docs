import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import RapiDoc from "./components/RapiDoc.vue";
import Diagram from './components/Diagram.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Diagram', Diagram);
    app.component("RapiDoc", RapiDoc);
  }
} satisfies Theme
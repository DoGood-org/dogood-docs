import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import SwaggerUI from './components/SwaggerUI.vue'
import Diagram from './components/Diagram.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SwaggerUI', SwaggerUI);
    app.component('Diagram', Diagram)
  }
} satisfies Theme
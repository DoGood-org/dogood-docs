import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { nav } from "./configs/nav";
import { sidebar } from "./configs/sidebar";

// https://vitepress.dev/reference/site-config

export default withMermaid(
  defineConfig({
    srcDir: "docs",

    title: "Project Documentation",
    description: "Frontend ↔ Backend documentation",
    lang: "uk-UA",

    themeConfig: {
      siteTitle: "DoGood Project Docs",
      outline: [2, 4],
      // https://vitepress.dev/reference/default-theme-config

      nav,
      sidebar,

      socialLinks: [
        { icon: "github", link: "https://github.com/acvetochka/DoGood-docs" },
      ],
    },

    markdown: {
      theme: "material-theme-palenight",
    },
    // mermaid: {
    //   theme: "default",
    // },
  })
);


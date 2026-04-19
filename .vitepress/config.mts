import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

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

      nav: [
        { text: "Головна", link: "/" },
        // { text: "Examples", link: "/markdown-examples" },
        { text: "Архітектура", link: "/architecture/overview" },
        { text: "Сутності", link: "/entities/task" },
        { text: "Ендпоінти", link: "/endpoints/tasks/create-task" },
        { text: "API Reference", link: "/api-reference/swagger-ui" },
        { text: "Frontend", link: "/frontend/components" }

      ],

      sidebar: {
        '/': [
          {
            text: "Вступ",
            items: [{ text: "Головна", link: "/" }],
          },
          {
            text: "Архітектура",
            items: [
              { text: "Overview", link: "/architecture/overview" },
              { text: "DTO and Models", link: "/architecture/dto-and-models" },
              { text: "Authentication and Session Flow", link: "/architecture/authentication-and-session-flow" }
              // {
              //   text: "Frontend ↔ Backend Flow",
              //   link: "/architecture/frontend-backend-flow",
              // },
              // { text: "Auth Flow", link: "/architecture/auth-flow" },
            ],
          },
          {
            text: "Сутності",
            items: [
              { text: "User", link: "/entities/user" },
              { text: "Task", link: "/entities/task" },
              // { text: "Organization", link: "/entities/organization" },
            ],
          },
          {
            text: "Ендпоінти",
            items: [
              {
                text: "Auth",
                items: [
                  { text: "POST /auth/signup", link: "/endpoints/auth/signup" },
                  { text: "POST /auth/login", link: "/endpoints/auth/login" },
                  { text: "POST /auth/logout", link: "/endpoints/auth/logout" },
                  { text: "POST /auth/refresh-token", link: "/endpoints/auth/refresh-token" },
                  // {
                  //   text: "GET /users/current",
                  //   link: "/endpoints/users",
                  // },
                ],
              },
              {
                text: "Tasks",
                items: [
                  { text: "GET /task", link: "/endpoints/tasks/get-all-tasks" },
                  { text: "POST /task", link: "/endpoints/tasks/create-task" },
                  { text: "PATCH /task/:id", link: "/endpoints/tasks/update-task" }
                ],
              },
            ],
          },
          {
            text: "Constants",
            items: [
              { text: "Tasks", link: "/constants/task" }
            ]
          }
          // {
          //   text: "Conventions",
          //   items: [
          //     { text: "Response Format", link: "/conventions/response-format" },
          //     { text: "Error Format", link: "/conventions/error-format" },
          //     { text: "Validation", link: "/conventions/validation" },
          //   ],
          // },
          // {
          //   text: "API Reference",
          //   items: [
          //     { text: "OpenAPI / Swagger", link: "/api-reference/openapi" },
          //     { text: 'Swagger UI', link: '/api-reference/swagger-ui' }
          //   ],
          // },
        ],

        '/frontend/': [
          {
            text: "Frontend Docs",
            items: [
              { text: "Components", link: "/frontend/components" },
              { text: "Styles", link: "/frontend/styles" }
            ]
          }
        ],

        // Swagger - вимкнути sidebar
        '/api-reference/': []
      },

      socialLinks: [
        { icon: "github", link: "https://github.com/acvetochka/DoGood-docs" },
      ],
    },

    markdown: {
      theme: "material-theme-palenight",
    },
    mermaid: {
      theme: "default",
    },
  })
);

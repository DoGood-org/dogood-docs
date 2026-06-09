const componentsURL = "/frontend/components";

export const frontend = [
  {
    text: "Frontend Docs",
    items: [
      {
        text: "Components",
        // link: componentsURL,
        collapsed: true,
        items: [
          { text: "Accordion", link: `${componentsURL}/accordion` },
          { text: "AnimationTabs", link: `${componentsURL}/animation-tabs` },
          { text: "Container", link: `${componentsURL}/container` },
          { text: "Button", link: `${componentsURL}/button` },
          { text: "LinkWithArrow", link: `${componentsURL}/link-with-arrow` },
          { text: "MenuAction", link: `${componentsURL}/menu-action` },
          { text: "Modal", link: `${componentsURL}/modal` },
          { text: "MoreMenu", link: `${componentsURL}/more-menu` },
          { text: "Rating", link: `${componentsURL}/rating` },
          { text: "Section", link: `${componentsURL}/section` },
          { text: "StarItem", link: `${componentsURL}/star=item` },
          { text: "TaskFilter", link: `${componentsURL}/task-filter` },
          { text: "", link: `${componentsURL}/` },
          { text: "", link: `${componentsURL}/` }

        ]
      },
      { text: "Styles", link: "/frontend/styles" }
    ]
  }
]
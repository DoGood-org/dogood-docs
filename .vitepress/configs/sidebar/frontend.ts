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
          { text: "Section", link: `${componentsURL}/section` },
          { text: "Container", link: `${componentsURL}/container` },
          { text: "Button", link: `${componentsURL}/button` },
          { text: "LinkWithArrow", link: `${componentsURL}/link-with-arrow` },
          { text: "Accordion", link: `${componentsURL}/accordion` },
        ]
      },
      { text: "Styles", link: "/frontend/styles" }
    ]
  }
]
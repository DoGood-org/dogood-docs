const componentsURL = "/frontend/components";
const stylesURL = '/frontend/styles';
const hooks = '/frontend/hooks';

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
          { text: "Pagination", link: `${componentsURL}/pagination` },
          { text: "Rating", link: `${componentsURL}/rating` },
          { text: "Section", link: `${componentsURL}/section` },
          { text: "StarItem", link: `${componentsURL}/star-item` },
          { text: "TaskFilter", link: `${componentsURL}/task-filter` },
          { text: "", link: `${componentsURL}/` }
        ]
      },
      {
        text: "Styles",
        collapsed: true,
        items: [
          { text: "Breakpoints", link: `${stylesURL}/breakpoints` },
          { text: "Colors", link: `${stylesURL}/colors` },
          { text: "Text", link: `${stylesURL}/text` },
          { text: "Radius", link: `${stylesURL}/radius` }
        ]
      },
      {
        text: "Hooks",
        collapsed: true,
        items: [
          { text: "useClickOutside", link: `${hooks}/useClickOutside` }
        ]
      }
    ]
  }
]
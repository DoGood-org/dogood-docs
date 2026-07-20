export const entities = {
  text: "Сутності",
  items: [
    {
      text: 'User-entities', collapsed: true, items: [
        { text: "User", link: "/entities/user" },
        { text: "UserProfile", link: "/entities/user-profile" },
        { text: "UserSettings", link: "/entities/user-settings" },
        { text: "RefreshToken", link: "/entities/refresh-token" }

      ]
    },
    { text: "Task", link: "/entities/task" },
    { text: "Location", link: "/entities/location" },
    // { text: "Organization", link: "/entities/organization" },
    {
      text: 'Organization-entities', collapsed: true, items: [
        { text: 'UserOrganization', link: "/entities/organization-member" }
      ]
    }
  ],
}
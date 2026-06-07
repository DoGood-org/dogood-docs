export const endpoints = {
  text: "Ендпоінти",
  items: [
    {
      text: "Auth",
      collapsed: true,
      items: [
        { text: "POST /auth/signup", link: "/endpoints/auth/signup" },
        { text: "POST /auth/login", link: "/endpoints/auth/login" },
        { text: "POST /auth/logout", link: "/endpoints/auth/logout" },
        { text: "POST /auth/refresh-token", link: "/endpoints/auth/refresh-token" },
        { text: "GET /auth/current-user", link: "/endpoints/auth/current-user" },
        {
          text: "Verification", items: [
            { text: "GET /auth/verify-email/:verificationCode", link: "/endpoints/auth/verify-email" },
            { text: "POST /auth/resend-verification", link: "/endpoints/auth/resend-verification" },
          ]
        },
        {
          text: "Password", items: [
            { text: "POST /auth/forgot-password", link: "/endpoints/auth/forgot-password" },
            { text: "POST /auth/reset-password/:resetPasswordToken", link: "/endpoints/auth/reset-password" },
            { text: "POST /auth/resent-forgot-password", link: "/endpoints/auth/resent-forgot-password" },
          ]
        },

        // {
        //   text: "GET /users/current",
        //   link: "/endpoints/users",
        // },
      ],
    },
    {
      text: "User",
      collapsed: true,
      items: [
        { text: "GET /user/profile/:id", link: "/endpoints/user/userById" },
        { text: "GET /user/profile/public/:id", link: "/endpoints/user/publicUserById" },
        { text: "DELETE /user/profile", link: "/endpoints/user/deleteUserProfile" },
        { text: "POST /user/name", link: "/endpoints/user/postUserByName" },
        { text: "PATCH /user/profile", link: "/endpoints/user/patchUserProfile" },
        { text: "PATCH /user/settings", link: "/endpoints/user/patchUserSettings" },
        { text: "", link: "/endpoints/user/" },
      ]

    },
    {
      text: "Tasks",
      collapsed: true,
      items: [
        { text: "GET /task", link: "/endpoints/tasks/get-all-tasks" },
        { text: "POST /task", link: "/endpoints/tasks/create-task" },
        { text: "PATCH /task/:id", link: "/endpoints/tasks/update-task" }
      ],
    },
  ],
}
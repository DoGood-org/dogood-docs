const auth = "/endpoints/auth"
const user = "/endpoints/user"
const tasks = "/endpoints/tasks"
const organization = "/endpoints/organization"
const member = "/endpoints/member"
const request = "/endpoints/join-request"

export const endpoints = {
  text: "Ендпоінти",
  items: [
    {
      text: "Auth",
      collapsed: true,
      items: [
        { text: "POST /auth/signup", link: `${auth}/signup` },
        { text: "POST /auth/login", link: `${auth}/login` },
        { text: "POST /auth/logout", link: `${auth}/logout` },
        { text: "POST /auth/refresh-token", link: `${auth}/refresh-token` },
        { text: "GET /auth/current-user", link: `${auth}/current-user` },
        {
          text: "Verification", items: [
            { text: "GET /auth/verify-email/:verificationCode", link: `${auth}/verify-email` },
            { text: "POST /auth/resend-verification", link: `${auth}/resend-verification` },
          ]
        },
        {
          text: "Password", items: [
            { text: "POST /auth/forgot-password", link: `${auth}/forgot-password` },
            { text: "POST /auth/reset-password/:resetPasswordToken", link: `${auth}/reset-password` },
            { text: "POST /auth/resent-forgot-password", link: `${auth}/resent-forgot-password` },
          ]
        },
      ],
    },
    {
      text: "User",
      collapsed: true,
      items: [
        { text: "GET /user/profile/:id", link: `${user}/userById` },
        { text: "GET /user/profile/public/:id", link: `${user}/publicUserById` },
        { text: "DELETE /user/profile", link: `${user}/deleteUserProfile` },
        { text: "POST /user/name", link: `${user}/postUserByName` },
        { text: "PATCH /user/profile", link: `${user}/patchUserProfile` },
        { text: "PATCH /user/settings", link: `${user}/patchUserSettings` },
        { text: "", link: `${user}/` },
      ]
    },
    {
      text: "Tasks",
      collapsed: true,
      items: [
        { text: "GET /task", link: `${tasks}/get-all-tasks` },
        { text: "POST /task", link: `${tasks}/create-task` },
        { text: "PATCH /task/:id", link: `${tasks}/update-task` }
      ],
    },
    {
      text: "Organization",
      collapsed: true,
      items: [
        { text: "POST /organization/create", link: `${organization}/create-organization` },
        { text: "GET /organization", link: `${organization}/get-organizations` },
        { text: "GET /organization/:id", link: `${organization}/get-organization` },
        { text: "PATCH /organization/:id", link: `${organization}/update-organization` },
        { text: "DELETE /organization/:id", link: `${organization}/delete-organization` },
        {
          text: "Members", items: [
            { text: "POST /organization/members", link: `${member}/add-member` },
            { text: "DELETE /organization/members", link: `${member}/delete-member` },
            { text: "PATCH /organization/members/role", link: `${member}/update-member-role` }
          ]
        },
        {
          text: "JoinRequests", items: [
            { text: "POST /organization/join-request", link: `${request}/create-join-request` },
            { text: "PATCH /organization/join-request/status", link: `${request}/update-request-status` },
            { text: "GET /organization/:organizationId/join-requests", link: `${request}/get-org-requests` },
            { text: "GET /organization/join-request/:id", link: `${request}/get-request-by-id` }
          ]
        }
      ]
    }
  ],
}
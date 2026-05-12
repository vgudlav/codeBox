export const challenges = [
  {
    id: "okta-least-privilege",
    title: "Okta Access Drift Remediation",
    difficulty: "Advanced",
    duration: "35 min",
    summary:
      "Automate role cleanup by removing unauthorized admin grants while keeping break-glass access.",
    description:
      "Implement `solve(users, policy)` to return a sorted array of user emails whose admin roles should be revoked. Revoke when user has roles outside policy and is not break-glass.",
    starterCode: `function solve(users, policy) {\n  // users: [{ email, roles: [], breakGlass: boolean }]\n  // policy: { allowedAdminRoles: [] }\n  return [];\n}`,
    examples: [
      {
        input: [
          [
            { email: "a@uber.com", roles: ["okta_super_admin"], breakGlass: false },
            { email: "b@uber.com", roles: ["app_admin"], breakGlass: false }
          ],
          { allowedAdminRoles: ["app_admin"] }
        ],
        output: ["a@uber.com"]
      }
    ],
    tests: [
      {
        input: [
          [
            { email: "alice@uber.com", roles: ["okta_super_admin", "app_admin"], breakGlass: false },
            { email: "bruce@uber.com", roles: ["app_admin"], breakGlass: false },
            { email: "cora@uber.com", roles: ["okta_super_admin"], breakGlass: true }
          ],
          { allowedAdminRoles: ["app_admin"] }
        ],
        expected: ["alice@uber.com"]
      },
      {
        input: [[{ email: "d@uber.com", roles: ["app_admin"], breakGlass: false }], { allowedAdminRoles: ["app_admin"] }],
        expected: []
      },
      {
        input: [[{ email: "e@uber.com", roles: ["custom_admin"], breakGlass: false }], { allowedAdminRoles: [] }],
        expected: ["e@uber.com"]
      }
    ]
  },
  {
    id: "slack-oncall-routing",
    title: "Slack + Pager On-Call Router",
    difficulty: "Intermediate",
    duration: "25 min",
    summary: "Map incidents to team channels and escalation paths based on service criticality and ownership.",
    description:
      "Implement `solve(incidents, routes)` to return incident routing objects `{id, channel, escalateTo}`.",
    starterCode: `function solve(incidents, routes) {\n  // incidents: [{ id, service, severity }]\n  // routes: { [service]: { channel, primary, secondary } }\n  return [];\n}`,
    examples: [
      {
        input: [
          [{ id: "INC-1", service: "slack", severity: "SEV1" }],
          { slack: { channel: "#slack-war-room", primary: "eng-apps", secondary: "it-incident" } }
        ],
        output: [{ id: "INC-1", channel: "#slack-war-room", escalateTo: "eng-apps" }]
      }
    ],
    tests: [
      {
        input: [
          [
            { id: "INC-101", service: "okta", severity: "SEV1" },
            { id: "INC-102", service: "zoom", severity: "SEV2" },
            { id: "INC-103", service: "unknown", severity: "SEV3" }
          ],
          {
            okta: { channel: "#okta-inc", primary: "iam-oncall", secondary: "enterprise-apps" },
            zoom: { channel: "#zoom-help", primary: "collab-tools", secondary: "enterprise-apps" }
          }
        ],
        expected: [
          { id: "INC-101", channel: "#okta-inc", escalateTo: "iam-oncall" },
          { id: "INC-102", channel: "#zoom-help", escalateTo: "collab-tools" },
          { id: "INC-103", channel: "#general-it", escalateTo: "service-desk" }
        ]
      },
      {
        input: [[{ id: "INC-201", service: "okta", severity: "SEV3" }], { okta: { channel: "#okta-inc", primary: "iam-oncall", secondary: "enterprise-apps" } }],
        expected: [{ id: "INC-201", channel: "#okta-inc", escalateTo: "enterprise-apps" }]
      }
    ]
  },
  {
    id: "l3-ticket-triage",
    title: "L3 Ticket Auto-Triage",
    difficulty: "Intermediate",
    duration: "30 min",
    summary: "Classify escalated enterprise app tickets by ownership and priority using deterministic rules.",
    description:
      "Implement `solve(tickets)` that returns `{queue, priority}` for each ticket. Priority rules: SEV1=>P1, SEV2=>P2, else P3. Queue rules: auth keywords -> IAM-L3, billing keywords -> VendorOps, else Apps-L3.",
    starterCode: `function solve(tickets) {\n  // tickets: [{ id, severity, summary }]\n  return [];\n}`,
    examples: [
      { input: [[{ id: "T1", severity: "SEV1", summary: "Okta MFA outage" }]], output: [{ id: "T1", queue: "IAM-L3", priority: "P1" }] }
    ],
    tests: [
      {
        input: [[
          { id: "T100", severity: "SEV1", summary: "SSO login broken for Slack" },
          { id: "T101", severity: "SEV2", summary: "Zoom invoice mismatch" },
          { id: "T102", severity: "SEV3", summary: "Asana custom field issue" }
        ]],
        expected: [
          { id: "T100", queue: "IAM-L3", priority: "P1" },
          { id: "T101", queue: "VendorOps", priority: "P2" },
          { id: "T102", queue: "Apps-L3", priority: "P3" }
        ]
      }
    ]
  }
];

export const tempSampleData = {
    age: {
        guid: "b3e1a2d4-5f6b-4c8d-9a7e-2f3c4d5e6f7a",
        name: "Super Example AGE"
    },
    users: {
        total: 625,
        active: 500,
        internal: 437,
        extern: 188,
        licenses: [
            {name: "user", available: 500, used: 275},
            {name: "viewer", available: 1000, used: 300},
            {name: "editor", available: 150, used: 50},
        ]
    },
    content: {
        itemcount: 3889,
        official: 2000,
        custom: 1889,
        public: 900,
        organisation: 100,
        groups: 889,
        private: 2000,
    },
    groups: {
        administrativ: 51,
        kollaboration: 12,
        project: 56,
        user: 89
    },
    components: [
        {name: "GeoShare", status: "ok", type: "portal"},
        {name: "federated 1", status: "ok", type: "server"},
        {name: "federated 2", status: "warning", type: "server"},
        {name: "federated 3", status: "critical", type: "server"},
        {name: "read", status: "ok", type: "datastore"},

    ],
    tasks: {
        critical: 1,
        severe: 0,
        warning: 5,
        informational: 12

    },
}
export const stats = [
    {
        id: 1,
        title: "Total Attacks",
        value: 124,
        color: "text-red-400",
    },
    {
        id: 2,
        title: "Blocked",
        value: 120,
        color: "text-green-400",
    },
    {
        id: 3,
        title: "Users",
        value: 8,
        color: "text-blue-400",
    },
    {
        id: 4,
        title: "System Health",
        value: "99.9%",
        color: "text-purple-400",
    },
];

export const recentAttacks = [
    {
        id: 1,
        ip: "192.168.1.25",
        payload: "' OR 1=1 --",
        risk: "Critical",
        status: "Blocked",
        time: "2 mins ago",
    },
    {
        id: 2,
        ip: "172.16.0.50",
        payload: "UNION SELECT password",
        risk: "High",
        status: "Blocked",
        time: "10 mins ago",
    },
    {
        id: 3,
        ip: "10.0.0.18",
        payload: "'; DROP TABLE users;",
        risk: "Critical",
        status: "Blocked",
        time: "15 mins ago",
    },
    {
        id: 4,
        ip: "203.0.113.20",
        payload: "' OR ''='",
        risk: "Medium",
        status: "Blocked",
        time: "20 mins ago",
    },
];
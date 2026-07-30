import api from "./axios";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export const getDashboardStats = async () => {

    return await api.get("/admin/dashboard");

};

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

export const getAnalytics = async () => {

    return await api.get("/admin/analytics");

};

export const getAttackChart = async () => {

    return await api.get("/admin/attack-chart");

};

/*
|--------------------------------------------------------------------------
| Threat Monitor
|--------------------------------------------------------------------------
*/

export const getThreatMonitor = async () => {

    return await api.get("/admin/threat-monitor");

};

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

export const getUsers = async () => {

    return await api.get("/admin/users");

};

export const activateUser = async (id) => {

    return await api.patch(`/admin/users/${id}/activate`);

};

export const deactivateUser = async (id) => {

    return await api.patch(`/admin/users/${id}/deactivate`);

};

/*
|--------------------------------------------------------------------------
| Security Events
|--------------------------------------------------------------------------
*/

export const getSecurityEvents = async () => {

    return await api.get("/admin/security-events");

};

export default {

    getDashboardStats,

    getAnalytics,

    getAttackChart,

    getThreatMonitor,

    getUsers,

    activateUser,

    deactivateUser,

    getSecurityEvents

};
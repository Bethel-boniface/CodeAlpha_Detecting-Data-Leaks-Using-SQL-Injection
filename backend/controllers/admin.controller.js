const AdminModel = require("../models/admin.model");

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

exports.getDashboard = async (req, res) => {

    try {

        const stats = await AdminModel.getDashboardStats();

        return res.json({

            success: true,

            stats

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to load dashboard."

        });

    }

};

/*
|--------------------------------------------------------------------------
| Attack Chart
|--------------------------------------------------------------------------
*/

exports.getAttackChart = async (req, res) => {

    try {

        const chart = await AdminModel.getAttackChart();

        return res.json({

            success: true,

            chart

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to load attack chart."

        });

    }

};

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

exports.getAnalytics = async (req, res) => {

    try {

        const analytics = await AdminModel.getAnalytics();

        return res.json({

            success: true,

            analytics

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to load analytics."

        });

    }

};

/*
|--------------------------------------------------------------------------
| Threat Monitor
|--------------------------------------------------------------------------
*/

exports.getThreatMonitor = async (req, res) => {

    try {

        const events = await AdminModel.getThreatMonitor();

        return res.json({

            success: true,

            events

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to load threat monitor."

        });

    }

};

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

exports.getUsers = async (req, res) => {

    try {

        const users = await AdminModel.getUsers();

        return res.json({

            success: true,

            users

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to load users."

        });

    }

};

exports.activateUser = async (req, res) => {

    try {

        const user = await AdminModel.activateUser(

            req.params.id

        );

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        return res.json({

            success: true,

            message: "User activated successfully.",

            user

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to activate user."

        });

    }

};

exports.deactivateUser = async (req, res) => {

    try {

        const user = await AdminModel.deactivateUser(

            req.params.id

        );

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        return res.json({

            success: true,

            message: "User deactivated successfully.",

            user

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to deactivate user."

        });

    }

};

/*
|--------------------------------------------------------------------------
| Security Events
|--------------------------------------------------------------------------
*/

exports.getSecurityEvents = async (req, res) => {

    try {

        const events = await AdminModel.getSecurityEvents();

        return res.json({

            success: true,

            events

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to load security events."

        });

    }

};
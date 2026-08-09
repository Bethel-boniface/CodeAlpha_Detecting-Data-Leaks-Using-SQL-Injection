const pool = require("../config/db");

class AdminModel {

// =========================================================
// USERS
// =========================================================

static async getUsers() {

    const result = await pool.query(`
        SELECT
            id,
            username,
            email,
            role,
            is_active,
            created_at
        FROM users
        ORDER BY created_at DESC
    `);

    return result.rows;
}


static async activateUser(userId) {

    const result = await pool.query(
        `
        UPDATE users
        SET
            is_active = TRUE,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING
            id,
            username,
            email,
            role,
            is_active,
            created_at
        `,
        [userId]
    );

    return result.rows[0];
}


static async deactivateUser(userId) {

    const result = await pool.query(
        `
        UPDATE users
        SET
            is_active = FALSE,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING
            id,
            username,
            email,
            role,
            is_active,
            created_at
        `,
        [userId]
    );

    return result.rows[0];
}


// =========================================================
// SECURITY EVENTS
// =========================================================

static async getSecurityEvents() {

    const result = await pool.query(`
        SELECT
            id,
            ip_address,
            endpoint,
            method,
            payload,
            attack_type,
            severity,
            blocked,
            created_at
        FROM security_events
        ORDER BY created_at DESC
        LIMIT 100
    `);

    return result.rows;
}


// =========================================================
// THREAT MONITOR
// =========================================================

static async getThreatMonitor() {

    const result = await pool.query(`
        SELECT
            id,
            ip_address,
            endpoint,
            method,
            attack_type,
            severity,
            blocked,
            created_at
        FROM security_events
        ORDER BY created_at DESC
        LIMIT 250
    `);

    return result.rows;
}


// =========================================================
// DASHBOARD
// =========================================================

static async getDashboardStats() {

    const [
        users,
        attacks,
        blocked,
        critical,
        today
    ] = await Promise.all([

        pool.query(`
            SELECT COUNT(*)::int AS total
            FROM users
        `),

        pool.query(`
            SELECT COUNT(*)::int AS total
            FROM security_events
        `),

        pool.query(`
            SELECT COUNT(*)::int AS total
            FROM security_events
            WHERE blocked = TRUE
        `),

        pool.query(`
            SELECT COUNT(*)::int AS total
            FROM security_events
            WHERE UPPER(severity) = 'CRITICAL'
        `),

        pool.query(`
            SELECT COUNT(*)::int AS total
            FROM security_events
            WHERE DATE(created_at) = CURRENT_DATE
        `)

    ]);

    return {

        totalUsers: users.rows[0].total,

        totalAttacks: attacks.rows[0].total,

        blockedAttacks: blocked.rows[0].total,

        criticalAttacks: critical.rows[0].total,

        attacksToday: today.rows[0].total,

        systemHealth: "Online"

    };
}


// =========================================================
// ATTACK CHART
// =========================================================

static async getAttackChart() {

    const result = await pool.query(`
        SELECT
            DATE(created_at) AS date,
            COUNT(*)::int AS attacks
        FROM security_events
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
    `);

    return result.rows;
}


// =========================================================
// ANALYTICS
// =========================================================

static async getAnalytics() {

    const [
        trend,
        severity,
        attackTypes,
        topIps
    ] = await Promise.all([

        // Attack trend
        pool.query(`
            SELECT
                DATE(created_at) AS date,
                COUNT(*)::int AS count
            FROM security_events
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at)
        `),

        // Severity distribution
        pool.query(`
            SELECT
                severity,
                COUNT(*)::int AS count
            FROM security_events
            GROUP BY severity
            ORDER BY count DESC
        `),

        // Attack type distribution
        pool.query(`
            SELECT
                attack_type,
                COUNT(*)::int AS count
            FROM security_events
            GROUP BY attack_type
            ORDER BY count DESC
        `),

        // Top attacking IPs
        pool.query(`
            SELECT
                ip_address,
                COUNT(*)::int AS count
            FROM security_events
            GROUP BY ip_address
            ORDER BY count DESC
            LIMIT 10
        `)

    ]);

    return {

        attackTrend: trend.rows,

        severity: severity.rows,

        attackTypes: attackTypes.rows,

        topIps: topIps.rows

    };
}

}

module.exports = AdminModel;


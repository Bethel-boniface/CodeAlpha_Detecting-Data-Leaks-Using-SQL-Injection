```javascript
const pool = require("../config/db");

class AdminModel {

    /*
    |--------------------------------------------------------------------------
    | USERS
    |--------------------------------------------------------------------------
    */

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
            SET is_active = TRUE,
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
            SET is_active = FALSE,
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


    /*
    |--------------------------------------------------------------------------
    | SECURITY EVENTS
    |--------------------------------------------------------------------------
    */

    static async getSecurityEvents() {

        const result = await pool.query(`
            SELECT
                id,
                ip_address,
                endpoint,
                method,
                payload,
                attack_type,
                attack_type AS category,
                severity,
                blocked,
                created_at
            FROM security_events
            ORDER BY created_at DESC
            LIMIT 100
        `);

        return result.rows;
    }


    /*
    |--------------------------------------------------------------------------
    | THREAT MONITOR
    |--------------------------------------------------------------------------
    */

    static async getThreatMonitor() {

        const result = await pool.query(`
            SELECT
                id,
                ip_address,
                endpoint,
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


    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    static async getDashboardStats() {

        const [
            users,
            attacks,
            blocked,
            critical,
            today,
            highRisk
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
            `),

            pool.query(`
                SELECT COUNT(*)::int AS total
                FROM security_events
                WHERE UPPER(severity) IN ('HIGH', 'CRITICAL')
            `)

        ]);

        return {

            totalUsers:
                users.rows[0].total,

            totalAttacks:
                attacks.rows[0].total,

            blockedAttacks:
                blocked.rows[0].total,

            criticalAttacks:
                critical.rows[0].total,

            attacksToday:
                today.rows[0].total,

            highRiskAttacks:
                highRisk.rows[0].total,

            systemHealth: "Online"

        };
    }


    /*
    |--------------------------------------------------------------------------
    | ATTACK CHART
    |--------------------------------------------------------------------------
    */

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


    /*
    |--------------------------------------------------------------------------
    | ANALYTICS
    |--------------------------------------------------------------------------
    */

    static async getAnalytics() {

        const [
            trend,
            severity,
            categories,
            topIps,
            riskDistribution
        ] = await Promise.all([

            /*
            | Attack trend
            */

            pool.query(`
                SELECT
                    DATE(created_at) AS date,
                    COUNT(*)::int AS count
                FROM security_events
                GROUP BY DATE(created_at)
                ORDER BY DATE(created_at)
            `),


            /*
            | Severity distribution
            */

            pool.query(`
                SELECT
                    COALESCE(severity, 'UNKNOWN') AS severity,
                    COUNT(*)::int AS count
                FROM security_events
                GROUP BY severity
                ORDER BY count DESC
            `),


            /*
            | Attack categories
            |
            | The database has attack_type, not category.
            | We expose attack_type AS category so the
            | frontend can continue using "category".
            */

            pool.query(`
                SELECT
                    COALESCE(attack_type, 'Unknown') AS category,
                    COUNT(*)::int AS count
                FROM security_events
                GROUP BY attack_type
                ORDER BY count DESC
            `),


            /*
            | Top attacking IP addresses
            */

            pool.query(`
                SELECT
                    COALESCE(ip_address, 'Unknown') AS ip_address,
                    COUNT(*)::int AS count
                FROM security_events
                GROUP BY ip_address
                ORDER BY count DESC
                LIMIT 10
            `),


            /*
            | Risk distribution
            |
            | The database does not contain risk_score.
            | Therefore risk is derived from severity.
            */

            pool.query(`
                SELECT
                    CASE
                        WHEN UPPER(severity) = 'CRITICAL'
                            THEN 'Critical'

                        WHEN UPPER(severity) = 'HIGH'
                            THEN 'High'

                        WHEN UPPER(severity) = 'MEDIUM'
                            THEN 'Medium'

                        WHEN UPPER(severity) = 'LOW'
                            THEN 'Low'

                        ELSE 'Unknown'
                    END AS risk_level,

                    COUNT(*)::int AS count

                FROM security_events

                GROUP BY
                    CASE
                        WHEN UPPER(severity) = 'CRITICAL'
                            THEN 'Critical'

                        WHEN UPPER(severity) = 'HIGH'
                            THEN 'High'

                        WHEN UPPER(severity) = 'MEDIUM'
                            THEN 'Medium'

                        WHEN UPPER(severity) = 'LOW'
                            THEN 'Low'

                        ELSE 'Unknown'
                    END

                ORDER BY count DESC
            `)

        ]);

        return {

            attackTrend:
                trend.rows,

            severity:
                severity.rows,

            categories:
                categories.rows,

            topIps:
                topIps.rows,

            riskDistribution:
                riskDistribution.rows

        };
    }

}

module.exports = AdminModel;
```

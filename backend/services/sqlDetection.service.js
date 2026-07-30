class SQLDetectionService {

    static signatures = [

        /*
        |--------------------------------------------------------------------------
        | SQL Injection
        |--------------------------------------------------------------------------
        */

        {
            name: "UNION Injection",
            category: "SQL Injection",
            severity: "HIGH",
            regex: /\bunion\b\s+\bselect\b/i
        },

        {
            name: "Boolean Injection",
            category: "SQL Injection",
            severity: "HIGH",
            regex: /\b(or|and)\b.+?=/i
        },

        {
            name: "Comment Injection",
            category: "SQL Injection",
            severity: "MEDIUM",
            regex: /(\-\-)|(#)|\/\*/i
        },

        {
            name: "DROP TABLE",
            category: "SQL Injection",
            severity: "CRITICAL",
            regex: /\bdrop\s+table\b/i
        },

        {
            name: "DELETE Injection",
            category: "SQL Injection",
            severity: "CRITICAL",
            regex: /\bdelete\s+from\b/i
        },

        {
            name: "INSERT Injection",
            category: "SQL Injection",
            severity: "HIGH",
            regex: /\binsert\s+into\b/i
        },

        {
            name: "UPDATE Injection",
            category: "SQL Injection",
            severity: "HIGH",
            regex: /\bupdate\b.+\bset\b/i
        },

        {
            name: "EXEC Injection",
            category: "SQL Injection",
            severity: "HIGH",
            regex: /\bexec\b/i
        },

        {
            name: "XP_CMDSHELL",
            category: "SQL Injection",
            severity: "CRITICAL",
            regex: /\bxp_cmdshell\b/i
        },

        {
            name: "WAITFOR DELAY",
            category: "SQL Injection",
            severity: "CRITICAL",
            regex: /\bwaitfor\s+delay\b/i
        },

        {
            name: "Time Delay",
            category: "SQL Injection",
            severity: "HIGH",
            regex: /\bsleep\s*\(|\bbenchmark\s*\(/i
        },

        {
            name: "Schema Enumeration",
            category: "SQL Injection",
            severity: "HIGH",
            regex: /\binformation_schema\b|\bpg_catalog\b/i
        },

        {
            name: "LOAD FILE",
            category: "SQL Injection",
            severity: "CRITICAL",
            regex: /\bload_file\s*\(/i
        },

        {
            name: "OUTFILE Injection",
            category: "SQL Injection",
            severity: "CRITICAL",
            regex: /\boutfile\b/i
        },

        {
            name: "Encoded SQL Injection",
            category: "SQL Injection",
            severity: "HIGH",
            regex: /%27|%23|%2D%2D/i
        },

        /*
        |--------------------------------------------------------------------------
        | Cross Site Scripting (XSS)
        |--------------------------------------------------------------------------
        */

        {
            name: "Script Injection",
            category: "XSS",
            severity: "HIGH",
            regex: /<script\b[^>]*>(.*?)<\/script>/i
        },

        {
            name: "JavaScript URI",
            category: "XSS",
            severity: "HIGH",
            regex: /javascript\s*:/i
        },

        {
            name: "HTML Event Injection",
            category: "XSS",
            severity: "HIGH",
            regex: /\bon(click|load|error|mouseover|focus|submit|keyup|keydown)\s*=/i
        },

        {
            name: "Iframe Injection",
            category: "XSS",
            severity: "HIGH",
            regex: /<iframe\b/i
        },

        {
            name: "Image XSS",
            category: "XSS",
            severity: "HIGH",
            regex: /<img\b[^>]*onerror\s*=/i
        },

        /*
        |--------------------------------------------------------------------------
        | Command Injection
        |--------------------------------------------------------------------------
        */

        {
            name: "Linux Command Injection",
            category: "Command Injection",
            severity: "CRITICAL",
            regex: /(;|\|\||&&)\s*(cat|ls|pwd|whoami|wget|curl|rm|chmod|chown|bash|sh)\b/i
        },

        {
            name: "Windows Command Injection",
            category: "Command Injection",
            severity: "CRITICAL",
            regex: /\b(cmd|powershell|net user|ipconfig|dir|tasklist)\b/i
        },

        /*
        |--------------------------------------------------------------------------
        | Path Traversal
        |--------------------------------------------------------------------------
        */

        {
            name: "Directory Traversal",
            category: "Path Traversal",
            severity: "CRITICAL",
            regex: /\.\.\//i
        },

        {
            name: "Windows Traversal",
            category: "Path Traversal",
            severity: "CRITICAL",
            regex: /\.\.\\/i
        },

        /*
        |--------------------------------------------------------------------------
        | NoSQL Injection
        |--------------------------------------------------------------------------
        */

        {
            name: "Mongo Operator Injection",
            category: "NoSQL Injection",
            severity: "HIGH",
            regex: /\$(ne|gt|lt|gte|lte|regex|where)/i
        },

        /*
        |--------------------------------------------------------------------------
        | Remote Code Execution
        |--------------------------------------------------------------------------
        */

        {
            name: "PHP Code Injection",
            category: "Remote Code Execution",
            severity: "CRITICAL",
            regex: /<\?php/i
        },

        {
            name: "Eval Injection",
            category: "Remote Code Execution",
            severity: "CRITICAL",
            regex: /\beval\s*\(/i
        }

    ];

    static inspect(value) {

        if (typeof value !== "string") {

            return null;

        }

        const input = value.trim();

        for (const signature of this.signatures) {

            if (signature.regex.test(input)) {

                return {

                    detected: true,

                    attackType: signature.name,

                    category: signature.category,

                    severity: signature.severity,

                    payload: input,

                    riskScore: this.calculateRisk(signature.severity)

                };

            }

        }

        return null;

    }

    static calculateRisk(severity) {

        switch (severity) {

            case "CRITICAL":
                return 100;

            case "HIGH":
                return 80;

            case "MEDIUM":
                return 60;

            case "LOW":
                return 30;

            default:
                return 10;

        }

    }

    static scan(data) {

        if (data === null || data === undefined) {

            return null;

        }

        if (Array.isArray(data)) {

            for (const item of data) {

                const result = this.scan(item);

                if (result) {

                    return result;

                }

            }

            return null;

        }

        if (typeof data === "object") {

            for (const value of Object.values(data)) {

                const result = this.scan(value);

                if (result) {

                    return result;

                }

            }

            return null;

        }

        return this.inspect(String(data));

    }

}

module.exports = SQLDetectionService;
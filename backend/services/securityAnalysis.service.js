const rules = [

    {
        name: "UNION Injection",
        severity: "CRITICAL",
        score: 40,
        regex: /\bunion\b\s+\bselect\b/i,
        recommendation:
            "Block UNION queries and always use parameterized statements."
    },

    {
        name: "Boolean Injection",
        severity: "HIGH",
        score: 30,
        regex: /\b(or|and)\b\s+\d+\s*=\s*\d+/i,
        recommendation:
            "Never concatenate user input into SQL queries."
    },

    {
        name: "SQL Comment",
        severity: "MEDIUM",
        score: 10,
        regex: /(--|#|\/\*)/,
        recommendation:
            "Reject SQL comment characters in user input."
    },

    {
        name: "DROP TABLE",
        severity: "CRITICAL",
        score: 50,
        regex: /\bdrop\s+table\b/i,
        recommendation:
            "Restrict destructive SQL operations."
    },

    {
        name: "DELETE Statement",
        severity: "HIGH",
        score: 30,
        regex: /\bdelete\s+from\b/i,
        recommendation:
            "Validate delete operations server-side."
    },

    {
        name: "INSERT Statement",
        severity: "MEDIUM",
        score: 20,
        regex: /\binsert\s+into\b/i,
        recommendation:
            "Only allow inserts through prepared statements."
    },

    {
        name: "UPDATE Statement",
        severity: "MEDIUM",
        score: 20,
        regex: /\bupdate\b.+\bset\b/i,
        recommendation:
            "Validate update operations before execution."
    },

    {
        name: "Database Enumeration",
        severity: "HIGH",
        score: 30,
        regex: /\binformation_schema\b/i,
        recommendation:
            "Prevent metadata enumeration."
    },

    {
        name: "Authentication Bypass",
        severity: "CRITICAL",
        score: 40,
        regex: /('|")?\s*or\s*('|")?1('|")?\s*=\s*('|")?1/i,
        recommendation:
            "Reject authentication bypass payloads."
    },

    {
        name: "Time Based Injection",
        severity: "CRITICAL",
        score: 40,
        regex: /\b(sleep|benchmark|waitfor)\b/i,
        recommendation:
            "Block SQL time-delay functions."
    },

    {
        name: "Command Execution",
        severity: "CRITICAL",
        score: 50,
        regex: /\bxp_cmdshell\b/i,
        recommendation:
            "Disable dangerous database procedures."
    },

    {
        name: "Hex Encoding",
        severity: "MEDIUM",
        score: 15,
        regex: /0x[a-fA-F0-9]+/,
        recommendation:
            "Inspect encoded SQL payloads."
    }

];



function calculateSeverity(score) {

    if (score >= 80) {

        return "CRITICAL";

    }


    if (score >= 30) {

        return "HIGH";

    }


    if (score >= 15) {

        return "MEDIUM";

    }


    if (score > 0) {

        return "LOW";

    }


    return "SAFE";

}



function analyzePayload(payload = "") {

    const matches = [];

    let riskScore = 0;


    for (const rule of rules) {

        if (rule.regex.test(payload)) {


            matches.push({

                rule: rule.name,

                severity: rule.severity,

                recommendation: rule.recommendation

            });


            riskScore += rule.score;

        }

    }



    if (riskScore > 100) {

        riskScore = 100;

    }



    return {

        payload,

        blocked: riskScore >= 30,

        riskScore,

        severity: calculateSeverity(riskScore),

        matchedRules: matches,

        recommendation:

            matches.length > 0

                ? [...new Set(matches.map(
                    item => item.recommendation
                ))]

                : [

                    "No SQL injection pattern detected."

                ],

        analyzedAt: new Date()

    };

}



module.exports = {

    analyzePayload

};
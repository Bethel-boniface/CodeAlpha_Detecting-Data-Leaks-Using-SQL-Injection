const { analyzePayload } = require("../services/securityAnalysis.service");

// ==========================================
// Analyze SQL Injection Payload
// ==========================================

async function analyzeSecurityPayload(req, res) {

    try {

        const { payload } = req.body;

        if (!payload || payload.trim() === "") {

            return res.status(400).json({

                success: false,

                message: "Payload is required."

            });

        }

        const analysis = analyzePayload(payload.trim());

        return res.status(200).json({

            success: true,

            analysis

        });

    } catch (error) {

        console.error("Security Analysis Error:", error);

        return res.status(500).json({

            success: false,

            message: "Internal server error."

        });

    }

}

module.exports = {

    analyzeSecurityPayload

};
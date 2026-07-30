class SQLInjectionService {

    static patterns = [

        /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,

        /\bOR\b.+\=/i,

        /\bAND\b.+\=/i,

        /\bUNION\b.+\bSELECT\b/i,

        /\bDROP\s+TABLE\b/i,

        /\bINSERT\s+INTO\b/i,

        /\bDELETE\s+FROM\b/i,

        /\bUPDATE\b.+\bSET\b/i,

        /\bEXEC\b/i,

        /\bxp_cmdshell\b/i,

        /\bINFORMATION_SCHEMA\b/i,

        /\bSLEEP\s*\(/i,

        /\bWAITFOR\s+DELAY\b/i,

        /\bBENCHMARK\s*\(/i,

        /\bLOAD_FILE\s*\(/i,

        /\bOUTFILE\b/i

    ];

    static detect(value) {

        if (!value) return null;

        const input = String(value);

        for (const pattern of this.patterns) {

            if (pattern.test(input)) {

                return {

                    detected: true,

                    payload: input,

                    signature: pattern.toString()

                };

            }

        }

        return {

            detected: false

        };

    }

}

module.exports = SQLInjectionService;
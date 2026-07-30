const crypto = require("crypto");

const security = require("../config/security");

const ALGORITHM = security.encryption.algorithm;
const IV_LENGTH = security.encryption.ivLength;

const SECRET = process.env.AES_SECRET_KEY;

if (!SECRET) {
    throw new Error("AES_SECRET_KEY environment variable is not set.");
}

// Derive a 32-byte key from the configured secret
const KEY = crypto
    .createHash("sha256")
    .update(SECRET)
    .digest();

class EncryptionService {
    /**
     * Encrypt a UTF-8 string using AES-256-GCM.
     *
     * @param {string} plaintext
     * @returns {{
     *   iv: string,
     *   authTag: string,
     *   encryptedData: string
     * }}
     */
    static encrypt(plaintext) {
        if (typeof plaintext !== "string") {
            throw new Error("Encryption input must be a string.");
        }

        const iv = crypto.randomBytes(IV_LENGTH);

        const cipher = crypto.createCipheriv(
            ALGORITHM,
            KEY,
            iv
        );

        const encrypted = Buffer.concat([
            cipher.update(plaintext, "utf8"),
            cipher.final()
        ]);

        const authTag = cipher.getAuthTag();

        return {
            iv: iv.toString("hex"),
            authTag: authTag.toString("hex"),
            encryptedData: encrypted.toString("hex")
        };
    }

    /**
     * Decrypt AES-256-GCM encrypted data.
     *
     * @param {{
     *   iv: string,
     *   authTag: string,
     *   encryptedData: string
     * }} payload
     * @returns {string}
     */
    static decrypt(payload) {
        if (
            !payload ||
            !payload.iv ||
            !payload.authTag ||
            !payload.encryptedData
        ) {
            throw new Error("Invalid encrypted payload.");
        }

        const decipher = crypto.createDecipheriv(
            ALGORITHM,
            KEY,
            Buffer.from(payload.iv, "hex")
        );

        decipher.setAuthTag(
            Buffer.from(payload.authTag, "hex")
        );

        const decrypted = Buffer.concat([
            decipher.update(
                Buffer.from(payload.encryptedData, "hex")
            ),
            decipher.final()
        ]);

        return decrypted.toString("utf8");
    }
}

module.exports = EncryptionService;
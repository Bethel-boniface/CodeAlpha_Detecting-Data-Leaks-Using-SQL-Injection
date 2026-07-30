const pool = require("../config/db");

const UserModel = require("../models/user.model");
const AuditModel = require("../models/audit.model");

const passwordService = require("./password.service");
const jwtService = require("./jwt.service");

class AuthService {
    static async register(data) {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const existingUser = await UserModel.findByEmail(
                data.email,
                client
            );

            if (existingUser) {
                throw new Error("Email already registered.");
            }

            const passwordHash = await passwordService.hash(
                data.password
            );

            const user = await UserModel.create(
                {
                    username: data.username,
                    email: data.email,
                    password_hash: passwordHash,
                    role: "user"
                },
                client
            );

            await AuditModel.log(
                {
                    userId: user.id,
                    action: "REGISTER",
                    description: `User ${user.email} registered successfully.`
                },
                client
            );

            await client.query("COMMIT");

            return {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                created_at: user.created_at
            };
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    static async login(email, password) {
        const user = await UserModel.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password.");
        }

        const passwordMatches =
            await passwordService.compare(
                password,
                user.password_hash
            );

        if (!passwordMatches) {
            throw new Error("Invalid email or password.");
        }

        await AuditModel.log({
            userId: user.id,
            action: "LOGIN",
            description: `User ${user.email} logged in successfully.`
        });

        const token = jwtService.generateToken(user);

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                created_at: user.created_at
            }
        };
    }
}

module.exports = AuthService;
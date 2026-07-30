CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================
-- USERS
-- =====================================

CREATE TABLE IF NOT EXISTS users (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    username VARCHAR(50) UNIQUE NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'user',

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_username
ON users(username);

-- =====================================
-- SECURITY EVENTS
-- =====================================

CREATE TABLE IF NOT EXISTS security_events (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    ip_address VARCHAR(100),

    endpoint TEXT,

    method VARCHAR(10),

    payload TEXT,

    attack_type VARCHAR(100),

    severity VARCHAR(20),

    blocked BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX idx_security_created
ON security_events(created_at);

-- =====================================
-- AUDIT LOGS
-- =====================================

CREATE TABLE IF NOT EXISTS audit_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id),

    action VARCHAR(150),

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX idx_audit_user
ON audit_logs(user_id);

-- =====================================
-- CAPABILITIES
-- =====================================

CREATE TABLE IF NOT EXISTS capabilities (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    capability_code VARCHAR(100) UNIQUE,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================
-- ROLE CAPABILITIES
-- =====================================

CREATE TABLE IF NOT EXISTS role_capabilities (

    role VARCHAR(30) NOT NULL,

    capability_id UUID NOT NULL REFERENCES capabilities(id),

    PRIMARY KEY (role, capability_id)

);

-- =====================================
-- DEFAULT CAPABILITIES
-- =====================================

INSERT INTO capabilities
(capability_code, description)

VALUES

('VIEW_USERS','View Users'),

('CREATE_USERS','Create Users'),

('DELETE_USERS','Delete Users'),

('VIEW_SECURITY_EVENTS','View Security Events'),

('MANAGE_SYSTEM','Manage Entire System')

ON CONFLICT DO NOTHING;

-- =====================================
-- ADMIN ROLE
-- =====================================

INSERT INTO role_capabilities
(role, capability_id)

SELECT

'admin',

id

FROM capabilities

ON CONFLICT DO NOTHING;
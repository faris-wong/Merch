CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    uuid UUID DEFAULT uuid_generate_v4(),
    email VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    username VARCHAR(18) NOT NULL,
    wallet DECIMAL(10,2),
    address VARCHAR(50),
    contact CHAR(8),
    date_joined TIMESTAMP NOT NULL DEFAULT NOW(),
    role VARCHAR(10) NOT NULL REFERENCES roles(role),
    PRIMARY KEY (uuid)
);

CREATE TABLE roles (
    role VARCHAR(10) PRIMARY KEY
)

CREATE TABLE products (
uuid UUID DEFAULT uuid_generate_v4(),
product_name VARCHAR(30) NOT NULL,
description TEXT,
price INT NOT NULL,
date_listed TIMESTAMP NOT NULL DEFAULT NOW(),
date_transacted TIMESTAMP,
seller_uuid UUID NOT NULL REFERENCES users(uuid),
purchased BOOLEAN NOT NULL,
buyer_uuid UUID REFERENCES users(uuid)
)
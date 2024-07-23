CREATE TABLE roles (
    role VARCHAR(10) PRIMARY KEY
)
INSERT INTO roles(role)
VALUES ('USER'),('ADMIN'),('VIP');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
    uuid UUID DEFAULT uuid_generate_v4(),
    email VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    username VARCHAR(18) NOT NULL,
    wallet DECIMAL(10,2) DEFAULT 0,
    address VARCHAR(50),
    contact CHAR(8),
    date_joined TIMESTAMP NOT NULL DEFAULT now(),
    role VARCHAR(10) NOT NULL REFERENCES roles(role) DEFAULT 'USER',
    PRIMARY KEY (uuid)
);


CREATE TABLE products (
uuid UUID DEFAULT uuid_generate_v4(),
product_name VARCHAR(30) NOT NULL,
description TEXT,
price DECIMAL(10,2) NOT NULL,
date_listed TIMESTAMP NOT NULL DEFAULT NOW(),
seller_uuid UUID NOT NULL REFERENCES users(uuid),
purchased BOOLEAN NOT NULL DEFAULT false,
PRIMARY KEY (uuid)
);


CREATE TABLE transactions(
uuid UUID DEFAULT uuid_generate_v4(),
product_id UUID NOT NULL REFERENCES products(uuid),
buyer_id UUID NOT NULL REFERENCES users(uuid),
date_transacted TIMESTAMP NOT NULL DEFAULT now(),
PRIMARY KEY (uuid)
);

SELECT * FROM users
SELECT * FROM roles
SELECT * FROM products
SELECT * FROM transactions
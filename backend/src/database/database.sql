CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS profiles (
    uuid UUID DEFAULT uuid_generate_v4(),
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    username VARCHAR(18) NOT NULL,
    wallet DECIMAL(10,2),
    address VARCHAR(50),
    contact CHAR(8),
    date_joined TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (uuid)
);

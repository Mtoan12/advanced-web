DROP DATABASE IF EXISTS db_classroom;
CREATE DATABASE db_classroom;
USE db_classroom;


DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
	role_id BIGINT AUTO_INCREMENT NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    revoked BIT DEFAULT 0,
    CONSTRAINT pk_roles PRIMARY KEY(role_id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id BIGINT AUTO_INCREMENT NOT NULL,
    role_id BIGINT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender VARCHAR(10),
    date_of_birth DATE,
    revoked BIT DEFAULT 0,
    CONSTRAINT chk_gender CHECK(gender IN ('Male', 'Female', 'Unknow')),
    CONSTRAINT pk_users PRIMARY KEY (user_id),
    CONSTRAINT fk_users_roles FOREIGN KEY(role_id) REFERENCES roles(role_id)
);



DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;


CREATE TABLE users (id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL
                    );

CREATE TABLE tasks (id SERIAL PRIMARY KEY,
                       task VARCHAR(255) NOT NULL,
                       completed BOOLEAN NOT NULL DEFAULT FALSE
                    );

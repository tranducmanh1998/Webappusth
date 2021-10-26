CREATE TABLE if not exists `patients` (
                            `id` int AUTO_INCREMENT,
                            `occupation_id` int,
                            `ssn` varchar(20),
                            `name` varchar(30),
                            `gender` varchar(20),
                            `dob` timestamp,
                            `phone` varchar(30),
                            `address` varchar(255),
                            `email` varchar(50),
                            `created_at` timestamp default current_timestamp,
                            `updated_at` timestamp default current_timestamp on update current_timestamp,
                            PRIMARY KEY (`id`, `ssn`)
);

CREATE TABLE if not exists `appointments` (
                                `id` int PRIMARY KEY AUTO_INCREMENT,
                                `patient_id` int,
                                `start_time` timestamp default current_timestamp,
                                `end_time` timestamp default current_timestamp,
                                `med_history` varchar(255),
                                `reason` varchar(255),
                                `created_at` timestamp default current_timestamp,
                                `updated_at` timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE if not exists `occupations` (
                               `id` int PRIMARY KEY,
                               `name` varchar(255)
);

ALTER TABLE `patients` ADD FOREIGN KEY (`occupation_id`) REFERENCES `occupations` (`id`);

ALTER TABLE `appointments` ADD FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);

INSERT INTO `occupations` (id, name) VALUES (1, 'Dr. Son'), (2, 'Dr. Phuong'), (3, 'Dr. Tung');
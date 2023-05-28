create table company_set
(
    `set_id`     bigint       not null primary key auto_increment,
    `user_email` varchar(255) not null,
    `name`       varchar(255) not null,
    foreign key (`user_email`) references user (`email`)
) DEFAULT CHARSET = UTF8;

create table company_set_companies
(
    `set_id`  bigint not null,
    `regcode` bigint not null,
    primary key (`set_id`, `regcode`),
    foreign key (`set_id`) references company_set (`set_id`),
    foreign key (`regcode`) references register (`regcode`)
) DEFAULT CHARSET = UTF8;

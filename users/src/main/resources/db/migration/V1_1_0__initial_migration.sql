create table if not exists `user`
(
    `email`    varchar(255) not null primary key,
    `name`     varchar(255) not null,
    `password` varchar(255) not null,
    `surname`  varchar(255) not null
) engine = InnoDB
  DEFAULT CHARSET = UTF8;


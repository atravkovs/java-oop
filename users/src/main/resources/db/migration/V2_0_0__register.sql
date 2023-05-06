create table reg_type
(
    code char(1) primary key,
    text nvarchar(255) not null
);

/*Aizpilda kodifikators ar vērtība no "regtype_text" kolonnas */
insert into reg_type
values ('K', 'Komercreģistrs');
insert into reg_type
values ('B', 'Biedrību un nodibinājumu reģistrs');
insert into reg_type
values ('U', 'Uzņēmumu reģistra žurnāls');
insert into reg_type
values ('R', 'Reliģisko organizāciju un to iestāžu reģistrs');
insert into reg_type
values ('C', 'Pārstāvniecību reģistrs');
insert into reg_type
values ('P', 'Politisko partiju reģistrs');
insert into reg_type
values ('T', 'Šķīrējtiesu reģistrs');
insert into reg_type
values ('S', 'Sabiedrisko organizāciju reģistrs');
insert into reg_type
values ('A', 'Arodbiedrību reģistrs');
insert into reg_type
values ('O', 'Politisko organizāciju un to apvienību reģistrs');
insert into reg_type
values ('E', 'Eiropas ekonomisko interešu grupu reģistrs');
insert into reg_type
values ('M', 'MIL reģistrs');

create table company_type
(
    code varchar(3) primary key,
    text nvarchar(255) not null
);
/*Aizpilda kodifikators ar vērtība no "type_text" kolonnas */
insert into company_type
values ('IK', 'Individuālais komersants');
insert into company_type
values ('SIA', 'Sabiedrība ar ierobežotu atbildību');
insert into company_type
values ('BDR', 'Biedrība');
insert into company_type
values ('ZEM', 'Zemnieku saimniecība');
insert into company_type
values ('IND', 'Individuālais uzņēmums');
insert into company_type
values ('NOD', 'Nodibinājums');
insert into company_type
values ('AKF', 'Ārvalsts komersanta filiāle');
insert into company_type
values ('KAT', 'Katoļu baznīcas publisko tiesību juridiskā persona');
insert into company_type
values ('FIL', 'Filiāle');
insert into company_type
values ('KB', 'Kooperatīvā sabiedrība');
insert into company_type
values ('PS', 'Pilnsabiedrība');
insert into company_type
values ('PAR', 'Ārvalsts komersanta pārstāvniecība');
insert into company_type
values ('PSV', 'Pašvaldības uzņēmums');
insert into company_type
values ('PPA', 'Politisko partiju apvienība');
insert into company_type
values ('AS', 'Akciju sabiedrība');
insert into company_type
values ('PAJ', 'Paju sabiedrība');
insert into company_type
values ('ARB', 'Arodbiedrība');
insert into company_type
values ('DRZ', 'Draudze');
insert into company_type
values ('SKT', 'Šķīrējtiesa');
insert into company_type
values ('PP', 'Politiskā partija');
insert into company_type
values ('UZN', 'Uzņēmējsabiedrības uzņēmums');
insert into company_type
values ('KS', 'Komandītsabiedrība');
insert into company_type
values ('GIM', 'Ģimenes uzņēmums');
insert into company_type
values ('SAB', 'Sabiedriskā organizācija');
insert into company_type
values ('ZVJ', 'Zvejnieku saimniecība');
insert into company_type
values ('PAP', 'Sabiedrība ar papildu atbildību');
insert into company_type
values ('ARA', 'Arodbiedrību apvienība');
insert into company_type
values ('PRV', 'Pārstāvis');
insert into company_type
values ('LIG', 'Līgumsabiedrība ar pilnu atbildību');
insert into company_type
values ('ARV', 'Pārstāvniecība');
insert into company_type
values ('SPO', 'Arodbiedrības patstāvīgā vienība');
insert into company_type
values ('VU', 'Valsts uzņēmums');
insert into company_type
values ('ROI', 'Iestāde');
insert into company_type
values ('POR', 'Ārvalsts organizācijas pārstāvniecība');
insert into company_type
values ('SOU', 'Sabiedriskās organizācijas uzņēmums');
insert into company_type
values ('BAZ', 'Baznīca');
insert into company_type
values ('ASF', '');
insert into company_type
values ('SAA', 'Eiropas komercsabiedrība');
insert into company_type
values ('SE', '');
insert into company_type
values ('KOR', '');
insert into company_type
values ('POL', 'Politiska organizācija (partija)');
insert into company_type
values ('SAV', 'Savienība');
insert into company_type
values ('SPA', '');
insert into company_type
values ('PRO', '');
insert into company_type
values ('KSS', 'Kooperatīvo biedrību savienības uzņēmums');
insert into company_type
values ('REL', 'Reliģiskas organizācijas uzņēmums');
insert into company_type
values ('KBU', 'Kooperatīvo biedrību uzņēmums');
insert into company_type
values ('KBS', 'Kooperatīvo biedrību savienība');
insert into company_type
values ('DIE', 'Diecēze');
insert into company_type
values ('MIS', 'Misija');
insert into company_type
values ('KLO', 'Klosteris');
insert into company_type
values ('EIG', 'Eiropas ekonomisko interešu grupa');
insert into company_type
values ('MIL', 'Masu informācijas līdzeklis');

CREATE TABLE register
(
    regcode         BIGINT PRIMARY KEY,
    sepa            NCHAR(18)     NULL,
    name            NVARCHAR(255) NOT NULL,
    regtype         CHAR(1)       NOT NULL,
    company_type    VARCHAR(3)    NOT NULL,
    registered_date DATE          NULL,
    terminated_date DATE          NULL,
    address         NVARCHAR(255) NULL,
    postal_index    INT           NULL,
    FOREIGN KEY (regtype)
        REFERENCES reg_type (code),
    FOREIGN KEY (company_type)
        REFERENCES company_type (code)
);
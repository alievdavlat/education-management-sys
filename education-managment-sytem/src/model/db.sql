
CREATE DATABASE education_managment_system;


---------------------------------------------------------------------------------------------------------------------



VALUES(
    'karimalie',
    'karim',
    'halimjonov',
    'rusya@gmail.com',
    'rustam123',
    '27.05.1998',
    'trayder',
    999331564,
    1000,
    'main-teacher',
    'nimadir',
    'eb83409d-3040-4522-a09b-4bd79786cbc4',
    '42c06e58-7bb5-4ebd-8acf-3e3f09b38c8f'
);








                                                         -- antoher
---------------------------------------------------------------------------------------------------------------------
                                                        -- validators
DROP INDEX validatorAdminsPassword;

CREATE UNIQUE INDEX validatorAdminsName ON  admins(username);

CREATE UNIQUE INDEX validatorPs ON  stafs(username);

CREATE UNIQUE INDEX validatorBranches ON  branches(address);
CREATE UNIQUE INDEX validatorCompanies ON  company(c_name);
CREATE UNIQUE INDEX validatorGroups ON  groups(group_n);



-- kota ohrgi yaratilgan larni oberadi

SELECT GREATEST(CURRENT_DATE); 
LEAST('2020-10-01', CURRENT_DATE, '2018-12-14');

-- oldn yaratilganlani oberadi kamayish taribida
SELECT LEAST('2020-10-01', CURRENT_DATE, '2018-12-14'), 
LEAST('2020-10-01', CURRENT_DATE, '2018-12-14');



----------------------------------------------------------------------------------------------------------------------------------
                                                -- UPDATE ADMIN
    update users  set user_name = (
        case 
            when true then 'azizbek' else ( select  user_name from users where user_id = 1 ) 
        end
    ),
    user_password = (
        case 
            when true then 'aziz1234' else ( select  user_password from users where user_id = 1 ) 
        end
    )
    where user_id = 1 ;


----------------------------------------------------------------------------------------------------------------------------------

                                                -- count  users
    SELECT 
        SUM(
             CASE  WHEN user_status = 3 THEN 1 ELSE  0 END 
        ) AS oqtuchilar ,
        SUM(
            CASE WHEN user_status = 4 THEN 1 ELSE 0 END
        ) AS oquvchilar,
        SUM(
            CASE WHEN user_status = 2 THEN 1 ELSE 0 END
        ) AS adminlar
    FROM 
        users;

---------------------------------------------------------------------------------------------------------------------------------

                                                   -- DELETED ADMINS TO ARCHIVE 
 -- done
  DROP TABLE IF EXISTS deletedAdminsArchive;

  CREATE TABLE deletedAdminsArchive (
    archive_id TEXT PRIMARY KEY,
    archive_username varchar(65) not null , 
    archive_name varchar(65) not null,
    archive_last_name varchar(65) not null,
    archive_email varchar(100) not null,
    archive_password varchar(255) not null,
    archive_dob DATE not null,
    archive_gender int not null,
    archive_phone bigint not null,
    archive_img text ,
    archive_role varchar(25) not null ,
    archive_t_account varchar(200) not null,
    archive_created_at DATE not null,
    added_date timestamptz  default current_timestamp
  ); 


  
  CREATE OR REPLACE FUNCTION  deleteAdmin()
  RETURNS TRIGGER 
  LANGUAGE plpgsql
  AS
  $$

  BEGIN

  INSERT INTO deletedAdminsArchive(
    archive_id,
    archive_username,
    archive_name,
    archive_last_name,
    archive_email,
    archive_password, 
    archive_dob, 
    archive_gender,
    archive_phone,
    archive_img,
    archive_role,
    archive_t_account,
    archive_created_at
    ) values (
      OLD.id,
      OLD.username,
      OLD.name,
      OLD.last_name,
      OLD.email,
      OLD.password,
      OLD.dob,
      OLD.gender,
      OLD.phone,
      OLD.img,
      OLD.role,
      OLD.t_account,
      OLD.created_at
      );

      RETURN OLD;

  END
  $$;
  

-- triger example
CREATE TRIGGER pushAdminsOnDeleteTrigger 
AFTER DELETE 
ON admins 
FOR EACH ROW
EXECUTE PROCEDURE deleteAdmin();


---------------------------------------------------------------------------------------------------------------------------------

                                                   -- REVERSE ADMINS TO ADMINS TABLE 

-- -done
CREATE OR REPLACE FUNCTION reverseAdmin() 
RETURNS TRIGGER
LANGUAGE plpgsql
AS 
$$
BEGIN
  INSERT INTO admins(
      id,
      username,
      name,
      last_name,
      email,
      password,
      dob,
      gender,
      phone,
      img,
      role,
      t_account,
      created_at
  ) VALUES (
    OLD.archive_id,
    OLD.archive_username,
    OLD.archive_name,
    OLD.archive_last_name,
    OLD.archive_email,
    OLD.archive_password, 
    OLD.archive_dob, 
    OLD.archive_gender,
    OLD.archive_phone,
    OLD.archive_img,
    OLD.archive_role,
    OLD.archive_t_account,
    OLD.archive_created_at
  );

  RETURN OLD;
END
$$;

CREATE TRIGGER  deleteFromArchiveAndPushToAdmin
AFTER DELETE
ON deletedAdminsArchive 
FOR EACH ROW
EXECUTE PROCEDURE reverseAdmin();

---------------------------------------------------------------------------------------------------------------------------------

                                                   -- DELETED COMPANY  TO ARCHIVE  


  CREATE TABLE deletedCompanyArchive (
    archive_id TEXT PRIMARY KEY,
    archive_c_name varchar(100) not null,
    archive_logo text,
    archive_eadmin_id TEXT NOT NULL,
    archive_blocked BOOLEAN,
    archive_payment_status BOOLEAN,
    archive_company_payed_at DATE,
    archive_created_at DATE not null,
    added_date timestamptz  default current_timestamp
  ); 


  
  CREATE OR REPLACE FUNCTION  deleteCompany()
  RETURNS TRIGGER 
  LANGUAGE plpgsql
  AS
  $$

  BEGIN

  INSERT INTO deletedCompanyArchive(
    archive_id,
    archive_c_name,
    archive_logo,
    archive_eadmin_id,
    archive_blocked,
    archive_payment_status,
    archive_company_payed_at,
    archive_created_at
    ) values (
      OLD.id,
      OLD.c_name,
      OLD.logo,
      OLD.eadmin_id,
      OLD.blocked,
      OLD.payment_status,
      OLD.company_payed_at,
      OLD.created_at
      );

      RETURN OLD;

  END
  $$;
  

CREATE TRIGGER pushCompanyOnDeleteTrigger 
AFTER DELETE 
ON company 
FOR EACH ROW
EXECUTE PROCEDURE deleteCompany();


---------------------------------------------------------------------------------------------------------------------------------

                                                   -- REVERe COMPANY  TO COmPANY TABLE  




  
  CREATE OR REPLACE FUNCTION  ReverseCompany()
  RETURNS TRIGGER 
  LANGUAGE plpgsql
  AS
  $$

  BEGIN

  INSERT INTO company(
    id,
    c_name,
    logo,
    eadmin_id,
    blocked,
    payment_status,
    company_payed_at,
    created_at
    ) VALUES (
    OLD.archive_id,
    OLD.archive_c_name,
    OLD.archive_logo,
    OLD.archive_eadmin_id,
    OLD.blocked,
    OLD.payment_status,
    OLD.company_payed_at,
    OLD.archive_created_at
      );

      RETURN OLD;

  END
  $$;
  

CREATE TRIGGER deletFromArchiveAndPushToCompany 
AFTER DELETE 
ON deletedCompanyArchive 
FOR EACH ROW
EXECUTE PROCEDURE ReverseCompany();





import fetchData, { fetchRow } from "../../utils/postgres.js";


const CREATE_ADMIN = `

INSERT INTO  admins ( 
  username , name , last_name, email, password , dob, gender, phone, img,t_account
   ) VALUES ( $1, $2, $3 , $4, $5, $6, $7, $8, $9, $10)     

`

export const createAdmin = (
  username, name, last_name, email, password, dob, gender, phone, img,t_account
    ) => fetchRow(CREATE_ADMIN, username, name, last_name, email, password, dob, gender, phone, img,t_account )


const VALIDATE_NEW_ADMIN = `
 SELECT  username , password FROM admins WHERE username = $1 
`

export const validateNewAdmin = ( username ) => fetchRow(VALIDATE_NEW_ADMIN, username)



const DELETE_ADMIN = `

DELETE FROM admins WHERE id = $1 RETURNING *
`

export const deleteAdmin =  ( id ) => fetchRow(DELETE_ADMIN, id)


const READ_ADMIN_BY_ID = `

SELECT 
    a.*,
    c.c_name AS company,
CASE
    WHEN gender = 1 THEN 'male'
ELSE 
    'female'
END AS gender
FROM 
      admins a
JOIN
    company c ON c.eadmin_id = a.id
WHERE a.id = $1

`

export const readAdminById = id => fetchRow(READ_ADMIN_BY_ID, id)


const READ_ALL_ADMINS = `

SELECT 
    a.*,
    c.c_name AS company,
CASE
    WHEN gender = 1 THEN 'male'
ELSE 
    'female'
END AS gender
FROM 
      admins a
JOIN
    company c ON c.eadmin_id = a.id
`

export const readAllAdmins = () => fetchData(READ_ALL_ADMINS );


const READ_ALL_ADMIN  = `
SELECT * , CASE WHEN gender = 1 THEN 'male' ELSE 'female' END AS gender FROM admins ORDER BY $1    
` 

export const readAllAdmin = (orderby) => fetchData(READ_ALL_ADMIN,orderby)



const UPDATE_ONE_ADMIN = `
UPDATE admins  set username = (
  CASE 
      WHEN true THEN $2 ELSE ( SELECT  username FROM admins WHERE id = $1 ) 
  END
),
name = (
  CASE 
      when true then $3 ELSE ( SELECT  name FROM admins WHERE id = $1 ) 
  END
),
last_name = (
  CASE 
      when true then $4 ELSE ( SELECT  last_name FROM admins WHERE id = $1 ) 
  END
),
email = (
  CASE 
      when true then $5 ELSE ( SELECT  email FROM admins WHERE id = $1 ) 
  END
),
password = (
  CASE 
      when true then $6 ELSE ( SELECT  password FROM admins WHERE id = $1 ) 
  END
),
phone = (
  CASE 
      when true then $7 ELSE ( SELECT  phone FROM admins WHERE id = $1 ) 
  END
),
t_account = (
  CASE 
      when true then $8 ELSE ( SELECT  t_account FROM admins WHERE id = $1 ) 
  END
)

WHERE id = $1 RETURNING *
`

export const updateOneAdminById = ( 
  id , username , name, last_name, email ,password , phone, t_account
   ) => fetchRow(
    UPDATE_ONE_ADMIN, id , username , name, last_name, email ,password , phone, t_account 
    ) 

const ADMIN_READ_SELF_ACCOUNT = `
SELECT 
    id, username , name , last_name , email , dob , gender, phone , img , t_account ,
CASE 
    WHEN gender = 1  THEN 'male'
ELSE 
    'female'
END AS gender

FROM
    admins

`
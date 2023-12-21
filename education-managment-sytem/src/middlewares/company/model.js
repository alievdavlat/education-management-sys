import fetchData, { fetchRow } from "../../utils/postgres.js";

const CREATE_NEW_COMPANY = `
INSERT INTO company ( 
  c_name,
  logo,
  eadmin_id
   ) VALUES(
      $1,
      $2,
      $3
  ) RETURNING *
`;
export const createCompany = (c_name, logo, eadmin_id) =>
  fetchRow(CREATE_NEW_COMPANY, c_name, logo, eadmin_id);

const GET_ONE_COMPANY = `
SELECT * FROM company WHERE c_name = $1
`;

export const getOneCompany = (name) => fetchRow(GET_ONE_COMPANY, name);

const UPDATE_ONE_COMPANY = `
UPDATE company  set c_name = (
  CASE 
      WHEN true THEN $2 ELSE ( SELECT  c_name FROM admins WHERE id = $1 ) 
  END
)

WHERE id = $1 RETURNING *
`;

export const updateOneCompany = (id, c_name) =>
  fetchRow(UPDATE_ONE_COMPANY, id, c_name);

const GET_DELETED_COMPANY = `
SELECT * FROM company WHERE id = $1
`;


export const getDeletedCompany = (id) => fetchRow(GET_DELETED_COMPANY, id);

const DELETE_ONE_COMPANY = `
DELETE FROM company WHERE id = $1 RETURNING *
`;

export const deleteOneCompany = (id) => fetchRow(DELETE_ONE_COMPANY, id);

const GET_SELF_COMPANY_FOR_ADMIN = `

SELECT 
    c_name AS company_name, logo
FROM 
    company c
INNER JOIN 
    admins a
ON 
    c.eadmin_id = a.id 

WHERE a.id = $1 



`;

export const getSelfCompanyForAdmin = (id) =>
  fetchRow(GET_SELF_COMPANY_FOR_ADMIN, id);

const GET_SELF_COMPANY_FOR_STAFS = `

SELECT 
    c_name AS company_name, logo
FROM 
    company c
INNER JOIN 
  stafs s
ON 
  c.id = s.company_id 
WHERE s.id = $1
`;

export const getSelfCompanyForStafs = (id) =>
  fetchRow(GET_SELF_COMPANY_FOR_STAFS, id);

const GET_ALL_COMPANY = `

SELECT
    c.id AS company_id,
    c.c_name AS company,
    c.logo AS logo,
    a.id AS company_admin_id,
    a.username as company_admin,
    c.blocked,
    c.company_payed_at,

    COUNT(DISTINCT s.id) AS student_count,
    COUNT(DISTINCT g.id) AS group_count,
    COUNT(DISTINCT t.id) AS staff_count,
    COUNT(DISTINCT b.id) AS branch_count,
    c.created_at,
    CASE   
        WHEN  c.payment_status = false THEN 'not payed' ELSE   'payed' 
    END AS payment_status
FROM
     admins a
JOIN
   company c  ON a.id = c.eadmin_id
LEFT JOIN
    students s ON s.company_id = c.id
LEFT JOIN
    groups g ON g.company_id = c.id
LEFT JOIN 
    stafs t ON t.company_id = c.id
LEFT JOIN 
    branches b ON b.company_id = c.id

GROUP BY
  c.c_name, c.logo,  a.username, c.created_at, c.id, a.id, c.blocked,
  c.company_payed_at, c.payment_status

`;



export const getAllCompany = () =>
  fetchData(GET_ALL_COMPANY);

const GET_ONE_COMPANY_BY_ID = `
SELECT
    c.id AS company_id ,
    a.id AS company_admin_id,
    c.c_name AS company,
    c.logo AS logo,
    c.blocked,
    c.company_payed_at,
    c.payment_status,
    a.username as company_admin,
    COUNT(DISTINCT s.id) AS student_count,
    COUNT(DISTINCT g.id) AS group_count,
    COUNT(DISTINCT t.id) AS staff_count,
    COUNT(DISTINCT b.id) AS branch_count,
    c.created_at
FROM
     admins a
JOIN
   company c  ON a.id = c.eadmin_id
LEFT JOIN
    students s ON s.company_id = c.id
LEFT JOIN
    groups g ON g.company_id = c.id
LEFT JOIN 
    stafs t ON t.company_id = c.id
LEFT JOIN 
    branches b ON b.company_id = c.id

GROUP BY
  c.c_name, c.logo,  a.username, c.created_at, c.id,  c.blocked,
  c.company_payed_at, c.payment_status, a.id

HAVING c.id = $1
`;

export const getOneCompanyById = (id) => fetchRow(GET_ONE_COMPANY_BY_ID, id);



import fetchData, { fetchRow } from "../../utils/postgres.js";

const IS_ALREADY_CREATED = `
SELECT * FROM stafs WHERE username = $1
`;

export const isAlreadyCreated = (username) =>
  fetchRow(IS_ALREADY_CREATED, username);

const CREATE_NEW_STAF = `
 INSERT INTO stafs (
  username , 
  name , 
  last_name,
  email,
  password , 
  dob , 
  gender, 
  proffesion, 
  phone , 
  fee,
  img,
  role, 
  t_account,
  branch_id, 
  company_id
  ) VALUES ($1,$2, $3, $4 , $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
 `;

export const createNewStaf = (
  username,
  name,
  last_name,
  email,
  password,
  dob,
  gender,
  proffesion,
  phone,
  fee,
  img,
  role,
  t_account,
  branch_id,
  company_id
) =>
  fetchRow(
    CREATE_NEW_STAF,
    username,
    name,
    last_name,
    email,
    password,
    dob,
    gender,
    proffesion,
    phone,
    fee,
    img,
    role,
    t_account,
    branch_id,
    company_id
  );

const GET_ALL_STAF_FOR_SUPER_ADMIN = `
    SELECT 
      s.id ,
      s.username,
      s.name,
      s.last_name,
      s.email ,
      s.password,
      s.dob,
      s.proffesion,
      s.phone,
      s.fee,
      s.img,
      s.role,
      s.t_account,
      b.address AS branch,
      c.c_name AS company,
      s.created_at,
    CASE 
        WHEN gender = 0 THEN 'male' 
    ELSE  
       'female'
    END AS gender
    FROM  
      stafs s
    INNER JOIN 
      company c 
    ON 
      s.company_id = c.id
    INNER JOIN 
        branches b
    ON
      s.branch_id = b.id

    WHERE s.branch_id = $1
    ORDER BY
      $2 DESC
    OFFSET $3 LIMIT $4
  `;

export const getAllStafsForSuperAdmin = (branchId, column, offset, limit) =>
  fetchData(GET_ALL_STAF_FOR_SUPER_ADMIN, branchId, column, offset, limit);

const GET_ALL_STAF_FOR_EADMIN = `

SELECT 
    s.id ,
    s.username,
    s.name,
    s.last_name,
    s.email ,
    s.password,
    s.dob,
    s.proffesion,
    s.phone,
    s.fee,
    s.img,
    s.role,
    s.t_account,
    b.address AS branch,
    c.c_name AS company,
    s.created_at,
CASE 
    WHEN gender = 0 THEN 'male' 
ELSE  
   'female'
END AS gender

FROM  
    stafs s
INNER JOIN 
    company c 
ON 
    s.company_id = c.id
INNER JOIN 
    branches b
ON
    s.branch_id = b.id

WHERE c.eadmin_id = $1

ORDER BY $2 OFFSET $3 LIMIT $4

  `;

export const getAllStafsForEadmin = (id, column, offset, limit) =>
  fetchData(GET_ALL_STAF_FOR_EADMIN, id, column, offset, limit);

const DELETE_ONE_STAF_BY_ID = `
  DELETE FROM stafs WHERE id = $1 RETURNING *
  `;

export const deleteOneStafById = (id) => fetchRow(DELETE_ONE_STAF_BY_ID, id);

const UPDATE_ONE_STAF_BY_ID = `
    UPDATE stafs set username = (
      case 
          when true then $2 else ( select  username from stafs where id = $1 ) 
      end
  ),
  email = (
    case 
        when true then $3 else ( select  email from stafs where id = $1 ) 
    end
),
  password = (
      case 
          when true then $4 else ( select  password from stafs where id = $1 ) 
      end
  ),
  phone = (
    case 
        when true then $5 else ( select  phone from stafs where id = $1 ) 
    end
  )
  where id = $1 RETURNING *
  `;

export const updateOneStafById = (id, username, email, password, phone) =>
  fetchRow(UPDATE_ONE_STAF_BY_ID, id, username, email, password, phone);

const UPDATE_STAFS_FEE = `
  
  UPDATE stafs set fee = (
    case 
        when true then $2 else ( select  fee from stafs where id = $1 ) 
    end
)
where id = $1 RETURNING *  
  `;

export const updateStafsFee = (id, fee) => fetchRow(UPDATE_STAFS_FEE, id, fee);

const BRANCHES_EMPLOYEES = `
  SELECT 
      s.*,
  CASE 
      WHEN s.gender = 1 THEN 'male'
  ELSE
    'female'
  END AS gender
  FROM 
    branches b
  INNER JOIN 
    stafs s
  ON
    b.id = s.branch_id
  WHERE b.id = $1
  ORDER BY $2 DESC OFFSET $3 LIMIT $4
  
  
  `;

export const branchesEmployees = (branchId, column, offset, limit) =>
  fetchData(BRANCHES_EMPLOYEES, branchId, column, offset, limit);

const GET_PERSONAL_STAF_BY_ID = `
SELECT 
   s.id, s.username,
   s.name ,s.last_name , 
   s.email, s.password , 
   s.dob , s.phone 
  ,s.proffesion,s.fee, 
   s.img , s.role, 
   s.t_account, b.address 
   , c.c_name , s.created_at,
CASE 
  WHEN gender = 1 THEN 'male'
ELSE
'female'
END AS gender

FROM 
   stafs s
INNER JOIN 
    branches b 
ON 
    s.branch_id = b.id
INNER JOiN 
    company c
ON 
    c.id = s.company_id
WHERE s.id = $1
  `;

const GET_TEACHER_BY_ID = `
  SELECT 
   s.id, s.username,
   s.name ,s.last_name , 
   s.email, s.password , 
   s.dob , s.phone 
  ,s.proffesion,s.fee, 
   s.img , s.role, 
   s.t_account, b.address 
   , c.c_name , s.created_at,
   array_agg(g.group_n) AS groups,
CASE 
  WHEN gender = 1 THEN 'male'
ELSE
'female'
END AS gender

FROM 
   stafs s
INNER JOIN
    groups g
ON
    g.teacher_id = s.id
INNER JOIN 
    branches b 
ON 
    s.branch_id = b.id
INNER JOiN 
    company c
ON 
    c.id = s.company_id
WHERE s.id = $1

GROUP BY s.id, s.username,
s.name ,s.last_name , 
s.email, s.password , 
s.dob , s.phone 
,s.proffesion,s.fee, 
s.img , s.role, 
s.t_account, b.address 
, c.c_name , s.created_at
  
  `;

const GET_ASSISTANT_BY_ID = `
  
  SELECT 
  s.id, s.username,
  s.name ,s.last_name , 
  s.email, s.password , 
  s.dob , s.phone 
 ,s.proffesion,s.fee, 
  s.img , s.role, 
  s.t_account, b.address 
  , c.c_name , s.created_at,
  array_agg(g.group_n) AS groups,
CASE 
 WHEN gender = 1 THEN 'male'
ELSE
'female'
END AS gender

FROM 
  stafs s
INNER JOIN
   groups g
ON
   g.assistant_id = s.id
INNER JOIN 
   branches b 
ON 
   s.branch_id = b.id
INNER JOiN 
   company c
ON 
   c.id = s.company_id
WHERE s.id = $1

GROUP BY s.id, s.username,
s.name ,s.last_name , 
s.email, s.password , 
s.dob , s.phone 
,s.proffesion,s.fee, 
s.img , s.role, 
s.t_account, b.address 
, c.c_name , s.created_at
 
  `;

export const getPersonalStafBYid = (id) =>
  fetchRow(GET_PERSONAL_STAF_BY_ID, id);

export const getTeacherStafBYid = (id) => fetchRow(GET_TEACHER_BY_ID, id);

export const getAssistantlStafBYid = (id) => fetchRow(GET_ASSISTANT_BY_ID, id);

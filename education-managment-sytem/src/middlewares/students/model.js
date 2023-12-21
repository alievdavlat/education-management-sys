import fetchData,{ fetchRow } from "../../utils/postgres.js"


const CREATE_NEW_STUDENT = `

INSERT INTO students (
      username,
      name , 
      last_name, 
      gender,
      dob, 
      branch_id,
      company_id
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
) RETURNING *

`

export const createNewStudent = ( 
      username,
      student_name , 
      last_name, 
      gender,
      dob, 
      branch_id,
      company_id
      ) => fetchRow(
  CREATE_NEW_STUDENT,
      username,
      student_name , 
      last_name, 
      gender,
      dob, 
      branch_id,
      company_id
);


const IS_ALREADY_CREATED_STUDENT = `

select * from students where username = $1

`

export const isAlreadyCreated = (username) => fetchRow(IS_ALREADY_CREATED_STUDENT, username)


const GET_STUDENT = `

select * from students where id = $1


`

export const getStudent = id => fetchRow(GET_STUDENT, id)




const GET_ALL_STUDENTS = `

SELECT 
      s.id, 
      username, 
      name , 
      last_name, 
      s.blocked, 
      s.img,
      s.student_payed_at,
      CASE WHEN gender = 1 THEN 'male' ELSE 'female' END AS gender ,
      CASE WHEN payment_status = false THEN 'not payed' ELSE 'payed' END AS payment_status ,
      dob,
      c.c_name AS COMPANY ,
      b.address   ||  '  filialida o\`qiydi' AS branch,
      s.created_at, g.g_name AS group, g.group_n AS group_number
FROM
      students s
JOIN 
   company c
ON
   c.id = s.company_id
JOIN
   branches b
ON 
   b.id = s.branch_id
JOIN
   groups_students gs
ON
   gs.student_id = s.id
JOIN 
   groups g
ON
   gs.group_id = g.id

WHERE 
   b.id = $1
ORDER BY $2 ASC OFFSET $3 LIMIT $4

`

export const getAllStudentsForSAdmin = (branchId, column, offset , limit) => fetchData(GET_ALL_STUDENTS, branchId, column, offset , limit)


const GET_ALL_STUDENTS_FOR_EADMIN = `
SELECT 
      st.id, 
      st.username, 
      st.name , 
      st.last_name, 
      st.blocked, 
      st.img,
      st.student_payed_at,
      CASE WHEN st.gender = 1 THEN 'male' ELSE 'female' END AS gender ,
      CASE WHEN st.payment_status = false THEN 'not payed' ELSE 'payed' END AS payment_status ,
      st.dob,
      c.c_name AS COMPANY ,
      b.address   ||  '  filialida o\`qiydi' AS branch,
      array_agg(g.g_name) AS groups, array_agg(g.group_n) AS group_numbers,
      st.created_at AS student_created_at

FROM
      students st
JOIN 
   company c
ON
   c.id = st.company_id
JOIN
   branches b
ON 
   b.id = st.branch_id
JOIN
   groups_students gs
ON
   gs.student_id = st.id
JOIN 
   groups g
ON
   gs.group_id = g.id
GROUP BY
      st.id, 
      st.username, 
      st.name , 
      st.last_name, 
      st.gender,
      st.dob,
      c.c_name  ,
      b.address,
      st.created_at,
      c.eadmin_id,
      st.payment_status,
      st.blocked,
      st.img,
      st.student_payed_at

HAVING c.eadmin_id = $1

ORDER BY $2 ASC OFFSET $3 LIMIT $4

`
export const getAllStudentsForEAdmin = (id, column, offset , limit) => fetchData(GET_ALL_STUDENTS_FOR_EADMIN,id,column, offset , limit)


const GET_ALL_STUDENTS_FOR_ASSISTANT = `
SELECT 
   s.id, 
   s.username, 
   s.name, 
   s.last_name,
   s.payment_status,
   s.blocked, 
   s.img,
   s.student_payed_at,
   CASE WHEN s.gender = 1 THEN 'male' ELSE 'female' END AS gender,
   s.dob,
   c.c_name AS company,
   b.address AS branch,
   s.created_at, array_agg(g.g_name) AS groups, array_agg(g.group_n) AS group_numbers
FROM
   students_assistants sa
JOIN
   students s
ON
   sa.student_id = s.id
JOIN
   stafs ss
ON
   ss.id = sa.assistant_id
JOIN 
   company c
ON
   c.id = s.company_id
JOIN
   branches b
ON 
   b.id = s.branch_id
   JOIN
   groups_students gs
ON
   gs.student_id = s.id
JOIN 
   groups g
ON
   gs.group_id = g.id
GROUP BY
      s.id, 
      s.username, 
      s.name, 
      s.last_name, 
      s.dob,
      c.c_name ,
      b.address,
      s.created_at,
      sa.assistant_id,
      s.payment_status,
      s.blocked,
      s.img,
      s.student_payed_at
HAVING 
   sa.assistant_id = $1

ORDER BY $2 DESC OFFSET $3 LIMIT $4
`


export const getAllStudentsForAssistant = (id, column, offset, limit) => fetchData(GET_ALL_STUDENTS_FOR_ASSISTANT,id, column, offset, limit)


const GET_ALL_STUDENTS_FOR_TEACHERS = `
SELECT 
   s.id, 
   s.username, 
   s.name, 
   s.last_name, 
   s.img,
   s.student_payed_at
   CASE WHEN s.gender = 1 THEN 'male' ELSE 'female' END AS gender,
   s.dob,
   c.c_name AS company,
   b.address AS branch,
   s.created_at,
   array_agg(g.g_name) AS groups, array_agg(g.group_n) AS group_numbers
FROM
students_techers st
JOIN
   students s
ON
   st.student_id = s.id
JOIN
   stafs ss
ON
   ss.id = st.teacher_id
JOIN 
   company c
ON
   c.id = s.company_id
JOIN
   branches b
ON 
   b.id = s.branch_id
JOIN
   groups_students gs
ON
   gs.student_id = s.id
JOIN 
   groups g
ON
   gs.group_id = g.id
GROUP BY
         s.id, 
         s.username, 
         s.name, 
         s.last_name, 
         s.dob,
         c.c_name,
         b.address,
         s.created_at,
         st.teacher_id,
         s.img,
         s.student_payed_at

HAVING 
         st.teacher_id = $1
      
ORDER BY $2 DESC OFFSET $3 LIMIT $4
`





export const getAllStudentsForTeacher = (id, column, offset , limit) => fetchData(GET_ALL_STUDENTS_FOR_TEACHERS,id,column, offset , limit)


const GET_ONE_STUDENT_BY_ID = `
SELECT 
      s.id,
      s.username,
      s.name ,
      s.last_name,
      s.dob,
      b.address AS branch,
      c.c_name AS company,
      s.created_at,
      array_agg(g.group_n) AS studnt_groups
FROM
      groups_students gs
LEFT JOIN 
      students s
ON 
      gs.student_id  = s.id

LEFT JOIN
      branches b
ON
      b.id = s.branch_id
LEFT JOIN 
      company c
ON
      c.id = s.company_id 
LEFT JOIN 
      groups g
ON 
      g.id = gs.group_id

GROUP BY
      s.id,
      s.username,
      s.name ,
      s.last_name,
      s.dob,
      b.address,
      c.c_name,
      s.created_at
HAVING s.id = $1
`

export const getOneStudentById  = ( id ) => fetchRow(GET_ONE_STUDENT_BY_ID, id)


const UPDATE_STUDNET = `

UPDATE students set username = (
      case 
          when true then $2 else ( select  username from students where id = $1 ) 
      end
  ),
  branch_id = (
      case 
          when true then $3 else ( select  branch_id from students where id = $1 ) 
      end
  )
WHERE id = $1 RETURNING *
`

export const updateStudent = ( id ,username, branchId ) => fetchRow(UPDATE_STUDNET, id, username, branchId)


const DELETE_STUDENT = `
DELETE FROM students WHERE id  =  $1 RETURNING *
`

export const deletStudent = ( id ) => fetchRow(DELETE_STUDENT , id)
  import fetchData, { fetchRow } from "../../utils/postgres.js"


const CREATE_GROUP = `
INSERT INTO groups(
  g_name, group_n, room, days , time, teacher_id, assistant_id, branch_id, company_id, sesioon
) VALUES (
  $1 , $2 , $3 , $4 , $5, $6, $7, $8 , $9, $10
) RETURNING *
`

export const createGroup = (
   g_name, group_n, room, days , time, teacher_id, assistant_id, branch_id, company_id, sesioon
) => fetchRow(CREATE_GROUP, g_name, group_n, room, days , time, teacher_id, assistant_id, branch_id, company_id, sesioon)



const UPDATE_GROUP = `
UPDATE groups set g_name  = (
  CASE 
      WHEN true THEN $2 ELSE ( SELECT g_name  FROM groups WHERE id = $1 ) 
  END
),
group_n = (
  CASE 
      WHEN true THEN $3 ELSE ( SELECT group_n  FROM groups WHERE id = $1 ) 
  END
), 
room = (
  CASE 
      WHEN true THEN $4 ELSE ( SELECT room  FROM groups WHERE id = $1 ) 
  END
),
days = (
  CASE 
      WHEN true THEN $5 ELSE ( SELECT days  FROM groups WHERE id = $1 ) 
  END
),

time = (
  CASE 
      WHEN true THEN $6 ELSE ( SELECT time  FROM groups WHERE id = $1 ) 
  END
),

teacher_id = (
  CASE 
      WHEN true THEN $7 ELSE ( SELECT teacher_id  FROM groups WHERE id = $1 ) 
  END
),



assistant_id = (
  CASE 
      WHEN true THEN $8 ELSE ( SELECT assistant_id  FROM groups WHERE id = $1 ) 
  END
),


sesioon = (
  CASE 
      WHEN true THEN $9 ELSE ( SELECT sesioon  FROM groups WHERE id = $1 ) 
  END
)
WHERE id = $1
RETURNING * 
`


export const updateGroup = (
  id,  g_name, group_n, room, days, time, teacher_id, assistant_id, sesioon
    ) => fetchRow(UPDATE_GROUP, id,  g_name, group_n, room, days, time, teacher_id, assistant_id, sesioon)



 const DELETE_GROUP = `
 
 DELETE FROM groups where id = $1 RETURNING * 
 
 `

 export const deleteGrups = ( id ) => fetchRow(DELETE_GROUP, id)


 const GET_ALL_GROUPS_FOR_SADMIN = `
 SELECT
    g.id,
    g.g_name AS group_name,
    g.group_n AS group_number,
    g.room,
    g.days AS lesson_days,
    g.time AS lesson_time,
    g.sesioon,
    COUNT(s.id) AS groups_students,
    g.created_at AS group_created,
    b.address AS branch,
    c.c_name AS company,
    t.name AS teacher,
    asi.name AS assistant
FROM
    groups_students gs
JOIN
    groups g ON g.id = gs.group_id
JOIN
    students s ON s.id = gs.student_id
JOIN
    branches b ON b.id = g.branch_id
JOIN
    company c ON c.id = g.company_id
JOIN
    stafs t ON t.id = g.teacher_id
JOIN
    stafs asi ON asi.id = g.assistant_id
GROUP BY
    g.id,
    g.g_name,
    g.group_n,
    g.room,
    t.name,
    asi.name,
    g.days,
    g.time,
    g.sesioon,
    g.created_at,
    b.address,
    c.c_name
ORDER BY 
    $1 DESC OFFSET $2 LIMIT $3;


 `

 export const getAllGroupForSadmin = (column , offset, limit ) => fetchData(GET_ALL_GROUPS_FOR_SADMIN,branchId,column, offset, limit )


 const GET_ALL_GROUPS_FOR_EADMIN = `

SELECT
    g.id,
    g.g_name AS group_name,
    g.group_n AS group_number,
    g.room,
    g.days AS lesson_days,
    g.time AS lesson_time,
    g.sesioon,
    COUNT(s.id) AS groups_students,
    g.created_at AS group_created,
    b.address AS branch,
    c.c_name AS company,
    t.name AS teacher,
    asi.name AS assistant
FROM
    groups_students gs
JOIN
    groups g ON g.id = gs.group_id
JOIN
    students s ON s.id = gs.student_id
JOIN
    branches b ON b.id = g.branch_id
JOIN
    company c ON c.id = g.company_id
JOIN
    stafs t ON t.id = g.teacher_id
JOIN
    stafs asi ON asi.id = g.assistant_id
GROUP BY
    g.id,
    g.g_name,
    g.group_n,
    g.room,
    t.name,
    asi.name,
    g.days,
    g.time,
    g.sesioon,
    g.created_at,
    b.address,
    c.c_name,
    c.eadmin_id
HAVING
    c.eadmin_id = $1
OR c.eadmin_id IS NULL
ORDER BY 
    $2 OFFSET $3 LIMIT $4;
 `


 export const getAllGroupForEadmin = (id ,  column , offset, limit ) => fetchData(GET_ALL_GROUPS_FOR_EADMIN , id,  column , offset, limit)



 const GET_ALL_GROUPS_FOR_TEACHER = `
 SELECT
    g.id,
    g.g_name AS group_name,
    g.group_n AS group_number,
    g.room,
    g.days AS lesson_days,
    g.time AS lesson_time,
    g.sesioon,
    COUNT(s.id) AS groups_students,
    g.created_at AS group_created,
    b.address AS branch,
    c.c_name AS company,
    t.name AS teacher,
    asi.name AS assistant
FROM
    groups_students gs
JOIN
    groups g ON g.id = gs.group_id
JOIN
    students s ON s.id = gs.student_id
JOIN
    branches b ON b.id = g.branch_id
JOIN
    company c ON c.id = g.company_id
JOIN
    stafs t ON t.id = g.teacher_id
JOIN
    stafs asi ON asi.id = g.assistant_id
GROUP BY
    g.id,
    g.g_name,
    g.group_n,
    g.room,
    t.name,
    asi.name,
    g.days,
    g.time,
    g.sesioon,
    g.created_at,
    b.address,
    c.c_name,
    t.id
HAVING
    t.id = $1
OR t.id IS NULL

ORDER BY 
      $2 OFFSET $3 LIMIT $4
 `


 export const getAllGroupForTeacher = ( id , column, offset, limit ) => fetchData(GET_ALL_GROUPS_FOR_TEACHER, id, column, offset , limit)

 const GET_ALL_GROUPS_FOR_ASSISTANT = `
 SELECT
    g.id,
    g.g_name AS group_name,
    g.group_n AS group_number,
    g.room,
    g.days AS lesson_days,
    g.time AS lesson_time,
    g.sesioon,
    COUNT(s.id) AS groups_students,
    g.created_at AS group_created,
    b.address AS branch,
    c.c_name AS company,
    t.name AS teacher,
    asi.name AS assistant
FROM
    groups_students gs
JOIN
    groups g ON g.id = gs.group_id
JOIN
    students s ON s.id = gs.student_id
JOIN
    branches b ON b.id = g.branch_id
JOIN
    company c ON c.id = g.company_id
JOIN
    stafs t ON t.id = g.teacher_id
JOIN
    stafs asi ON asi.id = g.assistant_id
GROUP BY
    g.id,
    g.g_name,
    g.group_n,
    g.room,
    t.name,
    asi.name,
    g.days,
    g.time,
    g.sesioon,
    g.created_at,
    b.address,
    c.c_name,
    asi.id
HAVING
   asi.id = $1
OR asi.id IS NULL

ORDER BY 
      $2 OFFSET $3 LIMIT $4;
 `

 export const getAllGroupForAssistant = ( id , column, offset, limit ) => fetchData(GET_ALL_GROUPS_FOR_ASSISTANT, id, column, offset, limit)




 const GET_ONE_GROUP =    `
    SELECT
    g.id,
    g.g_name AS group_name,
    g.group_n AS group_number,
    g.room,
    g.days AS lesson_days,
    g.time AS lesson_time,
    g.sesioon,
    COUNT(s.id) AS groups_students,
    g.created_at AS group_created,
    b.address AS branch,
    c.c_name AS company,
    t.name AS teacher,
    asi.name AS assistant
FROM
    groups_students gs
JOIN
    groups g ON g.id = gs.group_id
JOIN
    students s ON s.id = gs.student_id
JOIN
    branches b ON b.id = g.branch_id
JOIN
    company c ON c.id = g.company_id
JOIN
    stafs t ON t.id = g.teacher_id
JOIN
    stafs asi ON asi.id = g.assistant_id
GROUP BY
    g.id,
    g.g_name,
    g.group_n,
    g.room,
    t.name,
    asi.name,
    g.days,
    g.time,
    g.sesioon,
    g.created_at,
    b.address,
    c.c_name
HAVING
    g.id = $1;
`


 export const getOneGroup = id => fetchRow(GET_ONE_GROUP, id)







import fetchData, { fetchRow } from "../../utils/postgres.js"


const CREATE_ATENTDANCE = `

INSERT INTO student_atentdance ( student_id, is_present ) VALUES ( $1 , $2) RETURNING *

`

export const createAtnentdance = ( student_id,is_present ) => fetchRow(CREATE_ATENTDANCE, student_id, is_present)



const UPDATE_ATENTDANCE = `

UPDATE student_atentdance set is_present = (
  CASE 
      WHEN true THEN $2 ELSE ( SELECT is_present FROM student_atentdance WHERE student_id = $1)
  END
) 
where student_id = $1 RETURNING *
`


export const updateStudentAtentdance = ( id , isPresent ) => fetchRow(UPDATE_ATENTDANCE, id, isPresent)



const GET_ALL_ATENTDANCE = `
SELECT 
      s.id, s.username, s.name, s.last_name,  g.g_name,  g.group_n, sa.* 

FROM 
      groups_students gs

JOIN
    groups g
ON
    gs.group_id = g.id
JOIN
    students s
ON 
    gs.student_id = s.id
JOIN
    student_atentdance sa
ON
    sa.student_id = s.id
WHERE g.id = $1
`



export const getAllAtentdance = (id) => fetchData(GET_ALL_ATENTDANCE, id)




const GET_ONE_STUDENTS_ATENTDANCE = `
SELECT 
    s.username , s.name , s.last_name,
    sa.*
FROM 
    student_atentdance sa
JOIN 
    students s 
ON
    s.id  = sa.student_id
WHERE s.id = $1
`


export const getOneStudentAtentdance  = id => fetchData(GET_ONE_STUDENTS_ATENTDANCE, id)


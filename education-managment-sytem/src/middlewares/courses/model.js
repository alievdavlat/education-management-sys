import fetchData, { fetchRow } from '../../utils/postgres.js'

const IS_ALREADY_CREATED = `
select * from courses where course_n = $1
`
export const isAlreadyCreated = cName => fetchRow(IS_ALREADY_CREATED, cName)


const CREATE_COURSE = `
INSERT INTO courses (course_n, price,company_id, img) VALUES ($1, $2, $3, $4) RETURNING *
`

export const createCourse = (course_n, price,company_id, img) => fetchRow(CREATE_COURSE, course_n, price,company_id, img) 


const DELETE_COURSE = `
DELETE FROM courses WHERE id = $1 RETURNING *
`

export const deleteCourse = (id) => fetchRow(DELETE_COURSE, id)


const UPDATE_COURSE = `
UPDATE courses SET price =  (
  CASE 
      WHEN true THEN $2 ELSE ( SELECT price  FROM courses WHERE id = $1 ) 
  END
) RETURNING *

`

export const updateCourse = ( id, price ) => fetchRow(UPDATE_COURSE, id, price)


const GET_COURSE = `
SELECT
    c.id AS course_id,
    c.course_n AS course_name,
    json_agg(
      json_build_object(
        'teacher_name', t.name,
        'teacher_surname', t.last_name,
        'teacher_dob', t.dob,
        'teacher_proffesion', t.proffesion,
        'teacher_role', t.role
      )
    ) AS course_teachers,
    json_agg(
      json_build_object(
        'assistant_name', asi.name,
        'assistant_surname', asi.last_name,
        'assistant_dob', asi.dob,
        'assistant_proffesion', asi.proffesion,
        'assistant_role', asi.role
      )
    ) AS course_assistants,
    c.created_at
FROM
    courses c
JOIN
    courses_teachers ct
ON
    c.id = ct.course_id
JOIN
    stafs t
ON
    ct.teachers_id = t.id
JOIN
    stafs asi
ON
    asi.id = ct.assistant_id
GROUP BY 
    c.id,
    c.course_n,
    c.created_at,
    c.id

HAVING c.id = $1

`

export const getCourse = (id) => fetchRow(GET_COURSE, id)


const GET_ALL_COURSE = `
SELECT * FROM courses ;
`

export const getAllCourse = () => fetchData(GET_ALL_COURSE)
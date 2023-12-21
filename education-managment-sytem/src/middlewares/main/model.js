import { fetchRow } from "../../utils/postgres.js"


const ADD_TEACHER_TO_COURSE = `
INSERT INTO courses_teachers ( course_id, teachers_id )  VALUES ($1 ,$2)  RETURNING *
`

const ADD_ASSISTANT_TO_COURSE = `
INSERT INTO courses_teachers ( course_id, assistant_id )  VALUES ($1 ,$2) RETURNING *
`


export const addTeacherToCourse = (  course_id, teachers_id ) => fetchRow(ADD_TEACHER_TO_COURSE, course_id, teachers_id)

export const addAssistantToCourse =  ( course_id, assistant_id )  => fetchRow(ADD_ASSISTANT_TO_COURSE, course_id, assistant_id)



const TEACHER_ALREADY_ADDED_TO_COURSES = `

SELECT * FROM courses_teachers WHERE course_id = $1 AND teachers_id = $2

`



const ASSISTANT_ALREADY_ADDED_TO_COURSES = `

SELECT * FROM courses_teachers WHERE course_id = $1 AND assistant_id = $2

`

export const teacherAlreadyAddedTOCourse  = ( course_id, teachers_id ) => fetchRow(TEACHER_ALREADY_ADDED_TO_COURSES, course_id, teachers_id)

export const assistantAlreadyAddedTOCourse  = ( course_id, assistant_id ) => fetchRow(ASSISTANT_ALREADY_ADDED_TO_COURSES,course_id, assistant_id )



const STUDENT_ALREADY_ADDED_TO_GROUP = `

SELECT * FROM groups_students WHERE group_id = $1 AND student_id = $2
`

const ADD_STUDNT_TO_GROUP = `
INSERT INTO groups_students (group_id, student_id) VALUES ( $1 , $2 ) RETURNING *

`

export const studentAlreadyAddedGroup = ( group_id, student_id ) => fetchRow(STUDENT_ALREADY_ADDED_TO_GROUP, group_id, student_id)
export const addStudentToGroup = (group_id, student_id ) => fetchRow(ADD_STUDNT_TO_GROUP, group_id, student_id )


const DISABLED_STUDENT = `

UPDATE students set blocked = (
  CASE 
      WHEN true THEN $2  ELSE ( SELECT blocked from students WHERE id = $1)
  END
) WHERE id = $1 RETURNING * 
`

export const disabledStudent = ( id , blocked ) => fetchRow(DISABLED_STUDENT, id, blocked)




const BLOCK_COMPANY = `
UPDATE company set blocked = (
  CASE 
      WHEN true THEN $2 ELSE (SELECT blocked FROM company WHERE id = $1)
  END
) WHERE id = $1 RETURNING * 
`

export const blockCompany = ( id, bloced ) => fetchRow(BLOCK_COMPANY , id, bloced)


const CHANGE_STUDENT_PAYMENT_STATUS = `

UPDATE students set payment_status = (
  CASE 
      WHEN true THEN $2 ELSE (SELECT payment_status FROM students WHERE id = $1)
  END
) WHERE id = $1 RETURNING * 

`

const CHANGE_STUDENT_PAYMENT_STATUS2 = `

UPDATE students set payment_status = (
  CASE 
      WHEN true THEN $2 ELSE (SELECT payment_status FROM students WHERE id = $1)
  END
),
student_payed_at = (
  CASE 
      WHEN true THEN $3 ELSE (SELECT student_payed_at FROM students WHERE id = $1)
  END
) WHERE id = $1 RETURNING * 

`


export const changeStudentPaymentStatus = ( id,  payment_status ) => fetchRow(CHANGE_STUDENT_PAYMENT_STATUS, id,  payment_status)

export const changeStudentPaymentStatus2 = ( id,  payment_status, date ) => fetchRow(CHANGE_STUDENT_PAYMENT_STATUS2, id,  payment_status, date)



const CHANGE_COMPANY_PAYMENT_STATUS = `
UPDATE company set payment_status = (
  CASE 
      WHEN true THEN $2 ELSE (SELECT payment_status FROM company WHERE id = $1)
  END
) WHERE id = $1 RETURNING * 
`

const CHANGE_COMPANY_PAYMENT_STATUS2 = `
UPDATE company set payment_status = (
  CASE 
      WHEN true THEN $2 ELSE (SELECT payment_status FROM company WHERE id = $1)
  END
),
company_payed_at = (
  CASE 
      WHEN true THEN $3 ELSE (SELECT company_payed_at FROM company WHERE id = $1)
  END
) WHERE id = $1 RETURNING * 
`


export const changeCompnyPaymentStatus = ( id,  payment_status ) => fetchRow(CHANGE_COMPANY_PAYMENT_STATUS, id,  payment_status)
export const changeCompnyPaymentStatus2 = ( id,  payment_status , date) => fetchRow(CHANGE_COMPANY_PAYMENT_STATUS2, id,  payment_status, date)



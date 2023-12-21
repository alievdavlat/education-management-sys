import fetchData, { fetchRow } from "../../utils/postgres.js"


const CREATE_HOMEWOR = `
INSERT INTO homeworks(title, body, group_id,company_id) VALUES ($1 , $2, $3, $4) RETURNING *
`

export const createHomeworks = (title, body, group_id,company_id) => fetchRow(CREATE_HOMEWOR, title, body, group_id,company_id)

const IS_HAVE = `
SELECT * FROM homeworks WHERE id = $1
`

export const isHave = ( id) => fetchRow(IS_HAVE, id)

const UPDATE_HOMEWORK = `

UPDATE homeworks set title  = (
  CASE 
      WHEN true THEN $2 ELSE ( SELECT title  FROM homeworks WHERE id = $1 ) 
  END
),
body = (
  CASE 
      WHEN true THEN $3 ELSE ( SELECT body  FROM homeworks WHERE id = $1 ) 
  END
)
WHERE id = $1 RETURNING *
`

export const updateHomework = ( id , title, body ) => fetchRow(UPDATE_HOMEWORK, id, title, body)



const DELETE_HOMEWORK = `
DELETE FROM homeworks WHERE id = $1 RETURNING *
`

export const deleteHomework = ( id ) => fetchRow(DELETE_HOMEWORK, id)


const GET_ALL_HOMEWORKS_AT_GROUP = `

SELECT
     h.*
FROM
     homeworks h
LEFT JOIN
    groups g ON g.id = h.group_id
WHERE g.id = $1

ORDER BY 
      $2 ASC OFFSET $3 LIMIT $4
`
export const getAllHomeworkAtGroup = (id, column , offset , limit ) => fetchData(GET_ALL_HOMEWORKS_AT_GROUP, id,  column , offset , limit)


const GET_ONE_HOMEWORK = `
SELECT
     h.*
FROM
     homeworks h

WHERE h.id = $1

`
export const getOneHomework = id => fetchRow(GET_ONE_HOMEWORK, id)


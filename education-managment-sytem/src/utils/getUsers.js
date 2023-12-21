import { fetchRow } from "./postgres.js"


const GET_ADMIN  = `
SELECT 
  *
FROM 
  admins a
WHERE 
  a.id = $1
`


export const getAdmin = id => fetchRow(GET_ADMIN, id)



const GET_ONE_STAF_BY_ID = `
SELECT 
  *
FROM
stafs s
WHERE s.id = $1
   `

export const getStafs = ( id ) => fetchRow(GET_ONE_STAF_BY_ID, id) ;


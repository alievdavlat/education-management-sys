
import { fetchRow } from '../../utils/postgres.js'

const LOGIN_ADMIN = `
SELECT 
  a.id , a.username , a.name, a.last_name , a.password , a.role
FROM
  admins a
WHERE a.username = $1 
   `


  
   export const getAdmin = ( username ) => fetchRow(LOGIN_ADMIN, username) ;


   const LOGIN_STAF = `
   SELECT 
     s.id , s.username , s.name, s.last_name , s.password , s.role
   FROM
   stafs s
   WHERE s.username = $1
      `

   export const getStaf = ( username ) => fetchRow(LOGIN_STAF, username) ;



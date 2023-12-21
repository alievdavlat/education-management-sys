import fetchData, { fetchRow } from "../../utils/postgres.js"


const CREATE_NEW_BRANCH = `

INSERT INTO branches (
  address,
  company_id
) VALUES (
  $1, $2 
) RETURNING *

`


export const createNewBranch = ( address, company_id ) => fetchRow(CREATE_NEW_BRANCH, address, company_id);


const GET_ONE_BRANCH = `
SELECT * FROM branches WHERE address = $1
`



export const getOneBranch = (address) => fetchRow(GET_ONE_BRANCH, address);


const GET_ALL_BRANCHES_FOR_SUPER_ADMIN = `
SELECT
    b.id AS branch_id,
    b.address AS branch_address,
    COUNT(DISTINCT s.id) AS student_count,
    COUNT(DISTINCT g.id) AS group_count,
    COUNT(DISTINCT t.id) AS staff_count
FROM
    branches b
LEFT JOIN
    groups g ON b.id = g.branch_id
LEFT JOIN
    students s ON s.branch_id = b.id
LEFT JOIN
    stafs t ON b.id = t.branch_id
LEFT JOIN
        company c ON c.id = b.company_id
GROUP BY
    b.id, b.address, c.eadmin_id
ORDER BY 
      $1 OFFSET $2 LIMIT $3

`

export const getAllBranchesForSuperAdmin = (column, offset, limit) => fetchData(GET_ALL_BRANCHES_FOR_SUPER_ADMIN, column, offset, limit)




const GET_ALL_BRANCHES_FOR_EADMIN = `
SELECT
    b.id AS branch_id,
    b.address AS branch_address,
    COUNT(DISTINCT s.id) AS student_count,
    COUNT(DISTINCT g.id) AS group_count,
    COUNT(DISTINCT t.id) AS staff_count
FROM
    branches b
LEFT JOIN
    groups g ON b.id = g.branch_id
LEFT JOIN
    students s ON s.branch_id = b.id
LEFT JOIN
    stafs t ON b.id = t.branch_id
LEFT JOIN
        company c ON c.id = b.company_id
GROUP BY
    b.id, b.address, c.eadmin_id
HAVING c.eadmin_id = $1
ORDER BY 
      $2 OFFSET $3 LIMIT $4


`
export const getAllBranchesForEadmin = ( id, column, offset, limit) => fetchData(GET_ALL_BRANCHES_FOR_EADMIN, id,column, offset, limit)

const GET_ONE_BRANCH_BY_ID = `
SELECT
    b.id AS branch_id,
    b.address AS branch_address,
    COUNT(DISTINCT s.id) AS student_count,
    COUNT(DISTINCT g.id) AS group_count,
    COUNT(DISTINCT t.id) AS staff_count
FROM
    branches b
LEFT JOIN
    groups g ON b.id = g.branch_id
LEFT JOIN
    students s ON s.branch_id = b.id
LEFT JOIN
    stafs t ON b.id = t.branch_id
LEFT JOIN
        company c ON c.id = b.company_id
GROUP BY
    b.id, b.address
HAVING b.id = $1

`
export const getOneBranchById = (branchId) => fetchRow(GET_ONE_BRANCH_BY_ID,branchId)


const DELETE_ONE_BY_ID = `
DELETE FROM branches WHERE id = $1 RETURNING *
`

export const deleteOneByID = (id) => fetchRow(DELETE_ONE_BY_ID, id)


const UPDATE_ONE_BY_ID = `
update branches  set address = (
  case 
      when true then $1 else ( select  address from branches where id = $2 ) 
  end
)
where id = $2 RETURNING * 

`

export const updateOneBYid = (address,id) => fetchRow(UPDATE_ONE_BY_ID,address, id)
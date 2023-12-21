import pg from 'pg'
import ErrorHandler from './errorhandler.js'


const pool = new pg.Pool({
  connectionString: process.env.CONNECTION_STRING
})



const fetchData = async (SQL, ...params) => {
  const client = await pool.connect()

  try {
    const { rows } = await client.query(SQL, params.length ? params : null )
    
    return rows

  } catch (error) {
      new ErrorHandler(error.message)
  } finally {
    client.release()
  }

}

export default fetchData





export const fetchRow = async (SQL, ...params) => {
  const client = await pool.connect()

  try {
    const { rows : [ row ] } = await client.query(SQL, params.length ? params : null )
    
    return row

  } catch (error) {
      console.log(error.message);
  } finally {
    client.release()
  }

}



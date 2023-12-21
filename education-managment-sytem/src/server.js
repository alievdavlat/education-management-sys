import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import accesTokenMiddleware from './middlewares/accesToken.middleware.js'
import admin from './routes/admin.js'
import auth from './routes/auth.js'
import readImgController from './controllers/readImgController.js'
import company from './routes/company.js'
import mainRouter from './routes/main.router.js'
import branches from './routes/branches.js'
import stafs from './routes/stafs.js'
import students from './routes/students.js'
import groups from './routes/groups.js'
import homeworks from './routes/homeworks.js'
import courses from './routes/courses.js'
import Atentdance from './routes/atentdance.js'
const app = express()
import path from 'path'

// third parties
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'))


app.use(auth)

app.get('/img/:file', readImgController)

app.get('/', ( _, res ) => {
  res.send('https://documenter.getpostman.com/view/27748527/2s9Y5R1RTm')
})

// middlewares 
app.use(accesTokenMiddleware)
// routes
app.use(admin)
app.use(company)
app.use(mainRouter)
app.use(branches)
app.use(stafs)
app.use(students)
app.use(groups)
app.use(homeworks)
app.use(courses)
app.use(Atentdance)

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
})




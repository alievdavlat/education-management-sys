import ErrorHandler from '../../utils/errorhandler.js'
import { getAdmin, getStafs } from '../../utils/getUsers.js'
import { addAssistantToCourse, addTeacherToCourse, assistantAlreadyAddedTOCourse, teacherAlreadyAddedTOCourse } from './model.js';

const addteacherToCourseMiddleware = async ( req, res, next ) => {
  try {
    const {verifyId } = req;
    const { staf_id, course_id } = req.body

    const isAdmin =  await getAdmin(verifyId)
    const isStaf = await getStafs(staf_id)

    if (!staf_id || !course_id) {
      res.status(204).send({
        status:204,
        data:null,
        msg:'values required'
      })
      return
    }

      const isAlreadyAddedTeacher = await teacherAlreadyAddedTOCourse(course_id, staf_id)
      const isAlreadyAddedAssistant  = await assistantAlreadyAddedTOCourse(course_id, staf_id)

    if (isAlreadyAddedTeacher) {
      res.status(400).send({
        status:400,
        data:null,
        msg:'teacher already added to course'
      })
      return
    }
    if (isAlreadyAddedAssistant) {
      res.status(400).send({
        status:400,
        data:null,
        msg:'assistant already added to course'
      })
      return
    }

    
    if (isAdmin.role  != 'eadmin') {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot add teacher to course'
      })

      return
    }

    if (isStaf.role == 'main-teacher') {
        const staf = await addTeacherToCourse(course_id, staf_id)
        req.staf = staf
        next()
        return
    }

    if (isStaf.role == 'assistant') {
      const staf = await addAssistantToCourse(course_id, staf_id)
      req.staf = staf
      next()
      return
    }

    res.status(404).send({
      status:404,
      data:null,
      msg:'staf not found'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default addteacherToCourseMiddleware
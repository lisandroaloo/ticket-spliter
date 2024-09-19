import express from 'express'
import { addUserToProject, createProject, editProject, getProjectByIDDeep, getProjects } from '../controllers/projectController'

const projectRoutes = express.Router()

projectRoutes.get('/:userId', getProjects)
projectRoutes.post('/', createProject)
projectRoutes.patch('/', editProject)
projectRoutes.get('/detail/:prId', getProjectByIDDeep)
projectRoutes.post('/detail/:prId', addUserToProject)

export default projectRoutes
 
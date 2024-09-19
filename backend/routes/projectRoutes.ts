import express from 'express'
import { addUserToProject, createProject, editProject, editProjectPercentages, getProjectByIDDeep, getProjects } from '../controllers/projectController'

const projectRoutes = express.Router()

projectRoutes.get('/:userId', getProjects)
projectRoutes.post('/', createProject)
projectRoutes.patch('/', editProject)
projectRoutes.patch('/percentage/:prId', editProjectPercentages)
projectRoutes.get('/detail/:prId', getProjectByIDDeep)
projectRoutes.post('/detail/:prId', addUserToProject)

export default projectRoutes
 
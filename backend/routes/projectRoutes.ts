import express from 'express';
import {
    addUserToProject,
    createProject,
    editProject,
    editProjectPercentages,
    getProjectByIDDeep,
    getProjectDetail,
    getProjectPagos,
    getProjects,
    getProjectTickets,
    getProjectUsers,
    getUsersNotInProject
} from '../controllers/projectController';
import protectRoute from '../middleware/protectRoute';

const projectRoutes = express.Router();


projectRoutes.get('/:userId', getProjects);
projectRoutes.post('/', createProject);
projectRoutes.patch('/', editProject);
projectRoutes.patch('/percentage/:prId', protectRoute, editProjectPercentages);
projectRoutes.get('/detail/:prId', protectRoute, getProjectByIDDeep);
projectRoutes.post('/detail/:prId', protectRoute, addUserToProject);
projectRoutes.get('/test/:prId', protectRoute, getUsersNotInProject)

export default projectRoutes;

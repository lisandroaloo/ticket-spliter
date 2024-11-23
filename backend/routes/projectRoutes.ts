import express from 'express';
import {
    addUserToProject,
    closeProject,
    createProject,
    deleteUserFromProject,
    editProject,
    // editProjectPercentages,
    // generateDetailedPaymentPlan,
    getProjectDetail,
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

// projectRoutes.patch('/percentage/:prId', protectRoute, editProjectPercentages);

projectRoutes.post('/detail/:prId', protectRoute, addUserToProject);

projectRoutes.post('/detail/delete/:prId', protectRoute, deleteUserFromProject);

projectRoutes.patch('/detail/:prId', protectRoute, closeProject);

projectRoutes.get('/detail/:prId', protectRoute, getProjectDetail);



projectRoutes.get('/tickets/:prId', protectRoute, getProjectTickets);

projectRoutes.get('/users/:prId', protectRoute, getProjectUsers);

projectRoutes.get('/usersNotInProject/:prId', protectRoute, getUsersNotInProject)

// projectRoutes.get('/detailedPlan/:prId', protectRoute, generateDetailedPaymentPlan)

export default projectRoutes;

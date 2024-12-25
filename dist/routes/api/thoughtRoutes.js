import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction, } from '../../controllers/thoughtController.js';
// /api/courses
router.route('/').get(getThoughts).post(createThought);
// /api/courses/:courseId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
export { router as thoughtRouter };

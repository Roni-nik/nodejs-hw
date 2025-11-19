import { Router } from 'express';
import { celebrate } from 'celebrate';


import {
	getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import { noteIdSchema, updateNoteSchema, getAllNotesSchema, createNoteSchema } from '../validations/notesValidation.js';

const router = Router();


router.post('/notes', celebrate(createNoteSchema), createNote);


router.get('/notes',celebrate(getAllNotesSchema), getAllNotes);
// router.get('/notes/:noteId', getNoteById);
// router.post('/notes', createNote);
// router.delete('/notes/:noteId', deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);



router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

export default router;

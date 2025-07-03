import { Router } from 'express';
import { ContactController } from '@/controllers/ContactController';
import { getService } from '@/container/Container';

const router = Router();

// Get controller instance from container
const contactController = getService<ContactController>('ContactController');

// Contact routes
router.post('/', contactController.submitContact);
router.get('/', contactController.getContacts);
router.get('/stats', contactController.getContactStats);
router.get('/export', contactController.exportContacts);
router.get('/:id', contactController.getContactById);
router.patch('/:id/status', contactController.updateContactStatus);
router.post('/:id/notes', contactController.addContactNote);
router.delete('/:id', contactController.deleteContact);

export default router;

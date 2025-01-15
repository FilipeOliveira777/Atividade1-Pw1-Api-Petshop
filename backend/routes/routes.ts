import { Router } from 'express';
import {createPetshop} from '../controllers/createPetshop';




const router = Router();

router.post('/petshop',createPetshop); 

export default router;
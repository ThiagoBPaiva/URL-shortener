import express, { Router } from 'express';
import { testeRoter, confirmUrl } from '../controllers/url-project.controllers'

export const router = Router();


router.get('/', testeRoter);
router.post('/url', confirmUrl)
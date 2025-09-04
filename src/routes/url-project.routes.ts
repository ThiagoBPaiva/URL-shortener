import express, { Router } from 'express';
import { testeRoter, confirmUrl, json_form } from '../controllers/url-project.controllers'

export const router = Router();


router.get('/', testeRoter);
router.get('/url/:url', confirmUrl)
router.post('/json-form', json_form)
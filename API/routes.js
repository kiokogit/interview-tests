import express from 'express'
import { multipleWordsFunc } from './controller';

const router = express.Router();

router.get('/:word1/:word2', multipleWordsFunc);

export default router;
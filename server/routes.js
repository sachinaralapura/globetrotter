import { Router } from "express";
const router = Router();

import { GenerateRandomQuestion, ValidateAnswer } from "./handlers.js";


// 
router.get('/', (req, res) => {
    console.log(data)

})

// GET /random - returns a random question
router.get('/random', async (req, res) => {
    const random = GenerateRandomQuestion();
    res.json(random);
});

router.post('/validate', async (req, res) => {
    const { id, answer } = req.body;
    const data = ValidateAnswer(id, answer);
    res.json(data);
});


export default router;
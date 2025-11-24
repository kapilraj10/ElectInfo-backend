import express from 'express';

const app = express();
const PORT = process.env.PORT || 1000;

app.get('/', (req,res) =>{
    res.send('Hello Developer from Express.js server!');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}) 

export default app;
import express from 'express';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

const app = express();
app.use(cors())

app.use(express.json());


app.use('/api', userRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

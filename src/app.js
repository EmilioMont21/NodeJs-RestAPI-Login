import express from 'express'
import morgan from 'morgan';
import pkg from '../package.json'
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { createRoles } from './libs/initialSetup';
import cors from "cors";

const app = express()
createRoles();

app.set('pkg', pkg);


app.use(
    cors({
      origin: "*",
    })
  );
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({
        author: 'Emilio',
        descrription: 'back'
    })
})

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
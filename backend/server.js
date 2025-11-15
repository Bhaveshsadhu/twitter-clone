import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './dbconfig/db.config.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/errorMiddleware/errorMiddleware.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    if (connectDB()) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.error("Failed to connect to the database");
    }
});

// Define your routes here
app.use('/api/auth', authRoutes);

// Global error handler 
app.use(errorHandler);
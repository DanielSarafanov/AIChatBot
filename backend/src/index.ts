import { error } from 'console';
import app from './app.js'
import { connectToDatabase } from './database/connection.js';

const PORT = process.env.PORT || 5001;

// connect to database and start backend server
connectToDatabase().then(()=>{
    app.listen(PORT, () => console.log("Server Open and Connected to DB"));
}).catch((error) => console.log(error));



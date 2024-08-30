import { app } from "./app.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();

connectDB();

// app.listen(process.env.PORT, () => {
//   console.log(`App listening at port ${process.env.PORT}`);
// });
export default app
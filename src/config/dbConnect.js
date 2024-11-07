import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECTION_STRING);

let db = mongoose.connection;

export default db;
// async function connectToDatabase() {
//     mongoose.connect(process.env.DB_CONNECTION_STRING);

//     return mongoose.connection;
// }

// export default connectToDatabase;

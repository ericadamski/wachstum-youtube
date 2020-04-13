import Mongoose from "mongoose";

function connect() {
  if (Mongoose.connection.readyState === 0) {
    Mongoose.connect(
      `${process.env.MONGO_URL || "mongodb://localhost:27017"}/wachstum`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        createIndexes: true
      }
    );
  }
}

export default { connect };

import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://harshrawat2803_db_user:rCvCOcH7a2cRmGgg@cluster0.ouksl0e.mongodb.net/SchemeMatch?appName=Cluster0")
    .then(() => {
      console.log("✅ Database Engine Online! Connected to SchemeMatch!");
    })
    .catch((err) => {
      console.log("❌ Database Connection Failed: ", err);
    });
};

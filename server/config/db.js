import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://aarav8090shukla:aaravshukla@ac-hjbo9qp-shard-00-00.v3ldv70.mongodb.net:27017,ac-hjbo9qp-shard-00-01.v3ldv70.mongodb.net:27017,ac-hjbo9qp-shard-00-02.v3ldv70.mongodb.net:27017/?replicaSet=atlas-11v1ng-shard-0&ssl=true&authSource=admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB Connection Error:', err);
    process.exit(1);
  }
};

export default connectDB;

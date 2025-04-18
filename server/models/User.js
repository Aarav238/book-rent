import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  seeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    default: "I would like to borrow this book."
  }
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Owner', 'Seeker'],
    required: true
  },
  requests: [requestSchema]
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

export default User;

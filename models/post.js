import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please Provide User."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: [true, "Please Provide Title For the Post"],
  },
  desc: {
    type: String,
    required: [true, "Please Provide Desc for Post"],
  },
  image: {
    type: String,
    required: [true, "Please Set the Image for Post"],
  },
  likes: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Blogs", BlogSchema);

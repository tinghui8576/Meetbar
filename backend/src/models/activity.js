import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  id: { type: String, required: [true, "ID field is required."] },
  title: { type: String, require: [true, "Title field is required."] },
  date: { type: Date, require: [true, "Date field is required."] },
  category: { type: String, required: [true, "Category field is required."] },
  location: { type: String, required: [true, "Location field is required."] },
  context: { type: String, require: [true, "Context field is required."] },
  chatBox: { type: mongoose.Types.ObjectId, ref: "ChatBox" },
  host: { type: mongoose.Types.ObjectId, ref: "User" },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  messages: [
    { 
      name: {type: String},
      sender: { type: String },
      body: { type: String },
    }
  ],
});
const PostModel = mongoose.model("Post", PostSchema);

const UserSchema = new Schema({
  name: { type: String, required: [true, "Name field is required."] },
  account: { type: String, required: [true, "Account field is required."] },
  password: { type: String, required: [true, "Password field is required."] },
  posts: [{type: mongoose.Types.ObjectId, ref: "Post"}],
  chatBoxes: [{ type: mongoose.Types.ObjectId, ref: "ChatBox" }],
});
const UserModel = mongoose.model("User", UserSchema);

const ChatBoxSchema = new Schema({
  // name: { type: String, required: [true, "Name field is required."] },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);

const MessageSchema = new Schema({
  post: { type: mongoose.Types.ObjectId, ref: "Post" },
  sender: { type: String, ref: "User" },
  body: { type: String, required: [true, "Body field is required."] },
});
const MessageModel = mongoose.model("Message", MessageSchema);

export { PostModel, UserModel, MessageModel, ChatBoxModel };

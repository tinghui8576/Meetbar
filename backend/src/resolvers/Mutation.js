import { v4 as uuidv4 } from "uuid";

const checkOutChatBox = async (name1, name2, ChatBoxModel) => {
  const name = [name1, name2].sort().join("_");
  let box = await ChatBoxModel.findOne({ name });
  if (!box) box = await new ChatBoxModel({ name }).save();
  return box;
};

const makeName = (name, to) => {
  const chatBoxName = [name, to].sort().join("_");
  return chatBoxName;
};

const Mutation = {
  createChatBox: (parent, { name1, name2 }, { ChatBoxModel }, info) => {
    return checkOutChatBox(name1, name2, ChatBoxModel);
  },

  createMessage: async (
    parent,
    { id, sender, body },
    { PostModel, UserModel,pubsub }
  ) => {
    
    const post = await PostModel.findOne({id}).populate("messages");
    const user = await UserModel.findOne({account: sender})
    const name = user.name
    const newMsg = {
      name,
      sender,
      body
    }
    const updatedPost = await PostModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          messages: [...post.messages,newMsg] 
        },
      },
      {returnNewDocument: true}
    );
    pubsub.publish(`${id}_MSG_CREATED`,{
      message: updatedPost.messages,
    });
    return updatedPost.messages;
  },

  createPost: async (
    parent,
    { input, account },
    { PostModel, ChatBoxModel, UserModel, pubsub }
  ) => {
    const host = await UserModel.findOne({ account: account }).populate('posts');
    if (!host) console.log("find no user");
    input.host = host;
    (input.id = uuidv4()), (input.users = [host]);
    input.messages = [];
    
    const newPost = new PostModel(input);
    host.posts = [newPost, ...host.posts]
    await host.save()
    await newPost.save();
    pubsub.publish("POST_CREATED", {
      postCreated: newPost,
    });
    pubsub.publish(`${account}_POST_Attended`,{
      postAttended: host.posts,
    });
    return newPost;
  },

  updatePost: async (
    parent,
    { id, input },
    { PostModel, ChatBoxModel, UserModel, pubsub }
  ) => {
    const updatedPost = await PostModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          title: input.title,
          date: input.date,
          category: input.category,
          location: input.location,
          context: input.context,
        },
      },
      {returnNewDocument: true}
    );
    return updatedPost;
  },

  deletePost: async (
    parent,
    { id },
    { PostModel, ChatBoxModel, UserModel, pubsub }
  ) => {
    await PostModel.deleteOne({ id: id });
    return id;
  },

  createUser: async (parent, { input }, { UserModel, bcrypt, pubsub }) => {
    if (await UserModel.findOne({ account: input.account })) {
      return;
    }
    input.password = await bcrypt.hash(input.password, 10);
    const newUser = new UserModel(input);
    await newUser.save();
    return newUser;
  },

  attendPost: async (
    parent,
    { id, account },
    { UserModel, PostModel, pubsub }
  ) => {
    const post = await PostModel.findOne({ id })
    const user = await UserModel.findOne({ account }).populate('posts');
    const exist_post = user.posts.filter(post => post.id === id)
    if(exist_post.length===0){
      post.users = [user, ...post.users]
      user.posts = [post, ...user.posts]
      await post.save();
      await user.save();
    }
    pubsub.publish(`${account}_POST_Attended`,{
      postAttended: user.posts,
    });
    return user;
  },
};

export default Mutation;

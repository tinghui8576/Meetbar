const Query = {
  chatBox: async (parent, { name1, name2 }, { ChatBoxModel }, info) => {
    const name = [name1, name2].sort().join("_");
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name }).save();

    return box;
  },

  allPost: async (parent, args, { PostModel }, info) => {
    let post = await PostModel.find().populate('host').populate('users');
    if (!post) post = [];
    return post.reverse();
  },

  myPost: async (parent, {account}, { UserModel }, info) => {
    let user = await UserModel.findOne({account}).populate('posts')
    return user;
  },

  checkUser: async (parent, { account, password }, { UserModel, bcrypt }, info) => {
    let user = await UserModel.findOne({ account: account });
    if(user){
      if( await bcrypt.compare(password, user.password)){
        user.checked = true
      }
      else{
        user.checked = false
      }
    }
    return user;
  },

  postMsg: async (parent, { id }, { PostModel, bcrypt }, info) => {
    let post = await PostModel.findOne({ id }).populate("messages");
    if (!post) return []
    return post.messages;
  },
};

export default Query;

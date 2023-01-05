const makeName = (name, to) => {
  const chatBoxName = [name, to].sort().join("_");
  return chatBoxName;
}

const Subscription = {
  message: {
    subscribe: (parent, { id }, { pubsub }, info) => {
      return pubsub.subscribe(`${id}_MSG_CREATED`);
    },
  },

  postCreated: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.subscribe('POST_CREATED');
    },
  },

  postAttended: {
    subscribe: (parent, {account}, { pubsub }, info) => {
      return pubsub.subscribe(`${account}_POST_Attended`);
    },
  },

  UserCreated: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.subscribe('USER_CREATED');
    },
  }
};

export default Subscription;

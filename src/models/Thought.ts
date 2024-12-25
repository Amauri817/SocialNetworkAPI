import mongoose, { Schema, model, Document } from 'mongoose';

interface IReaction extends Document {
  reactionId: mongoose.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date | string; // Can be a Date or formatted string
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: number) => new Date(timestamp).toISOString(), // Corrected typing
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: number) => new Date(timestamp).toISOString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Embed reactionSchema as an array
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
export {reactionSchema, IReaction};
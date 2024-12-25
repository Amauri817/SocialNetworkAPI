import { Schema, model, ObjectId, Document } from 'mongoose';

// Interface
interface IUser extends Document {
    username: string,
    email: string,
    thoughts: ObjectId[];
    friends: ObjectId[];
    friendCount: number;
}

// Schema
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/ // Valid email format validation
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'thought', // References the Thought model
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'user', // References itself (User model)
            }
        ],
    },
    {
        // Indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

// Virtual for friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize our User model
const User = model<IUser>('user', userSchema);

export default User;

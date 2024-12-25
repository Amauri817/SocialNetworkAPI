import { Schema, model } from 'mongoose';
// Schema
const userSchema = new Schema({
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
}, {
    // Indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
// Virtual for friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Initialize our User model
const User = model('user', userSchema);
export default User;

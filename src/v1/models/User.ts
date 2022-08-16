import mongoose, {Schema} from "mongoose";

const userSchema = new Schema( {
    project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true, select: false },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    properties: Schema.Types.Mixed
}, { strict: true, timestamps: true } );

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj.project_id;
    return obj;
}

// * Export the model and return the interface
export default mongoose.model('User', userSchema);
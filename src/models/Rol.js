import {Schema, model} from "mongoose";
import mongoose from "mongoose";

export const ROLES = ['user', 'admin']

const roleSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default mongoose.model("Rol", roleSchema);
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category
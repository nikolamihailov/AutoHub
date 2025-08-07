import mongoose from 'mongoose';

export interface CategoryI {
  _id: mongoose.Types.ObjectId;
  name: string;
  categoryImage: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required!'],
      minLength: [3, 'Category name must be at least 3 characters!'],
      maxLength: [20, 'Category name must not be more than 20 characters!'],
    },
    categoryImage: {
      type: String,
      required: [true, 'Category Image is required!'],
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model<CategoryI>('Category', categorySchema);

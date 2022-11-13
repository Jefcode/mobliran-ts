import { Review, Product, User, Category, Order } from './../../shared/types';
import { Document } from 'mongoose';

interface CustomUserMethods {
  matchPassword: (password: string) => Promise<boolean>;
}

export type IUser = User & CustomUserMethods & Document;
export type IReview = Review & Document;
export type IProduct = Product & Document;
export type ICategory = Category & Document;
export type IOrder = Order & Document;

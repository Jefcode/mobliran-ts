import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users';
import products from './data/products';
import User from './models/userModel';
import Product from './models/productModel';
import connectDB from './config/db';

dotenv.config();
connectDB();

interface ErrorMessage {
  message: string;
}

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.log(`${(error as ErrorMessage).message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.log(`${(error as ErrorMessage).message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

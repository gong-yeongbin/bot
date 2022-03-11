import mongoose from 'mongoose';

export default async () => {
  const url: string = process.env.MONGO_DB as string;
  mongoose.connect(url);
};

import mongoose, { Schema, Model } from 'mongoose';

interface IStock extends Document {
  name: string;
}

interface IStockDocument extends IStock, Document {}
interface IStockModel extends Model<IStockDocument> {}

const stockSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

const Stock = mongoose.model<IStockDocument, IStockModel>('Stock', stockSchema);

export default Stock;

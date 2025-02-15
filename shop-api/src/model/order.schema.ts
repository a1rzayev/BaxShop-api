import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from './product.schema';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [{ type: String, ref: 'Product' }] })
  products: Product[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
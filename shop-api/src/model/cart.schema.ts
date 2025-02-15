import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from './product.schema';

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [{ type: String, ref: 'Product' }] })
  products: Product[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'Apparel' })
  category: string;

  @Prop({ default: 'Casual wear' })
  subcategory: string;

  @Prop({ default: 'Normal Taxeable' })
  tagcategory: string;

  @Prop({ default: 'Colors' })
  colors: string;

  @Prop({ default: '3 sizes' })
  sizes: string;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ default: '' })
  imageColor: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

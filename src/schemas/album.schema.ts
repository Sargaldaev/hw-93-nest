import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async function (value: mongoose.Types.ObjectId) {
        const artist = await this.model('Artist').findById(value);
        return !!artist;
      },
      message: 'Artist does not exist',
    },
  })
  artist;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ required: true})
  releaseYear: string;

  @Prop({ default: false })
  isPublished: boolean;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);

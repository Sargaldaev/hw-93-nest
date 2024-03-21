import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async function (value: mongoose.Types.ObjectId) {
        const album = await this.model('Album').findById(value);
        return !!album;
      },
      message: 'Track does not exist',
    },
  })
  album;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  songNumber: string;

  @Prop({ default: false })
  isPublished: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);

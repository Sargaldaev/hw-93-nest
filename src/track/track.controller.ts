import {
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { NextFunction, Response } from 'express';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';

@Controller('tracks')
export class TrackController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  async getAll(@Query('album') album: string, @Res() res: Response) {
    if (album) {
      const track = await this.trackModel
        .find({ album })
        .sort({ songNumber: 1 });
      return res.send(track);
    }

    const tracksAll = await this.trackModel.find();

    return res.send(tracksAll);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Track not found' });
    }
    try {
      const track = await this.trackModel.findById(id);
      if (!track) {
        return res.status(404).send({ message: 'Track not found' });
      } else {
        return res.send(track);
      }
    } catch (e) {
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  @Post()
  async create(
    @Body() trackDto: CreateTrackDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const track = new this.trackModel({
        name: trackDto.name,
        album: trackDto.album,
        duration: trackDto.duration,
        songNumber: trackDto.songNumber,
      });
      const trackSave = await track.save();
      return res.send(trackSave);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      next(e);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Track not found' });
    }
    try {
      const track = await this.trackModel.findByIdAndDelete({ _id: id });
      if (!track) {
        return res.status(404).send({ message: 'Track not found' });
      }
      return res.send({ message: 'Track deleted' });
    } catch (e) {
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

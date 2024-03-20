import {Body, Controller, Delete, Get, Next, Param, Post, Res, UploadedFile, UseInterceptors,} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Artist, ArtistDocument} from '../schemas/artist.schema';
import mongoose, {Model} from 'mongoose';
import {CreateArtistDto} from './create-artist.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {NextFunction, Response} from 'express';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {
  }

  @Get()
  async getAll() {
    return this.artistModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message: 'Artist not found'});
    }
    try {
      const artist = await this.artistModel.findById(id);
      if (!artist) {
        return res.status(404).send({message: 'Artist not found'});
      } else {
        return res.send(artist);
      }
    } catch (e) {
      return res.status(500).send({error: 'Internal Server Error'});
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {dest: './public/uploads/artists'}))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtistDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      if (!artistDto.name) {
        return res.send({message: 'Artist name required'});
      }
      const artist = new this.artistModel({
        name: artistDto.name,
        image: file ? '/uploads/artists/' + file.filename : null,
        description: artistDto.description || null,
      });

      const artistSave = await artist.save();

      return res.send(artistSave);
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
      return res.status(400).send({message: 'Artist not found'});
    }
    try {
      const artist = await this.artistModel.deleteOne({_id: id});
      if (!artist.deletedCount) {
        return res.status(404).send({message: 'Artist not found'});
      }

      return res.send({message: 'Artist deleted!'});
    } catch (e) {
      return res.status(500).send({error: 'Internal Server Error'});
    }
  }
}

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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {NextFunction, Response} from 'express';
import {Album, AlbumDocument} from '../schemas/album.schema';
import {FileInterceptor} from '@nestjs/platform-express';
import {CreateAlbumDto} from './create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAll(@Query('artist') artist: string, @Res() res: Response) {
    if (artist) {
      const albums = await this.albumModel
        .find({ artist })
        .sort({ releaseYear: -1 })
        .populate('artist', 'name');

      return res.send(albums);
    }

    const albumsAll = await this.albumModel.find();

    return res.send(albumsAll);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Album not found' });
    }
    try {
      const album = await this.albumModel.findById(id);
      if (!album) {
        return res.status(404).send({ message: 'Album not found' });
      } else {
        return res.send(album);
      }
    } catch (e) {
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads/albums' }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const album = new this.albumModel({
        artist: albumDto.artist,
        name: albumDto.name,
        image: file ? '/uploads/albums/' + file.filename : null,
        releaseYear: albumDto.releaseYear,
      });
      const albumSave = await album.save();
      return res.send(albumSave);
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
      return res.status(400).send({ message: 'this id not valid' });
    }
    try {
      const album = await this.albumModel.deleteOne({ _id: id });
      if (!album.deletedCount) {
        return res.status(404).send({ message: 'Album not found' });
      }

      return res.send({ message: 'Album deleted' });
    } catch (e) {
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

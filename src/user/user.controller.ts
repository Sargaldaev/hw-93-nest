import { Controller, Delete, Post, Req, Res, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TokenAuthGuard } from '../auth/token-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  @Post()
  registerUser(@Req() req: Request) {
    const user = new this.userModel({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
    });

    user.generateToken();
    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  loginUser(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Delete('sessions')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as UserDocument;
      user.generateToken();
      await user.save();

      return res.send({ message: 'SUCCESS' });
    } catch (error) {
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

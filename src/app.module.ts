import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { Album, AlbumSchema } from './schemas/album.schema';
import { AlbumController } from './album/album.controller';
import { Track, TrackSchema } from './schemas/track.schema';
import { TrackController } from './track/track.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './user/user.controller';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { TokenAuthGuard } from './auth/token-auth.guard';
import { PermitGuard } from './auth/permit.guard';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/musicV2'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Track.name, schema: TrackSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule,
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumController,
    TrackController,
    UsersController,
  ],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    TokenAuthGuard,
    PermitGuard,
  ],
})
export class AppModule {}

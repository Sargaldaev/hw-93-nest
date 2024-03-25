import mongoose from 'mongoose';
import * as crypto from 'crypto';
import { UserSchema } from './src/schemas/user.schema';
import { ArtistSchema } from './src/schemas/artist.schema';
import { AlbumSchema } from './src/schemas/album.schema';
import { TrackSchema } from './src/schemas/track.schema';

const run = async () => {
  await mongoose.connect('mongodb://localhost/musicV2');
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const User = mongoose.model('User', UserSchema);
  const Artist = mongoose.model('Artist', ArtistSchema);
  const Album = mongoose.model('Album', AlbumSchema);
  const Track = mongoose.model('Track', TrackSchema);

  await User.create(
    {
      username: 'User',
      displayName: 'User',
      password: '123',
      role: 'user',
      token: crypto.randomUUID(),
    },
    {
      username: 'Admin',
      displayName: 'Admin',
      password: '153',
      role: 'admin',
      token: crypto.randomUUID(),
    },
  );
  const [Weeknd, FiftyСent, V_$_X_VPRiNCE] = await Artist.create(
    {
      name: 'The Weeknd',
      image: 'fixtures/TheWeeknd.jpeg',
      description: 'Best Singer...',
      isPublished: true,
    },
    {
      name: '50 Cent',
      image: 'fixtures/50Cent.jpeg',
      description: '50 Cent (Curtis James Jackson) is an American rapper',
      isPublished: true,
    },
    {
      name: 'V_$_X_VPRiNCE',
      image: 'fixtures/Prince.jpg',
      description: 'V_$_X_VPRiNCE rapper',
      isPublished: false,
    },
  );

  const [AfterHours, Starboy, GetRichOrDieTryin, TheMassacre, NOVЫЙ] = await Album.create(
    {
      name: 'After Hours',
      artist: Weeknd._id,
      image: 'fixtures/WeekndAlbum2020.jpeg',
      releaseYear: 2020,
      isPublished: true,
    },
    {
      name: 'Starboy',
      artist: Weeknd._id,
      image: 'fixtures/WeekndAlbum2016.jpeg',
      releaseYear: 2016,
      isPublished: true,
    },
    {
      name: 'Get Rich or Die Tryin',
      artist: FiftyСent._id,
      image: 'fixtures/50CentAlbum2003.jpeg',
      releaseYear: 2003,
      isPublished: true,
    },
    {
      name: 'The Massacre',
      artist: FiftyСent._id,
      image: 'fixtures/50CentAlbum2005.jpeg',
      releaseYear: 2005,
      isPublished: true,
    },
    {
      name: 'NOVЫЙ',
      artist: V_$_X_VPRiNCE._id,
      image: 'fixtures/NOVЫЙ.jpg',
      releaseYear: 2022,
      isPublished: false,
    },
  );

  await Track.create(
    {
      name: 'Starboy',
      album: Starboy._id,
      duration: '3:50',
      songNumber: 10,
      isPublished: true,
    },
    {
      name: 'All I Know',
      album: Starboy._id,
      duration: '5:21',
      songNumber: 15,
      isPublished: true,
    },
    {
      name: 'SideWalks',
      album: Starboy._id,
      duration: '3:51',
      songNumber: 3,
      isPublished: true,
    },
    {
      name: 'Six feet Under',
      album: Starboy._id,
      duration: '3:58',
      songNumber: 4,
      isPublished: true,
    },
    {
      name: 'Reminder',
      album: Starboy._id,
      duration: '1:25',
      songNumber: 5,
      isPublished: true,
    },

    {
      name: 'Blinding Lights',
      album: AfterHours._id,
      duration: '3:20',
      songNumber: 1,
      isPublished: true,
    },
    {
      name: 'Too late',
      album: AfterHours._id,
      duration: '4:00',
      songNumber: 2,
      isPublished: true,
    },
    {
      name: 'Save Your Tears',
      album: AfterHours._id,
      duration: '3:36',
      songNumber: 3,
      isPublished: true,
    },
    {
      name: 'In Your Eyes',
      album: AfterHours._id,
      duration: '3:58',
      songNumber: 4,
      isPublished: true,
    },
    {
      name: 'Alone Again',
      album: AfterHours._id,
      duration: '4:10',
      songNumber: 5,
      isPublished: true,
    },

    {
      name: 'Like My Style',
      album: GetRichOrDieTryin._id,
      duration: '3:13',
      songNumber: 1,
      isPublished: true,
    },
    {
      name: 'P.I.M.P',
      album: GetRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 2,
      isPublished: true,
    },
    {
      name: 'Blood Hound',
      album: GetRichOrDieTryin._id,
      duration: '4:00',
      songNumber: 3,
      isPublished: true,
    },
    {
      name: 'In Da Club',
      album: GetRichOrDieTryin._id,
      duration: '3:14',
      songNumber: 4,
      isPublished: true,
    },
    {
      name: 'Dont Push Me',
      album: GetRichOrDieTryin._id,
      duration: '4:09',
      songNumber: 5,
      isPublished: true,
    },

    {
      name: 'Candy Shop',
      album: TheMassacre._id,
      duration: '3:29',
      songNumber: 1,
      isPublished: true,
    },
    {
      name: 'My Toy Soldier',
      album: TheMassacre._id,
      duration: '3:44',
      songNumber: 2,
      isPublished: true,
    },
    {
      name: 'Position Of Power',
      album: TheMassacre._id,
      duration: '3:12',
      songNumber: 3,
      isPublished: true,
    },
    {
      name: 'So Amazing',
      album: TheMassacre._id,
      duration: '3:17',
      songNumber: 4,
      isPublished: true,
    },
    {
      name: 'Gatman and Robbin',
      album: TheMassacre._id,
      duration: '1:25',
      songNumber: 5,
      isPublished: true,
    },

    {
      name: 'Дом 50',
      album: NOVЫЙ._id,
      duration: '2:39',
      songNumber: 6,
      isPublished: false,
    },

    {
      name: 'Cy',
      album: NOVЫЙ._id,
      duration: '3:05',
      songNumber: 7,
      isPublished: false,
    },

    {
      name: 'Мурашки',
      album: NOVЫЙ._id,
      duration: '2:54',
      songNumber: 10,
      isPublished: false,
    },
  );
  await db.close();
};

run().catch(console.error);

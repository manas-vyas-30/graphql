const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric'
  }]
});

SongSchema.statics.addLyric = function(id, content) {
  const Lyric = mongoose.model('lyric');

  return this.findById(id)
    .then(song => {
      const lyric = new Lyric({ content, song })
      song.lyrics.push(lyric)
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => song);
    });
}

SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics);
}

mongoose.model('song', SongSchema);

// create song
// mutation {
//   addSong(title:"Cold Night") {
//     id
//   }
// }

// add lyrics to song
// mutation {
//   addLyricToSong(songId: "632d755f718891c2f482e479", content: "Oh my oh my it's a cold night.") {
//     id
//   }
// }

// get all songs
// {
//   songs {
//     id
//     title
//     lyrics {
//       content
//     }
//   }
// }

// query variable
// mutation AddSong($title: String) {
//   addSong(title: $title) {
//     id
//     title
//   }
// }
// -->query var<--
// {
//   "title": "Sprite vs Coke"
// }
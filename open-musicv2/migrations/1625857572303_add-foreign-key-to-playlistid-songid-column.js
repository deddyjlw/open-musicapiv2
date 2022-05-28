/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql("UPDATE playlistsongs SET playlist_id = 'old_playlistsongs' WHERE playlist_id = NULL");

  pgm.addConstraint('playlistsongs', 'fk_playlistsongs.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  pgm.sql("UPDATE playlistsongs SET song_id = 'old_playlistsongs' WHERE song_id = NULL");

  pgm.addConstraint('playlistsongs', 'fk_playlistsongs.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlistsongs', 'fk_playlistsongs.song_id_songs.id');

  pgm.sql("UPDATE playlistsongs SET song_id = NULL WHERE song_id = 'old_playlistsongs'");

  pgm.dropConstraint('playlistsongs', 'fk_playlistsongs.playlist_id_playlists.id');

  pgm.sql("UPDATE playlistsongs SET playlist_id = NULL WHERE playlist_id = 'old_playlistsongs'");
};

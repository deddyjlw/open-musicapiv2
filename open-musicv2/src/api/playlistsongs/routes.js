const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/{any}',
    handler: handler.postPlaylistsongHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/{any}',
    handler: handler.getPlaylistsongsHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/{any}',
    handler: handler.deletePlaylistsongsHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
];

module.exports = routes;

/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class PlaylistsongsHandler {
  constructor(playlistsongsService, playlistsService, validator) {
    this._playlistsongsService = playlistsongsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistsongHandler = this.postPlaylistsongHandler.bind(this);
    this.getPlaylistsongsHandler = this.getPlaylistsongsHandler.bind(this);
    this.deletePlaylistsongsHandler = this.deletePlaylistsongsHandler.bind(this);
  }

  async postPlaylistsongHandler(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const { playlistId, any } = request.params;
      if (any !== 'songs') {
        throw new NotFoundError('Resource not found');
      }
      this._validator.validatePlaylistsongPayload(request.payload);
      const { songId } = request.payload;
      await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
      await this._playlistsongsService.addSongToPlaylist(playlistId, songId);

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistsongsHandler(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const {playlistId, any} = request.params;
      if (any !== 'songs') {
        throw new NotFoundError('Resource not found');
      }
      await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
      const songs = await this._playlistsongsService.getPlaylistSongs(playlistId);
      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePlaylistsongsHandler(request, h) {
    try {
      const { id: userId } = request.auth.credentials;
      const {playlistId, any} = request.params;
      if (any !== 'songs') {
        throw new NotFoundError('Resource not found');
      }

      this._validator.validatePlaylistsongPayload(request.payload);
      const { songId } = request.payload;
      await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
      await this._playlistsongsService.deletePlaylistSongs(playlistId, songId);

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PlaylistsongsHandler;

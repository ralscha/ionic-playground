import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Youtube {

  private readonly key = '......';
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private readonly http: Http) {
  }

  playlist(channel) {
    return this.http.get(`${this.baseUrl}/playlists?part=snippet&channelId=${channel}&key=${this.key}`)
  }

  playlist_page(channel, pageToken) {
    return this.http.get(`${this.baseUrl}/playlists?part=snippet&channelId=${channel}&pageToken=${pageToken}&key=${this.key}`)
  }

  playlistList(playlistId) {
    return this.http.get(`${this.baseUrl}/playlistItems?part=snippet&playlistId=${playlistId}&key=${this.key}`)
  }

  playlistList_page(playlistId, pageToken) {
    return this.http.get(`${this.baseUrl}/playlistItems?part=snippet&pageToken=${pageToken}&playlistId=${playlistId}&key=${this.key}`)
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {albums} from '../../assets/mockdata/albums';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  data!: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    if (title) {
      const decodedTitle = decodeURIComponent(title);
      // @ts-ignore
      this.data = albums[decodedTitle];
    }
  }

    // Helper function for image names
    dasherize(str: string) {
      return str.replace(/[A-Z]/g, function(char, index) {
        return (index !== 0 ? '-' : '') + char.toLowerCase();
      });
    }
}

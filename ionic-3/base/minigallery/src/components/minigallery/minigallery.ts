import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'minigallery',
  templateUrl: 'minigallery.html'
})
export class MinigalleryComponent {

  @Input() imageList: any[] = [
    'http://placehold.it/300x300/ffcc33',
    'http://placehold.it/300x300/2980b9',
    'http://placehold.it/300x300/339966',
    'http://placehold.it/300x300/e74c3c'
  ];

// Location (text)
  @Input() location: string = "Andromeda";

// Number of Pics
  @Input() totalPics: number = 33;

// Name of Gallery
  @Input() galleryName: string = "A Default Gallery";

// id of gallery (useful if we want to use this for further processing)
  @Input() id: number = 2;

// Expose our ID for further processing
  @Output() ExposeGallery = new EventEmitter();

  constructor() {

  }

  onGalleryTap() {
    this.ExposeGallery.emit({
      GalleryID: this.id
    })

    // Confirm that our passed in ID works
    console.log('Exposed Gallery ID', this.id);
  }

}

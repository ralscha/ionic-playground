import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent, IonList, IonSlides, isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {
  data: any = null;

  opts = {
    freeMode: true,
    slidesPerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  }

  activeCategory = 0;
  @ViewChildren(IonList, { read: ElementRef }) lists!: QueryList<ElementRef>;
  listElements: any = [];
  @ViewChild(IonSlides) slides!: IonSlides;
  @ViewChild(IonContent) content!: IonContent;
  categorySlidesVisible = false;

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.http.get('assets/1.json').subscribe((res: any) => {
      this.data = res;
    });

    // Set the header position for sticky slides
    const headerHeight = isPlatform('ios') ? 44 : 56;
    this.document.documentElement.style.setProperty('--header-position', `calc(env(safe-area-inset-top) + ${headerHeight}px)`);
  }

  // Get all list viewchildren when ready
  ngAfterViewInit() {
    this.lists.changes.subscribe(() => {
      this.listElements = this.lists.toArray();
    });
  }

  // Handle click on a button within slides
  // Automatically scroll to viewchild
  selectCategory(index: number) {
    const child = this.listElements[index].nativeElement;
    this.content.scrollToPoint(0, child.offsetTop - 120, 1000);
  }

  // Listen to ion-content scroll output
  // Set currently visible active section
  onScroll(ev: any) {
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 500;

    for (let i = 0; i < this.listElements.length; i++) {
      const item = this.listElements[i].nativeElement;
      if (this.isElementInViewport(item)) {
        this.activeCategory = i;
        this.slides.slideTo(i);
        break;
      }
    }
  }

  isElementInViewport(el: any) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
}

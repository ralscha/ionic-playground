import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { SERVER_URL } from './config';

@Injectable()
export class PropertyService {
    favorites: any[] = [];

    constructor(private http: Http) {
    }

    findAll() {
        return this.http.get(SERVER_URL + "/property/findAll")
            .map(res => res.json())
            .catch(this.handleError);
    }

    getFavorites() {
        return Observable.create(observer => {
            observer.next(this.favorites);
            observer.complete();
        });
    }

    favorite(property) {
        return Observable.create(observer => {
            let exists = false;
            for (let i = 0; i < this.favorites.length; i++) {
                if (this.favorites[i].id === property.id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) this.favorites.push(property);
            observer.next();
            observer.complete();
        });
    }

    unfavorite(property) {
        return Observable.create(observer => {
            for (let i = 0; i < this.favorites.length; i++) {
                if (this.favorites[i].id === property.id) {
                    this.favorites.splice(i, 1);
                    break;
                }
            }
            observer.next();
            observer.complete();
        });
    }

    like(property) {
        return this.http.get(SERVER_URL + "/property/like/" + property.id)
            .map(res => parseInt(res.text()))
            .catch(this.handleError);
    }    

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

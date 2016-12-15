import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { SERVER_URL } from './config';

@Injectable()
export class BrokerService {

    constructor(private http: Http) {
    }

    findAll() {
        return this.http.get(SERVER_URL + "/broker/findAll")
            .map(res => res.json())
            .catch(this.handleError);
    }

    findById(id) {
        return this.http.get(SERVER_URL + "/broker/findById/" + id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        return Observable.throw(error.json().error || 'Server error');
    }

}

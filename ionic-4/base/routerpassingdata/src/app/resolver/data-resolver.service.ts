import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {DataService} from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService  {

  constructor(private readonly dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.dataService.getData(id);
  }
}

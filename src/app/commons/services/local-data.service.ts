import { Injectable } from '@angular/core';
import milestones from '../../data/milestones.json';
import provincesPop from '../../data/province_pop_2019.json';
import { Milestone } from '../models/milestone';
import { Population } from '../models/population';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }

  getMilestones(): Observable<Milestone[]> {
    return of(milestones as Milestone[]);
  }

  getProvincesPopulation(): Observable<Population[]> {
    return of( provincesPop as Population[]);
  }
}

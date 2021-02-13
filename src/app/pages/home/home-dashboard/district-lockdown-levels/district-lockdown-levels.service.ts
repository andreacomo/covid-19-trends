import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistrictsLockdownColors } from 'src/app/commons/models/districts-lockdown-colors';
import { CachableRemoteDataService } from 'src/app/commons/services/cachable-remote-data.service';

@Injectable({
    providedIn: 'root'
})
export class DistrictLockdownLevelsService {

    private readonly BASE_PATH = 'https://raw.githubusercontent.com/andreacomo/covid-19-trends/master/src/app/data/';

    private readonly DISTRICT_COLOURS = 'districts-lockdown-colors.json';

    constructor(private remoteData: CachableRemoteDataService) { }

    getData(): Observable<DistrictsLockdownColors> {
        return this.remoteData.getData<DistrictsLockdownColors>(this.BASE_PATH + this.DISTRICT_COLOURS);
    }
}

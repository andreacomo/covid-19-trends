import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { VaccinationDistrictStatus } from 'src/app/pages/vaccination/models/vaccination-district-status';
import totalInput from './vaccination-inputs/vaccination.service.total.json';
import updateDateInput from './vaccination-inputs/vaccination.service.update-date.json';
import totalMenInput from './vaccination-inputs/vaccination.service.total-men.json';
import totalWomenInput from './vaccination-inputs/vaccination.service.total-women.json';
import districtsDetailsTableInput from './vaccination-inputs/vaccination.service.districts-details-table.json';
import { VaccinationDistrictOverallStatus } from 'src/app/pages/vaccination/models/vaccination-district-overall-status';

@Injectable({
    providedIn: 'root'
  })
export class VaccinationService {

    private url = 'https://wabi-europe-north-b-api.analysis.windows.net/public/reports/querydata';

    private headers = {
        headers: {
            'X-PowerBI-ResourceKey': '388bb944-d39d-4e22-817c-90d1c8152a84',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    private cache: Map<string, Observable<any>> = new Map<string, Observable<any>>();

    constructor(private http: HttpClient) { }

    public getLastUpdate(): Observable<Date> {
        return this.fetchRemoteOrCached(updateDateInput, 'lastUpdate', data => {
            return new Date(data.results[0].result.data.dsr.DS[0].PH[0].DM0[0].G0);
        });
    }

    public getTotal(): Observable<number> {
        return this.getTotalNumber(totalInput, 'total');
    }

    public getTotalMen(): Observable<number> {
        return this.getTotalNumber(totalMenInput, 'totalMen');
    }

    public getTotalWomen(): Observable<number> {
        return this.getTotalNumber(totalWomenInput, 'totalWomen');
    }

    public getVaccinationDistrictsStatus(): Observable<VaccinationDistrictOverallStatus> {
        return this.fetchRemoteOrCached(districtsDetailsTableInput, 'districtsStatus', data => {
            const overallData = data.results[0].result.data.dsr.DS[0].PH[0].DM0[0].C;
            return {
                doneCount: overallData[0],
                completionPercentage: overallData[1],
                receivedCount: overallData[2],
                details: data.results[0].result.data.dsr.DS[0].PH[1].DM1.map(district => {
                    return {
                        districtName: district.C[0],
                        doneCount: district.C[1],
                        receivedCount: district.C[3],
                        completionPercentage: district.C[2]
                    } as VaccinationDistrictStatus;
                })
            } as VaccinationDistrictOverallStatus;
        });
    }

    private getTotalNumber(requestBody, cacheKey): Observable<number> {
        return this.fetchRemoteOrCached(requestBody, cacheKey, data => {
            return data.results[0].result.data.dsr.DS[0].PH[0].DM0[0].M0;
        });
    }

    private fetchRemoteOrCached(requestBody, cacheKey, transformer: (data) => any): Observable<any> {
        if (this.cache[cacheKey] == null) {
            this.cache[cacheKey] = this.http.post<any>(this.url, requestBody, this.headers)
            .pipe(
                map(transformer),
                publishReplay(1),
                refCount()
            );
        }
        return this.cache[cacheKey];
    }
}

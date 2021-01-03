import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import totalInput from './vacciantion-inputs/vaccination.service.total.json';
import updateDateInput from './vacciantion-inputs/vaccination.service.update-date.json';
import totalMen from './vacciantion-inputs/vaccination.service.total-men.json';
import totalWomen from './vacciantion-inputs/vaccination.service.total-women.json';

@Injectable({
    providedIn: 'root'
  })
export class VaccinationService {

    private url = 'https://wabi-europe-north-b-api.analysis.windows.net/public/reports/querydata?synchronous=true';

    private headers = {
        headers: {
            'X-PowerBI-ResourceKey': '388bb944-d39d-4e22-817c-90d1c8152a84',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    constructor(private http: HttpClient) { }

    public getLastUpdate(): Observable<Date> {
        return this.http.post<any>(this.url, updateDateInput, this.headers)
            .pipe(
                map(data => {
                    return data.results[0].result.data.dsr.DS[0].PH[0].DM0[0].G0;
                }),
                map(data => new Date(data))
            );
    }

    public getTotal(): Observable<number> {
        return this.getTotalNumber(totalInput);
    }

    public getTotalMen(): Observable<number> {
        return this.getTotalNumber(totalMen);
    }

    public getTotalWomen(): Observable<number> {
        return this.getTotalNumber(totalWomen);
    }

    private getTotalNumber(input): Observable<number> {
        return this.http.post<any>(this.url, input, this.headers)
            .pipe(
                map(data => {
                    return data.results[0].result.data.dsr.DS[0].PH[0].DM0[0].M0;
                })
            );
    }
}

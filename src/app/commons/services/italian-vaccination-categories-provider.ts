import { Injectable } from '@angular/core';
import { ItalianVaccinationCategory } from '../models/italian-vaccination-category';

@Injectable({
    providedIn: 'root'
  })
export class ItalianVaccinationCategoriesProvider {

    categories: ItalianVaccinationCategory[];

    constructor() {
        this.categories = [
            {
                name: 'Prima dose',
                field: 'prima_dose',
                type: 'administration'
            },
            {
                name: 'Seconda dose',
                field: 'seconda_dose',
                type: 'administration'
            },
            {
                name: 'Terza dose',
                field: 'dose_addizionale_booster',
                type: 'administration'
            },
            {
                name: 'Dose a guariti',
                field: 'pregressa_infezione',
                type: 'administration'
            },
            {
                name: 'Sesso Maschile',
                field: 'sesso_maschile',
                type: 'gender'
            },
            {
                name: 'Sesso Femminile',
                field: 'sesso_femminile',
                type: 'gender'
            }
        ];
    }

    getCategories(): ItalianVaccinationCategory[] {
        return this.categories.map(c => ({...c}));
    }

    getCategoriesGroupedByField(): {[field: string]: ItalianVaccinationCategory} {
        return this.getCategories().reduce((acc, c) => {
            acc[c.field] = c;
            return acc;
        }, {});
    }
}

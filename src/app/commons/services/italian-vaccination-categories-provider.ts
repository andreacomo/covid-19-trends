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
                name: 'Operatori Sanitari e Sociosanitari',
                field: 'categoria_operatori_sanitari_sociosanitari',
                type: 'status'
            },
            {
                name: 'Personale non sanitario',
                field: 'categoria_personale_non_sanitario',
                type: 'status'
            },
            {
                name: 'Ospiti Strutture Residenziali',
                field: 'categoria_ospiti_rsa',
                type: 'status'
            },
            {
                name: 'Over 80',
                field: 'categoria_over80',
                type: 'status'
            },
            {
                name: 'Forze Armate',
                field: 'categoria_forze_armate',
                type: 'status'
            },
            {
                name: 'Personale Scolastico',
                field: 'categoria_personale_scolastico',
                type: 'status'
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
            },
            {
                name: 'Prima dose',
                field: 'prima_dose',
                type: 'administration'
            },
            {
                name: 'Seconda dose',
                field: 'seconda_dose',
                type: 'administration'
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

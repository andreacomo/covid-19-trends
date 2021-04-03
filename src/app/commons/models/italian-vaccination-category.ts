export class ItalianVaccinationCategory {

    name: string;

    field: string;

    type: 'status' | 'gender' | 'administration';

    doneCount?: number;

    districtName?: string;
}

export type ItalianVaccinationCategories = {[districtName: string]: ItalianVaccinationCategory[]};

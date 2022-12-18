/**
 * consegne-vaccini-latest.json
 * 
 * https://github.com/italia/covid19-opendata-vaccini
 */
export class VaccinesDelivery {

    area: string; // Sigla della regione di consegna.

    reg: string; // Denominazione standard dell'area (dove necessario denominazione bilingue).

    forn: string; // Nome completo del fornitore del vaccino.

    numero_dosi: number; // Il numero di dosi del vaccino consegnate in quel giorno per regione.

    data_consegna: string; // Il giorno in cui è avvenuta la consegna.
}

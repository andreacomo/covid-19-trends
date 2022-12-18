/**
 * somministrazioni-vaccini-summary-latest.json
 */
export class VaccinationAdministrationSummary {

    data: string; // Giorno in cui è avvenuta la somministrazione.

    area: string; // Sigla della regione in cui è avvenuta la somministrazione.

    totale: number; // Numero totale di dosi di vaccino somministrate per giorno e regione.

    m: number; // Totale dei soggetti di sesso maschile a cui è stato somministrato il vaccino per giorno e regione.

    f: number; // Totale dei soggetti di sesso femminile a cui è stato somministrato il vaccino per giorno e regione.

    'categoria_operatori_sanitari_sociosanitari': number;

    'categoria_personale_non_sanitario': number;

    'categoria_ospiti_rsa': number;

    'categoria_over80': number;

    'categoria_forze_armate': string;

    'categoria_personale_scolastico': string;

    d1: number; // Numero prime somministrazioni.

    d2: number; // Numero seconde somministrazioni.

    db1: number; // Numero somministrazioni dose addizionale/richiamo (booster).

    db2: number; // Numero somministrazioni dose booster immuno/second booster.

    dpi: number; // Numero di somministrazioni effettuate a soggetti con pregressa infezione da covid-19 nel periodo 3-6 mesi e che, pertanto, concludono il ciclo vaccinale con un'unica dose

    reg: string; // Denominazione standard dell'area (dove necessario denominazione bilingue).
}

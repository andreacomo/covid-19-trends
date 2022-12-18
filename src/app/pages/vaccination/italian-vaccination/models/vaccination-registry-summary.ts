/**
 * anagrafica-vaccini-summary-latest.json
 * 
 * https://github.com/italia/covid19-opendata-vaccini
 */
export class VaccinationRegistrySummary {

    index: number;

    eta: string; // Fascia anagrafica.

    totale: number; // Totale vaccini somministrati.

    m: number; // Totale dei soggetti di sesso maschile a cui è stato somministrato il vaccino per giorno, regione e fascia d’età.

    f: number; // Totale dei soggetti di sesso femminile a cui è stato somministrato il vaccino per giorno, regione e fascia d’età.

    d1: number; // Numero prime somministrazioni.

    d2: number; // Numero seconde somministrazioni.

    dpi: number; // Numero di somministrazioni effettuate a soggetti con pregressa infezione da covid-19 nel periodo 3-6 mesi e che, pertanto, concludono il ciclo vaccinale con un'unica dose

    db1: number; // Numero somministrazioni dose addizionale/richiamo (booster).

    db2: number; // Numero somministrazioni dose booster immuno/second booster.

    ultimo_aggiornamento: string;
}

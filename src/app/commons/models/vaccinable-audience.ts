/**
 * platea.json
 * https://github.com/italia/covid19-opendata-vaccini
 */
export class VaccinableAudience {
    
    area: string; // Sigla della Regione/Provincia Autonoma.
    
    reg: string; // Denominazione standard dell'area (dove necessario denominazione bilingue).
    
    eta: string; // Fascia anagrafica a cui appartengono i soggetti vaccinabili.
    
    totale_popolazione: number; // Numero totale della popolazione presente in platea per una data fascia d'età
}

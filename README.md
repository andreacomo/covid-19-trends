# Covid-19 Trends: andamento casi per regione e provincia

Una applicazione per monitorare l'andamento dei contagi nella propria provincia e/o regione

## Online
E' disponibile online servito come "GitHub Pages" su:

[https://andreacomo.github.io/covid-19-trends/](https://andreacomo.github.io/covid-19-trends/)

## Prerequirements

Minimun Node version is `v10.13.0`.

With NVM you can:

```
nvm use v10.13.0
```

## Build prod
Se si hanno problemi **causati da Babel** nella build di prod:

```
ng build --prod
```

Eseguire i seguenti passi, come indicato su [GitHub](https://github.com/facebook/create-react-app/issues/8680#issuecomment-601896916)

```
npx npm-force-resolutions
npm install
ng build --prod
```
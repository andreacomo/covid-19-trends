# Covid-19 Trends: andamento casi per regione e provincia

Una applicazione per monitorare l'andamento dei contagi nella propria provincia e/o regione

## Online
E' disponibile online servito come "GitHub Pages" su:

[https://www.covid-trend.com](https://www.covid-trend.com)

## Prerequirements

* Node Version Manager (Versione node v18.10)
* Angular CLI

* Installa Node.js:
    ```
    nvm install v18.10
    ```
* Abilita la versione installata:
    ```
    nvm use v18.10
    ```
* Installa Angular CLI:
    ```
    npm install -g @angular/cli
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

## Special thanks

<a href="https://www.jetbrains.com/community/opensource/#support" target="_blank"><img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" width="100" height="100" alt="JetBrains Logo (Main) logo" ></a>

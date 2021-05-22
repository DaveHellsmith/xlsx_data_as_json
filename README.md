# xlsxon [![npm version](https://img.shields.io/npm/v/xlsxon)](https://www.npmjs.com/package/xlsxon)

Fork of [xlsx_data_as_json](https://github.com/lujoamel4/xlsx_data_as_json)

Adds minor functionality missing in the original package and includes some refactoring,
however keeps the main package in tact.

**Disclaimer: this package is pretty much useless, I only cooked this up to use in a different pet project
without spending time on understanding the [xlsx](https://www.npmjs.com/package/xlsx) package which is used here**

# Usage

## Installation

`npm instal xlsxon`

# Examples

## Server-side example usage

```javascript
 const Xlsxon = require('xlsxon');

 const rows = Xlsxon.parseFile(__dirname + "/test.xlsx");
```

## Browser-side example usage

```javascript
import Xlsxon from 'xlsxon'

...

const fileReader = new FileReader()

fileReader.onload = () => {
    const data = fileReader.result

    const rows = Xlsxon.parse(data)
}

fileReader.readAsArrayBuffer(file)
```

## Data sample

Given a following xlsx file

```bash
|   | A          | B                         | C     | D         | E |
|--:|------------|---------------------------|-------|-----------|---|
| 1 | Name       | Description               | Price | Image     |   |
| 2 | Piza       | Tomate sauce, Muzarella   | 10    | /img/piza |   |
| 3 | Hamburguer |                           | 12    |           |   |
```

you will receive the following `json`

```javascript
[
    {
        "Name": "Piza",
        "Description": "Tomate sauce, Muzarella",
        "Price": "10",
        "Image": "/img/piza"
    },
    {
        "Name": "Hamburguer",
        "Description": "",
        "Price": "12",
        "Image": ""
    }
]
```

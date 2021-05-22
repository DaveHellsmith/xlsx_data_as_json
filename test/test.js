/* global it, describe */
const assert = require('assert')
const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs')

const JsonFactory = require('../JsonFactory')
const XlsxDataAsJson = require('../index')
const WorkbookReader = require('../WorkbookReader')

describe('JsonFactory', () => {
  describe('getHeaders', () => {
    const mf = new JsonFactory()
    const expectedHeader = ['Nombre', 'Descripción', 'Precio', 'URL de la imagen']
    const wb = XLSX.readFile(path.join(__dirname, '/menu1.xlsx'))

    it('should return A1, B1, ..., XX1, until not null cell', () => {
      wb.SheetNames.forEach(name => {
        const sheet = wb.Sheets[name]
        const headers = mf.getHeaders(sheet)

        expectedHeader.forEach((val, i) => (
          assert.strictEqual(headers[i], val)
        ))
      })
    })
  })

  describe('getBody', () => {
    const mf = new JsonFactory()
    const wb = XLSX.readFile(path.join(__dirname, '/menu1.xlsx'))

    it('Should return [], when the sheets is null or empty', () => {
      assert.strictEqual(mf.getBody(null).length === 0, true)
    })

    it('Should return [], when the sheets is undefined or empty', () => {
      assert.strictEqual(mf.getBody(undefined).length === 0, true)
    })

    it('Should return data in the file, when the sheets contain data', () => {
      wb.SheetNames.forEach(name => {
        const sheet = wb.Sheets[name]
        const headers = ['name', 'description', 'price', 'url']
        const rows = mf.getBody(sheet, headers)

        assert.strictEqual(rows.length > 0, true)

        rows.forEach((row, index) => {
          const expectedData = resultData1[index]

          assert.strictEqual(row.name, expectedData.Nombre)
          assert.strictEqual(row.description, expectedData['Descripción'])
          assert.strictEqual(row.price.toString(), expectedData.Precio)
          assert.strictEqual(row.url, expectedData['URL de la imagen'])
        })
      })
    })

    it('should return data in the sheet, when the sheet contain data', () => {
      const wb = XLSX.readFile(path.join(__dirname, '/menu1.xlsx'))

      wb.SheetNames.forEach(name => {
        const sheet = wb.Sheets[name]
        const rows = mf.getBody(sheet)

        assert.strictEqual(rows.length > 0, true)

        rows.forEach((row, index) => {
          const expectedData = resultData1[index]

          assert.strictEqual(row.Nombre, expectedData.Nombre)
          assert.strictEqual(row['Descripción'], expectedData['Descripción'])
          assert.strictEqual(row.Precio.toString(), expectedData.Precio.toString())
          assert.strictEqual(row['URL de la imagen'], expectedData['URL de la imagen'])
        })
      })
    })

    it('should return data in the sheet, when the sheet contain data', () => {
      const wb = XLSX.readFile(path.join(__dirname, '/menu2.xlsx'))

      wb.SheetNames.forEach(name => {
        const sheet = wb.Sheets[name]
        const rows = mf.getBody(sheet)

        assert.strictEqual(rows.length > 0, true)

        rows.forEach((row, index) => {
          assert.strictEqual(row.Nombre, resultData2[index].Nombre)
          assert.strictEqual(row['Descripción'], resultData2[index]['Descripción'])
          assert.strictEqual(row.Precio.toString(), resultData2[index].Precio.toString())
          assert.strictEqual(row['URL de la imagen'], resultData2[index]['URL de la imagen'])
        })
      })
    })
  })

  describe('getData', () => {
    const jsonFactory = new JsonFactory()
    const workbookReader = new WorkbookReader()

    it('Should return data in sheets until blank line, when file has data', () => {
      const workbook = workbookReader.parseWorkbookFromFileUrl(path.join(__dirname, '/menu1.xlsx'))
      const rows = jsonFactory.getData(workbook)
      const expectedData = resultData1

      assert.strictEqual(rows.length, expectedData.length)

      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre)
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })

    it('Should return data in sheets until blank line, when file has data', () => {
      const workbook = workbookReader.parseWorkbookFromFileUrl(path.join(__dirname, '/menu2.xlsx'))
      const rows = jsonFactory.getData(workbook)
      const expectedData = resultData2

      assert.strictEqual(rows.length, expectedData.length)

      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre)
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })
  })
})

/**
 * Test library
 */
describe('Xlsx as json', () => {
  describe('parseFile', () => {
    it('Should return data in sheets until blank line, when file has data', () => {
      const rows = XlsxDataAsJson.parseFile(path.join(__dirname, '/menu1.xlsx'))
      const expectedData = resultData1

      assert.strictEqual(rows.length, expectedData.length)
      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre.toString())
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })

    it('Should return data in sheets until blank line, when file has data', () => {
      const rows = XlsxDataAsJson.parseFile(path.join(__dirname, '/menu2.xlsx'))
      const expectedData = resultData2

      assert.strictEqual(rows.length, expectedData.length)
      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre.toString())
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })
  })

  describe('parse', () => {
    it('Should return data in heets until blank line, when file has data', () => {
      const fileBuffer = fs.readFileSync(path.join(__dirname, '/menu1.xlsx'))

      const rows = XlsxDataAsJson.parse(fileBuffer.buffer)
      const expectedData = resultData1

      assert.strictEqual(rows.length, expectedData.length)

      rows.forEach((row, index) => {
        assert.strictEqual(row.Nombre, expectedData[index].Nombre.toString())
        assert.strictEqual(row['Descripción'], expectedData[index]['Descripción'])
        assert.strictEqual(row.Precio.toString(), expectedData[index].Precio.toString())
        assert.strictEqual(row['URL de la imagen'], expectedData[index]['URL de la imagen'])
      })
    })
  })
})

const resultData2 = [{
  Nombre: 'Piza Italiana',
  Descripción: 'Salsa, muzarella, peperoni, parmesano',
  Precio: '350',
  'URL de la imagen': 'www.serviciodeimagenes.com/unaimagen.png'
},
{
  Nombre: 'Milanesa Napolitana',
  Descripción: 'Milanesa, jamón, muzarella.',
  Precio: '234',
  'URL de la imagen': ''
},
{
  Nombre: 'Piza Común',
  Descripción: '',
  Precio: '200',
  'URL de la imagen': ''
}]

const resultData1 = [{
  Nombre: 'Piza Italiana',
  Descripción: 'Salsa, muzarella, peperoni, parmesano',
  Precio: '350',
  'URL de la imagen': 'www.serviciodeimagenes.com/unaimagen.png'
}]

class JsonFactory {
  /**
   * use getData(sheet, headers) when need custom headers
   * @param sheet is Sheet
   * @param headers is an array with headers
   */
  getBody (sheet, headers) {
    if (!sheet) return []
    if (!headers) headers = this.getHeaders(sheet)

    const result = []

    let line = 2
    let blankLine = false

    while (!blankLine) {
      let blankCell = 0
      const row = {}

      headers.forEach((element, index) => {
        const column = String.fromCharCode('A'.charCodeAt() + index)
        let cell = sheet[column + line]

        if (!cell) {
          cell = {}
          cell.v = ''
          blankCell++
        }

        row[element] = cell.v
      })

      blankLine = blankCell === headers.length
      if (!blankLine) {
        result.push(row)
      }
      line++
    }
    return result
  }

  /**
   * Use this to get headers of table
   * @param sheet is sheet from xlsx library
   */
  getHeaders (sheet) {
    if (!sheet) return []

    const result = []
    let column = 'A'

    const line = 1
    let cell = sheet[column + line]

    while (cell) {
      result.push(cell.v)
      column = String.fromCharCode(column.charCodeAt() + 1)
      cell = sheet[column + line]
    }

    return result
  }

  getData (workbook, headers) {
    const result = []

    workbook.SheetNames.forEach(name => {
      const sheet = workbook.Sheets[name]

      this.getBody(sheet, headers).forEach(row => {
        result.push(row)
      })
    })

    return result
  }
}

module.exports = JsonFactory

const XLSX = require('xlsx')

class WorkbookReader {
  /**
   * Wraps around the XLSX read file function
   *
   * @param {url to file} fileUrl
   * @returns xlsx workbook object
   */
  parseWorkbookFromFileUrl (fileUrl) {
    return XLSX.readFile(fileUrl)
  }

  parseWorkbookFromArrayBuffer (arrayBuffer) {
    return XLSX.read(arrayBuffer, { type: 'array' })
  }
}

module.exports = WorkbookReader

const JsonFactory = require('./JsonFactory')
const WorkbookReader = require('./WorkbookReader')

module.exports = {
  parseFile: (fileUrl, headers) => {
    const reader = new WorkbookReader()

    const jsonFactory = new JsonFactory()

    const workbook = reader.parseWorkbookFromFileUrl(fileUrl)

    return jsonFactory.getData(workbook, headers)
  },
  parse: (arrayBuffer, headers) => {
    const jsonFactory = new JsonFactory()

    const reader = new WorkbookReader()

    const workbook = reader.parseWorkbookFromArrayBuffer(arrayBuffer)

    return jsonFactory.getData(workbook, headers)
  }
}

const ShellSpawn = require('./lib/ShellSpawn')
const ShellExec = require('./lib/ShellExec')
const GetExistedArgv = require('./lib/GetExistedArgv')

const path = require('path')
const fs = require('fs')

let main = async function () {
  let files = GetExistedArgv()
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    
    let filename = path.basename(file)
    let dirname = path.dirname(file)
    let filenameNoExt = path.parse(filename).name
    let ext = path.extname(filename)
    if (filenameNoExt.lastIndexOf('-') === -1 || filenameNoExt.lastIndexOf('-') < 5) {
      continue
    }

    let newFilenameNoExt = filenameNoExt.slice(0, filenameNoExt.lastIndexOf('-'))

    await ShellExec(`mv "${file}" "${dirname}/${newFilenameNoExt}${ext}"`)
  }
}

main()
const fs = require('fs')
const path = require('path')
const { root, pathSrc } = require('./paths')
const { prefix } = require('./redeme-template')

fs.writeFileSync(path.join(root, 'README.md'), prefix)

fs.readdirSync(pathSrc)
  .map((file) => {
    const firstLine = fs
      .readFileSync(path.join(pathSrc, file))
      .toString()
      .split('\n')[0]

    return {
      title: firstLine.replace('# ', '').replace('\r', ''),
      path: 'src/' + file
    }
  })
  .forEach(({ title, path: _path }) => {
    fs.appendFileSync(
      path.join(root, 'README.md'),
      `\n\n- [${title}](${_path})`
    )
  })

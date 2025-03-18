// @ts-check
const fs = require('fs')
const path = require('path')
const { root, pathSrc } = require('./paths')
const { prefix } = require('./redeme-template')

fs.writeFileSync(path.join(root, 'README.md'), prefix)

/**
 * 获取 src 下的所有文件
 * 如果是文件夹, 则获取文件夹下的同名文件
 * 遍历文件，获取每个文件的第一行
 * 拼接 README.md
 */
fs.readdirSync(pathSrc)
  .map((file) => {
    let fullPath = path.join(pathSrc, file)

    if (fs.statSync(fullPath).isDirectory()) {
      const sameNameFile = fs
        .readdirSync(fullPath)
        .find((_file) => _file.split('.')[0] === file)

      // @ts-ignore
      fullPath = path.join(pathSrc, file, sameNameFile)
      file += '/' + sameNameFile
    }

    const firstLine = fs.readFileSync(fullPath).toString().split('\n')[0]

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

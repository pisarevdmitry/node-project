const fs = require('fs');
const jimp = require('jimp')
const path = require('path')

class ImageService {
  constructor() {
    this.fs = fs;
    this.imageHandler = jimp
  }
  deleteFile(path) {
    if (path && this.fs.existsSync(path)) {
        this.fs.unlinkSync(path);
      }
  }
  async proceesImage(_path) {
    const image = await this.imageHandler.read(_path);
    if(!image) {
     throw('неверный путь')
    }
    image.resize(600,600).write(_path);

  }
}
module.exports =  ImageService;

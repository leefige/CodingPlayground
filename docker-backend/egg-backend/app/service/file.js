'use strict'

const fs = require('fs');
const path = require('path');

const saveStream = (stream, filepath) => new Promise((resolve, reject) => {
  const ws = fs.createWriteStream(filepath);
  stream.pipe(ws);
  ws.on('error', reject);
  ws.on('finish', resolve);
});

module.exports = app => {
  class FileService extends app.Service {
    async upload (category, id, stream, body) {
      var dir = path.join('app', 'public', 'media');
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      dir = path.join('app', 'public', 'media', category);
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      dir = path.join('app', 'public', 'media', category, id);
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

      const filepath = path.join(dir, stream.filename);
      await saveStream(stream, filepath);
      await app.mysql.update('newsuser', {id: body.id, image: `/public/media/${category}/${id}/${stream.filename}`});
      return `/public/media/${category}/${id}/${stream.filename}`;
    }
  }
  return FileService;
}

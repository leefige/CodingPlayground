'use strict'

const fs = require('fs');
const path = require('path');
// const sendToWormhole = require('stream-wormhole')

// const getIP = () => new Promise((resolve, reject) => {
//   require('dns').lookup(require('os').hostname(), (err, add, fam) => {
//     if (err) reject(err)
//     resolve(add)
//   })
// })

const saveStream = (stream, filepath) => new Promise((resolve, reject) => {
  const ws = fs.createWriteStream(filepath);
  stream.pipe(ws);
  ws.on('error', reject);
  ws.on('finish', resolve);
});

module.exports = app => {
  class FileService extends app.Service {
    async upload (category, id, stream, body) {
      const dir = path.join('app', 'public', 'media', category, id);
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      const filepath = path.join(dir, stream.filename);
      try {
        await saveStream(stream, filepath);
        await app.mysql.update('newsuser', {id: body.id, image: `/public/media/${category}/${id}/${stream.filename}`});
      } catch (err) {
        // await sendToWormhole(stream)
        throw err;
      }

      // const addr = await getIP()
      // return `http://${addr}:${process.env.PORT}${app.config.static.prefix}assets/${category}/${id}/${stream.filename}`
      return `/public/media/${category}/${id}/${stream.filename}`;
    }
  }
  return FileService;
}

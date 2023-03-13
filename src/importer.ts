import admin from 'firebase-admin'
import importer from 'firestore-export-import'
import fs from 'fs'

const serviceAccount = JSON.parse(fs.readFileSync('./secret/secretkey.json', 'utf8'))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
fs.readdir('./data/', async function (err, files) {
  if (err) {
    throw err
  }
  for (const file of files) {
    try {
      await importer.restore('./data/' + file)
    } catch (e) {
      console.log(e)
    }
  }
})

import * as admin from 'firebase-admin'
import * as serviceAccount from '../secret/secretkey.json'
import fs from 'fs'

const importData = async (fileName: string) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })

  const filePath = `../result/${fileName}`
  const rawData = fs.readFileSync(filePath)
  const data = JSON.parse(rawData.toString())

  const firestore = admin.firestore()
  const promises: Promise<void>[] = []
  for (const collection in data) {
    const collectionRef = firestore.collection(collection)
    for (const document in data[collection]) {
      const documentRef = collectionRef.doc(document)
      promises.push(documentRef.set(data[collection][document]).then(() => {}))
    }
  }
  await Promise.all(promises)
  console.log('success')
}

const fileName = process.argv[2]
importData(fileName).catch((error) => {
  console.error('Error importing data:', error)
})

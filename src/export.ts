// export-collection.ts
import * as fs from 'fs'
import * as admin from 'firebase-admin'
import * as serviceAccount from '../secret/secretkey.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

const firestore = admin.firestore()

interface Data {
  [docId: string]: FirebaseFirestore.DocumentData
}

const exportCollectionToJson = async (collectionName: string): Promise<void> => {
  const collectionRef = firestore.collection(collectionName)
  const snapshot = await collectionRef.get()

  const data: Data = {}

  snapshot.forEach((doc) => {
    data[doc.id] = doc.data()
  })

  const json = JSON.stringify(data, null, 2)
  fs.writeFileSync(`result/${collectionName}.json`, json)
  console.log(`${collectionName} exported successfully.`)
}

const collectionName = process.argv[2]

if (collectionName) {
  exportCollectionToJson(collectionName).catch((error) => {
    console.error('Error exporting data:', error)
  })
} else {
  console.error('Please provide a collection name as an argument.')
}

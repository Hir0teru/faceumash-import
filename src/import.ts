const importData = async () => {
  const admin = require('firebase-admin')
  const serviceAccount = require('../secret/secretkey.json')
  const data = require('../data/users.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  const firestore = admin.firestore()
  const promises = []
  for (const collection in data) {
    const collectionRef = firestore.collection(collection)
    for (const document in data[collection]) {
      const documentRef = collectionRef.doc(document)
      promises.push(documentRef.set(data[collection][document]))
    }
  }
  await Promise.all(promises)
  console.log('success')
}

importData().catch((error) => {
  console.error('Error importing data:', error)
})

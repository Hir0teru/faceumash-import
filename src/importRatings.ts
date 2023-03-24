const importRatings = async () => {
  const admin = require('firebase-admin')
  const serviceAccount = require('../secret/secretkey.json')
  const data = require('../result/ratings.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  const firestore = admin.firestore()
  const promises = []
  for (const collection in data) {
    const collectionRef = firestore.collection(collection)
    for (const document in data[collection]) {
      const documentData = data[collection][document]
      const documentRef = collectionRef.doc(document)

      const shards = documentData.shards
      delete documentData.shards

      const shardsCollection = documentRef.collection('shards')
      for (const shard in shards) {
        const shardRef = shardsCollection.doc(shard)
        promises.push(shardRef.set(shards[shard]))
      }

      promises.push(documentRef.set(documentData))
    }
  }
  await Promise.all(promises)
  console.log('success')
}

importRatings().catch((error) => {
  console.error('Error importing data:', error)
})

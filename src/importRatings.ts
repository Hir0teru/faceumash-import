import * as admin from 'firebase-admin'

const serviceAccount = require('../secret/secretkey.json')
const rawData = require('../result/ratings.json')

type Shard = {
  count: number
}

type Rating = {
  [id: string]: {
    shards: Record<string, Shard>
  }
}

type FirestoreData = {
  ratings: Rating[]
}

const data: FirestoreData = rawData as FirestoreData

const importRatings = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })

  const firestore = admin.firestore()
  const promises: Promise<void>[] = []

  const collection = 'ratings'
  const collectionRef = firestore.collection(collection)

  for (const ratingData of data.ratings) {
    for (const document in ratingData) {
      const documentData: {
        shards?: Record<string, Shard>
      } = ratingData[document]
      const documentRef = collectionRef.doc(document)

      const shards = documentData.shards
      if (shards) {
        delete documentData.shards

        const shardsCollection = documentRef.collection('shards')
        for (const shard in shards) {
          const shardRef = shardsCollection.doc(shard)
          const shardData: Shard = shards[shard]
          promises.push(shardRef.set(shardData).then(() => {}))
        }
      }
    }
  }

  await Promise.all(promises)
  console.log('success')
}

importRatings().catch((error) => {
  console.error('Error importing data:', error)
})

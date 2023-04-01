import * as fs from 'fs'

type Shard = {
  count: number
}

type Rating = {
  [id: string]: {
    shards: Record<string, Shard>
  }
}

type Ratings = Array<Rating>

const generateRatingsJSON = (numOfRatings: number): void => {
  try {
    const max = 200
    if (numOfRatings >= max) {
      console.log(`numOfRatings must be ${max} or less`)
      return
    }
    const initialRating = 1500
    const numOfShards = 5
    const initialCount = initialRating / numOfShards

    const ratings: Ratings = []

    for (let i = 0; i < numOfRatings; i++) {
      const ratingId = i.toString().padStart(4, '0')

      const shards: Record<string, Shard> = {}

      for (let j = 0; j < numOfShards; j++) {
        shards[j.toString()] = {
          count: initialCount,
        }
      }

      const rating: Rating = {
        [ratingId]: {
          shards,
        },
      }

      ratings.push(rating)
    }

    const data = { ratings }
    const json = JSON.stringify(data, null, 2)

    fs.writeFileSync(`result/ratings.json`, json)

    console.log(`success.`)
  } catch (error) {
    console.error(error)
  }
}

const numOfRatings = process.argv[2]
if (Number(numOfRatings)) {
  generateRatingsJSON(Number(numOfRatings))
} else {
  console.error('invalid argument')
}

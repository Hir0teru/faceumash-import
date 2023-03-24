import * as fs from 'fs'

type Shards = Record<string, { count: number }>

type Rating = Record<
  string,
  {
    num_shards: number
    shards: Shards
  }
>

type Ratings = Array<Rating>

const generateRatingsJSON = (numOfRatings: number): void => {
  try {
    const max = 200
    if (numOfRatings >= max) {
      console.log(`numOfRatings must be ${max} or less`)
      return
    }
    const initialRating: number = 1500
    const numOfShards: number = 5
    const initialCount: number = initialRating / numOfShards

    const ratings: Ratings = []

    for (let i = 0; i < numOfRatings; i) {
      const ratingId: string = i.toString().padStart(4, '0')

      const shards: Shards = {}

      for (let j = 0; j < numOfShards; j++) {
        shards[j.toString()] = {
          count: initialCount,
        }
      }

      const rating: Rating = {
        [ratingId]: {
          num_shards: numOfShards,
          shards: shards,
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

const numOfRatings: string = process.argv[2]
if (Number(numOfRatings)) {
  generateRatingsJSON(Number(numOfRatings))
} else {
  console.error('invalid argument')
}

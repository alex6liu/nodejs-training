import csv from 'csvtojson'
import fs from 'fs'
import stream from 'stream'
import { promisify } from 'util'

const pipeline = promisify(stream.pipeline)

pipeline(
  fs.createReadStream('./hw1-ex1.csv', { encoding: 'utf8' }),
  csv({ headers: ['book', 'author', 'price'], noheader: false, output: 'json' }),
  fs.createWriteStream('./hw1-ex1.txt')
)
  .then(() => {
    console.log('CSV converted to json successfully');
  })
  .catch((err) => {
    console.error(err.message);
  });
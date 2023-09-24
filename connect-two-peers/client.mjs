import DHT from 'hyperdht'
import b4a from 'b4a'

console.log('Connecting to:', process.argv[2])
const publicKey = b4a.from(process.argv[2], 'hex')

const dht = new DHT()
const conn = dht.connect(publicKey)

conn.on('open', () => {
  console.log('Connection established!')

  process.stdin.on('data', data => {
    conn.write(data)
  })

  conn.on('data', data => {
    console.log('Received from server:', data.toString())
  })
})
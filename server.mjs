import DHT from 'hyperdht'
import goodbye from 'graceful-goodbye'
import b4a from 'b4a'
import fs from 'fs';

const dht = new DHT()
const keyPair = DHT.keyPair()

const server = dht.createServer(conn => {
  console.log('got connection!')
  process.stdin.pipe(conn).pipe(process.stdout)
})

server.listen(keyPair).then(() => {
  console.log('listening on:', b4a.toString(keyPair.publicKey, 'hex'))
  fs.writeFile('/client-data/file.txt', b4a.toString(keyPair.publicKey, 'hex'), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Public key delivered!');
}); 
})

// Unnannounce the public key before exiting the process
// (This is not a requirement, but it helps avoid DHT pollution)
goodbye(() => server.close())
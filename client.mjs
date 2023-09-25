import DHT from 'hyperdht'
import b4a from 'b4a'
import fs from 'fs';

console.log("publicKey");

fs.readFile('/client-data/file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const publicKey = b4a.from(data, 'hex')
  console.log(publicKey);

  const dht = new DHT()
  const conn = dht.connect(publicKey)
  conn.once('open', () => console.log('got connection!'))

  process.stdin.pipe(conn).pipe(process.stdout)
});


import DHT from 'hyperdht'
import goodbye from 'graceful-goodbye'

const dht = new DHT()

const server = dht.createServer(conn => {
  console.log('got connection!')

  conn.on('data', data => {
    console.log('Received from client:', data.toString())

    // Отправляем ответ обратно клиенту
    const response = 'Hello from server!'
    conn.write(response)
  })

  conn.on('end', () => {
    console.log('Client disconnected')
  })
})

server.listen().then(() => {
  console.log('Server listening on:', server.publicKey.toString('hex'))
})

// Отменить объявление публичного ключа при завершении процесса
goodbye(() => server.close())
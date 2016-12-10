const autobahn = require('autobahn')
const winston = require('winston')
const wsuri = "wss://api.poloniex.com"
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: 'logs/poloniex.log' })
          ]
})

const connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
})

connection.onopen = function (session) {
        function tickerEvent (args,kwargs) {
		logger.info(args)
	}
        session.subscribe('ticker', tickerEvent);
}

connection.onclose = function () {
  console.log("Websocket connection closed")
}
                       
connection.open()

import bunyan from 'bunyan'
import PrettyStream from 'bunyan-prettystream'

const prettyStdOut = new PrettyStream()

const log = bunyan.createLogger({
  name: 'AppSls',
  level: 'debug',
  streams: [
    {
      level: 'debug',
      type: 'raw',
      stream: prettyStdOut,
    },
  ],
})

export default log

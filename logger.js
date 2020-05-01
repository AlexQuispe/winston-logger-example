const util    = require('util')
const moment  = require('moment')
const winston = require('winston')

class Logger {
  constructor() {
    this.winstonLogger = winston.createLogger({
      levels      : { error: 1, warn: 2, info: 3 },
      transports  : this.createTransports(),
      exitOnError : false,
    })
  }

  createTransports() {
    const TRANSPORTS = []
    TRANSPORTS.push(new winston.transports.Console({
      format           : winston.format.printf(this.consoleFormat()),
      level            : 'info', // Muestra logs de nivel 3
      handleExceptions : false,
      colorize         : false,
      json             : false,
    }))
    Array.from(['info', 'warn', 'error']).forEach(level => {
      TRANSPORTS.push(new winston.transports.File({
        format           : winston.format.printf(this.fileFormat()),
        level            : level,
        handleExceptions : false,
        colorize         : false,
        json             : true,
        filename         : `logs/${level}.log`,
        maxsize          : 5242880, // 5242880 Bytes = 5 MB
        maxFiles         : 5,
      }))
    })
    return TRANSPORTS
  }

  consoleFormat () {
    const COLORS = {
      error : `\x1b[31m`,  // RED
      warn  : `\x1b[33m`,  // YELLOW
      info  : `\x1b[36m`,  // CYAN
      reset : `\x1b[0m`,   // Restaura al color por defecto
    }
    return (info) => {
      const START     = COLORS[info.level]
      const END       = COLORS.reset
      const TIMESTAMP = moment().format('DD/MM/YYYY HH:mm:ss')
      const LEVEL     = info.level
      const MESSAGE   = info.message
      const DATA      = info.data ? util.inspect(info.data, false, null) : ''
      return `${START} ${TIMESTAMP} [${LEVEL}] ${MESSAGE} ${DATA} ${END}`
    }
  }

  fileFormat() {
    return (info)  => {
      const TIMESTAMP = moment().format('DD/MM/YYYY HH:mm:ss')
      const LEVEL     = info.level
      const MESSAGE   = info.message
      const DATA      = info.data ? util.inspect(info.data, false, null) : null
      return JSON.stringify({
        timestamp : TIMESTAMP,
        level     : LEVEL,
        message   : MESSAGE,
        data      : DATA,
      })
    }
  }

  info(message, data=null) { this.winstonLogger.info({ message, data }) }

  warn(message, data=null) { this.winstonLogger.warn({ message, data }) }

  error(message, data=null) { this.winstonLogger.error({ message, data }) }
}

module.exports = Logger

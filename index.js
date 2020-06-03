const Logger = require('./logger')

const logger = new Logger()

logger.info('Mensaje informativo')
logger.warn('Mensaje de advertencia')
logger.error('Mensaje de error')
logger.info('Mensaje con datos', { user: 'John Smith' })

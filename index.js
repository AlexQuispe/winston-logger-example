const Logger = require('./logger')

const logger = new Logger()

logger.info('Mensaje informativo')
logger.info('Mensaje informativo con datos', { user: 'John Smith' })
logger.warn('Mensaje de advertencia')
logger.error('Mensaje de error')

class BaseConfig(object):
  '''
  Base Config Class
  '''
  DEBUG=True
  TESTING=False

class ProductionClass(BaseConfig):
  '''
  Production Config Class
  '''
  DEBUG=False

class DevelopmentConfig(BaseConfig):
  '''
  Development Config Class
  '''
  DEBUG=True
  TESTING=True

class Setup(object):
  url='http://localhost:5000/'
class DotMap(dict):
    def __init__(self, dct):
        self.dct = dct

    def __getattr__(self, key):
        value = self.dct.get(key, None)
        if value:
            if isinstance(value, dict):
                return DotMap(value)
            else:
                return value
        else:
            raise(KeyError('404 Key: {0} Not Found in dict'.format(key)))
    
    def desAssign(self, key_list):
        return [self.dct[key] for key in key_list]
            

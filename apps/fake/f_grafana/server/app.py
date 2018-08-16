
"""
node py file
"""
class Node():
    """
        node server
    """
    def __init__(self):
        """
            node init method
        """
        self.server = 'server'
        self.client = 'client'

    def run(self):
        """
            node run method
        """
        print(self.client)
    def stop(self):
        """
            node stop method
        """
        print(self.server)

import asyncio
from util import Configurable

class IOLoop(Configurable):
    _ioloop_for_asyncio = dict()
    def current(instance=True):
        try:
            loop = asyncio.get_event_loop()
        except (RuntimeError, AssertionError):
            if not instance:
                return None
            raise
        try:
            return IOLoop._ioloop_for_asyncio[loop]
        except KeyError:
            if instance:
                from platform.asyncio import AsyncIOMainLoop
                current = AsyncIOMainLoop(make_current=True)
            else:
                current = None
        return current
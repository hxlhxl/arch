# property c src code 

``` http://hg.python.org/cpython/file/tip/Objects/descrobject.c#l1228
/* A built-in 'property' type */

/*
class property(object):

    def __init__(self, fget=None, fset=None, fdel=None, doc=None):
        if doc is None and fget is not None and hasattr(fget, "__doc__"):
            doc = fget.__doc__
        self.__get = fget
        self.__set = fset
        self.__del = fdel
        self.__doc__ = doc

    def __get__(self, inst, type=None):
        if inst is None:
            return self
        if self.__get is None:
            raise AttributeError, "unreadable attribute"
        return self.__get(inst)

    def __set__(self, inst, value):
        if self.__set is None:
            raise AttributeError, "can't set attribute"
        return self.__set(inst, value)

    def __delete__(self, inst):
        if self.__del is None:
            raise AttributeError, "can't delete attribute"
        return self.__del(inst)

*/

```

# property help doc

```
class property(object)
 |  property(fget=None, fset=None, fdel=None, doc=None) -> property attribute
 |
 |  fget is a function to be used for getting an attribute value, and likewise
 |  fset is a function for setting, and fdel a function for del'ing, an
 |  attribute.  Typical use is to define a managed attribute x:
 |
 |  class C(object):
 |      def getx(self): return self._x
 |      def setx(self, value): self._x = value
 |      def delx(self): del self._x
 |      x = property(getx, setx, delx, "I'm the 'x' property.")
 |
 |  Decorators make defining new properties or modifying existing ones easy:
 |
 |  class C(object):
 |      @property
 |      def x(self):
 |          "I am the 'x' property."
 |          return self._x
 |      @x.setter
 |      def x(self, value):
 |          self._x = value
 |      @x.deleter
 |      def x(self):
 |          del self._x
 |
 |  Methods defined here:
 |
 |  __delete__(self, instance, /)
 |      Delete an attribute of instance.
 |
 |  __get__(self, instance, owner, /)
 |      Return an attribute of instance, which is of type owner.
 |
 |  __getattribute__(self, name, /)
 |      Return getattr(self, name).
 |
 |  __init__(self, /, *args, **kwargs)
 |      Initialize self.  See help(type(self)) for accurate signature.
 |
 |  __new__(*args, **kwargs) from builtins.type
 |      Create and return a new object.  See help(type) for accurate signature.
 |
 |  __set__(self, instance, value, /)
 |      Set an attribute of instance to value.
 |
 |  deleter(...)
 |      Descriptor to change the deleter on a property.
 |
 |  getter(...)
 |      Descriptor to change the getter on a property.
 |
 |  setter(...)
 |      Descriptor to change the setter on a property.
 |
 |  ----------------------------------------------------------------------
 |  Data descriptors defined here:
 |
 |  __isabstractmethod__
 |
 |  fdel
 |
 |  fget
 |
 |  fset
 ```

# property document
class property(fget=None, fset=None, fdel=None, doc=None)
Return a property attribute.

fget is a function for getting an attribute value. fset is a function for setting an attribute value. fdel is a function for deleting an attribute value. And doc creates a docstring for the attribute.

A typical use is to define a managed attribute x:

class C:
    def __init__(self):
        self._x = None

    def getx(self):
        return self._x

    def setx(self, value):
        self._x = value

    def delx(self):
        del self._x

    x = property(getx, setx, delx, "I'm the 'x' property.")
If c is an instance of C, c.x will invoke the getter, c.x = value will invoke the setter and del c.x the deleter.

If given, doc will be the docstring of the property attribute. Otherwise, the property will copy fget’s docstring (if it exists). This makes it possible to create read-only properties easily using property() as a decorator:

class Parrot:
    def __init__(self):
        self._voltage = 100000

    @property
    def voltage(self):
        """Get the current voltage."""
        return self._voltage
The @property decorator turns the voltage() method into a “getter” for a read-only attribute with the same name, and it sets the docstring for voltage to “Get the current voltage.”

A property object has getter, setter, and deleter methods usable as decorators that create a copy of the property with the corresponding accessor function set to the decorated function. This is best explained with an example:

class C:
    def __init__(self):
        self._x = None

    @property
    def x(self):
        """I'm the 'x' property."""
        return self._x

    @x.setter
    def x(self, value):
        self._x = value

    @x.deleter
    def x(self):
        del self._x
This code is exactly equivalent to the first example. Be sure to give the additional functions the same name as the original property (x in this case.)

The returned property object also has the attributes fget, fset, and fdel corresponding to the constructor arguments.

Changed in version 3.5: The docstrings of property objects are now writeable.


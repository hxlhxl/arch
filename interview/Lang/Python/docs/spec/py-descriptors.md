[ Python描述器引导(翻译)](http://pyzh.readthedocs.io/en/latest/Descriptor-HOW-TO-Guide.html)

The following methods only apply when an instance of the class containing the method (a so-called descriptor class) appears in an owner class (the descriptor must be in either the owner’s class dictionary or in the class dictionary for one of its parents). In the examples below, “the attribute” refers to the attribute whose name is the key of the property in the owner class’ __dict__.

object.__get__(self, instance, owner)
Called to get the attribute of the owner class (class attribute access) or of an instance of that class (instance attribute access). owner is always the owner class, while instance is the instance that the attribute was accessed through, or None when the attribute is accessed through the owner. This method should return the (computed) attribute value or raise an AttributeError exception.

object.__set__(self, instance, value)
Called to set the attribute on an instance instance of the owner class to a new value, value.

object.__delete__(self, instance)
Called to delete the attribute on an instance instance of the owner class.
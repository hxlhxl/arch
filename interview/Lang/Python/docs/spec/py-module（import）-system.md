Python模块机制

[Python module system](https://github.com/Liuchang0812/slides/tree/master/pycon2015cn)

# import机制
## relative import
目录结构

``` 

(py2venv) [husa@ArchLinux-husa husa]$ tree relative-import/
relative-import/
├── entry.py
└── foo.py

0 directories, 2 files
```

代码内容

```
(py2venv) [husa@ArchLinux-husa relative-import]$ cat foo.py 
print(__name__)

a = 2
(py2venv) [husa@ArchLinux-husa relative-import]$ cat entry.py 

print(__name__,'main __name__: ')
from .foo import a

print(a)

```


在entry.py下执行

```
(py2venv) [husa@ArchLinux-husa relative-import]$ pwd
/oldhome/husa/relative-import
(py2venv) [husa@ArchLinux-husa relative-import]$ ls
entry.py  foo.py
(py2venv) [husa@ArchLinux-husa relative-import]$ python entry.py 
('__main__', 'main __name__: ')
Traceback (most recent call last):
  File "entry.py", line 3, in <module>
    from .foo import a
ValueError: Attempted relative import in non-package
(py2venv) [husa@ArchLinux-husa relative-import]$ python -m  entry.py 
('entry', 'main __name__: ')
Traceback (most recent call last):
  File "/usr/lib64/python2.7/runpy.py", line 163, in _run_module_as_main
    mod_name, _Error)
  File "/usr/lib64/python2.7/runpy.py", line 102, in _get_module_details
    loader = get_loader(mod_name)
  File "/usr/lib64/python2.7/pkgutil.py", line 464, in get_loader
    return find_loader(fullname)
  File "/usr/lib64/python2.7/pkgutil.py", line 474, in find_loader
    for importer in iter_importers(fullname):
  File "/usr/lib64/python2.7/pkgutil.py", line 430, in iter_importers
    __import__(pkg)
  File "entry.py", line 3, in <module>
    from .foo import a
ValueError: Attempted relative import in non-package

```

在顶层执行,注意执行的时候，目录下要有__init__.py或者__pycache__，否则找不到模块;

```
[husa@ArchLinux-husa relativeimport]$ cd ..
[husa@ArchLinux-husa husa]$ python -m relativeimport.main
__main__ main __name__: 
relativeimport.foo
2

```

## absolute import
Python2.6之后默认引入机制；表示从项目最顶层开始引入




# import system

## import方式

- import
- importlib.import_module()
- __import__()

## module package
所有的package都可以说是module，部分module是package
具体说就是拥有__path__属性的module就是package

### regular package

拥有__init__.py文件的module，在import之时会自动执行


### namespace package
portion

## import作用

1. 查找模块
2. 绑定牟凯模块到本地名字空间(local scope)




## import流程

1. 查找module
    1. 检查sys.modules(这个字典对象会缓存项目引入的模块)。
        a、 如果modules中存在这个key，那么就导入完毕
        b、 如果modules中存在这个key，但是key的值为None,抛出ModuleNotFoundError
        c、 如果modules中不能存在这个key，也就是missing，进行下一步searching
    2. 使用importer(finder,loader)加载module
        默认importer或者称之为hooks (meta hook -> path hook)
            第一种: locate builtin modules
            第二种: locate frozen modules
            第三种: locate modules from **import path**
                    什么是**import path**: 
                        A list of locations (or path entries) that are searched by the path based finder for modules to import. During import, this list of locations usually comes from sys.path, but for subpackages it may also come from the parent package’s __path__ attribute.
          importer位置:
            sys.meta_path
            sys.path_hooks
            sys.path_importer_cache
              sys.path
              ...
      3. 如果importer查找也找不到，抛出ImportError
      4. 加载module到local namespace




## finder loader importer

### finder
决定自己是否根据名字找到相应的模块，在py2中，finder对象必须实现find_module()方法，在py3中必须要实现find_module()或者find_loader（)方法。如果finder可以查找到模块，则会返回一个loader对象(在py3.4中，修改为返回一个module specs)。

```
from __future__ import print_function
import sys


class Watcher(object):
    @classmethod
    def find_module(cls, name, path, target=None):
        print("Importing", name, path, target)
        return None

sys.meta_path.insert(0, Watcher)

import socket

```


### loader
负责加载模块，它必须实现一个load_module()的方法。

### importer

一个对象，实现了finder和loader的方法。因为Python是duck type，只要实现了方法，就可以认为是该类。










# 应用

## 自动安装缺失库

```
from __future__ import print_function
import sys
import subprocess


class AutoInstall(object):
    _loaded = set()

    @classmethod
    def find_module(cls, name, path, target=None):
        if path is None and name not in cls._loaded:
            cls._loaded.add(name)
            print("Installing", name)
            try:
                out = subprocess.check_output(['sudo', sys.executable, '-m', 'pip', 'install', name])
                print(out)
            except Exception as e:
                print("Failed" + e.message)
        return None

sys.meta_path.insert(0,AutoInstall)

```


## flask统一插件库入口

  ```
  class ExtensionImporter(object):
    """This importer redirects imports from this submodule to other locations.
    This makes it possible to transition from the old flaskext.name to the
    newer flask_name without people having a hard time.
    """

    def __init__(self, module_choices, wrapper_module):
        self.module_choices = module_choices
        self.wrapper_module = wrapper_module
        self.prefix = wrapper_module + '.'
        self.prefix_cutoff = wrapper_module.count('.') + 1

    def __eq__(self, other):
        return self.__class__.__module__ == other.__class__.__module__ and \
               self.__class__.__name__ == other.__class__.__name__ and \
               self.wrapper_module == other.wrapper_module and \
               self.module_choices == other.module_choices

    def __ne__(self, other):
        return not self.__eq__(other)

    def install(self):
        sys.meta_path[:] = [x for x in sys.meta_path if self != x] + [self]

    def find_module(self, fullname, path=None):
        if fullname.startswith(self.prefix):
            return self

    def load_module(self, fullname):
        if fullname in sys.modules:
            return sys.modules[fullname]
        modname = fullname.split('.', self.prefix_cutoff)[self.prefix_cutoff]
        for path in self.module_choices:
            realname = path % modname
            try:
                __import__(realname)
            except ImportError:
                exc_type, exc_value, tb = sys.exc_info()
                # since we only establish the entry in sys.modules at the
                # very this seems to be redundant, but if recursive imports
                # happen we will call into the move import a second time.
                # On the second invocation we still don't have an entry for
                # fullname in sys.modules, but we will end up with the same
                # fake module name and that import will succeed since this
                # one already has a temporary entry in the modules dict.
                # Since this one "succeeded" temporarily that second
                # invocation now will have created a fullname entry in
                # sys.modules which we have to kill.
                sys.modules.pop(fullname, None)

                # If it's an important traceback we reraise it, otherwise
                # we swallow it and try the next choice.  The skipped frame
                # is the one from __import__ above which we don't care about
                if self.is_important_traceback(realname, tb):
                    reraise(exc_type, exc_value, tb.tb_next)
                continue
            module = sys.modules[fullname] = sys.modules[realname]
            if '.' not in modname:
                setattr(sys.modules[self.wrapper_module], modname, module)
            return module
        raise ImportError('No module named %s' % fullname)


  ```


然后在Flask的ext目录下的__init__.py文件中，初始化了该Importer。

```
def setup():
    from ..exthook import ExtensionImporter
    importer = ExtensionImporter(['flask_%s', 'flaskext.%s'], __name__)
    importer.install()
```


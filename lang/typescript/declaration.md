# Declaration files
使用TypeScript编写的库在最终还是会通过tsc转换为js语法，而js中是没有类型定义的，所以在发布这个包的同时，需要生成库的类型定义。常规的在`@types`中，小众的在`package.json`的`typings`字段定义其位置。
在`tsconfig.json`文件中，`compilerOptions.typeRoots`表示类型定义文件在什么地方。



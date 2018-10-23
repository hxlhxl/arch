

# debug
在首次安装ArchLinux之后，一些都很好，但是有一个问题始终很令人心烦，那就是中文输入法下，打字太快，英文字母会飘出候选框。
一番搜索发现以下链接：
    https://github.com/fcitx/fcitx/issues/178
    https://github.com/fcitx/fcitx/issues/159#issuecomment-48610520
    https://bbs.archlinuxcn.org/viewtopic.php?id=2710
从中可以得出结论： Chrome的锅，因为firefox没问题，而只有chrome和vscode这种有问题。
从中还发现自己没有安装`community/fcitx-gtk2 community/fcitx-gtk3`，安装完成之后，这个问题基本不再出现。


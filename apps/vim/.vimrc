" 禁用鼠标选择自动进入VISUAL模式
set mouse-=a
" 开启24color

"Use 24-bit (true-color) mode in Vim/Neovim when outside tmux.
"If you're using tmux version 2.2 or later, you can remove the outermost $TMUX check and use tmux's 24-bit color support
"(see < http://sunaku.github.io/tmux-24bit-color.html#usage > for more information.)
if (empty($TMUX))
  if (has("nvim"))
    "For Neovim 0.1.3 and 0.1.4 < https://github.com/neovim/neovim/pull/2198 >
    let $NVIM_TUI_ENABLE_TRUE_COLOR=1
  endif
  "For Neovim > 0.1.5 and Vim > patch 7.4.1799 < https://github.com/vim/vim/commit/61be73bb0f965a895bfb064ea3e55476ac175162 >
  "Based on Vim patch 7.4.1770 (`guicolors` option) < https://github.com/vim/vim/commit/8a633e3427b47286869aa4b96f2bfc1fe65b25cd >
  " < https://github.com/neovim/neovim/wiki/Following-HEAD#20160511 >
  if (has("termguicolors"))
    set termguicolors
  endif
endif


" 开启代码高亮
syntax enable
syntax on
" 开启代码guideline
set list lcs=tab:\|\ 
" 

set nocompatible              " be iMproved, required
filetype off                  " required

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
Plugin 'Yggdroot/indentLine'
Plugin 'joshdick/onedark.vim'
Plugin 'sheerun/vim-polyglot'
Plugin 'majutsushi/tagbar'
Plugin 'mileszs/ack.vim'
Plugin 'vim-airline/vim-airline'
Plugin 'ctrlpvim/ctrlp.vim'
Plugin 'jiangmiao/auto-pairs'
 

" Plugin 'VundleVim/Vundle.vim'
call vundle#end()            " required
filetype plugin indent on    " required

" 使用onedark方案,必须放在vundle runtime之后
colorscheme onedark

" 调整vim透明度
highlight Normal ctermbg=NONE guibg=NONE
set notermguicolors
" ack插件使用ag作为后端
let g:ackprg='ag --nogroup --nocolor --column'
" 搜索高亮
highlight Search cterm=NONE ctermfg=grey ctermbg=blue
set hlsearch
set shiftwidth=4
" tab大小
set tabstop=4
" 禁用某个插件
set runtimepath-=~/.vim/bundle/auto-pairs

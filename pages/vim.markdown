Title: Notes for working in Vim
Date: 2014-04-20 15:00
Category: Notes
Tags: notes, vim
Slug: notes-vim
Author: Chris
Summary: 

## Ack

:Ack text --clojure
:AckAdd text

#### Quicklist commands

- o    to open (same as enter)
- O    to open and close quickfix window
- go   to preview file (open but maintain focus on ack.vim results)
- h    to open in horizontal split
- H    to open in horizontal split silently
- v    to open in vertical split
- gv   to open in vertical split silently
- q    to close the quickfix window

## Unite

- :Unite file_mru

## Misc

- Copy and then can paste filename
    - :let @" = expand("%")
    - Ctrl+R%
- Move to next search: gn

## Todo

- vim-vinegar
- vim-fugitive
- vim-fireplace (ClojureScript)
- vim-dispatch
- Util-snips
- vim-markdown

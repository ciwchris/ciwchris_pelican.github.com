Title: Notes for working with tmux
Date: 2014-04-20 15:00
Category: Notes
Tags: notes, tmux
Slug: notes-tmux
Author: Chris
Summary: 

### Creating, closing and navigating

[Configuration]:http://sheerun.net/2014/03/21/how-to-boost-your-vim-productivity/

- bind key: C-Space
- help: ?
- create window: c
- horizontal split: h
- vertical split: v
- kill pane: x
- kill window: q
- move to next window: n
- move to previous window: p
- move to window #: #
- find window: f

### Detach and reattach sessions

- name session: $
- detach session: d
- reattach: tmux attach -t name
- Seems you cannot persist sessions for use after reboot

### Combining and seperating panes

[Merging panes]:http://superuser.com/questions/600286/tmux-move-pane-to-new-window

- join pane: j
- send to pane: s
- breakout pane: !
- rename window: ,

### Navigating with Vim

[Integration with Vim]:https://github.com/christoomey/vim-tmux-navigator

- move to left pane: C-h
- move to right pane: C-l
- move to lower pane: C-j
- move to upper pane: C-k


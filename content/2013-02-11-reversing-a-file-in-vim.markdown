Title: Reversing a file in vim
Date: 2013-02-11 14:30
Category: 
Tags: vim
Slug: reversing-a-file-in-vim
Author: Chris


Digging through the Vim help docs `:h usr_12.txt` I came across the topic 'Reverse line order', `h 12.1`. Sounds interesting. The command is:

{% include_code lang:vim
:global/^/m 0
%}

While familar with `:global` the rest of the command was mysterious. The documentation did a good job breaking this down. `^` will match the beginning of every line. `m 0` will `:move` the line below the line number specified; in other words move the current line to the first line of the file. Line '0' is called the 'mythical zeroth line', according to the docs. The same came be done with a range using marks:

{% include_code lang:vim
:'t+1,.g/^/m 't
%}`

Here, assuming mark 't' has been set, then all lines between it and the current line will be reversed.

`:move` was also new to me, although straight forward. It's compliment, `:copy`, it also worth noting here, also defined as `:t`.


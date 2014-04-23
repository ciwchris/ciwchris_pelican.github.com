Title: Examining the contents of a macro
Date: 2013-02-13 15:42
Category: 
Tags: vim
Slug: examining-the-contents-of-a-macro
Author: Chris
Summary: 

Macros are a breeze in Vim! But often I make a mistake while recording the macro, undo my change and repeat. Hopefully I get it right the next time, but I'd rather not look at the statistics. It turns out the registers Vim stores macros in are the same set of registers used for other operations. What this means is that I can `put` the contents of the register, modify it and then `yank` it back in. Let's say I had the following list of names:

{% inline_code
John Smith
Joe Smith
Bob Smith
Mike Smith
Juan Carlos
Jane Smith
Mike Jones
David Smith
Sarah Smith
James Smith
%}

And I want to swap the first name and last name. There are many ways to do this but using a macro one may write:

{% inline_code lang:vim
^dwA ^[pxj
%}

I can read these commands into register `a` by yanking the line like so, `"ay$`. Now I can use it as a macro to swap the names, `10@a`. Voilà!

{% inline_code
Smith John
Smith Joe
Smith Bob
Smith Mike
Carlos Juan
Smith Jane
Jones Mike
Smith David
Smith Sarah
Smith James
%}

To always make this macro avaiable I can save it in my `.vimrc`.

{% inline_code lang:vim
let @a='^dwA ^[pxj'
%}

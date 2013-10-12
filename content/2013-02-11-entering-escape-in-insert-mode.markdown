Title: Entering escape in insert mode
Date: 2013-02-16 16:17
Category: 
Tags: vim
Slug: entering-escape-in-insert-mode
Author: Chris
Summary: 

In the previous post I created a macro which made use of an 'escape':

{% include_code lang:vim
^dwA ^[pxj
%}

When outputting the contents of the register containing this macro the 'escape' is translated as `^[`. This shouldn't be surpising. This format is known as [caret notation](http://en.wikipedia.org/wiki/Caret_notation) and is used to represent non-printable control characters in ASCII. That explains the caret, but why the bracket? Interestingly, the bracket, by default, can be used as an alternative to the 'escape' key in Vim, `h: i-ctrl-[`. The reason for the bracket has to do with [how control characters are mapped on keyboards](http://en.wikipedia.org/wiki/Control_character#How_control_characters_map_to_keyboards). As stated in the article, control characters are rendered by the ASCII value of the non-printable character plus 64. In this case the 'escape' key has the [ASCII value of 27](http://en.wikipedia.org/wiki/ASCII#ASCII_control_characters). Adding 64 to this value gives us the decimal value of 91, which is [represented by the bracket, '\['](http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters). And that is why the 'escape' was rendered as `^[` in the macro. `h: key-notation` contains a table detailing how many non-printable characters can be rendered in Vim.

The follow up question to this would be, "if I were to create the macro myself how would I type `^[`?" If the caret key was literally used then it would instruct Vim to move to the "first non-blank character of the line", `:h ^`. Not our desired outcome. To type an 'escape' it is necessary to use 'ctrl-v', which will "insert next non-digit literally", `:h i_ctrl-v`. So to use an 'escape' in a macro being created manually type: 'ctrl-v' followed by 'escape'.


Title: Notes for working in Linux
Date: 2014-04-20 15:00
Category: Notes
Tags: notes, linux, arch, zsh, bash
Slug: linux-notes
Author: Chris
Summary: 

- Generate resume => xelatex resume.tex

- Set time
    - Set time => sudo date +%T -s "21:08:00"
    - Sync hardware clock => sudo hwclock -w

- Change screen resolution
    1. xrandr --current
    1. xrandr --output LVDS1 --mode 1024x768

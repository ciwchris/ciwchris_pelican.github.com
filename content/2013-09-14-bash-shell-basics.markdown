Title: Bash shell basics
Date: 2013-09-14 18:53
Category: 
Tags: cli
Slug: bash-shell-basics
Author: Chris
Summary: 

Notes from the Pluralsight course [Introduction to the Bash Shell on Mac OS and Linux](http://pluralsight.com/training/Courses/TableOfContents/introduction-bash-shell-linux-mac-os)

### Braces

{% inline_code lang:bash
ls file?{mine,yours}.{txt,png}
%}

### Commands

{% inline_code lang:bash
grep 1978 oscars.tsv | sort > 1978_films.txt
cut -f 3 oscars.tsv | grep 4 | wc -l
%}

{% inline_code lang:bash Sort second column as numbers in reverse order
sort -rnk2 math_grades
%}

{% inline_code lang:bash Unique entries with their count
sort math_attendance | uniq -c | sort -nr
%}


{% inline_code lang:bash Find the largest file in the directory
ls -lS | head -n 2 | tail -n 1
ls -lrS | tail -n 2 # Better way
%}

{% inline_code lang:bash Don't exit but update as new entries come in
tail -f auth.log
%}

{% inline_code lang:bash Number of files in a directory
ls -a | wc -l
%}

{% inline_code lang:bash Search for bruce, case insensitive, in a set of files
grep -i bruce *grades
%}

{% inline_code lang:bash Filter out using an extended regex before working with other content
grep -Ev "^$|lecture" math_attendance | sort | uniq -c | sort -nr
%}

{% inline_code lang:bash Search for txt files with curious in them
find . -name '*.txt' -exec grep -l curious {} \;
%}

{% inline_code lang:bash Change uppercase 'S' to lowercase 's'
cat physics_grades | tr S s 
tr S s < physics_grades # More efficient method
%}

{% inline_code lang:bash Change from tab separated to semicolon separated
tr \\t \; < oscars.tsv > oscars.csv
%}

{% inline_code lang:bash Using sed
sed 's/something/something new/g' one.txt > two.txt
%}

{% inline_code lang:bash Combine files using columns (not append)
paste *grades
join *grades # Using keys
%}


### Command Substitution

{% inline_code lang:bash
echo "hello `whoami`" #old form
echo "Buy milk" > "notes$(date).txt"
%}

### Copy / Paste

Select text and paste with middle mouse click

### Movement keys

- ctrl-a: start of line
- ctrl-e: end of line
- ctrl-f: forward 1 char
- ctrl-b: backward 1 char
- alt-f: forward 1 word
- alt-b: backward 1 word
- ctrl-d: delete 1 char
- ctrl-h: delete 1 char backward
- alt-d: delete 1 word
- ctrl-w: delete 1 word backward
- ctrl-k: delete rest of line
- ctrl-u: delete from start of line
- ctrl-r: search back in history

### Processes

- C-z: stop and return to a command prompt
	- fg or bg to start the process again
	- or use the job id: fg %1
- jobs: to list the running jobs
- kill %1: kill job 1
- or by process id
	- ps -ef: list all processes and show the owner
	- kill 1234

### Customization

- alias: view aliases
- \ls: run normal command, not the alias for it
- .bashrc: executed for non-login shells
- .profile or .bash_profile: executed for login shells
- echo $PS1: reading an environment variable
- PS1="\h:\W /u": set an environment variable
- env: list all environment variables
- EDITOR=vim: set the editor
- export EDITOR: to make it visible
	- or export EDITOR=vim
- chsh: change shell
	- \bin\zsh: change to using zsh
- echo $SHELL: view current shell


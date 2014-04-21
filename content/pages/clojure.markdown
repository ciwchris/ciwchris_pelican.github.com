Title: Notes for working with Clojure
Date: 2014-04-20 15:00
Category: Notes
Tags: notes, clojure
Slug: clojure-notes
Author: Chris
Summary: 

Working with a application within a repl

(load "fizz_buzz/core")
(ns fizz-buzz.core)

or

http://stackoverflow.com/questions/3408076/difference-in-clojure-between-use-and-require?rq=1
(use 'fizz-buzz.core :reload) ; puts them in the same namespace (can use :only)
(require 'fizz-buzz.core :reload) ; you'll have to type the namespace (can use :as)

Searching for documentation

- regex searching: apropos
- gui: >sdoc

Dependencies: lein ancient upgrade

Debugging

-spy
    - #spy/p
    - #spy/d ^{:time true :form false :fs 3}
    - #spy/t for tracing, see doc
-(>debug-repl)
    - *locals*
    - () to continue when done

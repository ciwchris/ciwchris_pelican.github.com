Title: Records and Protocols in Clojure
Date: 2014-11-15 14:00
Category: 
Tags: clojure, example
Slug: records-and-protocols-in-clojure
Author: Chris
Summary: 

How I explain Clojure records and protocols to myself. The example used will be adding numbers.

Records are comparable to classes.

{% inline_code lang:clj
;; Define type TwoNum with a two parameter constructor
(defrecord TwoNum [a b])

;; Create instance of TwoNum
(TwoNum. 1 2)
%}

Protocols are interfaces.

{% inline_code lang:clj
;; Define interface Arithmetic with method add
(defprotocol Arithmetic
  (add [arithmetic]))
%}

Records can implement a record in its definition or at a later time.

{% inline_code lang:clj
;; Extend the previously defined record to implement the protocol
(extend-type TwoNum
  Arithmetic
  (add [number-object] (+ (:a number-object) (:b number-object))))

;; Implementing the interface in the record definition
(defrecord ThreeNum [a b c]
  Arithmetic
  (add [_] (+ a b c)))

;; Using the implementations
(add (TwoNum. 1 2))
(add (ThreeNum. 1 2 3))
%}

When the record definition implements the protocol it can access the fields (a, b and c) directly instead of going through the object, 'number-object', and so the underscore throw away syntax, '_', can be used. There is also a performance benefit when implementing within the definition. However, because records can be extended after they have already been defined Clojure is able to elegantly address the [Expression Problem](http://www.ibm.com/developerworks/library/j-clojure-protocols/).

It is also possible to implement a protocol without defining a record using reify.

{% inline_code lang:clj
;; Creating an anonymous type
(defn reify-num
  [a b]
  (reify Arithmetic
        (add [_] (+ a b))))

;; Using the implementation of the anonymous type
(add (reify-num 1 2))
%}

At times a common implementation could be used across types. To use a common implementation the implementation can be defined in a map and then used when extending the types.

{% inline_code lang:clj
;; Records which can use a common implementation
(defrecord TwoNum [a b])
(defrecord ThreeNum [a b c])

;; Common implementation
(def arithmetic-implementation
  {:add (fn [number-object] (apply + (vals number-object)))})

;; Extending the records using the common implementation
(extend TwoNum Arithmetic arithmetic-implementation)
(extend ThreeNum Arithmetic arithmetic-implementation)

;; Using the implementations
(add (TwoNum. 1 2))
(add (ThreeNum. 1 2 3))
%}

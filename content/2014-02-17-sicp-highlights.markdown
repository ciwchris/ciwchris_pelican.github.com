Title: Structure and Interpretation of Computer Programs: Highlighted Text
Date: 2014-02-17 20:48
Category: Concepts
Tags: sicp lisp books
Slug: sicp-highlights
Author: Chris
Summary: 

Text highlighted during an initial reading of
[Structure and Interpretation of Computer Programs](http://mitpress.mit.edu/sicp/full-text/book/book-Z-H-10.html)

# Chapter 1

Master software engineers have the ability to organize programs so that they can be reasonably sure that the resulting processes will perform the tasks intended.

The most significant of these features is the fact that Lisp descriptions of processes, called procedures, can themselves be represented and manipulated as Lisp data.

## 1.1

In programming, we deal with two kinds of elements: procedures and data. (Later we will discover that they are really not so distinct.)

substitution model
normal-order evaluation vs applicative-order evaluation

The word predicate is used for procedures that return true or false, as well as for expressions that evaluate to true or false.

The contrast between function and procedure is a reflection of the general distinction between describing properties of things and describing how to do things, or, as it is sometimes referred to, the distinction between declarative knowledge and imperative knowledge.

block structure
lexical scoping

## 1.2 (very boring chapter primarily having to do with mathematics and calculating space and operations)

linear recursive process vs linear iterative process

It will execute an iterative process in constant space, even if the iterative process is described by a recursive procedure. An implementation with this property is called tail-recursive.

## 1.3

Procedures that manipulate procedures are called higher-order procedures.

 Experienced programmers know how to choose procedural formulations that are particularly perspicuous, and where useful elements of the process are exposed as separate entities that can be reused in other applications.

expert programmers know how to choose the level of abstraction appropriate to their task.

Lisp, unlike other common programming languages, awards procedures full first-class status. This poses challenges for efficient implementation, but the resulting gain in expressive power is enormous.

# Chapter 2

The general technique of isolating the parts of a program that deal with how data objects are represented from the parts of a program that deal with how data objects are used is a powerful design methodology called data abstraction.
closure -- that the glue we use for combining data objects should allow us to combine not only primitive data objects, but compound data objects as well.

## 2.1

Data abstraction is a methodology that enables us to isolate how a compound data object is used from the details of how it is constructed from more primitive data objects.

 Data objects constructed from pairs are called list-structured data.

## 2.2

The word nil is a contraction of the Latin word nihil, which means ``nothing.''

The difference between the two definitions is not that the computer is performing a different process (it isn't) but that we think about the process differently. In effect, map helps establish an abstraction barrier that isolates the implementation of procedures that transform lists from the details of how the elements of the list are extracted and combined.

In working with compound data, we've stressed how data abstraction permits us to design programs without becoming enmeshed in the details of data representations, and how abstraction preserves for us the flexibility to experiment with alternative representations.

The value of expressing programs as sequence operations is that this helps us make program designs that are modular, that is, designs that are constructed by combining relatively independent pieces.

stratified design, the notion that a complex system should be structured as a sequence of levels that are described using a sequence of languages. Each level is constructed by combining parts that are regarded as primitive at that level, and the parts constructed at each level are used as primitives at the next level.

Stratified design helps make programs robust, that is, it makes it likely that small changes in a specification will require correspondingly small changes in the program.

## 2.3

 Symbolic differentiation is of special historical significance in Lisp. It was one of the motivating examples behind the development of a computer language for symbol manipulation. 

We can represent trees by using lists. Each node will be a list of three items: the entry at the node, the left subtree, and the right subtree.

We have examined options for using lists to represent sets and have seen how the choice of representation for a data object can have a large impact on the performance of the programs that use the data.

The designer can create an initial implementation using a simple, straightforward representation such as unordered lists. This will be unsuitable for the eventual system, but it can be useful in providing a ``quick and dirty'' data base with which to test the rest of the system. Later on, the data representation can be modified to be more sophisticated. If the data base is accessed in terms of abstract selectors and constructors, this change in representation will not require any changes to the rest of the system.

## 2.4

These data-abstraction barriers are powerful tools for controlling complexity. By isolating the underlying representations of data objects, we can divide the task of designing a large program into smaller tasks that can be performed separately. 

So in addition to the data-abstraction barriers that isolate representation from use, we need abstraction barriers that isolate different design choices from each other and permit different choices to coexist in a single program. 

Our main technique for building generic procedures will be to work in terms of data objects that have type tags, that is, data objects that include explicit information about how they are to be processed.

The principle of least commitment: The abstraction barrier formed by the selectors and constructors permits us to defer to the last possible moment the choice of a concrete representation for our data objects and thus retain maximum flexibility in our system design.

The general strategy of checking the type of a datum and calling an appropriate procedure is called dispatching on type.

data-directed programming: Here we will implement the interface as a single procedure that looks up the combination of the operation name and argument type in the table to find the correct procedure to apply, and then applies it to the contents of the argument.

message passing: An alternative implementation strategy is to decompose the table into columns and, instead of using ``intelligent operations'' that dispatch on data types, to work with ``intelligent data objects'' that dispatch on operation names.

## 2.5

Often the different data types are not completely independent, and there may be ways by which objects of one type may be viewed as being of another type. This process is called coercion.

In general, we can implement this idea by designing coercion procedures that transform an object of one type into an equivalent object of another type.

hierarchy of types, in which, for example, integers are a subtype of rational numbers

in which each type has at most one supertype and at most one subtype. Such a structure, called a tower,

# Chapter 3

In particular, we need strategies to help us structure large systems so that they will be modular, that is, so that they can be divided ``naturally'' into coherent parts that can be separately developed and maintained.

The first organizational strategy concentrates on objects, viewing a large system as a collection of distinct objects whose behaviors may change over time. An alternative organizational strategy concentrates on the streams of information that flow in the system, much as an electrical engineer views a signal-processing system.

The difficulties of dealing with objects, change, and identity are a fundamental consequence of the need to grapple with time in our computational models.

delayed evaluation: The stream approach can be most fully exploited when we decouple simulated time in our model from the order of the events that take place in the computer during evaluation.

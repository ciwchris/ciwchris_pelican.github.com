Title: Understanding and Eliminating Technical Debt
Date: 2014-05-27 19:00
Category: 
Tags: pluralsight, practice
Slug: understanding-and-eliminating-technical-debt
Author: Chris
Summary: 


Notes from the Pluralsight course [Understanding and Eliminating Technical Debt](http://pluralsight.com/training/Courses/TableOfContents/understanding-eliminating-technical-debt)

## The problem

Technical Debt

- The quick way versus the "right" way
- Speeds up in the short term but slows down future development

Technical debt is comparable to financial debt:

- Get it now => Early to market
- Pay interest => Refactoring
- Unable to repay => Unable to maintain

[Ward Cunningham on Technical Debt](http://goo.gl/XeS6)

[Martian Fowler's Debt Quadrant](http://goo.gl/fmB2b)

## Types

- Code: What was the developer thinking? We spend more reading code than writing it. Readability matters!
    - Complicated
    - Cut and paste
    - Tight coupling
- Architectural: Flexibility matters, requirements change.
    - Missing layer: big ball of mud. Untested business logic.
    - Missing extensibility points: Open closed principle
    - Overlooked concern
- Knowledge: What does it do, how it works, who's using it: Code archaeologist. Lost Knowledge must be recovered.
    - Dead code: red herring
- Test: Quick and thorough or can't verify it is still working.
- Technological: Support new and migrate from old technologies.

## Metrics

How can we measure lost productivity as a result of technical debt? [We have no way of reasonably measuring productivity](http://goo.gl/gAq1Yx)

- Time
    - Velocity = Work / Time
    - Decrease velocity: bad estimates, laziness, technical debt
- Code
    - Bad: poor measure of productivity and functionality
    - Good: the larger the code the more likely problems will be experienced
- Cyclomatic: Hard to maintain and test
- Code churn: Lots of changes to the same file or lots of authors of the same file.
    - Too many responsibilities (SRP)
    - Lack of extensibility (Open Closed)
    - Lots of bugs
- Test metrics: trend of automated tests, manual test cases run and configuration coverage.
- Code coverage: aim for 100% of business logic
- Defect database
    - How many bugs were found
    - How many found in production
    - Which file is regularly being bug fixed
    - How quickly were they resolved, the longer it took could point to more debt

## Communicating

Developer responses

- Cynical: it's hopeless
- Critical: it's your fault
- Cautious: too risky to change anything
- Cavalier: let me at it
- Clueless: what problem

Incremental improvement. Don't try to fight it by yourself.

The longer we leave it the more time it costs us and the harder it is to fix.

Can't aim for no technical debt, we need to be pragmatic and strategic in what we attack.

Make it visible

- We are strategically taking on technical debt.
- Two estimates: one doing it right and one taking on the debt.
- Technical debt is slowing me down right now.

## Action plan

- Knowing the current state of the system.
- Knowing what's coming in the future allows you to repay the appropriate technical debt.
- Know what we are working towards, what is our aim to prevent and address technical debt. Learn lessons from the past.

Needs to be continually evolved and improved over the course of the project.

#### Technical Document

A document gives visibility to others and gives developers insight to the trade-offs and whether it truly needs to be addressed.

- What is the problem: how is it slowing us down
- Proposed solution: what steps can we take
- Estimate: quick or a lot of work
- Benefit: allow other features to be implemented more quickly

Good to review before starting new versions

## Repaying

- Cover it with tests then modify it
    - I don't have time: it will cost more time later
    - Don't know what it's doing: characterization tests
    - Can't get it under test: working with legacy code
- Make it extensible then extend it: refactor it in steps instead of changing everything at once.
- Modularise then rewrite: small portions at a time.
    - [Micro services](http://martinfowler.com/articles/microservices.html): easily replaceable and can vary while monoliths are hard to maintain.

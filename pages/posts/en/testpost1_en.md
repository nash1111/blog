---
title: How I created this blog PART 1
date: '2023-05-20'
tags: ["Next.js", "blog"]
locale: "en"
---

### How I created this blog Part 1
#### My Environment
OS: Ubuntu 22.04.2 LTS  
node-version: 16.20.0  
yarn: 1.22.19  

#### Create From Template
(my answer)  
yarn create next-app blog  
✔ Would you like to use TypeScript with this project? … No / Yes (Yes)  
✔ Would you like to use ESLint with this project? … No / Yes (Yes)  
✔ Would you like to use Tailwind CSS with this project? … No / Yes (No)  
✔ Would you like to use `src/` directory with this project? … No / Yes (No)  
✔ Use App Router (recommended)? … No / Yes (No)  
✔ Would you like to customize the default import alias? … No / Yes (No)  
#### Why I chose these
Would you like to use TypeScript with this project? (Yes)  

I prefer TypeScript over JavaScript.  
What I don't want to be misunderstood is that I'm not averse to JavaScript.  
JavaScript is a great language that can be used safely once you fully understand its specifications, and it works in browsers and is fast.  
However, since I don't have the intelligence or time to understand all of JavaScript, I want to rely on TypeScript's type system.  

Would you like to use ESLint with this project? (Yes)  

For the sake of code law and order, I prefer to have a linter.  


Would you like to use Tailwind CSS with this project? (No)  
I used to be fond of Tailwind, but since this blog also serves as my practice for CSS, I've decided to write as much CSS as possible using @emotion/react.  
Even though Tailwind allowed me to create fantastic UIs despite my lack of proficiency in CSS, I often found it unreadable when revisiting it later.  
Therefore, in order to deepen my understanding of CSS, I decided to take a break from Tailwind.


Would you like to use `src/` directory with this project? (No)  


Use App Router (recommended)? (No)  

Would you like to customize the default import alias? (No)  

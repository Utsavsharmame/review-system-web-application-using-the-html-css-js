# IDZ Digital Interview Questions & Experiences

## Interview Process Overview

The interview process typically consists of 3-4 rounds:

1. **Aptitude & Coding Test** (Online/Offline)
2. **Technical Interview** 
3. **HR Interview**
4. **Director/CEO Round** (sometimes)

## Round 1: Aptitude & Coding Test

### Aptitude Questions
- Basic math problems (speed, distance, trains)
- Probability questions
- Geometry (perimeter of rhombus, etc.)
- Logical reasoning
- 20-25 questions total

### Coding Questions (3-4 problems)
Common patterns:
- Fibonacci series
- Prime number checking
- Reverse a 3-digit number
- Second largest element in array
- Sum of digits
- Star patterns
- Factorial (recursive)
- Water jug problem
- Reverse string
- Count numbers

## Round 2: Technical Interview

### Programming Topics
- Arrays and array operations
- OOPs concepts (classes, objects, inheritance)
- Method overloading and overriding
- Access modifiers
- String manipulation
- Pattern printing
- Substring search

### Logical Problems
- Classical jug problem extensions
- Mathematical puzzles
- Game-based logic problems
- Complex pattern questions

## Round 3: HR Interview

### Common Questions
- "Tell me about yourself"
- Communication assessment
- Teamwork evaluation
- Cultural fit questions

## Round 4: Director/CEO Round

### Focus Areas
- Problem-solving approach
- Logical reasoning
- Verbal communication
- How you approach problems

## Salary Information
- Internship: ₹8,000/month
- Full-time: ₹1.80 LPA (mentioned in one experience)

## Tips & Observations

### Positive Aspects
- Multiple rounds ensure thorough evaluation
- Focus on logical reasoning and problem-solving
- Basic to medium difficulty questions

### Challenges Reported
- Long waiting times between rounds
- Sometimes rude interviewers
- Focus more on logic than technical skills
- High difficulty for fresher level compared to salary

### Preparation Recommendations
- Practice basic programming patterns
- Strengthen aptitude and logical reasoning
- Prepare OOPs concepts thoroughly
- Work on communication skills
- Be ready for puzzle-solving

## Common Coding Patterns to Practice

```javascript
// Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Prime Number
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Reverse 3-digit number
function reverseThreeDigit(num) {
    return parseInt(num.toString().split('').reverse().join(''));
}

// Second largest in array
function secondLargest(arr) {
    let first = -Infinity, second = -Infinity;
    for (let num of arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num !== first) {
            second = num;
        }
    }
    return second;
}
```

## Key Takeaways

1. **Focus on Basics**: Strong foundation in programming fundamentals is crucial
2. **Logical Reasoning**: Equal importance to coding and logical thinking
3. **Communication**: How you explain your approach matters
4. **Preparation**: Practice common patterns and aptitude problems
5. **Patience**: Be prepared for longer interview processes with waiting periods
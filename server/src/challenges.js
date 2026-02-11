export const challenges = [
  {
    id: "sum-array",
    title: "Sum an Array",
    difficulty: "Beginner",
    duration: "15 min",
    summary:
      "Write a function that returns the sum of all numbers in an array.",
    description:
      "Implement `solve(input)` where input is an array of numbers. Return the numeric sum.",
    starterCode: `function solve(input) {\n  // input is an array of numbers\n  return 0;\n}`,
    examples: [
      { input: [1, 2, 3, 4], output: 10 },
      { input: [5, -1, 7], output: 11 }
    ],
    tests: [
      { input: [[1, 2, 3]], expected: 6 },
      { input: [[-4, 10, 2]], expected: 8 },
      { input: [[0, 0, 0]], expected: 0 }
    ]
  },
  {
    id: "palindrome-check",
    title: "Case-Insensitive Palindrome",
    difficulty: "Intermediate",
    duration: "20 min",
    summary:
      "Check whether a string is a palindrome while ignoring case and spaces.",
    description:
      "Implement `solve(input)` where input is a string. Return true when palindrome under normalization.",
    starterCode: `function solve(input) {\n  // input is a string\n  return false;\n}`,
    examples: [
      { input: "Race car", output: true },
      { input: "Node", output: false }
    ],
    tests: [
      { input: ["Never odd or even"], expected: true },
      { input: ["hello"], expected: false },
      { input: ["A man a plan a canal Panama"], expected: true }
    ]
  },
  {
    id: "fizzbuzz-plus",
    title: "FizzBuzz Plus",
    difficulty: "Beginner",
    duration: "10 min",
    summary:
      "Generate FizzBuzz output from 1..n as an array.",
    description:
      "Implement `solve(input)` where input is n. Return an array for numbers 1..n with Fizz/Buzz/FizzBuzz replacements.",
    starterCode: `function solve(input) {\n  // input is a positive integer\n  return [];\n}`,
    examples: [
      { input: 5, output: [1, 2, "Fizz", 4, "Buzz"] }
    ],
    tests: [
      { input: [3], expected: [1, 2, "Fizz"] },
      { input: [5], expected: [1, 2, "Fizz", 4, "Buzz"] },
      {
        input: [15],
        expected: [
          1,
          2,
          "Fizz",
          4,
          "Buzz",
          "Fizz",
          7,
          8,
          "Fizz",
          "Buzz",
          11,
          "Fizz",
          13,
          14,
          "FizzBuzz"
        ]
      }
    ]
  }
];

const normalizeValue = (value) => JSON.stringify(value);

export function runChallengeTests(challenge, code) {
  let solve;

  try {
    solve = new Function(`${code}; return solve;`)();
  } catch (error) {
    return {
      compileError: error.message,
      passed: 0,
      total: challenge.tests.length,
      results: []
    };
  }

  if (typeof solve !== "function") {
    return {
      compileError: "Your code must define a function named solve(input).",
      passed: 0,
      total: challenge.tests.length,
      results: []
    };
  }

  const results = challenge.tests.map((test, index) => {
    try {
      const actual = solve(...test.input);
      const pass = normalizeValue(actual) === normalizeValue(test.expected);
      return {
        id: index + 1,
        pass,
        input: test.input,
        expected: test.expected,
        actual
      };
    } catch (error) {
      return {
        id: index + 1,
        pass: false,
        input: test.input,
        expected: test.expected,
        actual: `Runtime error: ${error.message}`
      };
    }
  });

  return {
    compileError: null,
    passed: results.filter((result) => result.pass).length,
    total: results.length,
    results
  };
}

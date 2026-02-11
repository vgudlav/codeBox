function PreviewExamples({ examples }) {
  return (
    <div className="examples-box">
      <h4>Examples</h4>
      {examples.map((sample, index) => (
        <pre key={index}>{`Input: ${JSON.stringify(sample.input)}\nOutput: ${JSON.stringify(sample.output)}`}</pre>
      ))}
    </div>
  );
}

function TestReport({ report }) {
  if (!report) {
    return <p className="hint">Run your code to see test feedback.</p>;
  }

  if (report.compileError) {
    return <pre className="compile-error">Compile Error: {report.compileError}</pre>;
  }

  return (
    <div className="test-report">
      <p>
        Passed <strong>{report.passed}</strong> / {report.total}
      </p>
      <ul>
        {report.results.map((item) => (
          <li key={item.id} className={item.pass ? "pass" : "fail"}>
            <strong>Test #{item.id}</strong>
            <span>{item.pass ? "PASS" : "FAIL"}</span>
            <pre>{`input: ${JSON.stringify(item.input)}\nexpected: ${JSON.stringify(
              item.expected
            )}\nactual: ${JSON.stringify(item.actual)}`}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LabEditor({ challenge, code, onCodeChange, onRun, report, isRunning }) {
  if (!challenge) {
    return (
      <section className="panel editor-panel">
        <h2>Loading challenge...</h2>
      </section>
    );
  }

  return (
    <section className="panel editor-panel">
      <div className="panel-title-row">
        <h2>{challenge.title}</h2>
        <span>{challenge.difficulty}</span>
      </div>
      <p>{challenge.description}</p>
      <PreviewExamples examples={challenge.examples} />
      <label htmlFor="code-editor">Editor</label>
      <textarea
        id="code-editor"
        value={code}
        onChange={(event) => onCodeChange(event.target.value)}
        spellCheck={false}
      />
      <button className="run-button" onClick={onRun} disabled={isRunning}>
        {isRunning ? "Running tests..." : "Run Tests"}
      </button>
      <TestReport report={report} />
    </section>
  );
}

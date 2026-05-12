import { useEffect, useMemo, useState } from "react";
import ChallengeList from "./components/ChallengeList";
import LabEditor from "./components/LabEditor";

const defaultError = "Unable to reach the API. Is the server running on port 4000?";

export default function App() {
  const [challenges, setChallenges] = useState([]);
  const [activeChallengeId, setActiveChallengeId] = useState("");
  const [codeByChallenge, setCodeByChallenge] = useState({});
  const [report, setReport] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadChallenges() {
      try {
        const response = await fetch("/api/challenges");
        const data = await response.json();
        setChallenges(data);
        setActiveChallengeId(data[0]?.id ?? "");
        setCodeByChallenge(
          data.reduce(
            (acc, challenge) => ({
              ...acc,
              [challenge.id]: challenge.starterCode
            }),
            {}
          )
        );
      } catch (_error) {
        setErrorMessage(defaultError);
      }
    }

    loadChallenges();
  }, []);

  const activeChallenge = useMemo(
    () => challenges.find((challenge) => challenge.id === activeChallengeId),
    [activeChallengeId, challenges]
  );

  const activeCode = codeByChallenge[activeChallengeId] ?? "";

  async function runCurrentChallenge() {
    if (!activeChallengeId || !activeCode) {
      return;
    }

    setIsRunning(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/challenges/${activeChallengeId}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: activeCode })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to run tests.");
      }

      setReport(data);
    } catch (error) {
      setErrorMessage(error.message || defaultError);
    } finally {
      setIsRunning(false);
    }
  }

  function updateCode(value) {
    setCodeByChallenge((previous) => ({
      ...previous,
      [activeChallengeId]: value
    }));
  }

  useEffect(() => {
    setReport(null);
  }, [activeChallengeId]);

  return (
    <main className="app-shell">
      <header>
        <h1>Enterprise Apps Developer Simulation Lab</h1>
        <p>
          Practice realistic L3 enterprise application ownership scenarios focused on automation,
          scripting, incident response, and SaaS admin engineering.
        </p>
      </header>

      {errorMessage && <p className="global-error">{errorMessage}</p>}

      <div className="content-grid">
        <ChallengeList
          challenges={challenges}
          activeId={activeChallengeId}
          onSelect={setActiveChallengeId}
        />

        <LabEditor
          challenge={activeChallenge}
          code={activeCode}
          onCodeChange={updateCode}
          onRun={runCurrentChallenge}
          report={report}
          isRunning={isRunning}
        />
      </div>
    </main>
  );
}

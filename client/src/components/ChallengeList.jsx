export default function ChallengeList({ challenges, activeId, onSelect }) {
  return (
    <section className="panel challenge-list">
      <div className="panel-title-row">
        <h2>Challenge Track</h2>
        <span>{challenges.length} lessons</span>
      </div>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <button
              className={activeId === challenge.id ? "selected" : ""}
              onClick={() => onSelect(challenge.id)}
            >
              <strong>{challenge.title}</strong>
              <small>
                {challenge.difficulty} · {challenge.duration} · {challenge.testCount} tests
              </small>
              <p>{challenge.summary}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

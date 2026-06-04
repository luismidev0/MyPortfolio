export default function SectionHead({ idx, title }) {
  return (
    <div className="section-head reveal">
      <span className="idx">{idx}</span>
      <h2>{title}</h2>
      <span className="rule"></span>
    </div>
  );
}

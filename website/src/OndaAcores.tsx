export default function OndaAcores() {
  const d =
    "M0 60 Q180 0 360 60 T720 60 T1080 60 T1440 60 T1800 60 T2160 60 T2520 60 T2880 60 V120 H0 Z";

  return (
    <div className="onda-fundo" aria-hidden="true">
      <svg className="onda-camada" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path className="onda-path-1" d={d} />
      </svg>
      <svg className="onda-camada onda-camada--2" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path className="onda-path-2" d={d} />
      </svg>
    </div>
  );
}
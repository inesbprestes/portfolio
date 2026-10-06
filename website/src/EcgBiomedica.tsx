function batimento(y: number): string {
  return (
    `V${y + 60} Q35 ${y + 80} 50 ${y + 100} ` +
    `V${y + 130} L58 ${y + 145} L5 ${y + 165} L90 ${y + 185} L50 ${y + 200} ` +
    `V${y + 230} Q30 ${y + 260} 50 ${y + 290} V${y + 300} `
  );
}

const d = "M50 0 " + [0, 300, 600, 900].map(batimento).join("");

type LinhaProps = {
  lado: "esq" | "dir";
};

function Linha({ lado }: LinhaProps) {
  return (
    <div className={`ecg-lado ecg-lado--${lado}`} aria-hidden="true">
      <svg viewBox="0 0 100 1200" preserveAspectRatio="none">
        <path className="ecg-linha" d={d} pathLength="1" />
      </svg>
    </div>
  );
}

export default function ECGBiomedica() {
  return (
    <>
      <Linha lado="esq" />
      <Linha lado="dir" />
    </>
  );
}
import { useEffect, useState, type ReactNode } from "react";
import tapsiDevice from "./assets/tapsi-device.png";

type Risk = "pairing" | "safe" | "caution" | "critical" | "reward" | "idle";
type Mode = "Principiante" | "Intermedio" | "Experto";

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, ReactNode> = {
    shield: <path d="M12 3 5 6v5c0 4.7 2.9 8.1 7 10 4.1-1.9 7-5.3 7-10V6l-7-3Z" />,
    check: <path d="m7 12 3 3 7-7" />,
    bluetooth: <path d="m12 3 5 5-5 4 5 4-5 5V3Zm0 9L7 8m5 4-5 4" />,
    phone: <path d="M7.2 3h3l1.5 4-2 1.6a14 14 0 0 0 5.7 5.7l1.6-2 4 1.5v3c0 1.7-1.3 3.2-3.1 3.2A15.9 15.9 0 0 1 4 6.1C4 4.3 5.5 3 7.2 3Z" />,
    hangup: <path d="M5 15.5c4.7-3.7 9.3-3.7 14 0m-14 0 2.4 3 3.2-3.6m8.4.6-2.4 3-3.2-3.6" />,
    alert: <><path d="M12 3 2.8 20h18.4L12 3Z" /><path d="M12 9v5m0 3h.01" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    arrow: <path d="m9 18 6-6-6-6" />,
    file: <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v5h5M9 13h6m-6 4h6" /></>,
    x: <path d="m7 7 10 10M17 7 7 17" />,
    dice: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01" /></>,
  };
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24">{paths[name]}</svg>;
};

const Button = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`button ${className}`} {...props}>{children}</button>
);

const Tag = ({ children, tone = "" }: { children: ReactNode; tone?: string }) => (
  <span className={`tag ${tone}`}>{children}</span>
);

const Hardware = ({
  risk,
  deep,
  setDeep,
  haptic,
}: {
  risk: Risk;
  deep: boolean;
  setDeep: (value: boolean) => void;
  haptic: string;
}) => (
  <aside className="hardware" aria-label="Simulador del dispositivo TaPSI">
    <div className="hardware-top">
      <div className="hardware-name">
        <span className={`led ${risk}`} aria-label={`LED de estado ${risk === "safe" ? "seguro" : risk === "caution" ? "precaución" : risk === "critical" ? "crítico" : risk === "pairing" ? "emparejando" : risk === "reward" ? "recompensa" : "inactivo"}`} />
        <span><b>TaPSI</b><small>Simulador del dispositivo</small></span>
      </div>
      <button
        className={`switch ${deep ? "on" : ""}`}
        role="switch"
        aria-checked={deep}
        aria-label="Modo de inspección profunda"
        onClick={() => setDeep(!deep)}
      >
        <span />
      </button>
    </div>
    <div className="hardware-meta">
      <span>Inspección profunda</span>
      <b>{deep ? "ACTIVADA" : "DESACTIVADA"}</b>
    </div>
    {haptic && <div className="haptic" role="status" aria-live="polite"><i />{haptic}</div>}
  </aside>
);

const Header = ({ step, title, subtitle }: { step: number; title: string; subtitle: string }) => (
  <header className="page-header">
    <div className="eyebrow">PASO {step} DE 6</div>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </header>
);

type Expression = "normal" | "caution" | "danger";

const SentinelBot = ({
  chassis,
  visor,
  headgear,
  core,
  colorway,
  expression,
  compact = false,
}: {
  chassis: number;
  visor: number;
  headgear: number;
  core: number;
  colorway: number;
  expression: Expression;
  compact?: boolean;
}) => (
  <svg
    aria-label="Robot centinela cibernético configurado"
    className={`sentinel-bot color-${colorway} expression-${expression} ${compact ? "compact" : ""}`}
    viewBox="0 0 240 240"
    role="img"
  >
    <defs>
      <radialGradient id="bot-backglow"><stop offset="0" stopColor="currentColor" stopOpacity=".26" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
      <pattern id="bot-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" className="grid-line" /></pattern>
    </defs>
    <rect width="240" height="240" rx="25" className="bot-canvas" />
    <rect width="240" height="240" rx="25" fill="url(#bot-grid)" />
    <circle cx="120" cy="116" r="104" fill="url(#bot-backglow)" className="bot-glow" />
    <path d="M18 152A110 110 0 0 1 222 152" className="radar-line" />
    <path d="m120 121 77-55" className="radar-sweep" />

    {headgear === 0 && <g className="bot-metal headgear"><path d="M116 60V31c0-9 12-9 12 0 0 9-15 9-15 0s12-9 12 0" /><circle cx="125" cy="22" r="5" className="bot-accent-fill" /></g>}
    {headgear === 1 && <g className="bot-metal headgear"><path d="M120 64V42" /><path d="M92 31c19-14 44-13 59 3-16 14-42 16-59-3Z" /><circle cx="120" cy="42" r="5" className="bot-accent-fill" /></g>}
    {headgear === 2 && <g className="bot-metal headgear"><path d="m88 70-12-37 22 22m54 15 12-37-22 22" /><path d="m74 30 7-7m85 7-7-7" className="bot-accent" /></g>}

    <g className={`chassis chassis-${chassis}`}>
      {chassis === 0 && <><circle cx="120" cy="116" r="62" className="bot-shell" /><path d="M74 139c14 42 78 43 94 0" className="bot-panel" /></>}
      {chassis === 1 && <><path d="m68 72 26-20h52l26 20 8 80-29 29H89l-29-29 8-80Z" className="bot-shell" /><path d="m65 93-19 20 15 33m114-53 19 20-15 33" className="bot-panel" /></>}
      {chassis === 2 && <><rect x="60" y="55" width="120" height="125" rx="18" className="bot-shell" /><path d="M75 55V42h25v13m40 0V42h25v13M60 149h120" className="bot-panel" /></>}
      {chassis === 3 && <><path d="M47 112c0-40 33-60 73-60s73 20 73 60v30c-22 28-124 28-146 0v-30Z" className="bot-shell" /><ellipse cx="120" cy="144" rx="73" ry="27" className="bot-panel" /></>}
    </g>

    <g className={`visor visor-${visor}`}>
      {visor === 0 && <><rect x="74" y="82" width="92" height="39" rx="19" className="visor-glass" /><path d="M91 102h58" className="bot-accent eye-line" /></>}
      {visor === 1 && <><circle cx="94" cy="101" r="20" className="visor-glass" /><circle cx="146" cy="101" r="20" className="visor-glass" /><circle cx="94" cy="101" r="7" className="bot-accent-fill eye-dot" /><circle cx="146" cy="101" r="7" className="bot-accent-fill eye-dot" /></>}
      {visor === 2 && <><rect x="73" y="80" width="94" height="47" rx="12" className="visor-glass" /><path d="M88 98h8m9 0h8m9 0h8m9 0h8M97 111c14 12 32 12 46 0" className="bot-accent matrix-eye" /></>}
      {visor === 3 && <><path d="M73 85h94v34H73z" className="visor-glass" /><path d="M84 101h7m7 0h7m30 0h7m7 0h7" className="bot-accent slit-eye" /></>}
      <path d="m81 82 16-7m62 7-16-7" className="danger-brow" />
      <path d="M120 88v14m-7-7h14" className="warning-rune" />
    </g>

    <g className={`reactor reactor-${core}`}>
      {core === 0 && <><circle cx="120" cy="148" r="18" className="core-ring" /><path d="m120 136-7 13h8l-3 12 11-16h-8l4-9Z" className="bot-accent-fill" /></>}
      {core === 1 && <><rect x="91" y="137" width="58" height="25" rx="12" className="core-ring" /><path d="m99 150 7-8 7 16 8-18 7 17 7-10 6 3" className="bot-accent core-wave" /></>}
      {core === 2 && <><path d="m120 132 17 13-7 21h-20l-7-21 17-13Z" className="core-ring" /><path d="m120 138 8 9-8 12-8-12 8-9Z" className="bot-accent-fill" /></>}
    </g>
    <path d="M92 187h56" className="base-shadow" />
  </svg>
);

const traitOptions = {
  Chasis: ["Aegis-01 esférico", "Titan-X blindado", "Vector-B retro cuadrado", "Disco Nova-Puck"],
  Visor: ["Línea de escaneo cíclope", "Lentes CRT dobles", "Sonrisa de matriz LED", "Ranuras de matriz de puntos"],
  Accesorio: ["Antena helicoidal", "Plato de comunicaciones omnidireccional", "Sensores de aleta dobles", "Aerodinámico / Ninguno"],
  Color: ["Neón cibernético", "Cerámica limpia", "Terminal vintage", "Espacio profundo"],
  "Voz sintética": ["Táctica y concisa", "Tranquila y pedagógica", "Realista y reconfortante", "Señales silenciosas"],
} as const;

type TraitTab = keyof typeof traitOptions;

const answers = [
  ["Compartir el código SMS", "Colgar y llamar directamente al banco", "Pedir su identificación de empleado"],
  ["Enviar primero una pequeña cantidad", "Verificar mediante otro canal de confianza", "Hacerle preguntas personales"],
  ["Instalar su aplicación de verificación", "Finalizar la llamada y bloquear el número", "Dar una contraseña temporal"],
];

const questions = [
  "Tu banco llama alegando una actividad sospechosa urgente y te pide el código SMS de 6 dígitos para cancelarla. ¿Qué haces?",
  "Un familiar te hace una videollamada para pedir fondos de emergencia, pero su audio suena algo robótico. ¿Cómo respondes?",
  "Una persona desconocida dice que ganaste un sorteo y necesita acceso remoto para verificar tu cuenta. ¿Cuál es tu primera acción?",
];

export default function App() {
  const [screen, setScreen] = useState(0);
  const [risk, setRisk] = useState<Risk>("idle");
  const [deep, setDeep] = useState(false);
  const [haptic, setHaptic] = useState("");
  const [pairing, setPairing] = useState(false);
  const [paired, setPaired] = useState(false);
  const [chassis, setChassis] = useState(0);
  const [visor, setVisor] = useState(0);
  const [headgear, setHeadgear] = useState(0);
  const [core, setCore] = useState(0);
  const [colorway, setColorway] = useState(0);
  const [expression, setExpression] = useState<Expression>("normal");
  const [traitTab, setTraitTab] = useState<TraitTab>("Chasis");
  const [rolling, setRolling] = useState(false);
  const [tone, setTone] = useState("Tranquila y pedagógica");
  const [quiz, setQuiz] = useState<(number | null)[]>([null, null, null]);
  const [mode, setMode] = useState<Mode>("Principiante");
  const [scenario, setScenario] = useState<"safe" | "unknown" | "spoof" | null>(null);
  const [callTime, setCallTime] = useState(0);
  const [attack, setAttack] = useState(false);
  const [reported, setReported] = useState(false);
  const [xp, setXp] = useState(1450);
  const [celebrating, setCelebrating] = useState(false);
  const [drillComplete, setDrillComplete] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [textSize, setTextSize] = useState<"default" | "large" | "larger">("default");
  const [readableFont, setReadableFont] = useState(true);
  const [comfortableLines, setComfortableLines] = useState(false);
  const [enhancedContrast, setEnhancedContrast] = useState(false);

  useEffect(() => {
    if (screen !== 4) return;
    const timer = window.setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => window.clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    const answered = quiz.filter((value) => value !== null).length;
    if (!answered) return;
    const safeAnswers = quiz.filter((value) => value === 1).length;
    setMode(answered === 3 && safeAnswers === 3 ? "Experto" : safeAnswers >= 2 ? "Intermedio" : "Principiante");
  }, [quiz]);

  useEffect(() => {
    if (!paired) return;
    const advance = window.setTimeout(continuePair, 1800);
    return () => window.clearTimeout(advance);
  }, [paired]);

  const pulse = (text: string) => {
    setHaptic(text);
    window.setTimeout(() => setHaptic(""), 3200);
  };

  const pair = () => {
    setPairing(true);
    setRisk("pairing");
    setTimeout(() => {
      setPairing(false);
      setPaired(true);
      setRisk("safe");
      pulse("Háptica: confirmación con doble pulso");
    }, 2000);
  };

  const continuePair = () => {
    setPaired(false);
    setScreen(1);
    setRisk("safe");
  };

  const triggerScenario = (type: "safe" | "unknown" | "spoof") => {
    setScenario(type);
    if (type === "safe") { setRisk("safe"); pulse("Háptica: timbre suave estándar"); }
    if (type === "unknown") { setRisk("caution"); pulse("Háptica: toque seco y definido"); }
    if (type === "spoof") { setRisk("critical"); pulse("Háptica: alarma continua disuasoria"); }
  };

  const startCall = () => {
    setScreen(4);
    setCallTime(0);
    setRisk(scenario === "safe" ? "safe" : "caution");
    setScenario(null);
  };

  const simulateAttack = () => {
    setAttack(true);
    setRisk("critical");
    pulse("Háptica: zumbido continuo disuasorio");
  };

  const hangUp = () => {
    setScreen(5);
    setRisk("safe");
    setAttack(false);
    pulse("Háptica: desconexión segura");
  };

  const selectTrait = (index: number) => {
    if (traitTab === "Chasis") setChassis(index);
    if (traitTab === "Visor") setVisor(index);
    if (traitTab === "Accesorio") setHeadgear(index);
    if (traitTab === "Color") setColorway(index);
    if (traitTab === "Voz sintética") setTone(traitOptions["Voz sintética"][index]);
  };

  const selectedTrait = traitTab === "Chasis" ? chassis : traitTab === "Visor" ? visor : traitTab === "Accesorio" ? headgear : traitTab === "Color" ? colorway : traitOptions["Voz sintética"].indexOf(tone as never);

  const rollBot = () => {
    setRolling(true);
    setChassis(Math.floor(Math.random() * 4));
    setVisor(Math.floor(Math.random() * 4));
    setHeadgear(Math.floor(Math.random() * 4));
    setCore(Math.floor(Math.random() * 3));
    setColorway(Math.floor(Math.random() * 4));
    window.setTimeout(() => setRolling(false), 650);
  };

  const reward = (amount = 0) => {
    setXp((current) => Math.min(2000, current + amount));
    setCelebrating(true);
    setRisk("reward");
    pulse(amount ? `Háptica: cascada de recompensa · +${amount} XP` : "Háptica: celebración de subida de nivel");
    window.setTimeout(() => {
      setCelebrating(false);
      setRisk("safe");
    }, 3600);
  };

  const launchDrill = () => {
    if (drillComplete) return;
    setDrillComplete(true);
    reward(250);
  };

  return (
    <div className={`app text-${textSize} ${readableFont ? "readable-font" : ""} ${comfortableLines ? "comfortable-lines" : ""} ${enhancedContrast ? "enhanced-contrast" : ""} ${attack ? "under-attack" : ""}`}>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Hardware risk={risk} deep={deep} setDeep={(value) => {
        setDeep(value);
        if (screen === 4 && value) pulse("Háptica: micropulso del motor local");
      }} haptic={haptic} />

      <main className="shell" id="main-content">
        <header className="brandbar">
          <span className="wordmark">TaPSI <small>DEFENSA DE LLAMADAS</small></span>
          {screen > 0 && <Tag tone="secure"><Icon name="bluetooth" size={14} /> CONECTADO</Tag>}
          <button className="accessibility-button" aria-label="Abrir preferencias de accesibilidad" aria-haspopup="dialog" onClick={() => setAccessibilityOpen(true)}>
            <span aria-hidden="true">Aa</span>
          </button>
        </header>

        {screen === 0 && (
          <section className="pair-screen">
            <div className="pair-copy">
              <Tag tone="blue"><span className="status-dot" /> PROTECCIÓN TANGIBLE DE LLAMADAS</Tag>
              <h1>Confianza que puedes<br /><em>tocar.</em></h1>
              <p>TaPSI combina la respuesta física con inteligencia de llamadas en tiempo real, para que percibas el riesgo antes de que cause daño.</p>
            </div>
            <div className={`puck-stage ${pairing ? "pairing" : ""}`} role="img" aria-label="Dispositivo físico de seguridad TaPSI con luz de estado Bluetooth">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="puck-shadow" />
              <div className="puck">
                <img src={tapsiDevice} alt="" />
                <div className={`puck-light ${pairing ? "active" : paired ? "success" : ""}`} />
              </div>
              <span className="signal s1" /><span className="signal s2" /><span className="signal s3" />
            </div>
            <div className="pair-action">
              <div className="device-row">
                <span className="device-icon"><Icon name="bluetooth" /></span>
                <span><b>{pairing ? "Estableciendo conexión segura…" : "TaPSI One"}</b><small>{pairing ? "Intercambiando claves cifradas" : "Listo para emparejar · BLE 5.3"}</small></span>
                <i className={pairing ? "spinner" : "battery"} />
              </div>
              <Button className="primary full" onClick={pair} disabled={pairing || paired}>
                {pairing ? "Emparejando de forma segura…" : <><Icon name="bluetooth" /> Iniciar emparejamiento BLE</>}
              </Button>
              <p className="privacy"><Icon name="lock" size={15} /> Los datos de emparejamiento nunca salen de este dispositivo</p>
            </div>
          </section>
        )}

        {screen === 1 && (
          <section className="content-screen sentinel-workshop">
            <Header step={1} title="Monta tu centinela cibernético" subtitle="Tu copiloto de seguridad activo durante llamadas de audio y video." />
            <div className={`sentinel-preview ${rolling ? "rolling" : ""}`}>
              <SentinelBot chassis={chassis} visor={visor} headgear={headgear} core={core} colorway={colorway} expression={expression} />
              <div className="expression-toggle" aria-label="Vista previa de la expresión">
                {(["normal", "caution", "danger"] as Expression[]).map((item) => (
                  <button aria-pressed={expression === item} className={expression === item ? "active" : ""} onClick={() => setExpression(item)} key={item}>
                    <span />{item === "normal" ? "Normal" : item === "caution" ? "Precaución" : "Peligro"}
                  </button>
                ))}
              </div>
            </div>

            <div className="trait-tabs" role="tablist" aria-label="Atributos del centinela">
              {(Object.keys(traitOptions) as TraitTab[]).map((tab) => (
                <button role="tab" aria-selected={traitTab === tab} className={traitTab === tab ? "active" : ""} onClick={() => setTraitTab(tab)} key={tab}>{tab}</button>
              ))}
            </div>
            <div className="trait-grid" role="tabpanel" aria-label={`Opciones de ${traitTab}`}>
              {traitOptions[traitTab].map((option, index) => (
                <button aria-pressed={selectedTrait === index} className={selectedTrait === index ? "selected" : ""} onClick={() => selectTrait(index)} key={option}>
                  {traitTab === "Color" ? <span className={`swatch swatch-${index}`} /> : <span className="trait-number">0{index + 1}</span>}
                  <b>{option}</b>
                  {selectedTrait === index && <i><Icon name="check" size={13} /></i>}
                </button>
              ))}
            </div>

            <div className="reactor-row">
              <span><b>Reactor central</b><small>Arquitectura del diodo de estado</small></span>
              <div>{["Arco", "Onda", "Cristal"].map((item, index) => <button aria-pressed={core === index} className={core === index ? "active" : ""} onClick={() => setCore(index)} key={item}>{item}</button>)}</div>
            </div>

            <Button className="random-button full" onClick={rollBot}><Icon name="dice" /> Generar robot al azar</Button>
            <fieldset className="voice-field">
              <legend>Personalidad de la voz</legend>
              <div className="voice-toggle">
                {["Táctica y concisa", "Tranquila y pedagógica"].map((item) => <button aria-pressed={tone === item} className={tone === item ? "active" : ""} onClick={() => setTone(item)} key={item}>{item}</button>)}
              </div>
            </fieldset>
            <Button className="primary full" onClick={() => setScreen(2)}>Guardar configuración y calibrar sensor <Icon name="arrow" /></Button>
          </section>
        )}

        {screen === 2 && (
          <section className="content-screen">
            <Header step={2} title="Ajusta tu protección." subtitle="Tres situaciones rápidas ayudan a TaPSI a recomendarte el nivel de orientación adecuado." />
            <div className="progress-row"><span><b>{quiz.filter((v) => v !== null).length}</b> de 3 respondidas</span><div><i style={{ width: `${quiz.filter((v) => v !== null).length * 33.3}%` }} /></div></div>
            {questions.map((q, qi) => (
              <article className="quiz-card" role="group" aria-labelledby={`question-${qi}`} key={q}>
                <div className="question-num">0{qi + 1}</div>
                <div className="quiz-body"><h3 id={`question-${qi}`}>{q}</h3>
                  <div className="answer-list">{answers[qi].map((a, ai) => (
                    <button key={a} className={quiz[qi] === ai ? "selected" : ""} onClick={() => setQuiz((old) => old.map((v, i) => i === qi ? ai : v))}>
                      <span>{String.fromCharCode(65 + ai)}</span>{a}{quiz[qi] === ai && <Icon name="check" size={17} />}
                    </button>
                  ))}</div>
                </div>
              </article>
            ))}
            <div className="mode-panel">
              <div className="recommend"><span>Perfil recomendado</span><Tag tone="blue">SEGÚN TUS RESPUESTAS</Tag></div>
              <div className="mode-tabs">
                {(["Principiante", "Intermedio", "Experto"] as Mode[]).map((m) => <button aria-pressed={mode === m} className={mode === m ? "active" : ""} onClick={() => setMode(m)} key={m}>{m}</button>)}
              </div>
              <div className="mode-detail">
                <Icon name={mode === "Experto" ? "file" : mode === "Intermedio" ? "alert" : "shield"} size={24} />
                <div><b>Protección para nivel {mode.toLowerCase()}</b><p>{mode === "Principiante" ? "Máxima orientación de protección, intervención del avatar en directo y bloqueo de acciones destructivas." : mode === "Intermedio" ? "Microconsejos contextuales, tarjetas de sospecha y supervisión completa en segundo plano." : "Supervisión pasiva, telemetría VoIP sin procesar, métricas espectrales y exportación normativa."}</p></div>
              </div>
            </div>
            <Button className="primary full" disabled={quiz.some((v) => v === null)} onClick={() => setScreen(3)}>Aplicar perfil y abrir laboratorio <Icon name="arrow" /></Button>
          </section>
        )}

        {screen === 3 && (
          <section className="content-screen">
            <Header step={3} title="Laboratorio de llamadas." subtitle="Activa una llamada entrante simulada y observa cómo responden juntos el teléfono y TaPSI." />
            <div className="lab-status"><span className="live-dot" /><span><b>Simulador listo</b><small>Elige una situación de llamada entrante</small></span><Tag tone="secure">EN DIRECTO</Tag></div>
            <div className="scenario-list">
              <button onClick={() => triggerScenario("safe")}><span className="scenario-icon safe"><Icon name="check" /></span><span><b>Llamante verificado</b><small>Contacto conocido · Banco autenticado</small></span><Tag tone="secure">RIESGO BAJO</Tag><Icon name="arrow" /></button>
              <button onClick={() => triggerScenario("unknown")}><span className="scenario-icon caution"><b>?</b></span><span><b>Número desconocido</b><small>Identidad del llamante no registrada</small></span><Tag tone="amber">PRECAUCIÓN</Tag><Icon name="arrow" /></button>
              <button onClick={() => triggerScenario("spoof")}><span className="scenario-icon critical"><Icon name="alert" /></span><span><b>ID de llamada suplantado</b><small>Incoherencia de identidad de alto riesgo</small></span><Tag tone="red">CRÍTICO</Tag><Icon name="arrow" /></button>
            </div>
            <div className="lab-note"><Icon name="lock" /><p><b>Esta es una simulación segura.</b><br />No se realizan llamadas reales ni se captura audio.</p></div>
          </section>
        )}

        {screen === 4 && (
          <section className="call-screen">
            <Tag tone={risk === "safe" ? "secure" : "amber"}>{risk === "safe" ? "IDENTIDAD VERIFICADA" : "LLAMADA EN CURSO"}</Tag>
            <div className="caller-avatar">MC</div>
            <h1>Metro Credit Union</h1>
            <p className="number">+1 (415) 555-0142</p>
            <div className="timer">{String(Math.floor(callTime / 60)).padStart(2, "0")}:{String(callTime % 60).padStart(2, "0")}</div>
            <div className={`privacy-panel ${deep ? "deep" : ""}`}>
              <Icon name={deep ? "shield" : "lock"} />
              <div><b>{deep ? "Inspección profunda activa" : "Modo de privacidad activo"}</b><p>{deep ? "La IA local está comprobando patrones de audio. Nada sale de tu dispositivo." : "Solo metadatos telefónicos. Sin procesamiento de voz."}</p></div>
              <Tag tone={deep ? "blue" : ""}>{deep ? "IA LOCAL" : "PRIVADO"}</Tag>
            </div>
            {deep && <Button className="attack-trigger" onClick={simulateAttack}><Icon name="alert" /> Simular ataque de voz sintética</Button>}
            <div className="call-controls">
              <button><span><Icon name="phone" /></span>Silenciar</button>
              <button><span className="keypad">••<br />••</span>Teclado</button>
              <button><span>＋</span>Añadir llamada</button>
            </div>
            <Button className="hangup" onClick={hangUp}><Icon name="hangup" /> Finalizar llamada</Button>
          </section>
        )}

        {screen === 5 && (
          <section className="content-screen report-screen">
            <Header step={5} title="Estás a salvo. Revisemos lo ocurrido." subtitle="TaPSI solo almacenó señales que preservan la privacidad, nunca tu conversación." />
            {mode === "Principiante" && <div className="debrief"><SentinelBot chassis={chassis} visor={visor} headgear={headgear} core={core} colorway={colorway} expression="normal" compact /><div><Tag tone="secure">LLAMADA FINALIZADA DE FORMA SEGURA</Tag><h2>Hiciste lo correcto.</h2><p>Comprobemos que no se compartió información sensible y demos juntos los siguientes pasos.</p></div></div>}
            {mode === "Intermedio" && <div className="debrief compact"><span className="scenario-icon critical"><Icon name="alert" /></span><div><Tag tone="red">VECTOR DE ATAQUE</Tag><h2>Suplantación VoIP + clonación neuronal de voz</h2><p>Los encabezados de identidad y los patrones de síntesis de voz no coincidían con el supuesto llamante.</p></div></div>}
            <div className="evidence">
              <div className="evidence-head"><span><Icon name="file" /><b>Resumen de pruebas</b></span><Tag>NO SE GUARDÓ AUDIO</Tag></div>
              <dl>
                <div><dt>Marca de tiempo</dt><dd>Hoy, 14:32:18</dd></div>
                <div><dt>ID del llamante</dt><dd>+1 ••• ••• 0142</dd></div>
                <div><dt>Picos de latencia</dt><dd>6 eventos · media de +182 ms</dd></div>
                <div><dt>Anomalías de voz</dt><dd>00:18 · 00:27 · 00:41</dd></div>
                <div><dt>Puntuación de riesgo</dt><dd className="danger">94 / 100 · Crítico</dd></div>
                <div><dt>Anomalía de señal</dt><dd>Artefactos de vocodificador neuronal</dd></div>
              </dl>
            </div>
            {mode === "Principiante" && <div className="checklist"><h3>Comprobación rápida de seguridad</h3>{["No compartí ningún código de un solo uso ni contraseña", "No transferí dinero", "Finalicé la llamada"].map((x) => <label key={x}><input type="checkbox" defaultChecked /><span><Icon name="check" size={15} /></span>{x}</label>)}</div>}
            {mode === "Experto" && <pre className="telemetry">{`{
  "evento": "sintesis_de_voz_detectada",
  "confianza": 0.94,
  "origen_voip": "puerta_de_enlace_sip_enmascarada",
  "anomalia_espectral": "periodicidad_del_vocodificador",
  "audio_sin_procesar_conservado": false
}`}</pre>}
            <Button className={`full ${reported ? "success-button" : "primary"}`} onClick={() => setReported(true)}>
              <Icon name={reported ? "check" : "file"} /> {reported ? "Informe preparado correctamente" : mode === "Experto" ? "Enviar informe a las autoridades y al operador" : "Generar informe del incidente"}
            </Button>
            <Button className="command-link full" onClick={() => setScreen(6)}>Abrir el Centro de Mando Centinela <Icon name="arrow" /></Button>
            <Button className="text-button" onClick={() => { setScreen(3); setDeep(false); setReported(false); }}>Volver al laboratorio</Button>
          </section>
        )}

        {screen === 6 && (
          <section className="command-center">
            <div className="command-hero">
              <div className="command-kicker"><span className="live-dot" /> RED CENTINELA EN LÍNEA</div>
              <h1>Centro de Mando Centinela</h1>
              <p>Desarrolla instintos prácticos. Cada ejercicio refuerza tu defensa en el mundo real.</p>
              <div className="level-card">
                <SentinelBot chassis={chassis} visor={visor} headgear={headgear} core={core} colorway={colorway} expression="normal" compact />
                <div className="level-copy">
                  <span>NIVEL {xp >= 2000 ? 4 : 3}</span>
                  <h2>{xp >= 2000 ? "Guardián cibernético" : "Especialista en detección de IA"}</h2>
                  <div className="xp-label"><b>{xp.toLocaleString("es-ES")} / 2.000 XP</b><small>{Math.max(0, 2000 - xp)} XP para el nivel 4</small></div>
                  <div className="xp-bar"><i style={{ width: `${Math.min(100, xp / 20)}%` }} /></div>
                </div>
              </div>
            </div>

            <div className="command-body">
              <div className="milestone-card">
                <div className="milestone-icon"><Icon name="lock" /></div>
                <div><Tag tone="amber">PRÓXIMO DESBLOQUEO</Tag><h3>Rango 4: chasis de titanio</h3><p>Reactor de forma de onda · Se desbloquea en el nivel 4</p></div>
                <span>{Math.round((xp / 2000) * 100)}%</span>
              </div>

              <article className={`drill-card ${drillComplete ? "complete" : ""}`}>
                <div className="drill-top"><span className="drill-symbol"><Icon name={drillComplete ? "check" : "shield"} size={25} /></span><Tag tone={drillComplete ? "secure" : "blue"}>{drillComplete ? "EJERCICIO COMPLETADO" : "MISIÓN SEMANAL"}</Tag></div>
                <h2>{drillComplete ? "Reflejos calibrados." : "¿Puedes detectar al clon?"}</h2>
                <p>{drillComplete ? "Rechazaste al llamante sintético en 11 segundos. No se expusieron credenciales." : "Haz una llamada fraudulenta simulada de 60 segundos y practica cómo identificar una falsa emergencia familiar."}</p>
                <div className="drill-reward"><b>+250 XP</b><span>Defensa contra voces de IA</span></div>
                <Button className={drillComplete ? "success-button full" : "primary full"} onClick={launchDrill} disabled={drillComplete}>
                  <Icon name={drillComplete ? "check" : "phone"} /> {drillComplete ? "Ejercicio semanal completado" : "Iniciar ejercicio cibernético semanal"}
                </Button>
              </article>

              <div className="trophy-heading"><div><span>VITRINA DE TROFEOS</span><h2>Logros de seguridad</h2></div><Tag tone="amber">4 COLECCIONABLES</Tag></div>
              <div className="trophy-grid">
                {[
                  ["shield", "Escudo silencioso", "Rechazo en menos de 15 s", "+100 XP", true],
                  ["alert", "Vista de águila para IA", "Voz clonada detectada", "+250 XP", true],
                  ["file", "Guardián ciudadano", "3 denuncias de fraude enviadas", "+500 XP", false],
                  ["lock", "Racha sin filtraciones", "30 días seguros", "+1.000 XP", false],
                ].map(([icon, title, description, points, unlocked]) => (
                  <article className={unlocked ? "unlocked" : "locked"} key={String(title)}>
                    <div className="trophy-token"><Icon name={String(icon)} size={26} />{!unlocked && <span><Icon name="lock" size={11} /></span>}</div>
                    <h3>{title}</h3><p>{description}</p><b>{points}</b>
                  </article>
                ))}
              </div>

              <div className="reward-demo">
                <span><b>Activador de recompensa del prototipo</b><small>Previsualiza el barrido arcoíris del dispositivo y la celebración en pantalla.</small></span>
                <Button onClick={() => reward(xp < 2000 ? 2000 - xp : 0)}><Icon name="dice" /> Activar subida de nivel</Button>
              </div>
              <Button className="text-button command-return" onClick={() => setScreen(3)}>Volver al laboratorio</Button>
            </div>
          </section>
        )}
      </main>

      {paired && (
        <div className="modal-backdrop">
          <div className="success-modal" role="dialog" aria-modal="true" aria-labelledby="paired-title">
            <div className="success-rings"><span><Icon name="check" size={34} /></span></div>
            <Tag tone="secure">CONEXIÓN SEGURA</Tag>
            <h2 id="paired-title">TaPSI está emparejado.</h2>
            <p>Tu token físico y tu teléfono ahora comparten una conexión privada y cifrada.</p>
            <div className="connection-line"><span><Icon name="phone" /></span><i /><span><Icon name="shield" /></span></div>
            <Button autoFocus className="primary full" onClick={continuePair}>Configurar mi protección <Icon name="arrow" /></Button>
          </div>
        </div>
      )}

      {scenario && (
        <div className={`incoming ${scenario}`} role="dialog" aria-modal="true" aria-labelledby="incoming-title">
          <div className="incoming-top">
            <Tag tone={scenario === "safe" ? "secure" : scenario === "unknown" ? "amber" : "red"}>
              {scenario === "safe" ? "ORGANIZACIÓN VERIFICADA" : scenario === "unknown" ? "ORIGEN DESCONOCIDO" : "LISTA NEGRA · IDENTIDAD SUPLANTADA"}
            </Tag>
            <button autoFocus aria-label="Cerrar la simulación de llamada entrante" className="close" onClick={() => setScenario(null)}><Icon name="x" /></button>
          </div>
          <div className="incoming-avatar">{scenario === "safe" ? "MC" : scenario === "unknown" ? "?" : <Icon name="alert" size={31} />}</div>
          <p>Llamada entrante</p>
          <h2 id="incoming-title">{scenario === "safe" ? "Metro Credit Union" : scenario === "unknown" ? "+1 (646) 555-0198" : "Metro Credit Union"}</h2>
          <p>{scenario === "safe" ? "Empresa verificada · Nueva York, NY" : scenario === "unknown" ? "No hay información disponible del llamante" : "El ID del llamante no coincide con el origen de la red"}</p>
          {scenario !== "safe" && <div className="warning-banner"><Icon name="alert" /><span><b>{scenario === "unknown" ? "Origen desconocido. Nunca compartas códigos de un solo uso ni contraseñas." : "Es probable que este llamante esté suplantando a una organización de confianza."}</b><small>{scenario === "unknown" ? "Verifica quién llama antes de responder." : "TaPSI recomienda encarecidamente rechazar esta llamada."}</small></span></div>}
          {scenario === "spoof" ? (
            <><Button className="decline full" onClick={() => setScenario(null)}><Icon name="hangup" /> Rechazar y bloquear</Button><Button className="slide full" onClick={startCall}><span>›</span> Desliza para responder pese al riesgo</Button></>
          ) : (
            <div className="incoming-actions"><Button className="decline" onClick={() => setScenario(null)}><Icon name="hangup" /> Rechazar</Button><Button className="accept" onClick={startCall}><Icon name="phone" /> Aceptar</Button></div>
          )}
        </div>
      )}

      {attack && (
        <div className="attack-overlay" role="alertdialog" aria-modal="true" aria-labelledby="attack-title">
          <div className="attack-alert"><Icon name="alert" size={18} /> AMENAZA CRÍTICA DETECTADA</div>
          <SentinelBot chassis={chassis} visor={visor} headgear={headgear} core={core} colorway={colorway} expression="danger" compact />
          <h1 id="attack-title">¡Cuelga de inmediato!</h1>
          <p>Se detectó una firma de voz sintética.</p>
          <div className="flag-list">
            <div><Icon name="alert" /><span><b>Clon de voz por IA detectado</b><small>94 % de confianza</small></span></div>
            <div><Icon name="alert" /><span><b>Urgencia y coacción artificiales</b><small>Confianza alta</small></span></div>
          </div>
          <div className="locked-actions"><span><Icon name="lock" /> Teclado bloqueado</span><span><Icon name="lock" /> Portapapeles desactivado</span></div>
          <Button autoFocus className="emergency full" onClick={hangUp}><Icon name="hangup" /> Colgar ahora</Button>
          <small className="local-note"><Icon name="lock" size={14} /> El análisis se realizó localmente. No se guardó audio.</small>
        </div>
      )}

      {celebrating && (
        <div className="celebration" aria-live="polite">
          <div className="level-toast"><span><Icon name="shield" size={28} /></span><div><small>{xp >= 2000 ? "NIVEL 4 DESBLOQUEADO" : "EJERCICIO COMPLETADO"}</small><b>{xp >= 2000 ? "Guardián cibernético" : "+250 XP de ciberescudo"}</b></div></div>
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => <i key={index} />)}
          </div>
        </div>
      )}

      {accessibilityOpen && (
        <div className="preferences-backdrop" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setAccessibilityOpen(false);
        }}>
          <section className="preferences-panel" role="dialog" aria-modal="true" aria-labelledby="accessibility-title">
            <div className="preferences-head">
              <div><Tag tone="blue">ACCESIBILIDAD</Tag><h2 id="accessibility-title">Preferencias de lectura</h2></div>
              <button autoFocus className="close" aria-label="Cerrar preferencias de accesibilidad" onClick={() => setAccessibilityOpen(false)}><Icon name="x" /></button>
            </div>
            <p className="preferences-intro">Ajusta la presentación sin cambiar el contenido ni las funciones de seguridad.</p>

            <fieldset className="preference-group">
              <legend>Tamaño del texto</legend>
              <p id="text-size-help">El contenido se adapta a tamaños mayores y permanece disponible sin desplazamiento horizontal.</p>
              <div className="preference-segments" aria-describedby="text-size-help">
                {([["default", "100%"], ["large", "125%"], ["larger", "150%"]] as const).map(([value, label]) => (
                  <button aria-pressed={textSize === value} className={textSize === value ? "active" : ""} onClick={() => setTextSize(value)} key={value}>{label}</button>
                ))}
              </div>
            </fieldset>

            <fieldset className="preference-group">
              <legend>Ayuda para la lectura</legend>
              <button className="preference-toggle" role="switch" aria-checked={readableFont} onClick={() => setReadableFont(!readableFont)}>
                <span><b>Fuente legible</b><small>Usa Atkinson Hyperlegible para distinguir mejor los caracteres</small></span><i />
              </button>
              <button className="preference-toggle" role="switch" aria-checked={comfortableLines} onClick={() => setComfortableLines(!comfortableLines)}>
                <span><b>Interlineado cómodo</b><small>Aumenta el interlineado de los párrafos a 1,75</small></span><i />
              </button>
              <button className="preference-toggle" role="switch" aria-checked={enhancedContrast} onClick={() => setEnhancedContrast(!enhancedContrast)}>
                <span><b>Contraste mejorado</b><small>Refuerza el texto, los bordes y los estados de los componentes</small></span><i />
              </button>
            </fieldset>

            <div className="accessibility-note">
              <Icon name="check" />
              <p><b>El color nunca es la única señal.</b> Cada estado de seguridad también utiliza texto, una forma o un icono. Este prototipo no contiene audio ni video de reproducción automática.</p>
            </div>
            <Button className="primary full" onClick={() => setAccessibilityOpen(false)}>Aplicar preferencias</Button>
          </section>
        </div>
      )}
    </div>
  );
}

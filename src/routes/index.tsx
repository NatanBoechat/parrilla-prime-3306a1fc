import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";
import skullAsset from "@/assets/skull.jpg.asset.json";
import porchettaAsset from "@/assets/porchetta.jpg.asset.json";
import grillAsset from "@/assets/grill.jpg.asset.json";
import chefAsset from "@/assets/chef.jpg.asset.json";
import coupleAsset from "@/assets/couple.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const EVENT_DATE = new Date("2026-09-05T12:00:00-03:00").getTime();

function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: progress >= 1 ? 0 : 1, pointerEvents: progress >= 1 ? "none" : "auto" }}
    >
      <div className="relative w-48 md:w-64 animate-flicker">
        <img src={logoAsset.url} alt="Parrilla Day" className="w-full h-auto" style={{ filter: "brightness(0) saturate(100%) invert(38%) sepia(85%) saturate(2000%) hue-rotate(345deg) brightness(85%) contrast(95%)" }} />
      </div>
      <div className="mt-12 w-48 h-px bg-border overflow-hidden">
        <div className="h-full bg-ember" style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }} />
      </div>
      <p className="mt-4 text-xs tracking-[0.3em] text-muted-foreground uppercase">
        Acendendo a brasa · {Math.round(progress * 100)}%
      </p>
    </div>
  );
}

function HeroHeadline({ play }: { play: boolean }) {
  // Group into impactful lines for the layout
  const lines = [
    { text: "O MAIOR", accent: false },
    { text: "FESTIVAL DE", accent: false },
    { text: "CHURRASCO", accent: true },
    { text: "DO LITORAL NORTE", accent: false },
  ];

  let charIndex = 0;
  return (
    <h1
      className="text-display leading-[0.82] text-bone select-none"
      style={{ perspective: "1000px" }}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          className={`block overflow-hidden ${
            line.accent
              ? "text-[17vw] md:text-[13vw] text-ember"
              : "text-[12vw] md:text-[9vw]"
          }`}
          style={{ lineHeight: 0.82 }}
        >
          <span
            className={`inline-block ${line.accent ? "animate-glow-pulse" : ""}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {line.text.split("").map((ch, i) => {
              const delay = 0.15 + charIndex * 0.022 + li * 0.08;
              charIndex++;
              return (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animation: play
                      ? `char-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`
                      : "none",
                    opacity: play ? undefined : 0,
                    whiteSpace: ch === " " ? "pre" : "normal",
                    transformOrigin: "50% 100%",
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </span>
        </div>
      ))}
    </h1>
  );
}

function RevealWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const words = text.split(" ");
  return (
    <div ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <span
            className="inline-block"
            style={{
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s, opacity 0.6s ease ${i * 0.08}s`,
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </div>
  );
}

function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, EVENT_DATE - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const items = [
    { label: "Dias", v: t.d },
    { label: "Horas", v: t.h },
    { label: "Minutos", v: t.m },
    { label: "Segundos", v: t.s },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-6">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="text-display text-5xl md:text-8xl text-ember ember-glow tabular-nums">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function PhotoStrip() {
  const photos = [skullAsset, porchettaAsset, grillAsset, chefAsset, coupleAsset];
  const captions = ["Tradição", "Fogo lento", "Estações", "Mestres", "Encontros"];
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative" style={{ height: `${photos.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {photos.map((p, i) => {
          const start = i / photos.length;
          const end = (i + 1) / photos.length;
          let opacity = 0;
          let scale = 1.15;
          let y = 60;
          if (progress >= start && progress < end) {
            const local = (progress - start) / (end - start);
            opacity = local < 0.15 ? local / 0.15 : local > 0.85 ? (1 - local) / 0.15 : 1;
            scale = 1.15 - local * 0.15;
            y = 60 - local * 60;
          } else if (i === 0 && progress < start) {
            opacity = Math.max(0, 1 + progress * 5);
          }
          return (
            <div
              key={i}
              className="absolute inset-0 transition-none"
              style={{ opacity, transform: `translateY(${y}px) scale(${scale})` }}
            >
              <img src={p.url} alt={captions[i]} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <div className="text-serif-italic text-ember text-lg md:text-2xl mb-4">
                  — 0{i + 1} / 0{photos.length}
                </div>
                <h2 className="text-display text-6xl md:text-9xl text-bone ember-glow">
                  {captions[i]}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-16 md:h-20 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.25em] uppercase text-muted-foreground">
            <a href="#evento" className="hover:text-ember transition">O Evento</a>
            <a href="#atracoes" className="hover:text-ember transition">Atrações</a>
            <a href="#programacao" className="hover:text-ember transition">Programação</a>
            <a href="#ingressos" className="hover:text-ember transition">Ingressos</a>
          </nav>
          <a href="#ingressos" className="text-xs tracking-[0.2em] uppercase px-4 py-2 border border-ember text-ember hover:bg-ember hover:text-background transition">
            Garantir
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen h-screen flex items-center pt-28 pb-16 px-6 overflow-hidden grain">
        <div className="absolute inset-0 -z-10">
          <img src={grillAsset.url} alt="" className="w-full h-full object-cover opacity-30 animate-heat-haze" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,oklch(0.13_0.015_30/0.85)_80%)]" />
        </div>

        {/* Rising embers */}
        <div className="absolute inset-0 -z-[5] pointer-events-none overflow-hidden">
          {Array.from({ length: 22 }).map((_, i) => {
            const left = (i * 53) % 100;
            const delay = (i * 0.37) % 8;
            const dur = 6 + ((i * 7) % 8);
            const size = 2 + (i % 4);
            const drift = ((i % 5) - 2) * 30;
            return (
              <span
                key={i}
                className="absolute bottom-0 rounded-full bg-ember"
                style={{
                  left: `${left}%`,
                  width: size,
                  height: size,
                  boxShadow: "0 0 12px 2px oklch(0.7 0.22 45 / 80%)",
                  animation: `ember-rise ${dur}s linear ${delay}s infinite`,
                  ["--drift" as never]: `${drift}px`,
                }}
              />
            );
          })}
        </div>

        <div className="max-w-[1600px] mx-auto w-full relative">
          <div
            className="flex items-center gap-4 mb-10 text-[11px] tracking-[0.5em] uppercase text-ember"
            style={{ animation: loaded ? "char-rise 0.8s ease-out 0s both" : "none", opacity: loaded ? undefined : 0 }}
          >
            <span
              className="h-px bg-ember origin-left block"
              style={{
                width: "5rem",
                animation: loaded ? "slash-in 0.9s cubic-bezier(0.7,0,0.2,1) 0.1s both" : "none",
              }}
            />
            <span>3ª Edição · Caraguatatuba · 05 · 06 · 07 Setembro 2026</span>
          </div>

          <HeroHeadline play={loaded} />

          <div className="mt-6 md:mt-10 grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-12 items-end">
            <p
              className="text-serif-italic text-base md:text-2xl text-bone/80 max-w-2xl leading-snug"
              style={{
                animation: loaded ? "char-rise 1s ease-out 1.6s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              Três dias de fogo, sertanejo e alta gastronomia <span className="text-ember">à beira-mar</span> — o feriado da Independência transformado em festa.
            </p>
            <div
              className="flex flex-wrap gap-4"
              style={{
                animation: loaded ? "char-rise 1s ease-out 1.8s both" : "none",
                opacity: loaded ? undefined : 0,
              }}
            >
              <a href="#ingressos" className="group relative px-10 py-5 bg-ember text-background text-xs tracking-[0.3em] uppercase font-bold hover:bg-ember/90 transition overflow-hidden">
                <span className="relative z-10">Comprar Ingresso →</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-bone/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a href="#evento" className="px-10 py-5 border border-ember/40 text-xs tracking-[0.3em] uppercase hover:border-ember hover:text-ember transition">
                Saber Mais
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground animate-pulse">
          ↓ Role para descobrir
        </div>
      </section>



      {/* COUNTDOWN */}
      <section className="py-24 px-6 border-y border-border/40 bg-card/30">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">5 de Setembro de 2026</div>
          <h2 className="text-display text-4xl md:text-6xl mb-12 text-bone">A contagem para a brasa</h2>
          <Countdown />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-8 border-b border-border/40 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-display text-4xl md:text-6xl text-ember/70">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {["Open Churrasco", "✦", "Open Bar", "✦", "30 Estações", "✦", "Sertanejo ao Vivo", "✦", "Roda Gigante de Carne", "✦", "Beira-Mar", "✦"].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PHOTO STRIP */}
      <PhotoStrip />

      {/* O EVENTO */}
      <section id="evento" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">O Evento</div>
            <h2 className="text-display text-5xl md:text-7xl text-bone leading-none">
              Três dias.<br />Uma fogueira.<br /><span className="text-ember">26 mil pessoas.</span>
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-serif-italic text-2xl md:text-3xl text-bone/90 leading-snug">
              O Parrilla Day chega à sua 3ª edição com crescimento de <span className="text-ember">2000%</span> sobre as edições anteriores. Uma celebração do fogo, da carne e da brasa, à beira do mar de Caraguatatuba.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-border/40">
              {[
                { n: "6.000", l: "Ingressos · Dia 1" },
                { n: "20.000", l: "Acesso livre · Dias 2 e 3" },
                { n: "30", l: "Estações de carne" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-display text-5xl text-ember">{s.n}</div>
                  <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMAÇÃO */}
      <section id="programacao" className="py-32 px-6 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Programação</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-16">Três dias na brasa</h2>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { day: "05", month: "Setembro", time: "12h — 19h", title: "Parrilla Day", desc: "Open bar · Open churrasco · Drinks à parte. O dia principal com shows headliners.", featured: true },
              { day: "06", month: "Setembro", time: "16h — 00h", title: "Estações Abertas", desc: "Entrada gratuita. Comidas e bebidas à parte. Atrações, roda gigante e touro mecânico." },
              { day: "07", month: "Setembro", time: "12h — 22h", title: "Encerramento", desc: "Acesso liberado ao público. Churrasco e bebidas à parte. Show de fogos no encerramento." },
            ].map((d) => (
              <div key={d.day} className={`p-10 bg-background ${d.featured ? "md:scale-[1.02] md:-my-2 bg-card relative" : ""}`}>
                {d.featured && <div className="absolute top-4 right-4 text-[10px] tracking-[0.3em] uppercase text-ember">★ Headline</div>}
                <div className="flex items-baseline gap-3 mb-6">
                  <div className="text-display text-8xl text-ember leading-none">{d.day}</div>
                  <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{d.month}</div>
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-ember mb-2">{d.time}</div>
                <h3 className="text-display text-3xl text-bone mb-4">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEADLINERS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Headliners · Dia 05</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-16">Os shows</h2>
          <div className="space-y-2">
            {["Guilherme & Vinícius", "Naessa", "Peddro Henrique & Luciano"].map((n, i) => (
              <div key={n} className="group border-b border-border/40 py-8 flex items-baseline justify-between hover:bg-card/40 transition px-4 cursor-default">
                <div className="flex items-baseline gap-8">
                  <span className="text-display text-2xl text-ember">0{i + 1}</span>
                  <h3 className="text-display text-4xl md:text-7xl text-bone group-hover:text-ember transition">{n}</h3>
                </div>
                <span className="text-serif-italic text-muted-foreground hidden md:block">sertanejo</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATRAÇÕES */}
      <section id="atracoes" className="py-32 px-6 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Atrações</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-16 max-w-3xl">
            Muito além do <span className="text-ember">fogo</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Balonismo", d: "Subida de balão de ar quente sobre o litoral.", tag: "Dia 05" },
              { t: "Robô Gigante", d: "Performance interativa para todos os públicos.", tag: "Dia 05" },
              { t: "Roda Gigante", d: "Vista panorâmica da praia e do festival.", tag: "Dias 05 / 06" },
              { t: "Touro Mecânico", d: "O clássico desafio sertanejo.", tag: "Dias 05 / 06" },
              { t: "Salão de Beleza", d: "Retoques de cabelo e maquiagem no local.", tag: "Dia 05" },
              { t: "Apresentações de Dança", d: "Coreografias e shows pelo evento.", tag: "Dia 05" },
              { t: "Brinquedos Kids", d: "Espaço gratuito para as crianças.", tag: "Dia 05" },
              { t: "Food Trucks", d: "Espeticho, Caramelo Comida de Rua, Doces.", tag: "Dias 06 / 07" },
              { t: "Show de Fogos", d: "Encerramento à beira-mar.", tag: "Dia 05" },
            ].map((a) => (
              <div key={a.t} className="group p-8 border border-border/40 bg-background hover:border-ember transition relative overflow-hidden">
                <div className="text-[10px] tracking-[0.3em] uppercase text-ember mb-6">{a.tag}</div>
                <h3 className="text-display text-3xl text-bone mb-3 group-hover:text-ember transition">{a.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.d}</p>
                <div className="absolute -bottom-12 -right-12 text-display text-[10rem] text-ember/5 group-hover:text-ember/15 transition">✦</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INGRESSOS */}
      <section id="ingressos" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img src={skullAsset.url} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Ingressos</div>
          <h2 className="text-display text-5xl md:text-7xl text-bone mb-4">Sua entrada na brasa</h2>
          <p className="text-serif-italic text-xl text-muted-foreground mb-16 max-w-2xl">
            05 de setembro · Open bar · Open churrasco · Drinks vendidos à parte
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-10 md:p-14 border border-border/60 bg-card/60 backdrop-blur">
              <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Ingresso · Dia 05</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-display text-7xl md:text-8xl text-bone">R$349</span>
                <span className="text-muted-foreground">+ R$34,90 taxa</span>
              </div>
              <ul className="space-y-3 mt-10 mb-12 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="text-ember">▸</span> Acesso completo ao Parrilla Day</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Bar (cervejas e refrigerantes)</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Churrasco — 30 estações</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Acesso a todos os shows e atrações</li>
              </ul>
              <button className="w-full py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition">
                Comprar Ingresso
              </button>
            </div>
            <div className="p-10 md:p-14 border border-ember bg-gradient-to-br from-blood/40 to-card/60 backdrop-blur relative">
              <div className="absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase text-ember">★ Premium</div>
              <div className="text-xs tracking-[0.3em] uppercase text-ember mb-4">Camarote · Dia 05</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-display text-7xl md:text-8xl text-bone ember-glow">R$6.290</span>
                <span className="text-muted-foreground">+ taxa</span>
              </div>
              <ul className="space-y-3 mt-10 mb-12 text-sm text-bone/80">
                <li className="flex gap-3"><span className="text-ember">▸</span> Tenda exclusiva com vista privilegiada</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Open Food · Open Bar Premium</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Estações de chopp · Garçons exclusivos</li>
                <li className="flex gap-3"><span className="text-ember">▸</span> Banheiros e móveis diferenciados</li>
              </ul>
              <button className="w-full py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition">
                Reservar Camarote
              </button>
            </div>
          </div>
          <div className="mt-12 p-8 border border-border/40 text-center">
            <div className="text-xs tracking-[0.3em] uppercase text-ember mb-2">Dias 06 e 07</div>
            <p className="text-bone text-lg">Entrada gratuita · Comidas e bebidas vendidas à parte</p>
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section className="py-32 px-6 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="text-xs tracking-[0.4em] uppercase text-ember mb-4">Estrutura</div>
            <h2 className="text-display text-5xl md:text-7xl text-bone leading-none mb-6">
              Construída para <span className="text-ember">incendiar</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Cada detalhe pensado para uma experiência inesquecível — do palco ao corredor de entrada, da roda gigante de carne aos lounges de patrocinadores.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-px bg-border">
            {[
              "Palco principal", "Box Truss", "Roda gigante de carne", "Máquina de costela",
              "30 estações · 30 assadores", "Tendas e camarotes", "Som · Iluminação", "Decoração temática sertaneja",
            ].map((s) => (
              <div key={s} className="p-6 bg-background text-sm tracking-wide text-bone/80">{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / CTA */}
      <footer className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <img src={logoAsset.url} alt="Parrilla Day" className="h-32 mx-auto mb-8 animate-flicker" style={{ filter: "brightness(0) saturate(100%) invert(38%) sepia(85%) saturate(2000%) hue-rotate(345deg) brightness(85%) contrast(95%)" }} />
          <h2 className="text-display text-4xl md:text-6xl text-bone mb-4">Caraguatatuba te espera</h2>
          <p className="text-serif-italic text-xl text-muted-foreground mb-12">5, 6 e 7 de setembro · 2026</p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="#ingressos" className="px-8 py-4 bg-ember text-background text-sm tracking-[0.2em] uppercase font-semibold hover:bg-ember/90 transition">
              Garantir Presença
            </a>
            <a href="https://instagram.com/parrilladaycaragua" target="_blank" rel="noreferrer" className="px-8 py-4 border border-border text-sm tracking-[0.2em] uppercase hover:border-ember transition">
              @parrilladaycaragua
            </a>
          </div>
          <div className="pt-8 border-t border-border/40 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            © 2026 Parrilla Day · O Quintal · Caraguatatuba/SP
          </div>
        </div>
      </footer>
    </div>
  );
}

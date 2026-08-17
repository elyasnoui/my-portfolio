'use client';

import { useEffect, useRef, useState } from 'react';

type Token = { value: string; type: string; space: boolean };

/**
 * The hero code block's source. Kept at module scope so it is a stable
 * reference — the typing effect depends on it and must not restart on render.
 */
const codeSample: Token[][] = [
  [ { value: 'using', type: 'keyword', space: true }, { value: 'System', type: 'framework', space: false }, { value: ';', type: 'punctuation', space: false } ],
  [ { value: 'using', type: 'keyword', space: true }, { value: 'System', type: 'framework', space: false }, { value: '.', type: 'punctuation', space: false }, { value: 'Collections', type: 'framework', space: false }, { value: '.', type: 'punctuation', space: false }, { value: 'Generic', type: 'framework', space: false }, { value: ';', type: 'punctuation', space: false } ],
  [],
  [ { value: 'public class', type: 'keyword', space: true }, { value: 'ElyasNoui', type: 'framework', space: true }, { value: ':', type: 'punctuation', space: true }, { value: 'SoftwareEngineer', type: 'framework', space: false } ],
  [ { value: '{', type: 'punctuation', space: false } ],
  [ { value: '  ', type: 'indent', space: false }, { value: 'public string', type: 'keyword', space: true }, { value: 'Name', type: 'property', space: true }, { value: '{', type: 'punctuation', space: true }, { value: 'get', type: 'keyword', space: false }, { value: ';', type: 'punctuation', space: true }, { value: '}', type: 'punctuation', space: true }, { value: '=', type: 'punctuation', space: true }, { value: '"Elyas Noui"', type: 'string', space: false }, { value: ';', type: 'punctuation', space: false } ],
  [ { value: '  ', type: 'indent', space: false }, { value: 'public string', type: 'keyword', space: true }, { value: 'Role', type: 'property', space: true }, { value: '{', type: 'punctuation', space: true }, { value: 'get', type: 'keyword', space: false }, { value: ';', type: 'punctuation', space: true }, { value: '}', type: 'punctuation', space: true }, { value: '=', type: 'punctuation', space: true }, { value: '"Software Engineer"', type: 'string', space: false }, { value: ';', type: 'punctuation', space: false } ],
  [ { value: '  ', type: 'indent', space: false }, { value: 'public string', type: 'keyword', space: true }, { value: 'Company', type: 'property', space: true }, { value: '=', type: 'punctuation', space: true }, { value: '"Lloyds Banking Group"', type: 'string', space: false }, { value: ';', type: 'punctuation', space: false } ],
  [ { value: '  ', type: 'indent', space: false }, { value: 'public int', type: 'keyword', space: true }, { value: 'YearsExperience', type: 'property', space: true }, { value: '=>', type: 'punctuation', space: true }, { value: 'DateTime', type: 'framework', space: false }, { value: '.', type: 'punctuation', space: false }, { value: 'UtcNow', type: 'property', space: false }, { value: '.', type: 'punctuation', space: false }, { value: 'Year', type: 'property', space: true }, { value: '-', type: 'punctuation', space: true }, { value: '2022', type: 'number', space: false }, { value: ';', type: 'punctuation', space: false } ],
  [],
  [ { value: '  ', type: 'indent', space: false }, { value: 'public', type: 'keyword', space: true }, { value: 'Dictionary', type: 'framework', space: false }, { value: '<string, string[]>', type: 'generic', space: true }, { value: 'Skills', type: 'property', space: true }, { value: '=', type: 'punctuation', space: true }, { value: 'new', type: 'keyword', space: false }, { value: '()', type: 'punctuation', space: false } ],
  [ { value: '  ', type: 'indent', space: false }, { value: '{', type: 'punctuation', space: false } ],
  [ { value: '    ', type: 'indent', space: false }, { value: '[', type: 'punctuation', space: false }, { value: '"Backend"', type: 'string', space: false }, { value: ']', type: 'punctuation', space: true }, { value: '=', type: 'punctuation', space: true }, { value: '[', type: 'punctuation', space: false }, { value: '".NET"', type: 'string', space: false }, { value: ',', type: 'punctuation', space: true }, { value: '"C#"', type: 'string', space: false }, { value: ',', type: 'punctuation', space: true }, { value: '"ASP.NET Core"', type: 'string', space: false }, { value: ']', type: 'punctuation', space: false }, { value: ',', type: 'punctuation', space: false } ],
  [ { value: '    ', type: 'indent', space: false }, { value: '[', type: 'punctuation', space: false }, { value: '"Frontend"', type: 'string', space: false }, { value: ']', type: 'punctuation', space: true }, { value: '=', type: 'punctuation', space: true }, { value: '[', type: 'punctuation', space: false }, { value: '"Blazor"', type: 'string', space: false }, { value: ',', type: 'punctuation', space: true }, { value: '"React"', type: 'string', space: false }, { value: ',', type: 'punctuation', space: true }, { value: '"TypeScript"', type: 'string', space: false }, { value: ']', type: 'punctuation', space: false }, { value: ',', type: 'punctuation', space: false } ],
  [ { value: '    ', type: 'indent', space: false }, { value: '[', type: 'punctuation', space: false }, { value: '"Database"', type: 'string', space: false }, { value: ']', type: 'punctuation', space: true }, { value: '=', type: 'punctuation', space: true }, { value: '[', type: 'punctuation', space: false }, { value: '"SQL Server"', type: 'string', space: false }, { value: ',', type: 'punctuation', space: true }, { value: '"Entity Framework"', type: 'string', space: false }, { value: ']', type: 'punctuation', space: false } ],
  [ { value: '  ', type: 'indent', space: false }, { value: '}', type: 'punctuation', space: false } ],
  [ { value: '}', type: 'punctuation', space: true }, { value: '// Ready to innovate with .NET!', type: 'comment', space: false } ],
];

const TYPE_TOKEN_MS = 50;
const NEXT_LINE_MS = 100;

const tokenClass = (type: string) => {
  switch (type) {
    case 'keyword': return 'text-[#c792ea]';
    case 'framework': return 'text-[#7fd7e8]';
    case 'property': return 'text-[#ffb08a]';
    case 'string': return 'text-[#e8d48b]';
    case 'number': return 'text-[#e8d48b]';
    case 'comment': return 'text-white/50 italic';
    case 'generic': return 'text-[#7fd7e8]';
    case 'punctuation': return 'text-white/80';
    case 'indent': return '';
    default: return 'text-white/80';
  }
};

/**
 * The technical centrepiece of the hero: a live C# "profile class" that types
 * itself out. Same source, tokens and behaviour at every breakpoint — the code
 * area scrolls horizontally inside the panel rather than pushing the page wide.
 */
const CodeWindow = () => {
  const [line, setLine] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finished = line >= codeSample.length;

  // Typing animation: a single self-scheduling timer rather than a
  // render-triggered chain, so it never restarts mid-flight.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setLine(codeSample.length);
      return;
    }

    let currentLine = 0;
    let currentToken = 0;

    const step = () => {
      if (currentLine >= codeSample.length) {
        setLine(codeSample.length);
        return;
      }

      const tokens = codeSample[currentLine];
      if (currentToken < tokens.length) {
        currentToken += 1;
        setTokenCount(currentToken);
        timerRef.current = setTimeout(step, TYPE_TOKEN_MS);
      } else {
        currentLine += 1;
        currentToken = 0;
        setLine(currentLine);
        setTokenCount(0);
        timerRef.current = setTimeout(step, NEXT_LINE_MS);
      }
    };

    timerRef.current = setTimeout(step, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Cursor blink
  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, [finished]);

  const visibleLines = codeSample.slice(0, Math.min(line + 1, codeSample.length));

  return (
    <div className="relative w-full">
      {/* Offset panes — the sense of a stacked editor, reduced to hairlines. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-3 left-4 right-[-1rem] bottom-3 hidden rounded-none border border-white/8 bg-ink-soft lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1.5 left-2 right-[-0.5rem] bottom-1.5 hidden rounded-none border border-white/10 bg-ink-raised lg:block"
      />

      <figure className="group relative m-0 flex h-[26rem] w-full flex-col overflow-hidden border border-white/12 bg-[#0d0d10] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-accent/35 sm:h-[28rem] md:h-[30rem] lg:h-[31rem] xl:h-[33rem]">
        {/* Title bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-2" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-500 group-hover:opacity-70" />
          </div>
          <span className="eyebrow text-[0.625rem] tracking-[0.16em] text-white/55">
            ElyasNoui.cs
          </span>
          <span className="eyebrow text-[0.625rem] tracking-[0.16em] text-white/45">C#</span>
        </div>

        {/* Code surface */}
        <div className="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-4 py-4 sm:px-5 md:px-6">
          <pre className="m-0 flex font-mono text-[10.5px] leading-relaxed sm:text-[11.5px] md:text-xs xl:text-[13px]">
            <span aria-hidden className="mr-4 shrink-0 select-none text-right tabular-nums text-white/20 md:mr-6">
              {visibleLines.map((_, idx) => (
                <span key={idx} className="block leading-relaxed">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              ))}
            </span>

            <code className="block flex-1">
              {visibleLines.map((tokens, lineIdx) => {
                const isActive = lineIdx === line && !finished;
                const shown = isActive ? tokenCount : tokens.length;

                return (
                  <span
                    key={lineIdx}
                    className={`block whitespace-pre leading-relaxed ${
                      isActive ? 'bg-accent/[0.06]' : ''
                    }`}
                  >
                    {tokens.slice(0, shown).map((token, i) => (
                      <span key={i}>
                        <span className={tokenClass(token.type)}>{token.value}</span>
                        {token.space && ' '}
                      </span>
                    ))}
                    {isActive && cursorOn && (
                      <span className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-accent" />
                    )}
                  </span>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Status bar */}
        <figcaption className="flex shrink-0 items-center justify-between border-t border-white/10 px-4 py-2 text-white/55">
          <span className="eyebrow text-[0.625rem] tracking-[0.16em]">
            .NET · C#
          </span>
          <span className="eyebrow hidden text-[0.625rem] tracking-[0.16em] sm:inline">
            Ln {String(Math.min(line + 1, codeSample.length)).padStart(2, '0')}
          </span>
          <span className="eyebrow flex items-center gap-2 text-[0.625rem] tracking-[0.16em] text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {finished ? 'Ready' : 'Live'}
          </span>
        </figcaption>
      </figure>
    </div>
  );
};

export default CodeWindow;

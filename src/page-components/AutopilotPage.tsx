'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Activity,
  FileText,
  Zap,
  MousePointer2,
  Brain,
  Layers,
  Folder,
  FileCode,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  Loader2,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LogEntry {
  id: number;
  time: string;
  action: string;
  status: 'success' | 'active' | 'pending';
  app?: string;
}

interface DesktopApp {
  id: string;
  title: string;
  color: string;
  borderColor: string;
  activeBorder: string;
  glowColor: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const APPS: DesktopApp[] = [
  {
    id: 'amy',
    title: 'Amy Broker',
    color: '#1e40af',
    borderColor: '#3b82f6',
    activeBorder: '#60a5fa',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    id: 'optima',
    title: 'Optima',
    color: '#7e22ce',
    borderColor: '#a855f7',
    activeBorder: '#c084fc',
    glowColor: 'rgba(168, 85, 247, 0.3)',
  },
  {
    id: 'files',
    title: 'File Explorer',
    color: '#0e7490',
    borderColor: '#06b6d4',
    activeBorder: '#22d3ee',
    glowColor: 'rgba(6, 182, 212, 0.3)',
  },
];

const DEMO_ACTIONS: Omit<LogEntry, 'id'>[] = [
  { time: '00:01', action: 'Yang initialized -- scanning desktop environment', status: 'success' },
  { time: '00:03', action: 'Opening Amy Broker -- loading portfolio view', status: 'active', app: 'amy' },
  { time: '00:05', action: 'Reading live market data from Amy Broker', status: 'success', app: 'amy' },
  { time: '00:07', action: 'Switching to Optima for strategy optimization', status: 'active', app: 'optima' },
  { time: '00:09', action: 'Running backtest on AFL momentum strategy', status: 'success', app: 'optima' },
  { time: '00:11', action: 'Opening File Explorer -- accessing config files', status: 'active', app: 'files' },
  { time: '00:13', action: 'Modifying trading_params.json with new thresholds', status: 'success', app: 'files' },
  { time: '00:15', action: 'Returning to Amy Broker -- applying new parameters', status: 'active', app: 'amy' },
  { time: '00:17', action: 'Learning pattern: user risk-assessment workflow', status: 'active', app: 'optima' },
  { time: '00:19', action: 'Cross-app workflow complete -- all tasks executed', status: 'success' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatusDot({ status }: { status: string }) {
  const bg =
    status === 'success'
      ? '#10b981'
      : status === 'active'
        ? '#FEC00F'
        : '#64748b';
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
      style={{ background: bg }}
    />
  );
}

function DesktopIcon({ label, children, isDark }: { label: string; children: React.ReactNode; isDark: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 w-16">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.25)' }}
      >
        {children}
      </div>
      <span className="text-[10px] text-white text-center leading-tight truncate w-full">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function AutopilotPage() {
  const { actualTheme } = useTheme();
  const isDark = actualTheme === 'dark';

  const [isRunning, setIsRunning] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [demoComplete, setDemoComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  /* ---- colours ---- */
  const c = {
    bg: isDark ? '#121212' : '#f5f5f5',
    card: isDark ? '#1E1E1E' : '#ffffff',
    border: isDark ? '#333' : '#e0e0e0',
    text: isDark ? '#ffffff' : '#212121',
    muted: isDark ? '#9E9E9E' : '#757575',
    accent: '#FEC00F',
    accentText: '#212121',
    desktopBg: isDark
      ? 'linear-gradient(135deg, #0a1628 0%, #162033 50%, #1a2744 100%)'
      : 'linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #1e88e5 100%)',
    taskbar: isDark ? '#0d1117' : '#0d47a1',
  };

  /* ---- auto-scroll logs ---- */
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  /* ---- cleanup on unmount ---- */
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  /* ---- demo runner ---- */
  const startDemo = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setDemoComplete(false);
    setLogs([]);
    setActiveApp(null);

    let step = 0;

    intervalRef.current = setInterval(() => {
      if (step >= DEMO_ACTIONS.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
        setDemoComplete(true);
        setActiveApp(null);
        return;
      }

      const action = DEMO_ACTIONS[step];
      setLogs((prev) => [...prev, { ...action, id: step }]);

      if (action.app) {
        setActiveApp(action.app);
        // Move cursor towards the active app's area
        const appIdx = APPS.findIndex((a) => a.id === action.app);
        const targets = [
          { x: 18, y: 28 },
          { x: 55, y: 28 },
          { x: 18, y: 62 },
        ];
        const target = targets[appIdx] ?? { x: 50, y: 50 };
        setCursorPos({ x: target.x + Math.random() * 15, y: target.y + Math.random() * 10 });
      } else {
        setCursorPos({ x: 40 + Math.random() * 20, y: 30 + Math.random() * 30 });
      }

      step++;
    }, 2000);
  }, [isRunning]);

  const pauseDemo = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const resetDemo = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setDemoComplete(false);
    setLogs([]);
    setActiveApp(null);
    setCursorPos({ x: 50, y: 50 });
  }, []);

  /* ---- render helpers ---- */
  const renderAppWindow = (app: DesktopApp, style: React.CSSProperties) => {
    const isActive = activeApp === app.id;
    return (
      <div
        key={app.id}
        className="absolute rounded-lg overflow-hidden transition-all duration-500"
        style={{
          ...style,
          border: isActive ? `2px solid ${app.activeBorder}` : `1px solid ${isDark ? '#333' : 'rgba(255,255,255,0.3)'}`,
          boxShadow: isActive ? `0 0 24px ${app.glowColor}` : '0 4px 12px rgba(0,0,0,0.3)',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
          zIndex: isActive ? 20 : 5,
          opacity: !activeApp || isActive ? 1 : 0.45,
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-3 py-1.5"
          style={{ background: app.color }}
        >
          <span className="text-xs font-semibold text-white truncate">{app.title}</span>
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          </div>
        </div>
        {/* Body */}
        <div className="p-3" style={{ background: isDark ? '#1a1a2e' : '#f0f4ff', minHeight: 110 }}>
          {app.id === 'amy' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: c.muted }}>Portfolio Value</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>$524,832.00</span>
              </div>
              {['AAPL  +2.34%', 'MSFT  +1.87%', 'GOOGL +0.95%'].map((s) => (
                <div
                  key={s}
                  className="text-[10px] px-2 py-1 rounded"
                  style={{ background: isDark ? '#0d1117' : '#e0ecff', color: isDark ? '#94a3b8' : '#1e40af' }}
                >
                  {s}
                </div>
              ))}
              {isActive && (
                <div className="text-[10px] font-bold px-2 py-1 rounded" style={{ background: '#FEC00F', color: '#212121' }}>
                  Yang reading market data...
                </div>
              )}
            </div>
          )}
          {app.id === 'optima' && (
            <div className="space-y-2">
              <div className="font-mono text-[10px] space-y-0.5" style={{ color: isDark ? '#c084fc' : '#7e22ce' }}>
                <div>{'// AFL Strategy Code'}</div>
                <div style={{ color: c.muted }}>{'Buy = Cross(MACD(), Signal());'}</div>
                <div style={{ color: c.muted }}>{'Sell = Cross(Signal(), MACD());'}</div>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: c.muted }}>Backtest ROI</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>+42.3%</span>
              </div>
              {isActive && (
                <div className="text-[10px] font-bold px-2 py-1 rounded" style={{ background: '#FEC00F', color: '#212121' }}>
                  Yang optimizing strategy...
                </div>
              )}
            </div>
          )}
          {app.id === 'files' && (
            <div className="space-y-1.5">
              {['trading_params.json', 'portfolio_data.csv', 'strategy.afl', 'report.pdf'].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded"
                  style={{ background: isDark ? '#0d1117' : '#e0f2fe', color: isDark ? '#94a3b8' : '#0e7490' }}
                >
                  <FileCode className="w-3 h-3 flex-shrink-0" />
                  {f}
                </div>
              ))}
              {isActive && (
                <div className="text-[10px] font-bold px-2 py-1 rounded" style={{ background: '#FEC00F', color: '#212121' }}>
                  Yang modifying files...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen p-4 lg:p-8" style={{ background: c.bg, color: c.text }}>
      {/* -------- Header -------- */}
      <div className="max-w-7xl mx-auto mb-6">
        {/* Coming Soon Banner */}
        <div className="flex items-center justify-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wider shadow-lg"
            style={{ background: c.accent, color: c.accentText }}
          >
            <Zap className="w-4 h-4" />
            COMING SOON
          </div>
        </div>

        <h1
          className="text-3xl lg:text-4xl font-bold text-center mb-2 text-balance"
          style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1px' }}
        >
          Auto Pilot Preview
        </h1>
        <p className="text-center text-sm lg:text-base mb-8" style={{ color: c.muted }}>
          Watch Yang take autonomous control -- navigating apps, modifying files, and learning new tasks in real time.
        </p>

        {/* -------- Go into Autopilot button (hero CTA) -------- */}
        <div className="flex justify-center mb-8">
          <button
            onClick={startDemo}
            disabled={isRunning}
            className="group relative flex items-center gap-3 px-10 py-5 rounded-xl text-lg font-bold tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: isRunning ? (isDark ? '#333' : '#9E9E9E') : c.accent,
              color: c.accentText,
              boxShadow: isRunning ? 'none' : '0 0 30px rgba(254, 192, 15, 0.45)',
            }}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Yang is Working...
              </>
            ) : demoComplete ? (
              <>
                <RotateCcw className="w-6 h-6" />
                Replay Demo
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                Go into Autopilot
              </>
            )}
            {/* glow ring */}
            {!isRunning && !demoComplete && (
              <span
                className="absolute inset-0 rounded-xl animate-ping pointer-events-none"
                style={{ border: '2px solid #FEC00F', opacity: 0.4 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* -------- Main grid -------- */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6">
        {/* LEFT -- Desktop Simulation */}
        <div>
          <div
            className="rounded-xl overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${c.border}` }}
          >
            {/* Taskbar */}
            <div
              className="flex items-center gap-3 px-4 py-2"
              style={{ background: c.taskbar }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ background: c.accent }}
                >
                  <Zap className="w-3.5 h-3.5" style={{ color: c.accentText }} />
                </div>
                <span className="text-white text-xs font-bold tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  YANG OS
                </span>
              </div>

              <div className="flex gap-1 ml-2">
                {APPS.map((app) => (
                  <div
                    key={app.id}
                    className="px-2.5 py-1 rounded text-[10px] font-semibold transition-all duration-300"
                    style={{
                      background: activeApp === app.id ? app.borderColor : 'rgba(255,255,255,0.1)',
                      color: '#fff',
                    }}
                  >
                    {app.title}
                  </div>
                ))}
              </div>

              {isRunning && (
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-300 text-[10px] font-semibold">AUTOPILOT ACTIVE</span>
                </div>
              )}
            </div>

            {/* Desktop area */}
            <div
              className="relative"
              style={{ background: c.desktopBg, height: 420, overflow: 'hidden' }}
            >
              {/* Desktop icons (left column) */}
              <div className="absolute top-3 left-3 flex flex-col gap-3 z-[1]">
                <DesktopIcon label="Amy Broker" isDark={isDark}><BarChart3 className="w-5 h-5 text-blue-300" /></DesktopIcon>
                <DesktopIcon label="Optima" isDark={isDark}><TrendingUp className="w-5 h-5 text-purple-300" /></DesktopIcon>
                <DesktopIcon label="Files" isDark={isDark}><Folder className="w-5 h-5 text-cyan-300" /></DesktopIcon>
              </div>

              {/* App windows */}
              {renderAppWindow(APPS[0], { left: '12%', top: '8%', width: '38%', height: '52%' })}
              {renderAppWindow(APPS[1], { right: '4%', top: '6%', width: '38%', height: '52%' })}
              {renderAppWindow(APPS[2], { left: '12%', bottom: '4%', width: '34%', height: '38%' })}

              {/* Animated cursor */}
              {isRunning && (
                <div
                  className="absolute pointer-events-none transition-all duration-[1200ms] ease-in-out z-30"
                  style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
                >
                  <MousePointer2 className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(254,192,15,0.9)]" />
                  <span
                    className="absolute -top-1 -left-1 w-8 h-8 rounded-full animate-ping pointer-events-none"
                    style={{ background: 'rgba(254, 192, 15, 0.35)' }}
                  />
                </div>
              )}

              {/* Idle overlay */}
              {!isRunning && !demoComplete && logs.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
                  <p className="text-white/70 text-sm font-semibold tracking-wide">
                    Press &quot;Go into Autopilot&quot; to start the simulation
                  </p>
                </div>
              )}

              {/* Complete overlay */}
              {demoComplete && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40">
                  <CheckCircle2 className="w-12 h-12 mb-3" style={{ color: '#10b981' }} />
                  <p className="text-white font-bold text-lg">Demo Complete</p>
                  <p className="text-white/60 text-sm mt-1">All autonomous tasks executed successfully</p>
                </div>
              )}
            </div>
          </div>

          {/* Control strip */}
          <div
            className="mt-4 flex items-center gap-3 p-4 rounded-xl"
            style={{ background: c.card, border: `1px solid ${c.border}` }}
          >
            <button
              onClick={pauseDemo}
              disabled={!isRunning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: isDark ? '#333' : '#e0e0e0', color: c.text }}
            >
              <Pause className="w-4 h-4" /> Pause
            </button>
            <button
              onClick={resetDemo}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: isDark ? '#333' : '#e0e0e0', color: c.text }}
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>

            {isRunning && (
              <div className="ml-auto flex items-center gap-2 text-xs font-semibold" style={{ color: c.muted }}>
                <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: c.accent }} />
                Yang is performing autonomous tasks...
              </div>
            )}
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: MousePointer2, title: 'Autonomous Control', desc: 'Takes full control of mouse and keyboard to execute complex multi-step tasks.' },
              { icon: Brain, title: 'Skill Acquisition', desc: 'Observes and learns new workflows from users -- no additional programming needed.' },
              { icon: Layers, title: 'Multi-App Orchestration', desc: 'Seamlessly works across Amy Broker, Optima, and the file system simultaneously.' },
            ].map((f) => (
              <div
                key={f.title}
                className="p-4 rounded-xl"
                style={{ background: c.card, border: `1px solid ${c.border}` }}
              >
                <f.icon className="w-5 h-5 mb-2" style={{ color: c.accent }} />
                <h4 className="text-sm font-bold mb-1">{f.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: c.muted }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT -- Activity Log */}
        <div
          className="rounded-xl overflow-hidden flex flex-col"
          style={{ background: c.card, border: `1px solid ${c.border}`, maxHeight: 640 }}
        >
          <div
            className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
            style={{ borderBottom: `1px solid ${c.border}` }}
          >
            <Activity className="w-4 h-4" style={{ color: c.accent }} />
            <span className="text-sm font-bold tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              ACTIVITY LOG
            </span>
            {logs.length > 0 && (
              <span
                className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: isDark ? '#333' : '#e0e0e0', color: c.muted }}
              >
                {logs.length}/{DEMO_ACTIONS.length}
              </span>
            )}
          </div>

          <div ref={logContainerRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12" style={{ color: c.muted }}>
                <Clock className="w-8 h-8 mb-3 opacity-40" />
                <p className="text-xs text-center">Activity will appear here once the demo starts.</p>
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-2 p-2.5 rounded-lg text-xs transition-all duration-300"
                  style={{
                    background: isDark ? '#0d1117' : '#fafafa',
                    border: `1px solid ${
                      log.status === 'success'
                        ? 'rgba(16, 185, 129, 0.4)'
                        : log.status === 'active'
                          ? 'rgba(254, 192, 15, 0.4)'
                          : c.border
                    }`,
                  }}
                >
                  <StatusDot status={log.status} />
                  <div className="flex-1 min-w-0">
                    <span className="block font-semibold mb-0.5" style={{ color: c.muted, fontSize: 10 }}>
                      {log.time}
                    </span>
                    <span style={{ color: c.text, lineHeight: '1.4' }}>{log.action}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

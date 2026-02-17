'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Loader2,
  CheckCircle2,
  Minus,
  Square,
  X,
  Search,
  Wifi,
  Volume2,
  Battery,
  ChevronUp,
  MousePointer2,
  Brain,
  Layers,
  Zap,
  Activity,
  Clock,
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

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DEMO_ACTIONS: Omit<LogEntry, 'id'>[] = [
  { time: '00:01', action: 'Yang initialized -- scanning desktop environment', status: 'success' },
  { time: '00:03', action: 'Opening AmiBroker -- loading chart workspace', status: 'active', app: 'amibroker' },
  { time: '00:05', action: 'Applying DEMA overlay to Gold Index chart', status: 'success', app: 'amibroker' },
  { time: '00:07', action: 'Switching to Optuma -- analyzing Fibonacci levels', status: 'active', app: 'optuma' },
  { time: '00:09', action: 'Setting AUD/USD retracement from 0.617 to 0.715', status: 'success', app: 'optuma' },
  { time: '00:11', action: 'Navigating AmiBroker Formula Editor', status: 'active', app: 'amibroker' },
  { time: '00:13', action: 'Modifying AFL: Buy = Cross(MACD(), Signal())', status: 'success', app: 'amibroker' },
  { time: '00:15', action: 'Returning to Optuma -- checking RSI divergence', status: 'active', app: 'optuma' },
  { time: '00:17', action: 'Learning pattern: user Fibonacci workflow', status: 'active', app: 'optuma' },
  { time: '00:19', action: 'Cross-app workflow complete -- all tasks executed', status: 'success' },
];

/* ------------------------------------------------------------------ */
/*  StatusDot                                                          */
/* ------------------------------------------------------------------ */

function StatusDot({ status }: { status: string }) {
  const bg =
    status === 'success' ? '#10b981' : status === 'active' ? '#FEC00F' : '#64748b';
  return <span className="inline-block w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: bg }} />;
}

/* ------------------------------------------------------------------ */
/*  Windows 11 Title Bar                                               */
/* ------------------------------------------------------------------ */

function Win11TitleBar({
  title,
  icon,
  bgColor,
  textColor,
  isActive,
  onMinimize,
  onMaximize,
  onClose,
}: {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  isActive: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between select-none"
      style={{
        background: bgColor,
        height: 32,
        paddingLeft: 10,
        paddingRight: 0,
        opacity: isActive ? 1 : 0.85,
      }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span style={{ color: textColor, fontSize: 12, fontWeight: 500 }}>{title}</span>
      </div>
      <div className="flex items-center h-full">
        <button
          onClick={onMinimize}
          className="flex items-center justify-center h-full transition-colors"
          style={{ width: 46, color: textColor }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <Minus size={14} />
        </button>
        <button
          onClick={onMaximize}
          className="flex items-center justify-center h-full transition-colors"
          style={{ width: 46, color: textColor }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <Square size={11} />
        </button>
        <button
          onClick={onClose}
          className="flex items-center justify-center h-full transition-colors"
          style={{ width: 46, color: textColor, borderRadius: '0 8px 0 0' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c42b1c'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AmiBroker Window                                                   */
/* ------------------------------------------------------------------ */

function AmiBrokerWindow({ isActive, yangWorking }: { isActive: boolean; yangWorking: boolean }) {
  return (
    <div
      className="flex flex-col h-full rounded-lg overflow-hidden transition-shadow duration-300"
      style={{
        boxShadow: isActive
          ? '0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)'
          : '0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        opacity: isActive ? 1 : 0.7,
        zIndex: isActive ? 20 : 10,
        transition: 'all 0.4s ease',
      }}
    >
      {/* Title bar */}
      <Win11TitleBar
        title="AmiBroker - [RWV] - Sprott Physical Gold Index CDE - [Daily]"
        icon={
          <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ background: '#e8912d' }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: '#fff' }}>AB</span>
          </div>
        }
        bgColor="#2d2d2d"
        textColor="#cccccc"
        isActive={isActive}
      />

      {/* Menu bar */}
      <div className="flex items-center gap-0 px-1" style={{ background: '#383838', height: 24 }}>
        {['File', 'Edit', 'View', 'Insert', 'Symbol', 'Analysis', 'Window', 'Help'].map((m) => (
          <span key={m} className="px-2 py-0.5 text-[11px] hover:bg-[#505050] cursor-default" style={{ color: '#ccc' }}>
            {m}
          </span>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2" style={{ background: '#333', height: 28, borderBottom: '1px solid #222' }}>
        <div className="flex items-center gap-1 px-2 rounded" style={{ background: '#444', height: 20 }}>
          <span style={{ fontSize: 9, color: '#aaa' }}>RWV (Daily)</span>
        </div>
        <div className="flex items-center gap-1 px-2 rounded" style={{ background: '#444', height: 20 }}>
          <span style={{ fontSize: 9, color: '#aaa' }}>GOLDCORP (Daily)</span>
        </div>
        <div className="flex items-center gap-1 px-2 rounded" style={{ background: '#5a4a1a', border: '1px solid #8a7a2a', height: 20 }}>
          <span style={{ fontSize: 9, color: '#FFD700' }}>CI RWV (Daily)</span>
        </div>
        <span className="px-2 text-[10px]" style={{ color: '#777' }}>Sect Page</span>
      </div>

      {/* Main content */}
      <div className="flex flex-1" style={{ background: '#1a1a1a' }}>
        {/* Indicator tree */}
        <div className="flex-shrink-0 overflow-y-auto" style={{ width: 160, background: '#252525', borderRight: '1px solid #333' }}>
          <div className="p-1.5 space-y-0.5">
            <div className="text-[9px] font-bold text-[#4ec9b0] pl-1">Formulas</div>
            {[
              { name: 'DEMA - Double Exp MA', color: '#569cd6' },
              { name: 'EMA5 - Displaced MA', color: '#569cd6' },
              { name: 'EMA - Exponential MA', color: '#569cd6' },
              { name: 'Linear Regression', color: '#569cd6' },
              { name: 'TEMA - Triple Exp MA', color: '#dcdcaa' },
              { name: 'TRIX - Triple Exp Mov', color: '#dcdcaa' },
              { name: 'TSF - Time Series For', color: '#dcdcaa' },
              { name: 'WilMA - Wilder MA', color: '#569cd6' },
              { name: 'WMA - Weighted MA', color: '#569cd6' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-1 px-1 py-0.5 hover:bg-[#333] rounded cursor-default">
                <span style={{ fontSize: 8, color: f.color }}>{'>'}</span>
                <span style={{ fontSize: 9, color: '#bbb' }}>{f.name}</span>
              </div>
            ))}
            <div className="text-[9px] font-bold text-[#4ec9b0] pl-1 mt-2">Basic Charts</div>
            {['Candlestick', 'Standard Price', 'Close', 'Open Interest', 'Price (all in one)', 'Price Strength', 'Spread', 'Volume', 'Volume At Price'].map((f, i) => (
              <div key={i} className="flex items-center gap-1 px-1 py-0.5 hover:bg-[#333] rounded cursor-default">
                <span style={{ fontSize: 8, color: '#4ec9b0' }}>{'>'}</span>
                <span style={{ fontSize: 9, color: '#bbb' }}>{f}</span>
              </div>
            ))}
            <div className="text-[9px] font-bold text-[#4ec9b0] pl-1 mt-2">Custom</div>
            {['ATRV', 'CashFlowCall', 'Comp', 'CoppockBolton', 'DPCompound', 'GUPPYHIST'].map((f, i) => (
              <div key={i} className="flex items-center gap-1 px-1 py-0.5 hover:bg-[#333] rounded cursor-default">
                <span style={{ fontSize: 8, color: '#ce9178' }}>{'>'}</span>
                <span style={{ fontSize: 9, color: '#bbb' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart area */}
        <div className="flex-1 relative overflow-hidden" style={{ background: '#1e1e1e' }}>
          {/* Price scale on right */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between py-2 pr-1" style={{ width: 40, fontSize: 8, color: '#777' }}>
            {['87', '81', '75', '69', '63', '57', '51', '45'].map((p) => (
              <span key={p} className="text-right">{p}</span>
            ))}
          </div>

          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <line key={`v${i}`} x1={`${(i + 1) * 8}%`} y1="0" x2={`${(i + 1) * 8}%`} y2="100%" stroke="#fff" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12}%`} x2="100%" y2={`${(i + 1) * 12}%`} stroke="#fff" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Candlestick chart SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            {/* Moving average line */}
            <path
              d="M 50,350 Q 100,340 150,320 T 250,300 T 350,260 T 450,200 T 500,170 T 550,140 T 600,110 T 650,90 T 700,70 T 750,55"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              opacity="0.8"
            />
            <path
              d="M 50,360 Q 100,355 150,340 T 250,320 T 350,280 T 450,220 T 500,190 T 550,160 T 600,130 T 650,110 T 700,90 T 750,75"
              fill="none"
              stroke="#4ec9b0"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Candlesticks */}
            {[
              { x: 60, o: 350, c: 340, h: 335, l: 355, up: true },
              { x: 80, o: 340, c: 345, h: 335, l: 350, up: false },
              { x: 100, o: 345, c: 335, h: 330, l: 350, up: true },
              { x: 120, o: 335, c: 325, h: 320, l: 340, up: true },
              { x: 140, o: 325, c: 330, h: 322, l: 335, up: false },
              { x: 160, o: 330, c: 320, h: 315, l: 335, up: true },
              { x: 180, o: 320, c: 315, h: 310, l: 325, up: true },
              { x: 200, o: 315, c: 310, h: 305, l: 320, up: true },
              { x: 220, o: 310, c: 305, h: 300, l: 315, up: true },
              { x: 240, o: 305, c: 300, h: 295, l: 310, up: true },
              { x: 260, o: 300, c: 295, h: 290, l: 305, up: true },
              { x: 280, o: 295, c: 290, h: 285, l: 300, up: true },
              { x: 300, o: 290, c: 280, h: 275, l: 295, up: true },
              { x: 320, o: 280, c: 270, h: 265, l: 285, up: true },
              { x: 340, o: 270, c: 260, h: 255, l: 275, up: true },
              { x: 360, o: 260, c: 265, h: 258, l: 270, up: false },
              { x: 380, o: 265, c: 255, h: 250, l: 270, up: true },
              { x: 400, o: 255, c: 245, h: 240, l: 260, up: true },
              { x: 420, o: 245, c: 240, h: 235, l: 250, up: true },
              { x: 440, o: 240, c: 220, h: 215, l: 245, up: true },
              { x: 460, o: 220, c: 210, h: 205, l: 225, up: true },
              { x: 480, o: 210, c: 200, h: 195, l: 215, up: true },
              { x: 500, o: 200, c: 190, h: 185, l: 205, up: true },
              { x: 520, o: 190, c: 180, h: 175, l: 195, up: true },
              { x: 540, o: 180, c: 172, h: 168, l: 185, up: true },
              { x: 560, o: 172, c: 160, h: 155, l: 178, up: true },
              { x: 580, o: 160, c: 150, h: 145, l: 165, up: true },
              { x: 600, o: 150, c: 145, h: 140, l: 155, up: true },
              { x: 620, o: 145, c: 135, h: 130, l: 150, up: true },
              { x: 640, o: 135, c: 125, h: 120, l: 140, up: true },
              { x: 660, o: 125, c: 115, h: 110, l: 130, up: true },
              { x: 680, o: 115, c: 105, h: 100, l: 120, up: true },
              { x: 700, o: 105, c: 90, h: 85, l: 110, up: true },
              { x: 720, o: 90, c: 80, h: 72, l: 95, up: true },
              { x: 740, o: 80, c: 70, h: 62, l: 85, up: true },
            ].map((candle, i) => (
              <g key={i}>
                <line x1={candle.x} y1={candle.h} x2={candle.x} y2={candle.l} stroke={candle.up ? '#26a69a' : '#ef5350'} strokeWidth="1" />
                <rect
                  x={candle.x - 4}
                  y={Math.min(candle.o, candle.c)}
                  width="8"
                  height={Math.abs(candle.o - candle.c) || 2}
                  fill={candle.up ? '#26a69a' : '#ef5350'}
                />
              </g>
            ))}
          </svg>

          {/* Bottom sheet tabs */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-0" style={{ background: '#2a2a2a', height: 22, borderTop: '1px solid #444' }}>
            <span className="px-2 text-[9px]" style={{ color: '#aaa', background: '#3a3a3a' }}>Composite</span>
            <span className="px-2 text-[9px]" style={{ color: '#777' }}>Symbols</span>
            <span className="px-2 text-[9px]" style={{ color: '#777' }}>Layers</span>
            <span className="px-2 text-[9px] font-bold" style={{ color: '#FFD700', background: '#444' }}>Charts</span>
          </div>

          {/* Yang working overlay */}
          {yangWorking && (
            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: 'rgba(254, 192, 15, 0.9)', zIndex: 30 }}>
              <Loader2 size={10} className="animate-spin" style={{ color: '#212121' }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: '#212121' }}>Yang is working here...</span>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-2" style={{ background: '#2a2a2a', height: 20, borderTop: '1px solid #444' }}>
        <span style={{ fontSize: 8, color: '#777' }}>For Help, press F1</span>
        <span style={{ fontSize: 8, color: '#777' }}>6,12/14/2025 | S: 38.14300 | NYSE Arca Investment Company, Financials</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Optuma Window                                                      */
/* ------------------------------------------------------------------ */

function OptumaWindow({ isActive, yangWorking }: { isActive: boolean; yangWorking: boolean }) {
  return (
    <div
      className="flex flex-col h-full rounded-lg overflow-hidden transition-shadow duration-300"
      style={{
        boxShadow: isActive
          ? '0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)'
          : '0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        opacity: isActive ? 1 : 0.7,
        zIndex: isActive ? 20 : 10,
        transition: 'all 0.4s ease',
      }}
    >
      {/* Title bar */}
      <Win11TitleBar
        title="Optuma"
        icon={
          <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ background: '#1a5276' }}>
            <span style={{ fontSize: 7, fontWeight: 800, color: '#fff' }}>O</span>
          </div>
        }
        bgColor="#1a5276"
        textColor="#ffffff"
        isActive={isActive}
      />

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2" style={{ background: '#f0f0f0', height: 36, borderBottom: '1px solid #ccc' }}>
        {/* Optuma ribbon-style icons */}
        {['File', 'New', 'Tools', 'Settings', 'Data', 'Alerts', 'Searches', 'Chat', 'Help'].map((t) => (
          <div key={t} className="flex flex-col items-center px-1.5 py-0.5 hover:bg-[#ddd] rounded cursor-default">
            <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: t === 'Data' ? '#1a5276' : '#888' }}>
              <span style={{ fontSize: 6, color: '#fff', fontWeight: 700 }}>{t.charAt(0)}</span>
            </div>
            <span style={{ fontSize: 8, color: '#444' }}>{t}</span>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-0" style={{ background: '#e8e8e8', height: 26, borderBottom: '1px solid #ccc' }}>
        {[
          { name: 'Single Charts', active: false },
          { name: 'MultiCode', active: false },
          { name: 'Scripting', active: false },
          { name: 'TA', active: true },
        ].map((tab) => (
          <div
            key={tab.name}
            className="flex items-center gap-1 px-3 py-1 cursor-default"
            style={{
              background: tab.active ? '#1a5276' : 'transparent',
              color: tab.active ? '#fff' : '#666',
              fontSize: 10,
              fontWeight: tab.active ? 600 : 400,
              borderRight: '1px solid #ccc',
            }}
          >
            {tab.name}
            <span style={{ fontSize: 8, color: tab.active ? '#ffffff80' : '#999' }}>x</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-1" style={{ background: '#ffffff' }}>
        {/* Properties panel */}
        <div className="flex-shrink-0 overflow-y-auto" style={{ width: 150, background: '#fafafa', borderRight: '1px solid #ddd' }}>
          <div className="p-2 space-y-1">
            <div style={{ fontSize: 10, fontWeight: 700, color: '#1a5276' }}>Fibonacci Retracements</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: '#333', marginTop: 4 }}>Actions</div>
            {['Add Price Alert', 'Add to Toolbar', 'Apply Settings to All', 'Copy Tool', 'Move to Back', 'Move to Front', 'Price Flip'].map((a) => (
              <div key={a} className="text-[9px] py-0.5 hover:bg-[#eee] cursor-default" style={{ color: '#555' }}>{a}</div>
            ))}
            <div style={{ fontSize: 9, fontWeight: 600, color: '#333', marginTop: 6 }}>Properties</div>
            <div className="flex items-center justify-between text-[9px]" style={{ color: '#555' }}>
              <span>Tool Name</span><span style={{ color: '#1a5276' }}>Fibonacci Retracem</span>
            </div>
            <div style={{ fontSize: 9, fontWeight: 600, color: '#333', marginTop: 4 }}>Levels</div>
            <div className="space-y-0.5">
              {[
                { name: 'All Levels', val: '', checked: true },
                { name: 'Level 1', val: '38.2', checked: true },
                { name: 'Level 2', val: '50', checked: true },
                { name: 'Level 3', val: '61.8', checked: true },
              ].map((l) => (
                <div key={l.name} className="flex items-center gap-1 text-[8px]" style={{ color: '#555' }}>
                  <div className="w-2.5 h-2.5 rounded-sm border flex items-center justify-center" style={{ borderColor: l.checked ? '#1a5276' : '#bbb' }}>
                    {l.checked && <span style={{ fontSize: 6, color: '#1a5276' }}>{'x'}</span>}
                  </div>
                  <span>{l.name}</span>
                  {l.val && <span style={{ color: '#1a5276', fontWeight: 600, marginLeft: 'auto' }}>{l.val}</span>}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[9px] mt-2" style={{ color: '#555' }}>
              <span>Extend Left</span>
              <div className="w-2.5 h-2.5 rounded-sm border" style={{ borderColor: '#bbb' }} />
            </div>
            <div className="flex items-center justify-between text-[9px]" style={{ color: '#555' }}>
              <span>Extend Right</span>
              <div className="w-2.5 h-2.5 rounded-sm border flex items-center justify-center" style={{ borderColor: '#1a5276' }}>
                <span style={{ fontSize: 6, color: '#1a5276' }}>{'x'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px]" style={{ color: '#555' }}>
              <span>Show Prices</span>
              <div className="w-2.5 h-2.5 rounded-sm border flex items-center justify-center" style={{ borderColor: '#1a5276' }}>
                <span style={{ fontSize: 6, color: '#1a5276' }}>{'x'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px]" style={{ color: '#555' }}>
              <span>Show %</span>
              <div className="w-2.5 h-2.5 rounded-sm border flex items-center justify-center" style={{ borderColor: '#1a5276' }}>
                <span style={{ fontSize: 6, color: '#1a5276' }}>{'x'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[9px]" style={{ color: '#555' }}>
              <span>Line Colour</span>
              <div className="w-3 h-3 rounded-sm" style={{ background: '#1a5276' }} />
            </div>
          </div>
        </div>

        {/* Chart area */}
        <div className="flex-1 relative overflow-hidden" style={{ background: '#ffffff' }}>
          {/* Chart header */}
          <div className="px-3 py-1" style={{ borderBottom: '1px solid #eee' }}>
            <span style={{ fontSize: 10, color: '#333' }}>Australian Dollar / US Dollar - AUDUSD (FX) - Daily CandleStick Chart</span>
          </div>

          {/* Date scale */}
          <div className="flex items-center gap-0 px-1" style={{ background: '#f8f8f8', height: 16, borderBottom: '1px solid #eee' }}>
            {['1990', '1995', '2000', '2005', '2010', '2015', '2020'].map((y) => (
              <span key={y} className="flex-1 text-center" style={{ fontSize: 7, color: '#999' }}>{y}</span>
            ))}
          </div>

          {/* Chart header label */}
          <div className="absolute top-10 left-4" style={{ fontSize: 16, fontWeight: 300, color: '#333' }}>Daily</div>
          <div className="absolute top-10 right-14 text-right" style={{ fontSize: 13, fontWeight: 300, color: '#555' }}>Australian Dollar / US Dollar</div>

          {/* Price scale */}
          <div className="absolute right-0 top-8 bottom-16 flex flex-col justify-between pr-1" style={{ width: 44, fontSize: 8, color: '#777' }}>
            {['0.7200', '0.7000', '0.6800', '0.6600', '0.6400', '0.6200'].map((p) => (
              <span key={p} className="text-right">{p}</span>
            ))}
          </div>

          {/* Fibonacci chart */}
          <svg className="absolute" style={{ left: 0, top: 30, width: 'calc(100% - 44px)', height: 'calc(100% - 70px)' }} viewBox="0 0 700 350" preserveAspectRatio="none">
            {/* Fibonacci levels */}
            <line x1="0" y1="25" x2="700" y2="25" stroke="#1a5276" strokeWidth="1" opacity="0.5" />
            <text x="620" y="22" fill="#1a5276" fontSize="9">{'End: 0.71574'}</text>
            <line x1="0" y1="105" x2="700" y2="105" stroke="#cc0000" strokeWidth="1" strokeDasharray="5,3" opacity="0.6" />
            <text x="600" y="102" fill="#1a5276" fontSize="8">{'0.67803  61.8%'}</text>
            <line x1="0" y1="155" x2="700" y2="155" stroke="#cc0000" strokeWidth="1" strokeDasharray="5,3" opacity="0.4" />
            <text x="610" y="152" fill="#cc0000" fontSize="8">{'0.66638  50%'}</text>
            <line x1="0" y1="205" x2="700" y2="205" stroke="#1a5276" strokeWidth="1" strokeDasharray="5,3" opacity="0.4" />
            <text x="600" y="202" fill="#1a5276" fontSize="8">{'0.65473  38.2%'}</text>
            <line x1="0" y1="320" x2="700" y2="320" stroke="#1a5276" strokeWidth="1" opacity="0.5" />
            <text x="610" y="317" fill="#1a5276" fontSize="9">{'Start: 0.61702'}</text>

            {/* Moving averages */}
            <path d="M 20,290 Q 80,300 140,280 T 260,240 T 350,210 T 420,150 T 480,120 T 520,100 T 580,80 T 640,60 T 700,50" fill="none" stroke="#26a69a" strokeWidth="1.2" opacity="0.7" />

            {/* Candlesticks */}
            {[
              { x: 30, o: 310, c: 295, h: 290, l: 315, up: true },
              { x: 50, o: 295, c: 300, h: 288, l: 305, up: false },
              { x: 70, o: 300, c: 285, h: 280, l: 305, up: true },
              { x: 90, o: 285, c: 275, h: 270, l: 290, up: true },
              { x: 110, o: 275, c: 260, h: 255, l: 280, up: true },
              { x: 130, o: 260, c: 250, h: 245, l: 265, up: true },
              { x: 150, o: 250, c: 245, h: 240, l: 255, up: true },
              { x: 170, o: 245, c: 240, h: 235, l: 250, up: true },
              { x: 190, o: 240, c: 220, h: 215, l: 245, up: true },
              { x: 210, o: 220, c: 210, h: 205, l: 225, up: true },
              { x: 230, o: 210, c: 215, h: 208, l: 220, up: false },
              { x: 250, o: 215, c: 200, h: 195, l: 220, up: true },
              { x: 270, o: 200, c: 195, h: 190, l: 205, up: true },
              { x: 290, o: 195, c: 180, h: 175, l: 200, up: true },
              { x: 310, o: 180, c: 170, h: 165, l: 185, up: true },
              { x: 330, o: 170, c: 160, h: 155, l: 175, up: true },
              { x: 350, o: 160, c: 150, h: 145, l: 165, up: true },
              { x: 370, o: 150, c: 155, h: 148, l: 158, up: false },
              { x: 390, o: 155, c: 160, h: 153, l: 165, up: false },
              { x: 410, o: 160, c: 145, h: 140, l: 165, up: true },
              { x: 430, o: 145, c: 130, h: 125, l: 150, up: true },
              { x: 450, o: 130, c: 120, h: 115, l: 135, up: true },
              { x: 470, o: 120, c: 110, h: 105, l: 125, up: true },
              { x: 490, o: 110, c: 95, h: 88, l: 115, up: true },
              { x: 510, o: 95, c: 85, h: 80, l: 100, up: true },
              { x: 530, o: 85, c: 70, h: 64, l: 90, up: true },
              { x: 550, o: 70, c: 60, h: 55, l: 75, up: true },
              { x: 570, o: 60, c: 55, h: 50, l: 65, up: true },
              { x: 590, o: 55, c: 45, h: 38, l: 60, up: true },
              { x: 610, o: 45, c: 50, h: 42, l: 55, up: false },
              { x: 630, o: 50, c: 55, h: 48, l: 60, up: false },
              { x: 650, o: 55, c: 48, h: 42, l: 58, up: true },
              { x: 670, o: 48, c: 40, h: 35, l: 52, up: true },
            ].map((candle, i) => (
              <g key={i}>
                <line x1={candle.x} y1={candle.h} x2={candle.x} y2={candle.l} stroke={candle.up ? '#000' : '#cc0000'} strokeWidth="1" />
                <rect
                  x={candle.x - 3}
                  y={Math.min(candle.o, candle.c)}
                  width="6"
                  height={Math.abs(candle.o - candle.c) || 2}
                  fill={candle.up ? '#000' : '#cc0000'}
                  stroke={candle.up ? '#000' : '#cc0000'}
                  strokeWidth="0.5"
                />
              </g>
            ))}
          </svg>

          {/* RSI panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: 50, borderTop: '2px solid #ddd', background: '#fafafa' }}>
            <span className="absolute top-1 left-2" style={{ fontSize: 8, color: '#333', fontWeight: 600 }}>14 Period RSI</span>
            <svg style={{ width: 'calc(100% - 44px)', height: '100%' }} viewBox="0 0 700 50" preserveAspectRatio="none">
              <line x1="0" y1="15" x2="700" y2="15" stroke="#cc0000" strokeWidth="0.5" strokeDasharray="3,2" />
              <line x1="0" y1="35" x2="700" y2="35" stroke="#1a5276" strokeWidth="0.5" strokeDasharray="3,2" />
              <path d="M 30,40 Q 100,45 170,35 T 300,25 T 400,20 T 480,18 T 560,15 T 620,22 T 680,30" fill="none" stroke="#1a5276" strokeWidth="1.5" />
            </svg>
            <div className="absolute top-1 right-2 px-1 rounded" style={{ background: '#1a5276', fontSize: 7, color: '#fff', fontWeight: 600 }}>42.31</div>
          </div>

          {/* Yang overlay */}
          {yangWorking && (
            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: 'rgba(254, 192, 15, 0.9)', zIndex: 30 }}>
              <Loader2 size={10} className="animate-spin" style={{ color: '#212121' }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: '#212121' }}>Yang is working here...</span>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-2" style={{ background: '#f0f0f0', height: 20, borderTop: '1px solid #ccc' }}>
        <span style={{ fontSize: 8, color: '#777' }}>Sel: 1, Col: 1 | For Help, press F1</span>
        <span style={{ fontSize: 8, color: '#777' }}>0.001935c</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop Icon                                                       */
/* ------------------------------------------------------------------ */

function DesktopIcon({ label, color, letter }: { label: string; color: string; letter: string }) {
  return (
    <div className="flex flex-col items-center gap-1 w-[68px] py-1.5 rounded-md hover:bg-white/10 cursor-default transition-colors">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm" style={{ background: color }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{letter}</span>
      </div>
      <span className="text-[10px] text-white text-center leading-tight" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{label}</span>
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
  const [currentTime, setCurrentTime] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const c = {
    bg: isDark ? '#121212' : '#f5f5f5',
    card: isDark ? '#1E1E1E' : '#ffffff',
    border: isDark ? '#333' : '#e0e0e0',
    text: isDark ? '#ffffff' : '#212121',
    muted: isDark ? '#9E9E9E' : '#757575',
    accent: '#FEC00F',
    accentText: '#212121',
  };

  /* Clock */
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  /* Auto-scroll logs */
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  /* Cleanup */
  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  /* Demo runner */
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
        const targets: Record<string, { x: number; y: number }> = {
          amibroker: { x: 20, y: 35 },
          optuma: { x: 60, y: 35 },
        };
        const target = targets[action.app] ?? { x: 50, y: 50 };
        setCursorPos({ x: target.x + Math.random() * 15, y: target.y + Math.random() * 10 });
      } else {
        setCursorPos({ x: 40 + Math.random() * 20, y: 30 + Math.random() * 30 });
      }
      step++;
    }, 2200);
  }, [isRunning]);

  const resetDemo = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setIsRunning(false);
    setDemoComplete(false);
    setLogs([]);
    setActiveApp(null);
    setCursorPos({ x: 50, y: 50 });
  }, []);

  const todayDate = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen p-4 lg:p-6" style={{ background: c.bg, color: c.text }}>
      {/* Coming Soon + Header */}
      <div className="max-w-[1440px] mx-auto mb-4">
        <div className="flex items-center justify-center mb-4">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg"
            style={{ background: c.accent, color: c.accentText }}
          >
            <Zap className="w-4 h-4" />
            COMING SOON
          </div>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-1 text-balance" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1px' }}>
          Auto Pilot Preview
        </h1>
        <p className="text-center text-sm mb-4" style={{ color: c.muted }}>
          Watch Yang take autonomous control -- navigating AmiBroker and Optuma, modifying files, and learning new tasks.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={isRunning ? undefined : demoComplete ? resetDemo : startDemo}
            className="group relative flex items-center gap-3 px-10 py-4 rounded-xl text-lg font-bold tracking-wide transition-all duration-300"
            style={{
              background: isRunning ? (isDark ? '#333' : '#9E9E9E') : c.accent,
              color: c.accentText,
              boxShadow: isRunning ? 'none' : '0 0 30px rgba(254, 192, 15, 0.45)',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              opacity: isRunning ? 0.6 : 1,
            }}
          >
            {isRunning ? (
              <><Loader2 className="w-5 h-5 animate-spin" />Yang is Working...</>
            ) : demoComplete ? (
              <><RotateCcw className="w-5 h-5" />Replay Demo</>
            ) : (
              <><Play className="w-5 h-5" />Go into Autopilot</>
            )}
            {!isRunning && !demoComplete && (
              <span className="absolute inset-0 rounded-xl animate-ping pointer-events-none" style={{ border: '2px solid #FEC00F', opacity: 0.35 }} />
            )}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_280px] gap-4">
        {/* Windows 11 Desktop */}
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{ border: `1px solid ${isDark ? '#444' : '#bbb'}` }}
        >
          {/* Desktop area */}
          <div
            className="relative"
            style={{
              height: 580,
              backgroundImage: 'url(/images/win11-wallpaper.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Desktop icons */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-[2]">
              <DesktopIcon label="AmiBroker" color="#e8912d" letter="AB" />
              <DesktopIcon label="Optuma" color="#1a5276" letter="O" />
              <DesktopIcon label="Recycle Bin" color="#555" letter="R" />
              <DesktopIcon label="This PC" color="#0078d4" letter="PC" />
              <DesktopIcon label="File Explorer" color="#d4a017" letter="FE" />
            </div>

            {/* AmiBroker window -- left half */}
            <div
              className="absolute transition-all duration-500"
              style={{
                left: '7%',
                top: '2%',
                width: '48%',
                height: '82%',
                zIndex: activeApp === 'amibroker' ? 20 : 10,
              }}
            >
              <AmiBrokerWindow isActive={activeApp === 'amibroker'} yangWorking={isRunning && activeApp === 'amibroker'} />
            </div>

            {/* Optuma window -- right half */}
            <div
              className="absolute transition-all duration-500"
              style={{
                right: '1%',
                top: '4%',
                width: '46%',
                height: '80%',
                zIndex: activeApp === 'optuma' ? 20 : 10,
              }}
            >
              <OptumaWindow isActive={activeApp === 'optuma'} yangWorking={isRunning && activeApp === 'optuma'} />
            </div>

            {/* Animated cursor */}
            {isRunning && (
              <div
                className="absolute pointer-events-none transition-all duration-[1200ms] ease-in-out z-30"
                style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
              >
                <MousePointer2 className="w-5 h-5 text-white drop-shadow-[0_0_6px_rgba(254,192,15,0.9)]" />
                <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full animate-ping pointer-events-none" style={{ background: 'rgba(254, 192, 15, 0.3)' }} />
              </div>
            )}

            {/* Idle overlay */}
            {!isRunning && !demoComplete && logs.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center z-[15] bg-black/20 backdrop-blur-[1px]">
                <p className="text-white/80 text-sm font-semibold tracking-wide px-6 py-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                  {'Press "Go into Autopilot" to start the simulation'}
                </p>
              </div>
            )}

            {/* Complete overlay */}
            {demoComplete && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[15] bg-black/30 backdrop-blur-[1px]">
                <CheckCircle2 className="w-10 h-10 mb-2" style={{ color: '#10b981' }} />
                <p className="text-white font-bold text-base">Demo Complete</p>
                <p className="text-white/60 text-xs mt-1">All autonomous tasks executed successfully</p>
              </div>
            )}

            {/* Autopilot active indicator */}
            {isRunning && (
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg z-[25]" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold text-green-300 tracking-wider">AUTOPILOT ACTIVE</span>
              </div>
            )}
          </div>

          {/* Windows 11 Taskbar */}
          <div
            className="flex items-center justify-between px-3"
            style={{
              height: 48,
              background: isDark ? 'rgba(32,32,32,0.95)' : 'rgba(243,243,243,0.95)',
              borderTop: `1px solid ${isDark ? '#444' : '#ddd'}`,
              backdropFilter: 'blur(30px)',
            }}
          >
            {/* Left - system tray arrow */}
            <div className="flex items-center gap-2">
              <ChevronUp size={14} style={{ color: isDark ? '#aaa' : '#666' }} />
            </div>

            {/* Center - pinned icons */}
            <div className="flex items-center gap-1">
              {/* Windows logo */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 cursor-default transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill={isDark ? '#fff' : '#0078d4'}>
                  <rect x="0" y="0" width="7.2" height="7.2" rx="0.5" />
                  <rect x="8.8" y="0" width="7.2" height="7.2" rx="0.5" />
                  <rect x="0" y="8.8" width="7.2" height="7.2" rx="0.5" />
                  <rect x="8.8" y="8.8" width="7.2" height="7.2" rx="0.5" />
                </svg>
              </div>
              {/* Search */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 cursor-default transition-colors">
                <Search size={16} style={{ color: isDark ? '#ccc' : '#555' }} />
              </div>
              {/* Task view */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 cursor-default transition-colors">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 rounded-[1px]" style={{ background: isDark ? '#ccc' : '#555' }} />
                  <div className="w-2 h-2 rounded-[1px]" style={{ background: isDark ? '#ccc' : '#555' }} />
                  <div className="w-2 h-2 rounded-[1px]" style={{ background: isDark ? '#ccc' : '#555' }} />
                  <div className="w-2 h-2 rounded-[1px]" style={{ background: isDark ? '#ccc' : '#555' }} />
                </div>
              </div>
              {/* File Explorer */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 cursor-default transition-colors">
                <div className="w-5 h-4 rounded-sm" style={{ background: '#d4a017', border: '1px solid #b8860b' }} />
              </div>
              {/* Edge */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 cursor-default transition-colors">
                <div className="w-5 h-5 rounded-full" style={{ background: 'linear-gradient(135deg, #0078d4, #00bcf2)' }} />
              </div>
              {/* AmiBroker (active) */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md cursor-default transition-colors" style={{ background: activeApp === 'amibroker' ? (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)') : 'transparent' }}>
                <div className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: '#e8912d' }}>
                  <span style={{ fontSize: 7, fontWeight: 800, color: '#fff' }}>AB</span>
                </div>
                {activeApp === 'amibroker' && <div className="absolute bottom-1 w-3 h-[2px] rounded-full" style={{ background: '#FEC00F' }} />}
              </div>
              {/* Optuma (active) */}
              <div className="w-10 h-10 flex items-center justify-center rounded-md cursor-default transition-colors relative" style={{ background: activeApp === 'optuma' ? (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)') : 'transparent' }}>
                <div className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: '#1a5276' }}>
                  <span style={{ fontSize: 7, fontWeight: 800, color: '#fff' }}>O</span>
                </div>
                {activeApp === 'optuma' && <div className="absolute bottom-1 w-3 h-[2px] rounded-full" style={{ background: '#FEC00F' }} />}
              </div>
            </div>

            {/* Right - system tray */}
            <div className="flex items-center gap-2">
              <Wifi size={13} style={{ color: isDark ? '#ccc' : '#555' }} />
              <Volume2 size={13} style={{ color: isDark ? '#ccc' : '#555' }} />
              <Battery size={13} style={{ color: isDark ? '#ccc' : '#555' }} />
              <div className="flex flex-col items-end ml-1">
                <span style={{ fontSize: 10, color: isDark ? '#ccc' : '#555', lineHeight: 1.2 }}>{currentTime}</span>
                <span style={{ fontSize: 10, color: isDark ? '#aaa' : '#777', lineHeight: 1.2 }}>{todayDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="rounded-xl overflow-hidden flex flex-col" style={{ background: c.card, border: `1px solid ${c.border}`, maxHeight: 640 }}>
          <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0" style={{ borderBottom: `1px solid ${c.border}` }}>
            <Activity className="w-4 h-4" style={{ color: c.accent }} />
            <span className="text-sm font-bold tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>ACTIVITY LOG</span>
            {logs.length > 0 && (
              <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: isDark ? '#333' : '#e0e0e0', color: c.muted }}>
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
                      log.status === 'success' ? 'rgba(16, 185, 129, 0.4)' : log.status === 'active' ? 'rgba(254, 192, 15, 0.4)' : c.border
                    }`,
                  }}
                >
                  <StatusDot status={log.status} />
                  <div className="flex-1 min-w-0">
                    <span className="block font-semibold mb-0.5" style={{ color: c.muted, fontSize: 10 }}>{log.time}</span>
                    <span style={{ color: c.text, lineHeight: '1.4' }}>{log.action}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="max-w-[1440px] mx-auto grid sm:grid-cols-3 gap-4 mt-4">
        {[
          { icon: MousePointer2, title: 'Autonomous Control', desc: 'Takes full control of mouse and keyboard to execute complex multi-step tasks across AmiBroker and Optuma.' },
          { icon: Brain, title: 'Skill Acquisition', desc: 'Observes and learns new workflows from users -- no additional programming or AFL scripting needed.' },
          { icon: Layers, title: 'Multi-App Orchestration', desc: 'Seamlessly works across AmiBroker, Optuma, and the file system simultaneously in real time.' },
        ].map((f) => (
          <div key={f.title} className="p-4 rounded-xl" style={{ background: c.card, border: `1px solid ${c.border}` }}>
            <f.icon className="w-5 h-5 mb-2" style={{ color: c.accent }} />
            <h4 className="text-sm font-bold mb-1">{f.title}</h4>
            <p className="text-xs leading-relaxed" style={{ color: c.muted }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

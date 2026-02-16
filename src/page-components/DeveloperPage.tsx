'use client'

import React, { useState } from 'react'
import {
  Code2,
  Smartphone,
  ArrowRight,
  Layers,
  Database,
  MessageCircle,
  TrendingUp,
  Zap,
  Settings,
  LayoutDashboard,
  Sparkles,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Copy,
  Check,
  BookOpen,
  GitBranch,
  Shield,
  Paintbrush,
  Monitor,
  Search,
  Upload,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  Menu,
  X,
  Plus,
  Trash2,
  FileText,
  BarChart3,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

// ─── iPhone Frame Component ──────────────────────────────────────────────────
function IPhoneFrame({
  children,
  label,
  isActive,
  onClick,
  colors,
}: {
  children: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
  colors: Record<string, string>
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: '280px',
          height: '580px',
          borderRadius: '36px',
          border: `3px solid ${isActive ? '#FEC00F' : colors.border}`,
          backgroundColor: '#000000',
          padding: '12px',
          position: 'relative',
          boxShadow: isActive
            ? '0 0 40px rgba(254, 192, 15, 0.15), 0 20px 60px rgba(0,0,0,0.4)'
            : '0 20px 60px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '28px',
            borderRadius: '20px',
            backgroundColor: '#000',
            zIndex: 10,
          }}
        />
        {/* Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: colors.screenBg,
          }}
        >
          {children}
        </div>
      </div>
      {/* Label */}
      <p
        style={{
          textAlign: 'center',
          marginTop: '16px',
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '1px',
          color: isActive ? '#FEC00F' : colors.textMuted,
          transition: 'color 0.3s ease',
        }}
      >
        {label}
      </p>
    </div>
  )
}

// ─── Mockup: Login Screen ────────────────────────────────────────────────────
function LoginMockup({ colors }: { colors: Record<string, string> }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0A0A0B' }}>
      {/* Top brand area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(254,192,15,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
          <Sparkles size={24} color="#FEC00F" />
        </div>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '20px', color: '#fff', letterSpacing: '3px' }}>ANALYST</span>
        <span style={{ fontSize: '9px', color: '#FEC00F', letterSpacing: '4px', marginTop: '4px' }}>BY POTOMAC</span>
      </div>
      {/* Form area */}
      <div style={{ padding: '20px', borderTop: '1px solid #2A2A2A' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>WELCOME BACK</span>
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '9px', color: '#9E9E9E', marginBottom: '4px', fontWeight: 600, letterSpacing: '0.5px' }}>EMAIL</div>
          <div style={{ height: '32px', borderRadius: '8px', backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
            <span style={{ fontSize: '10px', color: '#555' }}>you@example.com</span>
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '9px', color: '#9E9E9E', fontWeight: 600, letterSpacing: '0.5px' }}>PASSWORD</div>
            <span style={{ fontSize: '8px', color: '#FEC00F' }}>Forgot?</span>
          </div>
          <div style={{ height: '32px', borderRadius: '8px', backgroundColor: '#1E1E1E', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
            <span style={{ fontSize: '10px', color: '#555' }}>{'*'.repeat(8)}</span>
            <Eye size={12} color="#555" />
          </div>
        </div>
        <div style={{ marginTop: '14px', height: '36px', borderRadius: '8px', backgroundColor: '#FEC00F', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <LogIn size={14} color="#0A0A0B" />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '12px', fontWeight: 700, color: '#0A0A0B', letterSpacing: '1px' }}>SIGN IN</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <span style={{ fontSize: '9px', color: '#757575' }}>{"Don't have an account? "}</span>
          <span style={{ fontSize: '9px', color: '#FEC00F', fontWeight: 600 }}>Create one</span>
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: Dashboard Screen ────────────────────────────────────────────────
function DashboardMockup({ colors }: { colors: Record<string, string> }) {
  const features = [
    { icon: Code2, label: 'AFL Generator', color: '#3B82F6' },
    { icon: MessageCircle, label: 'AI Chat', color: '#8B5CF6' },
    { icon: Database, label: 'Knowledge Base', color: '#22C55E' },
    { icon: TrendingUp, label: 'Backtest', color: '#F97316' },
  ]
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.screenBg }}>
      {/* Status bar */}
      <div style={{ height: '44px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 16px 6px' }}>
        <span style={{ fontSize: '9px', color: '#fff', fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '12px', height: '8px', borderRadius: '2px', backgroundColor: '#fff' }} />
          <div style={{ width: '16px', height: '8px', borderRadius: '2px', border: '1px solid #fff' }}>
            <div style={{ width: '70%', height: '100%', backgroundColor: '#fff', borderRadius: '1px' }} />
          </div>
        </div>
      </div>
      {/* Header */}
      <div style={{ padding: '12px 16px' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>
          Welcome, <span style={{ color: '#FEC00F' }}>Trader</span>
        </span>
        <p style={{ fontSize: '9px', color: '#9E9E9E', marginTop: '4px', lineHeight: 1.4 }}>Your AI-powered trading platform</p>
        <div style={{ marginTop: '10px', height: '30px', borderRadius: '8px', backgroundColor: '#FEC00F', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Sparkles size={12} color="#212121" />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '10px', fontWeight: 700, color: '#212121', letterSpacing: '0.5px' }}>START GENERATING</span>
        </div>
      </div>
      {/* Feature Cards */}
      <div style={{ flex: 1, padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', fontWeight: 600, color: '#9E9E9E', letterSpacing: '0.5px' }}>FEATURES</span>
        {features.map((f) => {
          const Icon = f.icon
          return (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: '#1E1E1E', borderRadius: '10px', border: '1px solid #2E2E2E' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color={f.color} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#E8E8E8', flex: 1 }}>{f.label}</span>
              <ArrowRight size={12} color="#FEC00F" />
            </div>
          )
        })}
      </div>
      {/* Tab Bar */}
      <MockupTabBar />
    </div>
  )
}

// ─── Mockup: Chat Screen ─────────────────────────────────────────────────────
function ChatMockup({ colors }: { colors: Record<string, string> }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.screenBg }}>
      {/* Nav */}
      <div style={{ height: '44px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 16px 8px', borderBottom: '1px solid #2E2E2E' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>AI CHAT</span>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
        {/* User message */}
        <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
          <div style={{ padding: '8px 12px', borderRadius: '14px 14px 4px 14px', backgroundColor: '#FEC00F', fontSize: '10px', color: '#0A0A0B', lineHeight: 1.4, fontWeight: 500 }}>
            Analyze AAPL for a momentum strategy
          </div>
        </div>
        {/* AI message */}
        <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(254,192,15,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={8} color="#FEC00F" />
            </div>
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#FEC00F' }}>Yang</span>
          </div>
          <div style={{ padding: '10px 12px', borderRadius: '4px 14px 14px 14px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E' }}>
            <p style={{ fontSize: '9px', color: '#d4d4d4', lineHeight: 1.5, margin: 0 }}>
              Based on AAPL analysis, I recommend a dual moving average crossover strategy with RSI confirmation...
            </p>
            {/* Tool card preview */}
            <div style={{ marginTop: '8px', padding: '8px', borderRadius: '8px', backgroundColor: '#262626', border: '1px solid #333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={10} color="#22C55E" />
                <span style={{ fontSize: '8px', fontWeight: 600, color: '#22C55E' }}>Stock Analysis</span>
              </div>
              <span style={{ fontSize: '8px', color: '#9E9E9E', marginTop: '4px', display: 'block' }}>AAPL: $198.45 (+2.3%)</span>
            </div>
          </div>
        </div>
      </div>
      {/* Input */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid #2E2E2E' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '20px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E' }}>
          <Plus size={14} color="#757575" />
          <span style={{ fontSize: '10px', color: '#757575', flex: 1 }}>Ask Yang anything...</span>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FEC00F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight size={12} color="#0A0A0B" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: AFL Generator Screen ────────────────────────────────────────────
function AFLMockup({ colors }: { colors: Record<string, string> }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.screenBg }}>
      <div style={{ height: '44px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 16px 8px', borderBottom: '1px solid #2E2E2E' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>AFL GENERATOR</span>
      </div>
      {/* Code preview area */}
      <div style={{ flex: 1, padding: '12px', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: '10px', backgroundColor: '#0d1117', border: '1px solid #2E2E2E', padding: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f57' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#febc2e' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#28c840' }} />
            </div>
            <span style={{ fontSize: '8px', color: '#555', fontFamily: 'monospace' }}>strategy.afl</span>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '8px', lineHeight: 1.6, color: '#adbac7' }}>
            <div><span style={{ color: '#f47067' }}>// </span><span style={{ color: '#768390' }}>Momentum Strategy</span></div>
            <div><span style={{ color: '#6cb6ff' }}>FastMA</span> = <span style={{ color: '#dcbdfb' }}>MA</span>(C, <span style={{ color: '#6cb6ff' }}>10</span>);</div>
            <div><span style={{ color: '#6cb6ff' }}>SlowMA</span> = <span style={{ color: '#dcbdfb' }}>MA</span>(C, <span style={{ color: '#6cb6ff' }}>50</span>);</div>
            <div><span style={{ color: '#6cb6ff' }}>RSIVal</span> = <span style={{ color: '#dcbdfb' }}>RSI</span>(<span style={{ color: '#6cb6ff' }}>14</span>);</div>
            <div />
            <div><span style={{ color: '#f47067' }}>Buy</span> = <span style={{ color: '#dcbdfb' }}>Cross</span>(FastMA,SlowMA)</div>
            <div>  AND RSIVal {'<'} <span style={{ color: '#6cb6ff' }}>70</span>;</div>
            <div><span style={{ color: '#f47067' }}>Sell</span> = <span style={{ color: '#dcbdfb' }}>Cross</span>(SlowMA,FastMA)</div>
            <div>  OR RSIVal {'>'} <span style={{ color: '#6cb6ff' }}>80</span>;</div>
            <div />
            <div><span style={{ color: '#f47067' }}>Short</span> = <span style={{ color: '#f47067' }}>Sell</span>;</div>
            <div><span style={{ color: '#f47067' }}>Cover</span> = <span style={{ color: '#f47067' }}>Buy</span>;</div>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid #2E2E2E', display: 'flex', gap: '8px' }}>
        <div style={{ flex: 1, height: '32px', borderRadius: '8px', backgroundColor: '#FEC00F', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Zap size={12} color="#212121" />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '10px', fontWeight: 700, color: '#212121' }}>GENERATE</span>
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #2E2E2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Copy size={12} color="#9E9E9E" />
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: Knowledge Base Screen ───────────────────────────────────────────
function KnowledgeMockup({ colors }: { colors: Record<string, string> }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.screenBg }}>
      <div style={{ height: '44px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 16px 8px', borderBottom: '1px solid #2E2E2E' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>KNOWLEDGE BASE</span>
      </div>
      {/* Search bar */}
      <div style={{ padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '10px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E' }}>
          <Search size={12} color="#757575" />
          <span style={{ fontSize: '10px', color: '#757575' }}>Search documents...</span>
        </div>
      </div>
      {/* Stats */}
      <div style={{ padding: '0 12px 8px', display: 'flex', gap: '8px' }}>
        {[
          { label: 'Docs', value: '24', color: '#FEC00F' },
          { label: 'Size', value: '12MB', color: '#3B82F6' },
        ].map((s) => (
          <div key={s.label} style={{ flex: 1, padding: '10px', borderRadius: '10px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E' }}>
            <span style={{ fontSize: '8px', color: '#9E9E9E' }}>{s.label}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      {/* Document list */}
      <div style={{ flex: 1, padding: '0 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {['Trading Strategies.pdf', 'RSI_Analysis.csv', 'Market_Report.pdf'].map((doc) => (
          <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E' }}>
            <FileText size={14} color="#FEC00F" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: '#E8E8E8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc}</div>
              <div style={{ fontSize: '8px', color: '#757575', marginTop: '2px' }}>Uploaded 2 days ago</div>
            </div>
            <Trash2 size={12} color="#555" />
          </div>
        ))}
      </div>
      {/* Upload button */}
      <div style={{ padding: '12px' }}>
        <div style={{ height: '36px', borderRadius: '10px', border: '1px dashed #FEC00F40', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Upload size={12} color="#FEC00F" />
          <span style={{ fontSize: '10px', color: '#FEC00F', fontWeight: 600 }}>Upload Document</span>
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: Settings Screen ─────────────────────────────────────────────────
function SettingsMockup({ colors }: { colors: Record<string, string> }) {
  const settingsItems = [
    { icon: '👤', label: 'Profile', desc: 'Name, email, nickname' },
    { icon: '🔑', label: 'API Keys', desc: 'Claude, Tavily' },
    { icon: '🎨', label: 'Appearance', desc: 'Theme, colors, font' },
    { icon: '🔔', label: 'Notifications', desc: 'Email, alerts' },
    { icon: '🛡️', label: 'Security', desc: 'Password, 2FA' },
  ]
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.screenBg }}>
      <div style={{ height: '44px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 16px 8px', borderBottom: '1px solid #2E2E2E' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>SETTINGS</span>
      </div>
      {/* User card */}
      <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #FEC00F, #FFD740)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#212121' }}>S</span>
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#E8E8E8' }}>Sohaib Ali</div>
          <div style={{ fontSize: '9px', color: '#757575' }}>sohaib@potomac.com</div>
        </div>
      </div>
      {/* Settings list */}
      <div style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden' }}>
        {settingsItems.map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E' }}>
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#E8E8E8' }}>{item.label}</div>
              <div style={{ fontSize: '8px', color: '#757575', marginTop: '2px' }}>{item.desc}</div>
            </div>
            <ChevronRightIcon size={14} color="#555" />
          </div>
        ))}
      </div>
      {/* Logout */}
      <div style={{ padding: '12px' }}>
        <div style={{ height: '36px', borderRadius: '10px', border: '1px solid rgba(220,38,38,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <LogOut size={12} color="#DC2626" />
          <span style={{ fontSize: '10px', color: '#DC2626', fontWeight: 600 }}>LOGOUT</span>
        </div>
      </div>
    </div>
  )
}

// ─── Mockup: Backtest Screen ─────────────────────────────────────────────────
function BacktestMockup({ colors }: { colors: Record<string, string> }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.screenBg }}>
      <div style={{ height: '44px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 16px 8px', borderBottom: '1px solid #2E2E2E' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>BACKTEST</span>
      </div>
      {/* Upload area */}
      <div style={{ padding: '12px' }}>
        <div style={{ padding: '16px', borderRadius: '10px', border: '1px dashed #FEC00F40', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Upload size={20} color="#FEC00F" />
          <span style={{ fontSize: '10px', color: '#FEC00F', fontWeight: 600 }}>Upload Results</span>
        </div>
      </div>
      {/* Metrics */}
      <div style={{ padding: '0 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          { label: 'CAGR', value: '18.5%', color: '#22C55E' },
          { label: 'Sharpe', value: '1.82', color: '#3B82F6' },
          { label: 'Max DD', value: '-12.3%', color: '#DC2626' },
          { label: 'Win Rate', value: '67.2%', color: '#FEC00F' },
        ].map((m) => (
          <div key={m.label} style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E' }}>
            <span style={{ fontSize: '8px', color: '#9E9E9E' }}>{m.label}</span>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '18px', fontWeight: 700, color: m.color, marginTop: '2px' }}>{m.value}</div>
          </div>
        ))}
      </div>
      {/* Mini chart placeholder */}
      <div style={{ flex: 1, padding: '12px' }}>
        <div style={{ height: '100%', borderRadius: '10px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
            {[40, 55, 45, 65, 50, 70, 60, 80, 75, 90, 85, 95].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: h > 60 ? 'rgba(34,197,94,0.4)' : 'rgba(254,192,15,0.3)', borderRadius: '3px 3px 0 0', transition: 'height 0.3s ease' }} />
            ))}
          </div>
        </div>
      </div>
      <MockupTabBar />
    </div>
  )
}

// ─── Mockup: Content Screen ──────────────────────────────────────────────────
function ContentMockup({ colors }: { colors: Record<string, string> }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: colors.screenBg }}>
      <div style={{ height: '44px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 16px 8px', borderBottom: '1px solid #2E2E2E' }}>
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '1px' }}>CONTENT</span>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', padding: '10px 12px', gap: '4px', borderBottom: '1px solid #2E2E2E' }}>
        {['Chat', 'Slides', 'Articles', 'Docs'].map((tab, i) => (
          <div key={tab} style={{ flex: 1, padding: '6px', borderRadius: '8px', backgroundColor: i === 0 ? '#FEC00F' : '#1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: 600, color: i === 0 ? '#212121' : '#9E9E9E' }}>{tab}</span>
          </div>
        ))}
      </div>
      {/* Content list */}
      <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
        {[
          { title: 'Q4 Market Analysis', type: 'Article', date: 'Jan 15' },
          { title: 'Trading Strategy Deck', type: 'Slides', date: 'Jan 12' },
          { title: 'Risk Report 2026', type: 'Document', date: 'Jan 10' },
        ].map((item) => (
          <div key={item.title} style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#1E1E1E', border: '1px solid #2E2E2E' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#E8E8E8' }}>{item.title}</span>
              <span style={{ fontSize: '7px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(254,192,15,0.1)', color: '#FEC00F', fontWeight: 600 }}>{item.type}</span>
            </div>
            <span style={{ fontSize: '8px', color: '#757575' }}>{item.date}</span>
          </div>
        ))}
      </div>
      <MockupTabBar />
    </div>
  )
}

// ─── Tab Bar (shared across mockups) ─────────────────────────────────────────
function MockupTabBar() {
  return (
    <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', borderTop: '1px solid #2E2E2E', backgroundColor: '#141414', flexShrink: 0 }}>
      {[
        { icon: LayoutDashboard, label: 'Home' },
        { icon: MessageCircle, label: 'Chat' },
        { icon: Code2, label: 'AFL' },
        { icon: Database, label: 'KB' },
        { icon: Settings, label: 'More' },
      ].map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <Icon size={14} color={item.label === 'Home' ? '#FEC00F' : '#555'} />
            <span style={{ fontSize: '7px', color: item.label === 'Home' ? '#FEC00F' : '#555', fontWeight: 500 }}>{item.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Code Snippet Component ──────────────────────────────────────────────────
function CodeSnippet({
  code,
  language,
  title,
  colors,
}: {
  code: string
  language: string
  title?: string
  colors: Record<string, string>
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ borderRadius: '12px', border: `1px solid ${colors.border}`, overflow: 'hidden', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', backgroundColor: colors.codeBg, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {title && <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '12px', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.5px' }}>{title}</span>}
          <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(254,192,15,0.1)', color: '#FEC00F', fontWeight: 600, textTransform: 'uppercase' }}>{language}</span>
        </div>
        <button
          onClick={handleCopy}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', border: 'none', backgroundColor: colors.hoverBg, color: colors.textMuted, cursor: 'pointer', fontSize: '11px', fontWeight: 600, transition: 'all 0.2s' }}
        >
          {copied ? <Check size={12} color="#22C55E" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{ padding: '16px', margin: 0, overflow: 'auto', fontFamily: "'Fira Code', 'Consolas', monospace", fontSize: '12px', lineHeight: 1.6, color: '#adbac7', backgroundColor: '#0d1117' }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ─── Collapsible Section ─────────────────────────────────────────────────────
function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  colors,
  badge,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  colors: Record<string, string>
  badge?: string
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ borderRadius: '14px', border: `1px solid ${colors.border}`, overflow: 'hidden', marginBottom: '16px', transition: 'border-color 0.3s ease' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 20px',
          border: 'none',
          backgroundColor: colors.cardBg,
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        {open ? <ChevronDown size={18} color="#FEC00F" /> : <ChevronRightIcon size={18} color={colors.textMuted} />}
        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px', fontWeight: 700, color: colors.text, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>{title}</span>
        {badge && (
          <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '6px', backgroundColor: 'rgba(254,192,15,0.1)', color: '#FEC00F', fontWeight: 600, letterSpacing: '0.5px' }}>{badge}</span>
        )}
      </button>
      {open && (
        <div style={{ padding: '0 20px 20px', backgroundColor: colors.cardBg }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ─── Mapping Table Row ───────────────────────────────────────────────────────
function MappingRow({
  jsComponent,
  swiftUI,
  notes,
  colors,
}: {
  jsComponent: string
  swiftUI: string
  notes: string
  colors: Record<string, string>
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '12px', padding: '12px 0', borderBottom: `1px solid ${colors.border}`, fontSize: '13px' }}>
      <code style={{ color: '#FEC00F', fontFamily: "'Fira Code', monospace", fontSize: '12px', fontWeight: 500 }}>{jsComponent}</code>
      <code style={{ color: '#8ddb8c', fontFamily: "'Fira Code', monospace", fontSize: '12px', fontWeight: 500 }}>{swiftUI}</code>
      <span style={{ color: colors.textMuted, lineHeight: 1.5 }}>{notes}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN DEVELOPER PAGE ─────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export function DeveloperPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [activeScreen, setActiveScreen] = useState('dashboard')

  const colors = {
    background: isDark ? '#0A0A0B' : '#ffffff',
    surface: isDark ? '#121212' : '#f8f9fa',
    cardBg: isDark ? '#1A1A1A' : '#ffffff',
    inputBg: isDark ? '#262626' : '#f0f0f0',
    border: isDark ? '#2E2E2E' : '#e5e5e5',
    text: isDark ? '#E8E8E8' : '#1A1A1A',
    textMuted: isDark ? '#9E9E9E' : '#757575',
    hoverBg: isDark ? '#262626' : '#f0f0f0',
    codeBg: isDark ? '#141414' : '#f5f5f5',
    screenBg: '#121212',
    accent: '#FEC00F',
  }

  const screens = [
    { id: 'login', label: 'LOGIN', component: LoginMockup },
    { id: 'dashboard', label: 'DASHBOARD', component: DashboardMockup },
    { id: 'chat', label: 'AI CHAT', component: ChatMockup },
    { id: 'afl', label: 'AFL GENERATOR', component: AFLMockup },
    { id: 'knowledge', label: 'KNOWLEDGE BASE', component: KnowledgeMockup },
    { id: 'backtest', label: 'BACKTEST', component: BacktestMockup },
    { id: 'content', label: 'CONTENT', component: ContentMockup },
    { id: 'settings', label: 'SETTINGS', component: SettingsMockup },
  ]

  const activeScreenData = screens.find((s) => s.id === activeScreen)
  const ActiveComponent = activeScreenData?.component || DashboardMockup

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        fontFamily: "'Quicksand', sans-serif",
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* ── Hero Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #0A0A0B 0%, #1A1A1D 50%, #0A0A0B 100%)'
            : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
          borderBottom: `1px solid ${colors.border}`,
          padding: '48px 32px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid bg */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(254,192,15,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(254,192,15,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(254,192,15,0.1)',
                border: '1px solid rgba(254,192,15,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Smartphone size={28} color="#FEC00F" />
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '48px',
                  fontWeight: 700,
                  color: colors.text,
                  letterSpacing: '2px',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                DEVELOPER
              </h1>
              <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 500, color: '#FEC00F', letterSpacing: '6px', margin: '4px 0 0' }}>
                IOS APP BLUEPRINT
              </p>
            </div>
          </div>
          <p
            style={{
              color: colors.textMuted,
              fontSize: '16px',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: 0,
            }}
          >
            Visual mockups and comprehensive SwiftUI translation guide for rebuilding the Potomac Analyst Workbench as a native iOS application with 1:1 feature parity.
          </p>
          {/* Quick stat badges */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            {[
              { label: '8 Screens', icon: Monitor },
              { label: 'SwiftUI 5', icon: Code2 },
              { label: 'iOS 17+', icon: Smartphone },
              { label: 'MVVM Pattern', icon: GitBranch },
            ].map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(254,192,15,0.06)',
                    border: '1px solid rgba(254,192,15,0.15)',
                  }}
                >
                  <Icon size={14} color="#FEC00F" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: colors.text }}>{badge.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 32px' }}>

        {/* ── Section 1: iOS App Mockups ─────────────────────────────────── */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Paintbrush size={22} color="#FEC00F" />
            <h2
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: colors.text,
                letterSpacing: '1.5px',
                margin: 0,
              }}
            >
              APP INTERFACE MOCKUPS
            </h2>
          </div>
          <p style={{ color: colors.textMuted, fontSize: '14px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '600px' }}>
            Interactive mockups of every screen in the Analyst iOS app. Click any screen to enlarge and inspect UI elements.
          </p>

          {/* Screen Selector Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '32px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeScreen === screen.id ? '#FEC00F' : colors.cardBg,
                  color: activeScreen === screen.id ? '#0A0A0B' : colors.textMuted,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  outline: activeScreen === screen.id ? 'none' : `1px solid ${colors.border}`,
                }}
              >
                {screen.label}
              </button>
            ))}
          </div>

          {/* Featured (large) + Gallery (small) */}
          <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Active large mockup */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IPhoneFrame label={activeScreenData?.label || ''} isActive colors={colors}>
                <ActiveComponent colors={colors} />
              </IPhoneFrame>
            </div>

            {/* Gallery of other screens */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px', fontWeight: 600, color: colors.textMuted, letterSpacing: '1px', marginBottom: '16px' }}>
                ALL SCREENS
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                {screens.map((screen) => {
                  const ScreenComp = screen.component
                  return (
                    <div
                      key={screen.id}
                      onClick={() => setActiveScreen(screen.id)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '14px',
                        border: `2px solid ${activeScreen === screen.id ? '#FEC00F' : colors.border}`,
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        backgroundColor: '#000',
                        position: 'relative',
                      }}
                    >
                      <div style={{ transform: 'scale(0.48)', transformOrigin: 'top left', width: '280px', height: '200px', pointerEvents: 'none' }}>
                        <ScreenComp colors={colors} />
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 8px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                        <span style={{ fontSize: '9px', fontWeight: 600, color: activeScreen === screen.id ? '#FEC00F' : '#9E9E9E', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.5px' }}>
                          {screen.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: SwiftUI Translation Guide ──────────────────────── */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <BookOpen size={22} color="#FEC00F" />
            <h2
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: colors.text,
                letterSpacing: '1.5px',
                margin: 0,
              }}
            >
              SWIFTUI TRANSLATION GUIDE
            </h2>
          </div>
          <p style={{ color: colors.textMuted, fontSize: '14px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '700px' }}>
            Step-by-step instructions for rewriting each JavaScript/React component into native SwiftUI, achieving 1:1 feature parity with native iOS performance.
          </p>

          {/* ── 2.1 Project Architecture ──────────────────────────────────── */}
          <CollapsibleSection title="PROJECT ARCHITECTURE" defaultOpen colors={colors} badge="FOUNDATION">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              The existing Next.js app uses a context-based architecture with protected routes, a sidebar layout, and page-level components. Map this to SwiftUI using the MVVM pattern with an App {'>'} Scene {'>'} View hierarchy.
            </p>
            <CodeSnippet
              title="Xcode Project Structure"
              language="swift"
              colors={colors}
              code={`// AnalystApp/
├── App/
│   ├── AnalystApp.swift          // @main App entry (replaces layout.tsx)
│   └── ContentView.swift         // Root navigation (replaces ProtectedRoute + MainLayout)
├── Models/
│   ├── User.swift                // User model (from AuthContext)
│   ├── Conversation.swift        // Chat types (from types/api.ts)
│   ├── Document.swift            // Knowledge base types
│   └── BacktestResult.swift      // Backtest types
├── ViewModels/
│   ├── AuthViewModel.swift       // Auth state (replaces AuthContext)
│   ├── ChatViewModel.swift       // Chat logic (replaces useAIChat hook)
│   ├── AFLViewModel.swift        // AFL generation (replaces useChat in AFLPage)
│   ├── KnowledgeViewModel.swift  // Doc management (replaces KnowledgeBasePage state)
│   └── SettingsViewModel.swift   // Settings (replaces SettingsPage state)
├── Views/
│   ├── Auth/
│   │   ├── LoginView.swift       // LoginPage.tsx → SwiftUI
│   │   ├── RegisterView.swift    // RegisterPage.tsx → SwiftUI
│   │   └── ForgotPasswordView.swift
│   ├── Dashboard/
│   │   └── DashboardView.swift   // DashboardPage.tsx → SwiftUI
│   ├── Chat/
│   │   ├── ChatView.swift        // ChatPage.tsx → SwiftUI
│   │   ├── MessageBubble.swift   // AI message rendering
│   │   └── ToolCardView.swift    // Generative UI cards
│   ├── AFL/
│   │   ├── AFLGeneratorView.swift
│   │   └── CodeEditorView.swift  // Monaco → native code editor
│   ├── Knowledge/
│   │   └── KnowledgeBaseView.swift
│   ├── Backtest/
│   │   └── BacktestView.swift
│   ├── Content/
│   │   └── ContentView.swift
│   └── Settings/
│       └── SettingsView.swift
├── Services/
│   ├── APIClient.swift           // Replaces src/lib/api.ts
│   ├── AuthService.swift         // Token management
│   └── StreamingService.swift    // SSE streaming for AI chat
├── Theme/
│   ├── AppTheme.swift            // Replaces ThemeContext
│   ├── Colors.swift              // Brand color constants
│   └── Typography.swift          // Rajdhani + Quicksand fonts
└── Utilities/
    ├── KeychainManager.swift     // Replaces localStorage for tokens
    └── Logger.swift              // Replaces src/lib/logger.ts`}
            />
          </CollapsibleSection>

          {/* ── 2.2 Component Mapping Table ───────────────────────────────── */}
          <CollapsibleSection title="COMPONENT MAPPING" defaultOpen colors={colors} badge="CORE">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              Direct mappings between existing React/Next.js components and their SwiftUI equivalents.
            </p>
            <div style={{ overflow: 'auto' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '12px', padding: '12px 0', borderBottom: `2px solid rgba(254,192,15,0.3)`, fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', fontFamily: "'Rajdhani', sans-serif" }}>
                <span style={{ color: '#FEC00F' }}>REACT / NEXT.JS</span>
                <span style={{ color: '#8ddb8c' }}>SWIFTUI EQUIVALENT</span>
                <span style={{ color: colors.textMuted }}>NOTES</span>
              </div>
              <MappingRow jsComponent="MainLayout.tsx" swiftUI="TabView + NavigationStack" notes="Replace sidebar nav with native iOS TabView for bottom navigation. Use NavigationStack for push/pop within each tab." colors={colors} />
              <MappingRow jsComponent="AuthContext.tsx" swiftUI="@Observable AuthViewModel" notes="Use Swift @Observable macro + @Environment injection. Store tokens in Keychain, not UserDefaults." colors={colors} />
              <MappingRow jsComponent="ThemeContext.tsx" swiftUI="@AppStorage + .preferredColorScheme" notes="Use iOS system appearance. Store preference in @AppStorage. Apply .tint(.potomacYellow) globally." colors={colors} />
              <MappingRow jsComponent="useChat (AI SDK)" swiftUI="AsyncStream + URLSession" notes="Replace AI SDK streaming with native URLSession SSE parsing. Use AsyncStream for reactive updates." colors={colors} />
              <MappingRow jsComponent="Monaco Editor" swiftUI="TextEditor + syntax highlighting" notes="Use native TextEditor with custom AttributedString styling, or integrate Runestone/CodeEditor package." colors={colors} />
              <MappingRow jsComponent="PromptInput" swiftUI="TextField + .toolbar" notes="Use TextField with .toolbar for action buttons. Support .submitLabel(.send) for keyboard submit." colors={colors} />
              <MappingRow jsComponent="Sonner toasts" swiftUI=".alert() / custom overlay" notes="Use SwiftUI .alert() modifier or build custom toast overlay with .transition(.move(edge: .top))." colors={colors} />
              <MappingRow jsComponent="lucide-react icons" swiftUI="SF Symbols" notes="Map each Lucide icon to its SF Symbols equivalent. SF Symbols provide native adaptive rendering." colors={colors} />
              <MappingRow jsComponent="localStorage" swiftUI="@AppStorage / Keychain" notes="Use @AppStorage for preferences, KeychainManager for sensitive data (tokens, API keys)." colors={colors} />
              <MappingRow jsComponent="useResponsive hook" swiftUI="GeometryReader / @Environment(\.horizontalSizeClass)" notes="Use native size classes for adaptive layout. GeometryReader for precise measurements." colors={colors} />
              <MappingRow jsComponent="apiClient (fetch)" swiftUI="URLSession + async/await" notes="Use URLSession with async/await. Create typed APIClient actor for thread-safe network calls." colors={colors} />
              <MappingRow jsComponent="React.useState" swiftUI="@State / @Binding" notes="@State for local view state, @Binding for child to parent communication." colors={colors} />
              <MappingRow jsComponent="React.useEffect" swiftUI=".task / .onChange" notes=".task for async on-appear work, .onChange(of:) for value-change reactions." colors={colors} />
              <MappingRow jsComponent="React.useRef" swiftUI="@FocusState / ScrollViewProxy" notes="Use @FocusState for input focus, ScrollViewProxy for scroll control." colors={colors} />
            </div>
          </CollapsibleSection>

          {/* ── 2.3 Authentication ─────────────────────────────────────────── */}
          <CollapsibleSection title="AUTHENTICATION FLOW" colors={colors} badge="AUTH">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              The existing AuthContext manages login, registration, and token storage. In SwiftUI, use an @Observable AuthViewModel with Keychain-backed token persistence.
            </p>
            <CodeSnippet
              title="AuthViewModel.swift"
              language="swift"
              colors={colors}
              code={`import SwiftUI
import Observation

@Observable
final class AuthViewModel {
    var user: User?
    var isAuthenticated: Bool { user != nil }
    var isLoading = true
    var error: String?

    private let apiClient: APIClient
    private let keychain: KeychainManager

    init(apiClient: APIClient = .shared, keychain: KeychainManager = .shared) {
        self.apiClient = apiClient
        self.keychain = keychain
    }

    // Replaces: AuthContext.checkAuth()
    func checkAuth() async {
        guard let token = keychain.get("auth_token") else {
            isLoading = false
            return
        }
        do {
            let userData = try await apiClient.getCurrentUser(token: token)
            await MainActor.run { self.user = userData }
        } catch {
            keychain.delete("auth_token")
        }
        await MainActor.run { isLoading = false }
    }

    // Replaces: AuthContext.login()
    func login(email: String, password: String) async throws {
        let response = try await apiClient.login(email: email, password: password)
        keychain.set(response.accessToken, forKey: "auth_token")
        await MainActor.run { self.user = response.user }
    }

    // Replaces: AuthContext.logout()
    func logout() {
        keychain.delete("auth_token")
        user = nil
    }
}`}
            />
            <CodeSnippet
              title="LoginView.swift"
              language="swift"
              colors={colors}
              code={`struct LoginView: View {
    @Environment(AuthViewModel.self) private var auth
    @State private var email = ""
    @State private var password = ""
    @State private var showPassword = false
    @State private var isLoading = false
    @FocusState private var focusedField: Field?

    enum Field { case email, password }

    var body: some View {
        VStack(spacing: 0) {
            // Brand section (matches LoginPage.tsx left panel)
            BrandingHeader()

            // Form section (matches LoginPage.tsx right panel)
            VStack(spacing: 20) {
                Text("WELCOME BACK")
                    .font(.custom("Rajdhani-Bold", size: 28))
                    .foregroundStyle(.white)
                    .tracking(2)

                VStack(spacing: 16) {
                    // Email field
                    LabeledField("EMAIL ADDRESS") {
                        TextField("you@example.com", text: $email)
                            .textContentType(.emailAddress)
                            .keyboardType(.emailAddress)
                            .autocapitalization(.none)
                            .focused($focusedField, equals: .email)
                    }

                    // Password field
                    LabeledField("PASSWORD") {
                        HStack {
                            if showPassword {
                                TextField("Password", text: $password)
                            } else {
                                SecureField("Password", text: $password)
                            }
                            Button { showPassword.toggle() } label: {
                                Image(systemName: showPassword ? "eye.slash" : "eye")
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .focused($focusedField, equals: .password)
                    }
                }

                // Sign in button
                Button {
                    Task { await handleLogin() }
                } label: {
                    HStack(spacing: 10) {
                        if isLoading {
                            ProgressView().tint(.black)
                        } else {
                            Image(systemName: "arrow.right.circle.fill")
                        }
                        Text("SIGN IN")
                            .font(.custom("Rajdhani-Bold", size: 14))
                            .tracking(1)
                    }
                    .frame(maxWidth: .infinity, minHeight: 52)
                }
                .buttonStyle(.potomacPrimary)
                .disabled(isLoading)

                // Register link
                HStack {
                    Text("Don't have an account?")
                        .foregroundStyle(.secondary)
                    NavigationLink("Create one") { RegisterView() }
                        .foregroundStyle(.potomacYellow)
                }
                .font(.footnote)
            }
            .padding(32)
        }
        .submitLabel(.go)
        .onSubmit { Task { await handleLogin() } }
    }

    private func handleLogin() async {
        isLoading = true
        defer { isLoading = false }
        do {
            try await auth.login(email: email, password: password)
        } catch {
            // Show error alert
        }
    }
}`}
            />
          </CollapsibleSection>

          {/* ── 2.4 Navigation ──────────────────────────────────────────────── */}
          <CollapsibleSection title="NAVIGATION ARCHITECTURE" colors={colors} badge="NAV">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              The web app uses a sidebar (MainLayout.tsx) with 8 nav items. On iOS, translate this to a TabView with 5 primary tabs and a &quot;More&quot; menu for secondary screens.
            </p>
            <CodeSnippet
              title="ContentView.swift (Root Navigation)"
              language="swift"
              colors={colors}
              code={`struct ContentView: View {
    @Environment(AuthViewModel.self) private var auth
    @State private var selectedTab: AppTab = .dashboard

    enum AppTab: String, CaseIterable {
        case dashboard, chat, afl, knowledge, more
        
        var title: String {
            switch self {
            case .dashboard: "Home"
            case .chat: "Chat"
            case .afl: "AFL"
            case .knowledge: "KB"
            case .more: "More"
            }
        }
        
        var icon: String {
            switch self {
            case .dashboard: "square.grid.2x2"
            case .chat: "message"
            case .afl: "chevron.left.forwardslash.chevron.right"
            case .knowledge: "cylinder"
            case .more: "ellipsis.circle"
            }
        }
    }

    var body: some View {
        Group {
            if auth.isLoading {
                SplashView()
            } else if auth.isAuthenticated {
                mainTabView
            } else {
                NavigationStack {
                    LoginView()
                }
            }
        }
    }

    private var mainTabView: some View {
        TabView(selection: $selectedTab) {
            Tab(AppTab.dashboard.title, systemImage: AppTab.dashboard.icon,
                value: .dashboard) {
                NavigationStack { DashboardView() }
            }
            Tab(AppTab.chat.title, systemImage: AppTab.chat.icon,
                value: .chat) {
                NavigationStack { ChatView() }
            }
            Tab(AppTab.afl.title, systemImage: AppTab.afl.icon,
                value: .afl) {
                NavigationStack { AFLGeneratorView() }
            }
            Tab(AppTab.knowledge.title, systemImage: AppTab.knowledge.icon,
                value: .knowledge) {
                NavigationStack { KnowledgeBaseView() }
            }
            Tab(AppTab.more.title, systemImage: AppTab.more.icon,
                value: .more) {
                NavigationStack { MoreMenuView() }
            }
        }
        .tint(.potomacYellow)
    }
}`}
            />
          </CollapsibleSection>

          {/* ── 2.5 AI Chat Streaming ──────────────────────────────────────── */}
          <CollapsibleSection title="AI CHAT & STREAMING" colors={colors} badge="CORE">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              The web app uses the AI SDK useChat hook with DefaultChatTransport for SSE streaming. On iOS, replicate this with URLSession and AsyncStream for real-time message streaming.
            </p>
            <CodeSnippet
              title="StreamingService.swift"
              language="swift"
              colors={colors}
              code={`actor StreamingService {
    private let baseURL: URL
    private let session: URLSession

    init(baseURL: URL = URL(string: "https://potomac-analyst-workbench-production.up.railway.app")!) {
        self.baseURL = baseURL
        self.session = URLSession(configuration: .default)
    }

    // Replaces: DefaultChatTransport + useChat()
    func streamChat(
        messages: [ChatMessage],
        conversationId: String?,
        token: String
    ) -> AsyncThrowingStream<StreamEvent, Error> {
        AsyncThrowingStream { continuation in
            Task {
                var request = URLRequest(url: baseURL.appending(path: "/api/chat"))
                request.httpMethod = "POST"
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")

                let body: [String: Any] = [
                    "messages": messages.map { $0.toDictionary() },
                    "conversationId": conversationId ?? NSNull()
                ]
                request.httpBody = try? JSONSerialization.data(withJSONObject: body)

                do {
                    let (bytes, _) = try await session.bytes(for: request)
                    for try await line in bytes.lines {
                        guard line.hasPrefix("data: ") else { continue }
                        let data = String(line.dropFirst(6))
                        if data == "[DONE]" { break }
                        if let event = parseSSEEvent(data) {
                            continuation.yield(event)
                        }
                    }
                    continuation.finish()
                } catch {
                    continuation.finish(throwing: error)
                }
            }
        }
    }

    private func parseSSEEvent(_ data: String) -> StreamEvent? {
        guard let jsonData = data.data(using: .utf8),
              let json = try? JSONSerialization.jsonObject(with: jsonData) as? [String: Any]
        else { return nil }
        // Parse text deltas, tool calls, sources, etc.
        if let text = json["text"] as? String {
            return .textDelta(text)
        }
        if let toolCall = json["tool_call"] as? [String: Any] {
            return .toolCall(ToolCallEvent(from: toolCall))
        }
        return nil
    }
}

enum StreamEvent {
    case textDelta(String)
    case toolCall(ToolCallEvent)
    case toolResult(ToolResultEvent)
    case source(SourceEvent)
    case finished
}`}
            />
            <CodeSnippet
              title="ChatViewModel.swift"
              language="swift"
              colors={colors}
              code={`@Observable
final class ChatViewModel {
    var messages: [ChatMessage] = []
    var conversations: [Conversation] = []
    var selectedConversation: Conversation?
    var isStreaming = false
    var inputText = ""
    var error: String?

    private let streaming: StreamingService
    private let apiClient: APIClient

    // Replaces: ChatPage.doSend()
    func sendMessage() async {
        guard !inputText.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        let text = inputText
        inputText = ""
        isStreaming = true

        // Add user message immediately
        let userMsg = ChatMessage(role: .user, content: text)
        messages.append(userMsg)

        // Create assistant placeholder
        var assistantMsg = ChatMessage(role: .assistant, content: "")
        messages.append(assistantMsg)

        do {
            let token = KeychainManager.shared.get("auth_token") ?? ""
            let stream = streaming.streamChat(
                messages: messages,
                conversationId: selectedConversation?.id,
                token: token
            )

            for try await event in stream {
                await MainActor.run {
                    switch event {
                    case .textDelta(let text):
                        // Append to last assistant message
                        if let lastIndex = messages.indices.last {
                            messages[lastIndex].content += text
                        }
                    case .toolCall(let tool):
                        messages[messages.count - 1].toolCalls.append(tool)
                    case .finished:
                        break
                    default:
                        break
                    }
                }
            }
        } catch {
            await MainActor.run { self.error = error.localizedDescription }
        }

        await MainActor.run { isStreaming = false }
    }
}`}
            />
          </CollapsibleSection>

          {/* ── 2.6 Theme & Styling ────────────────────────────────────────── */}
          <CollapsibleSection title="THEME & STYLING" colors={colors} badge="UI">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              Translate the web app color system (globals.css + ThemeContext) to SwiftUI Color extensions and custom ViewModifiers.
            </p>
            <CodeSnippet
              title="Colors.swift"
              language="swift"
              colors={colors}
              code={`import SwiftUI

extension Color {
    // Potomac Brand Colors (from globals.css --potomac-*)
    static let potomacYellow = Color(hex: "FEC00F")
    static let potomacGray = Color(hex: "212121")
    static let potomacTurquoise = Color(hex: "00DED1")
    static let potomacPink = Color(hex: "EB2F5C")

    // Surface colors (from MainLayout colors object)
    static let surfacePrimary = Color("SurfacePrimary")    // dark: #121212, light: #ffffff
    static let surfaceSecondary = Color("SurfaceSecondary") // dark: #1E1E1E, light: #f8f9fa
    static let surfaceInput = Color("SurfaceInput")         // dark: #262626, light: #f8f8f8
    static let borderDefault = Color("BorderDefault")       // dark: #2E2E2E, light: #e5e5e5

    init(hex: String) {
        let scanner = Scanner(string: hex)
        var hexNumber: UInt64 = 0
        scanner.scanHexInt64(&hexNumber)
        self.init(
            .sRGB,
            red: Double((hexNumber & 0xFF0000) >> 16) / 255,
            green: Double((hexNumber & 0x00FF00) >> 8) / 255,
            blue: Double(hexNumber & 0x0000FF) / 255
        )
    }
}

// Typography (from layout.tsx fonts)
extension Font {
    static func rajdhani(_ size: CGFloat, weight: Font.Weight = .bold) -> Font {
        .custom("Rajdhani", size: size).weight(weight)
    }
    static func quicksand(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        .custom("Quicksand", size: size).weight(weight)
    }
}

// Custom Button Styles (from the gold CTA buttons)
struct PotomacPrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.rajdhani(14, weight: .bold))
            .foregroundStyle(.black)
            .background(Color.potomacYellow)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .opacity(configuration.isPressed ? 0.8 : 1)
            .shadow(color: .potomacYellow.opacity(0.3), radius: 8, y: 4)
    }
}

extension ButtonStyle where Self == PotomacPrimaryButtonStyle {
    static var potomacPrimary: PotomacPrimaryButtonStyle { .init() }
}`}
            />
          </CollapsibleSection>

          {/* ── 2.7 State Management ───────────────────────────────────────── */}
          <CollapsibleSection title="STATE MANAGEMENT" colors={colors} badge="DATA">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              The web app uses React contexts (AuthContext, ThemeContext, TabContext, FontSizeContext) and local useState hooks. Translate these to SwiftUI&apos;s observation framework.
            </p>
            <div style={{ overflow: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '12px', padding: '12px 0', borderBottom: `2px solid rgba(254,192,15,0.3)`, fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', fontFamily: "'Rajdhani', sans-serif" }}>
                <span style={{ color: '#FEC00F' }}>REACT PATTERN</span>
                <span style={{ color: '#8ddb8c' }}>SWIFTUI PATTERN</span>
                <span style={{ color: colors.textMuted }}>MIGRATION NOTES</span>
              </div>
              <MappingRow jsComponent="createContext + useContext" swiftUI="@Observable + @Environment" notes="Create @Observable classes, inject via .environment() modifier at app root." colors={colors} />
              <MappingRow jsComponent="useState" swiftUI="@State" notes="Direct 1:1 mapping. @State for local view state, triggers re-render on change." colors={colors} />
              <MappingRow jsComponent="useEffect([], [])" swiftUI=".task { } / .onAppear" notes="Use .task for async on-appear work. Auto-cancelled on view disappear." colors={colors} />
              <MappingRow jsComponent="useEffect(dep)" swiftUI=".onChange(of: dep)" notes="Replaces effects that watch specific dependencies." colors={colors} />
              <MappingRow jsComponent="useRef" swiftUI="@State (non-rendering)" notes="For non-rendering references, use plain properties on ViewModel." colors={colors} />
              <MappingRow jsComponent="useCallback" swiftUI="Not needed" notes="SwiftUI handles view identity and diffing. No memoization required." colors={colors} />
              <MappingRow jsComponent="useMemo" swiftUI="Computed property" notes="Use computed properties on @Observable. Cached automatically." colors={colors} />
              <MappingRow jsComponent="localStorage" swiftUI="@AppStorage / Keychain" notes="@AppStorage for UserDefaults-backed preferences. Keychain for secrets." colors={colors} />
            </div>
          </CollapsibleSection>

          {/* ── 2.8 API & Networking ───────────────────────────────────────── */}
          <CollapsibleSection title="API CLIENT & NETWORKING" colors={colors} badge="NETWORK">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              Replace the existing src/lib/api.ts with a Swift actor-based API client using URLSession for type-safe networking.
            </p>
            <CodeSnippet
              title="APIClient.swift"
              language="swift"
              colors={colors}
              code={`actor APIClient {
    static let shared = APIClient()

    private let baseURL = URL(string: "https://potomac-analyst-workbench-production.up.railway.app")!
    private let session: URLSession
    private let decoder: JSONDecoder

    init() {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 30
        self.session = URLSession(configuration: config)
        self.decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        decoder.dateDecodingStrategy = .iso8601
    }

    // Replaces: apiClient.login()
    func login(email: String, password: String) async throws -> AuthResponse {
        let body = ["email": email, "password": password]
        return try await post("/api/v2/auth/login", body: body)
    }

    // Replaces: apiClient.getConversations()
    func getConversations(token: String) async throws -> [Conversation] {
        try await get("/api/v2/conversations", token: token)
    }

    // Replaces: apiClient.getMessages()
    func getMessages(conversationId: String, token: String) async throws -> [Message] {
        try await get("/api/v2/conversations/\\(conversationId)/messages", token: token)
    }

    // Replaces: apiClient.uploadDocument()
    func uploadDocument(_ data: Data, filename: String, token: String) async throws -> Document {
        var request = URLRequest(url: baseURL.appending(path: "/api/v2/brain/upload"))
        request.httpMethod = "POST"
        request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")

        let boundary = UUID().uuidString
        request.setValue("multipart/form-data; boundary=\\(boundary)", forHTTPHeaderField: "Content-Type")

        var body = Data()
        body.append("--\\(boundary)\\r\\n".data(using: .utf8)!)
        body.append("Content-Disposition: form-data; name=\\"file\\"; filename=\\"\\(filename)\\"\\r\\n".data(using: .utf8)!)
        body.append("Content-Type: application/octet-stream\\r\\n\\r\\n".data(using: .utf8)!)
        body.append(data)
        body.append("\\r\\n--\\(boundary)--\\r\\n".data(using: .utf8)!)
        request.httpBody = body

        let (responseData, _) = try await session.data(for: request)
        return try decoder.decode(Document.self, from: responseData)
    }

    // Generic typed request helpers
    private func get<T: Decodable>(_ path: String, token: String? = nil) async throws -> T {
        var request = URLRequest(url: baseURL.appending(path: path))
        if let token { request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization") }
        let (data, _) = try await session.data(for: request)
        return try decoder.decode(T.self, from: data)
    }

    private func post<T: Decodable>(_ path: String, body: [String: Any], token: String? = nil) async throws -> T {
        var request = URLRequest(url: baseURL.appending(path: path))
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if let token { request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization") }
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        let (data, _) = try await session.data(for: request)
        return try decoder.decode(T.self, from: data)
    }
}`}
            />
          </CollapsibleSection>

          {/* ── 2.9 Layout & Responsiveness ────────────────────────────────── */}
          <CollapsibleSection title="LAYOUT & RESPONSIVENESS" colors={colors} badge="LAYOUT">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              The web app uses manual isMobile/isTablet breakpoints (useResponsive hook). SwiftUI provides native adaptive layout with size classes and ViewThatFits.
            </p>
            <CodeSnippet
              title="Adaptive Layout Example"
              language="swift"
              colors={colors}
              code={`struct AdaptiveLayout: View {
    // Replaces: useResponsive() hook
    @Environment(\\.horizontalSizeClass) private var sizeClass

    var body: some View {
        // Automatically adapts layout based on device/orientation
        if sizeClass == .compact {
            // iPhone portrait: Stack vertically (like isMobile=true)
            VStack { content }
        } else {
            // iPad / iPhone landscape: Side by side (like isMobile=false)
            HStack { content }
        }
    }

    @ViewBuilder
    private var content: some View {
        ConversationListView()
        ChatMessagesView()
    }
}

// Replaces: MobilePageContainer.tsx
struct MobilePageContainer<Content: View>: View {
    let title: String
    @ViewBuilder let content: () -> Content

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                content()
            }
            .padding()
        }
        .navigationTitle(title)
        .navigationBarTitleDisplayMode(.large)
    }
}`}
            />
          </CollapsibleSection>

          {/* ── 2.10 Icon Mapping ──────────────────────────────────────────── */}
          <CollapsibleSection title="ICON MAPPING (LUCIDE → SF SYMBOLS)" colors={colors} badge="ICONS">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              Map every Lucide icon used in the codebase to its closest SF Symbols equivalent for native iOS rendering.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '8px' }}>
              {[
                { lucide: 'LayoutDashboard', sf: 'square.grid.2x2' },
                { lucide: 'Code2', sf: 'chevron.left.forwardslash.chevron.right' },
                { lucide: 'MessageCircle', sf: 'message' },
                { lucide: 'Database', sf: 'cylinder' },
                { lucide: 'TrendingUp', sf: 'chart.line.uptrend.xyaxis' },
                { lucide: 'Zap', sf: 'bolt.fill' },
                { lucide: 'Settings', sf: 'gearshape' },
                { lucide: 'Sparkles', sf: 'sparkles' },
                { lucide: 'Search', sf: 'magnifyingglass' },
                { lucide: 'Upload', sf: 'arrow.up.doc' },
                { lucide: 'Trash2', sf: 'trash' },
                { lucide: 'Copy', sf: 'doc.on.doc' },
                { lucide: 'Eye / EyeOff', sf: 'eye / eye.slash' },
                { lucide: 'LogIn / LogOut', sf: 'arrow.right.circle / rectangle.portrait.and.arrow.right' },
                { lucide: 'Menu / X', sf: 'line.3.horizontal / xmark' },
                { lucide: 'Plus', sf: 'plus' },
                { lucide: 'ChevronLeft/Right', sf: 'chevron.left / chevron.right' },
                { lucide: 'Loader2', sf: 'ProgressView()' },
                { lucide: 'FileText', sf: 'doc.text' },
                { lucide: 'ArrowRight', sf: 'arrow.right' },
              ].map((item) => (
                <div key={item.lucide} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, fontSize: '12px' }}>
                  <code style={{ color: '#FEC00F', fontFamily: 'monospace', flex: 1, fontSize: '11px' }}>{item.lucide}</code>
                  <ArrowRight size={10} color={colors.textMuted} />
                  <code style={{ color: '#8ddb8c', fontFamily: 'monospace', flex: 1, fontSize: '11px' }}>{item.sf}</code>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* ── 2.11 Testing & Deployment ──────────────────────────────────── */}
          <CollapsibleSection title="TESTING & DEPLOYMENT" colors={colors} badge="SHIP">
            <p style={{ color: colors.textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              Recommended testing strategy and deployment approach for the iOS app.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { icon: Shield, title: 'Unit Tests', desc: 'Test ViewModels with XCTest. Mock APIClient using protocol-based dependency injection. Test auth flows, message parsing, and state transitions.' },
                { icon: Monitor, title: 'UI Tests', desc: 'Use XCUITest for critical user flows: login, sending messages, uploading documents. Test both light and dark mode appearances.' },
                { icon: Smartphone, title: 'Preview Testing', desc: 'Leverage SwiftUI Previews for rapid iteration. Create preview fixtures for every screen matching the mockups above.' },
                { icon: GitBranch, title: 'CI/CD Pipeline', desc: 'Use Xcode Cloud or Fastlane for automated builds. Deploy to TestFlight for beta testing, then App Store submission.' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} style={{ padding: '20px', borderRadius: '14px', backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(254,192,15,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <Icon size={20} color="#FEC00F" />
                    </div>
                    <h4 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px', fontWeight: 600, color: colors.text, letterSpacing: '0.5px', marginBottom: '8px' }}>{item.title}</h4>
                    <p style={{ fontSize: '12px', color: colors.textMuted, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </CollapsibleSection>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer style={{ padding: '32px 0', borderTop: `1px solid ${colors.border}`, textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: colors.textMuted }}>
            Potomac Analyst Workbench - iOS Developer Blueprint v1.0
          </p>
        </footer>
      </div>
    </div>
  )
}

export default DeveloperPage

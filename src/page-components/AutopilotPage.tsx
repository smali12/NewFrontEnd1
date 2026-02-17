'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Monitor, Activity, FileText, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ActivityLog {
  id: number;
  time: string;
  action: string;
  status: 'success' | 'active' | 'pending';
}

interface AppWindow {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

export default function AutopilotPage() {
  const { resolvedTheme } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [activeWindows, setActiveWindows] = useState<AppWindow[]>([
    { id: 'amy', title: 'Amy Broker', icon: '💼', x: 20, y: 15, width: 35, height: 40, active: false },
    { id: 'optima', title: 'Optima', icon: '📊', x: 45, y: 25, width: 35, height: 40, active: false },
    { id: 'files', title: 'File Explorer', icon: '📁', x: 15, y: 55, width: 30, height: 30, active: false },
  ]);

  const isDark = resolvedTheme === 'dark';

  const startAutopilot = () => {
    setIsRunning(true);
    setActivityLogs([]);
    simulateYangActions();
  };

  const stopAutopilot = () => {
    setIsRunning(false);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCursorPos({ x: 50, y: 50 });
    setActivityLogs([]);
    setActiveWindows(windows =>
      windows.map(w => ({ ...w, active: false }))
    );
  };

  const simulateYangActions = () => {
    const actions = [
      { time: '00:01', action: 'Yang initialized - analyzing desktop environment', status: 'success' as const },
      { time: '00:02', action: 'Opening Amy Broker application', status: 'active' as const, window: 'amy' },
      { time: '00:04', action: 'Reading market data from Amy Broker', status: 'success' as const },
      { time: '00:06', action: 'Switching to Optima for portfolio optimization', status: 'active' as const, window: 'optima' },
      { time: '00:08', action: 'Analyzing portfolio allocation strategies', status: 'success' as const },
      { time: '00:10', action: 'Opening File Explorer to access trading logs', status: 'active' as const, window: 'files' },
      { time: '00:12', action: 'Modifying configuration file: trading_params.json', status: 'success' as const },
      { time: '00:14', action: 'Learning new task: automated risk assessment', status: 'active' as const },
      { time: '00:16', action: 'Executing multi-application workflow', status: 'success' as const },
      { time: '00:18', action: 'Task completed - ready for next instruction', status: 'success' as const },
    ];

    let currentAction = 0;

    const interval = setInterval(() => {
      if (currentAction >= actions.length) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }

      const action = actions[currentAction];
      setActivityLogs(prev => [...prev, { id: currentAction, ...action }]);

      // Activate corresponding window
      if (action.window) {
        setActiveWindows(windows =>
          windows.map(w => ({ ...w, active: w.id === action.window }))
        );

        // Move cursor to window
        const targetWindow = activeWindows.find(w => w.id === action.window);
        if (targetWindow) {
          setCursorPos({ x: targetWindow.x + 10, y: targetWindow.y + 10 });
        }
      }

      // Simulate cursor movement
      if (currentAction % 2 === 0) {
        setCursorPos({
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 15,
        });
      }

      currentAction++;
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      }}
    >
      {/* Coming Soon Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg animate-pulse">
          <Zap className="w-5 h-5" />
          <span>COMING SOON</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 
          className="text-5xl font-bold mb-2 text-balance"
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
        >
          Auto Pilot Preview
        </h1>
        <p 
          className="text-lg"
          style={{ color: isDark ? '#94a3b8' : '#475569' }}
        >
          {'Watch Yang take autonomous control of your computer'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Windows Desktop Simulation */}
        <div className="lg:col-span-2">
          <div 
            className="rounded-xl shadow-2xl overflow-hidden"
            style={{
              background: isDark ? '#1e293b' : '#ffffff',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            }}
          >
            {/* Windows Taskbar */}
            <div 
              className="flex items-center gap-2 px-4 py-2"
              style={{
                background: isDark ? '#0f172a' : '#1e40af',
                borderBottom: `1px solid ${isDark ? '#1e293b' : '#1e3a8a'}`,
              }}
            >
              <Monitor className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold">{'Windows Desktop - Yang AI Control'}</span>
            </div>

            {/* Desktop Area */}
            <div 
              className="relative p-4"
              style={{
                height: '500px',
                background: isDark 
                  ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
              }}
            >
              {/* Application Windows */}
              {activeWindows.map((window) => (
                <div
                  key={window.id}
                  className="absolute rounded-lg shadow-xl transition-all duration-300"
                  style={{
                    left: `${window.x}%`,
                    top: `${window.y}%`,
                    width: `${window.width}%`,
                    height: `${window.height}%`,
                    background: isDark ? '#ffffff' : '#ffffff',
                    border: window.active ? '3px solid #06b6d4' : '1px solid #cbd5e1',
                    transform: window.active ? 'scale(1.02)' : 'scale(1)',
                    zIndex: window.active ? 10 : 1,
                  }}
                >
                  {/* Window Title Bar */}
                  <div 
                    className="flex items-center justify-between px-3 py-2"
                    style={{
                      background: window.active ? '#06b6d4' : '#64748b',
                      color: '#ffffff',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{window.icon}</span>
                      <span className="text-sm font-semibold">{window.title}</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-white/30"></div>
                      <div className="w-3 h-3 rounded-full bg-white/30"></div>
                      <div className="w-3 h-3 rounded-full bg-white/30"></div>
                    </div>
                  </div>

                  {/* Window Content */}
                  <div className="p-4 h-full" style={{ color: '#1e293b' }}>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-slate-200 rounded w-5/6 animate-pulse"></div>
                      <div className="h-3 bg-slate-200 rounded w-4/6 animate-pulse"></div>
                      {window.active && (
                        <div className="mt-4 p-2 bg-cyan-100 rounded text-xs font-semibold text-cyan-900">
                          {'Yang is working here...'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Animated Cursor */}
              {isRunning && (
                <div
                  className="absolute w-6 h-6 transition-all duration-1000 ease-in-out pointer-events-none"
                  style={{
                    left: `${cursorPos.x}%`,
                    top: `${cursorPos.y}%`,
                  }}
                >
                  <div className="relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                        fill="#06b6d4"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="absolute -top-1 -left-1 w-8 h-8 bg-cyan-400 rounded-full opacity-50 animate-ping"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div 
            className="mt-6 p-6 rounded-xl shadow-lg"
            style={{
              background: isDark ? '#1e293b' : '#ffffff',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            }}
          >
            <h3 
              className="text-xl font-bold mb-4 flex items-center gap-2"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              <Activity className="w-5 h-5 text-cyan-500" />
              {'Control Panel'}
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={startAutopilot}
                disabled={isRunning}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{
                  background: isRunning 
                    ? '#64748b' 
                    : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                }}
              >
                <Play className="w-5 h-5" />
                {'Go into Autopilot'}
              </button>

              <button
                onClick={stopAutopilot}
                disabled={!isRunning}
                className="px-6 py-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isDark ? '#334155' : '#f1f5f9',
                  color: isDark ? '#ffffff' : '#0f172a',
                }}
              >
                <Pause className="w-5 h-5" />
              </button>

              <button
                onClick={resetDemo}
                className="px-6 py-4 rounded-lg font-semibold transition-all duration-200"
                style={{
                  background: isDark ? '#334155' : '#f1f5f9',
                  color: isDark ? '#ffffff' : '#0f172a',
                }}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div 
          className="rounded-xl shadow-lg p-6"
          style={{
            background: isDark ? '#1e293b' : '#ffffff',
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
          }}
        >
          <h3 
            className="text-xl font-bold mb-4 flex items-center gap-2"
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          >
            <FileText className="w-5 h-5 text-cyan-500" />
            {'Activity Log'}
          </h3>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {activityLogs.length === 0 ? (
              <p 
                className="text-sm text-center py-8"
                style={{ color: isDark ? '#64748b' : '#94a3b8' }}
              >
                {'Click "Go into Autopilot" to start the demo'}
              </p>
            ) : (
              activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg transition-all duration-200"
                  style={{
                    background: isDark ? '#0f172a' : '#f8fafc',
                    border: `1px solid ${
                      log.status === 'success' ? '#10b981' :
                      log.status === 'active' ? '#06b6d4' :
                      isDark ? '#334155' : '#e2e8f0'
                    }`,
                  }}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        background: log.status === 'success' ? '#10b981' :
                                   log.status === 'active' ? '#06b6d4' : '#64748b',
                      }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p 
                        className="text-xs font-semibold mb-1"
                        style={{ color: isDark ? '#94a3b8' : '#64748b' }}
                      >
                        {log.time}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                      >
                        {log.action}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: '🎯',
            title: 'Autonomous Control',
            description: 'Yang takes full control of mouse and keyboard to execute complex tasks',
          },
          {
            icon: '🧠',
            title: 'Intelligent Learning',
            description: 'Learns new workflows by observing user actions without manual programming',
          },
          {
            icon: '🔄',
            title: 'Multi-App Integration',
            description: 'Seamlessly works across Amy Broker, Optima, and file systems',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg"
            style={{
              background: isDark ? '#1e293b' : '#ffffff',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            }}
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h4 
              className="text-lg font-bold mb-2"
              style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            >
              {feature.title}
            </h4>
            <p 
              className="text-sm"
              style={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

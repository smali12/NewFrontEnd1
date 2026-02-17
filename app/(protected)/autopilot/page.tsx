'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Mouse, FileEdit, Cpu, Brain, Zap, Play, Pause, RotateCcw } from 'lucide-react';

export default function AutoPilotPage() {
  const [isAutoPilotActive, setIsAutoPilotActive] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [taskLog, setTaskLog] = useState<string[]>([]);
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  // Simulated tasks Yang can perform
  const tasks = [
    { name: 'Analyzing Amy Broker portfolio data...', duration: 2000, window: 'amy-broker' },
    { name: 'Optimizing Optima trading strategy...', duration: 2500, window: 'optima' },
    { name: 'Creating comprehensive market report...', duration: 3000, window: 'file-explorer' },
    { name: 'Updating risk parameters across platforms...', duration: 2000, window: 'amy-broker' },
    { name: 'Learning new trading patterns from user behavior...', duration: 3500, window: 'optima' },
    { name: 'Modifying configuration files for better performance...', duration: 2000, window: 'file-explorer' },
  ];

  useEffect(() => {
    if (isAutoPilotActive) {
      let taskIndex = 0;
      const executeTask = () => {
        if (taskIndex < tasks.length) {
          const task = tasks[taskIndex];
          setCurrentTask(task.name);
          setActiveWindow(task.window);
          setTaskLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${task.name}`]);

          // Simulate mouse movement
          const moveInterval = setInterval(() => {
            setMousePosition({
              x: Math.random() * 80 + 10,
              y: Math.random() * 70 + 15,
            });
          }, 200);

          setTimeout(() => {
            clearInterval(moveInterval);
            taskIndex++;
            if (taskIndex < tasks.length) {
              executeTask();
            } else {
              setIsAutoPilotActive(false);
              setCurrentTask('All tasks completed successfully!');
              setActiveWindow(null);
            }
          }, task.duration);
        }
      };
      executeTask();
    }
  }, [isAutoPilotActive]);

  // Create cursor trail effect
  useEffect(() => {
    if (isAutoPilotActive) {
      const trailId = Date.now();
      setCursorTrail((prev) => [...prev, { ...mousePosition, id: trailId }].slice(-8));
    }
  }, [mousePosition, isAutoPilotActive]);

  const handleStartAutoPilot = () => {
    setTaskLog([]);
    setCursorTrail([]);
    setIsAutoPilotActive(true);
  };

  const handleReset = () => {
    setIsAutoPilotActive(false);
    setCurrentTask('');
    setActiveWindow(null);
    setTaskLog([]);
    setCursorTrail([]);
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/40 text-xs font-semibold px-3 py-1">
                COMING SOON
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 text-xs font-semibold px-3 py-1">
                PREVIEW DEMO
              </Badge>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
              Auto Pilot Preview
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Experience Yang's autonomous capabilities. Watch as Yang takes control, learns from your workflow, and executes complex tasks across multiple applications without human intervention.
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleStartAutoPilot}
                disabled={isAutoPilotActive}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all disabled:opacity-50"
              >
                {isAutoPilotActive ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Auto Pilot Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Go into Autopilot
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="border-slate-700 hover:bg-slate-800 text-slate-300"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Demo
              </Button>
            </div>
            {currentTask && (
              <div className="flex items-center gap-3 bg-slate-950/50 px-4 py-2 rounded-lg border border-cyan-500/30">
                <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
                <span className="text-sm text-slate-300">{currentTask}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Mouse, label: 'Autonomous Mouse Control', color: 'cyan' },
            { icon: FileEdit, label: 'File Manipulation', color: 'blue' },
            { icon: Cpu, label: 'Multi-App Integration', color: 'purple' },
            { icon: Brain, label: 'Intelligent Learning', color: 'pink' },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="bg-slate-900/30 border-slate-800 p-4 flex items-center gap-3 hover:bg-slate-900/50 transition-all"
            >
              <div className={`p-2 rounded-lg bg-${feature.color}-500/10`}>
                <feature.icon className={`h-5 w-5 text-${feature.color}-400`} />
              </div>
              <span className="text-sm text-slate-300 font-medium">{feature.label}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Windows Desktop Simulation */}
      <div className="max-w-7xl mx-auto">
        <Card className="bg-slate-950 border-slate-800 overflow-hidden shadow-2xl">
          {/* Windows Taskbar */}
          <div className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 px-4 py-2 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-slate-400 font-semibold">YANG OS</span>
            </div>
            <div className="flex gap-2 ml-4">
              <div className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${activeWindow === 'amy-broker' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                Amy Broker
              </div>
              <div className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${activeWindow === 'optima' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                Optima
              </div>
              <div className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${activeWindow === 'file-explorer' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                File Explorer
              </div>
            </div>
          </div>

          {/* Desktop Area */}
          <div className="relative h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Windows */}
            <div className="absolute inset-0 p-6 space-y-4">
              {/* Amy Broker Window */}
              <div
                className={`absolute top-8 left-8 w-96 transition-all duration-500 ${
                  activeWindow === 'amy-broker' ? 'opacity-100 z-30 scale-100' : 'opacity-40 scale-95 z-10'
                }`}
              >
                <Card className="bg-slate-950 border-blue-500/50 shadow-2xl shadow-blue-500/20">
                  <div className="bg-blue-950 border-b border-blue-800 px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-200">Amy Broker - Portfolio</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Total Value:</span>
                      <span className="text-green-400 font-semibold">$524,832.00</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-3/4 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      {['AAPL', 'MSFT', 'GOOGL'].map((stock) => (
                        <div key={stock} className="flex justify-between text-xs bg-slate-900 p-2 rounded">
                          <span className="text-slate-300">{stock}</span>
                          <span className="text-green-400">+{(Math.random() * 5).toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Optima Window */}
              <div
                className={`absolute top-24 right-8 w-96 transition-all duration-500 ${
                  activeWindow === 'optima' ? 'opacity-100 z-30 scale-100' : 'opacity-40 scale-95 z-10'
                }`}
              >
                <Card className="bg-slate-950 border-purple-500/50 shadow-2xl shadow-purple-500/20">
                  <div className="bg-purple-950 border-b border-purple-800 px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-200">Optima - Trading Strategy</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-slate-900 p-3 rounded font-mono text-xs text-purple-300">
                      <div>{'// AFL Strategy Code'}</div>
                      <div className="text-slate-500">{'Buy = Cross(MACD(), Signal());'}</div>
                      <div className="text-slate-500">{'Sell = Cross(Signal(), MACD());'}</div>
                      <div className="text-purple-400 animate-pulse">{'// Optimizing...'}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Backtest Result:</span>
                      <span className="text-green-400 font-semibold">+42.3% ROI</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* File Explorer Window */}
              <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-80 transition-all duration-500 ${
                  activeWindow === 'file-explorer' ? 'opacity-100 z-30 scale-100' : 'opacity-40 scale-95 z-10'
                }`}
              >
                <Card className="bg-slate-950 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
                  <div className="bg-cyan-950 border-b border-cyan-800 px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-200">File Explorer</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    {['market_report.pdf', 'config.json', 'trading_strategy.afl', 'portfolio_data.csv'].map((file) => (
                      <div key={file} className="flex items-center gap-2 text-xs bg-slate-900 p-2 rounded hover:bg-slate-800 transition-all">
                        <FileEdit className="h-3 w-3 text-cyan-400" />
                        <span className="text-slate-300">{file}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Animated Cursor */}
            {isAutoPilotActive && (
              <>
                {/* Cursor trail */}
                {cursorTrail.map((pos, idx) => (
                  <div
                    key={pos.id}
                    className="absolute pointer-events-none transition-opacity duration-300"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      opacity: (idx + 1) / cursorTrail.length * 0.5,
                    }}
                  >
                    <Mouse className="h-4 w-4 text-cyan-400" />
                  </div>
                ))}
                {/* Main cursor */}
                <div
                  className="absolute pointer-events-none transition-all duration-200 ease-out z-50"
                  style={{ left: `${mousePosition.x}%`, top: `${mousePosition.y}%` }}
                >
                  <Mouse className="h-6 w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <Sparkles className="h-4 w-4 text-cyan-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Activity Log */}
        {taskLog.length > 0 && (
          <Card className="mt-6 bg-slate-950 border-slate-800 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-slate-300">Activity Log</h3>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto font-mono text-xs">
              {taskLog.map((log, idx) => (
                <div key={idx} className="text-slate-500 hover:text-slate-400 transition-colors">
                  {log}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

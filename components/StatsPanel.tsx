import { X, TrendingUp, TrendingDown, Target, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StatsPanelProps {
  onClose: () => void;
  inspectedCount: number;
  defectCount: number;
}

export function StatsPanel({ onClose, inspectedCount, defectCount }: StatsPanelProps) {
  const weeklyData = [
    { day: "Lun", inspected: 245, defects: 12 },
    { day: "Mar", inspected: 268, defects: 15 },
    { day: "Mié", inspected: 289, defects: 9 },
    { day: "Jue", inspected: 301, defects: 14 },
    { day: "Vie", inspected: 312, defects: 11 },
    { day: "Sáb", inspected: 198, defects: 8 }
  ];

  const defectTypes = [
    { name: "Costuras", value: 35, color: "#ef4444" },
    { name: "Manchas", value: 25, color: "#f59e0b" },
    { name: "Botones", value: 20, color: "#06b6d4" },
    { name: "Otros", value: 20, color: "#8b5cf6" }
  ];

  const hourlyData = [
    { hour: "08:00", rate: 4.2 },
    { hour: "10:00", rate: 3.8 },
    { hour: "12:00", rate: 5.1 },
    { hour: "14:00", rate: 4.5 },
    { hour: "16:00", rate: 3.9 },
    { hour: "18:00", rate: 4.7 }
  ];

  const efficiency = ((inspectedCount - defectCount) / inspectedCount * 100) || 0;
  const defectRate = ((defectCount / inspectedCount) * 100) || 0;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4 overflow-auto">
      <div className="bg-[#282a2c] rounded-xl border-2 border-[#3a3c3e] max-w-7xl w-full max-h-[95vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="bg-[#1b1c1d] border-b-2 border-[#3a3c3e] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 md:gap-3">
            <Activity className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
            <h2 className="text-white text-lg md:text-xl uppercase tracking-wider">Dashboard de Estadísticas</h2>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </div>

        <div className="p-3 md:p-6 space-y-4 md:space-y-6">
          {/* KPIs Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Total Inspeccionadas */}
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl p-4 md:p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-white/80" />
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
              </div>
              <div className="text-2xl md:text-4xl text-white mb-1">{inspectedCount}</div>
              <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide">Total Inspeccionadas</div>
              <div className="text-xs text-white/60 mt-2">+12% vs ayer</div>
            </div>

            {/* Defectos */}
            <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-xl p-4 md:p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-white/80" />
                <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
              </div>
              <div className="text-2xl md:text-4xl text-white mb-1">{defectCount}</div>
              <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide">Defectos Detectados</div>
              <div className="text-xs text-white/60 mt-2">-5% vs ayer</div>
            </div>

            {/* Eficiencia */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-4 md:p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-white/80" />
                <Activity className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
              </div>
              <div className="text-2xl md:text-4xl text-white mb-1">{efficiency.toFixed(1)}%</div>
              <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide">Eficiencia Global</div>
              <div className="text-xs text-white/60 mt-2">Objetivo: 95%</div>
            </div>

            {/* Tasa de Rechazo */}
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl p-4 md:p-5 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-white/80" />
                <span className="text-xs md:text-sm text-white/60 uppercase">24h</span>
              </div>
              <div className="text-2xl md:text-4xl text-white mb-1">{defectRate.toFixed(1)}%</div>
              <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide">Tasa de Rechazo</div>
              <div className="text-xs text-white/60 mt-2">-2.3% mejora</div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
            {/* Producción Semanal */}
            <div className="bg-[#1b1c1d] rounded-xl border border-[#3a3c3e] p-4 md:p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-white text-base md:text-lg uppercase tracking-wide mb-1">Producción Semanal</h3>
                <p className="text-slate-400 text-xs md:text-sm">Prendas inspeccionadas vs defectos</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3a3c3e" />
                  <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1b1c1d', 
                      border: '1px solid #3a3c3e',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="inspected" fill="#06b6d4" name="Inspeccionadas" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="defects" fill="#ef4444" name="Defectos" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Distribución de Defectos */}
            <div className="bg-[#1b1c1d] rounded-xl border border-[#3a3c3e] p-4 md:p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-white text-base md:text-lg uppercase tracking-wide mb-1">Tipos de Defectos</h3>
                <p className="text-slate-400 text-xs md:text-sm">Distribución por categoría</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={defectTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {defectTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1b1c1d', 
                      border: '1px solid #3a3c3e',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {/* Tasa de Defectos por Hora */}
            <div className="lg:col-span-2 bg-[#1b1c1d] rounded-xl border border-[#3a3c3e] p-4 md:p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-white text-base md:text-lg uppercase tracking-wide mb-1">Tasa de Defectos por Hora</h3>
                <p className="text-slate-400 text-xs md:text-sm">Tendencia durante el día</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3a3c3e" />
                  <XAxis dataKey="hour" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1b1c1d', 
                      border: '1px solid #3a3c3e',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Tasa (%)"
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Resumen de Líneas */}
            <div className="bg-[#1b1c1d] rounded-xl border border-[#3a3c3e] p-4 md:p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-white text-base md:text-lg uppercase tracking-wide mb-1">Estado de Líneas</h3>
                <p className="text-slate-400 text-xs md:text-sm">Resumen en tiempo real</p>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Línea A', efficiency: 98, status: 'excellent' },
                  { name: 'Línea B', efficiency: 94, status: 'good' },
                  { name: 'Línea C', efficiency: 96, status: 'good' },
                  { name: 'Línea D', efficiency: 89, status: 'warning' }
                ].map((line, idx) => (
                  <div key={idx} className="bg-[#282a2c] rounded-lg p-3 border border-[#3a3c3e]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">{line.name}</span>
                      <span className={`text-sm ${
                        line.status === 'excellent' ? 'text-emerald-400' :
                        line.status === 'good' ? 'text-cyan-400' : 'text-amber-400'
                      }`}>
                        {line.efficiency}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#1b1c1d] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          line.status === 'excellent' ? 'bg-emerald-500' :
                          line.status === 'good' ? 'bg-cyan-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${line.efficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-[#1b1c1d] rounded-lg border border-[#3a3c3e] p-3 md:p-4">
              <div className="text-slate-400 text-xs uppercase mb-1">Uptime Sistema</div>
              <div className="text-white text-xl md:text-2xl">99.8%</div>
              <div className="text-emerald-400 text-xs mt-1">Óptimo</div>
            </div>
            <div className="bg-[#1b1c1d] rounded-lg border border-[#3a3c3e] p-3 md:p-4">
              <div className="text-slate-400 text-xs uppercase mb-1">Tiempo Prom. Análisis</div>
              <div className="text-white text-xl md:text-2xl">1.2s</div>
              <div className="text-cyan-400 text-xs mt-1">Por prenda</div>
            </div>
            <div className="bg-[#1b1c1d] rounded-lg border border-[#3a3c3e] p-3 md:p-4">
              <div className="text-slate-400 text-xs uppercase mb-1">Precisión IA</div>
              <div className="text-white text-xl md:text-2xl">96.3%</div>
              <div className="text-violet-400 text-xs mt-1">Confianza</div>
            </div>
            <div className="bg-[#1b1c1d] rounded-lg border border-[#3a3c3e] p-3 md:p-4">
              <div className="text-slate-400 text-xs uppercase mb-1">Ahorro Mensual</div>
              <div className="text-white text-xl md:text-2xl">$8.5K</div>
              <div className="text-amber-400 text-xs mt-1">Vs manual</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

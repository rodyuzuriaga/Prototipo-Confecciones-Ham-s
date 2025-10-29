import { Gauge, Zap, TrendingUp } from "lucide-react";
import { Progress } from "./ui/progress";

interface ControlPanelProps {
  isRunning: boolean;
  speed: number;
}

export function ControlPanel({ isRunning, speed }: ControlPanelProps) {
  const efficiency = isRunning ? Math.random() * 10 + 90 : 0;
  const temperature = isRunning ? Math.random() * 5 + 42 : 25;

  return (
    <div className="bg-[#1b1c1d] rounded-xl border-2 border-[#3a3c3e] p-4 md:p-5 shadow-xl flex-1">
      <h3 className="text-white uppercase tracking-wider mb-3 md:mb-4 text-xs md:text-sm flex items-center gap-2">
        <Gauge className="w-4 h-4 text-slate-400" />
        Parámetros del Sistema
      </h3>
      
      <div className="space-y-3 md:space-y-4">
        {/* Speed */}
        <div className="bg-[#282a2c] p-2 md:p-3 rounded-lg border border-[#3a3c3e]">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 md:gap-2">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
              <span className="text-slate-300 text-[10px] md:text-xs uppercase">Velocidad</span>
            </div>
            <span className="text-white text-xs md:text-sm">{isRunning ? speed.toFixed(0) : '0'} u/h</span>
          </div>
          <Progress value={isRunning ? (speed / 100) * 100 : 0} className="h-2" />
        </div>

        {/* Efficiency */}
        <div className="bg-[#282a2c] p-2 md:p-3 rounded-lg border border-[#3a3c3e]">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1 md:gap-2">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-slate-300 text-[10px] md:text-xs uppercase">Eficiencia</span>
            </div>
            <span className="text-white text-xs md:text-sm">{efficiency.toFixed(1)}%</span>
          </div>
          <Progress value={efficiency} className="h-2" />
        </div>

        {/* Temperature */}
        <div className="bg-[#282a2c] p-2 md:p-3 rounded-lg border border-[#3a3c3e]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 text-[10px] md:text-xs uppercase">Temperatura CPU</span>
            <span className={`text-xs md:text-sm ${temperature > 45 ? 'text-amber-400' : 'text-white'}`}>
              {temperature.toFixed(1)}°C
            </span>
          </div>
          <Progress value={(temperature / 60) * 100} className="h-2" />
        </div>

        {/* AI Model */}
        <div className="bg-[#282a2c] p-2 md:p-3 rounded-lg border border-[#3a3c3e]">
          <div className="text-slate-400 text-[10px] md:text-xs uppercase mb-1">Modelo IA Activo</div>
          <div className="text-white text-xs md:text-sm">Vision AI v2.0</div>
          <div className="text-violet-400 text-[10px] md:text-xs mt-1">Confianza óptima: 85%+</div>
        </div>
      </div>
    </div>
  );
}

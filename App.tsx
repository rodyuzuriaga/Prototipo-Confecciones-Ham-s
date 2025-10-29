import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Camera, Play, Square, Settings, BarChart3, AlertTriangle, CheckCircle2, XCircle, Eye } from "lucide-react";
import { InspectionCamera } from "./components/InspectionCamera";
import { DefectLog } from "./components/DefectLog";
import { ControlPanel } from "./components/ControlPanel";
import { StatsPanel } from "./components/StatsPanel";
import { ConfigDialog } from "./components/ConfigDialog";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [defectCount, setDefectCount] = useState(0);
  const [inspectedCount, setInspectedCount] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setInspectedCount(prev => prev + 1);
        setCurrentSpeed(Math.random() * 20 + 80); // 80-100 prendas/hora
        
        // Simular detección de defectos ocasionales
        if (Math.random() > 0.92) {
          setDefectCount(prev => prev + 1);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="h-screen bg-[#1b1c1d] flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="bg-[#282a2c] border-b-2 border-[#3a3c3e] px-4 md:px-6 py-3 flex flex-col md:flex-row items-center justify-between shadow-2xl gap-3 md:gap-0">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 md:p-2.5 rounded-lg shadow-lg">
            <Camera className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl text-white tracking-wide">HAM'S QC VISION AI</h1>
            <p className="text-cyan-400 text-xs md:text-sm">Sistema de Control de Calidad Industrial</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center">
          {/* System Status */}
          <div className="flex items-center gap-2 md:gap-3 bg-[#1b1c1d] px-3 md:px-4 py-2 rounded-lg border border-[#3a3c3e]">
            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isRunning ? 'bg-cyan-500 animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-white uppercase text-xs md:text-sm tracking-wider">
              {isRunning ? 'ACTIVO' : 'DETENIDO'}
            </span>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-2 md:gap-3">
            <div className="bg-[#1b1c1d] px-2 md:px-4 py-1.5 md:py-2 rounded-lg border border-cyan-500/30">
              <div className="text-cyan-400 text-[10px] md:text-xs uppercase">Inspecc.</div>
              <div className="text-white text-base md:text-xl">{inspectedCount}</div>
            </div>
            <div className="bg-[#1b1c1d] px-2 md:px-4 py-1.5 md:py-2 rounded-lg border border-red-500/30">
              <div className="text-red-400 text-[10px] md:text-xs uppercase">Defectos</div>
              <div className="text-white text-base md:text-xl">{defectCount}</div>
            </div>
          </div>

          <div className="text-slate-400 text-xs md:text-sm hidden md:block">
            {new Date().toLocaleString('es-ES', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* Left Control Panel */}
        <div className="md:w-80 bg-[#282a2c] border-b-2 md:border-b-0 md:border-r-2 border-[#3a3c3e] p-3 md:p-4 flex flex-col gap-3 md:gap-4 overflow-auto">
          {/* Main Controls */}
          <div className="bg-[#1b1c1d] rounded-xl border-2 border-[#3a3c3e] p-4 md:p-5 shadow-xl">
            <h3 className="text-white uppercase tracking-wider mb-3 md:mb-4 text-xs md:text-sm">Control Principal</h3>
            
            <div className="space-y-2 md:space-y-3">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                className={`w-full h-12 md:h-16 text-sm md:text-lg uppercase tracking-wider ${
                  isRunning 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' 
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
                } shadow-lg transition-all`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                    <span className="hidden md:inline">Detener Sistema</span>
                    <span className="md:hidden">Detener</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                    <span className="hidden md:inline">Iniciar Inspección</span>
                    <span className="md:hidden">Iniciar</span>
                  </>
                )}
              </Button>

              <Button
                onClick={() => setShowStats(!showStats)}
                variant="outline"
                className="w-full h-10 md:h-12 border-2 border-violet-500/50 text-violet-400 hover:bg-violet-500/10 uppercase tracking-wider text-xs md:text-sm"
              >
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {showStats ? 'Ocultar' : 'Mostrar'} Estadísticas
              </Button>

              <Button
                onClick={() => setShowConfig(!showConfig)}
                variant="outline"
                className="w-full h-10 md:h-12 border-2 border-slate-500/50 text-slate-400 hover:bg-slate-500/10 uppercase tracking-wider text-xs md:text-sm"
              >
                <Settings className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Configuración
              </Button>
            </div>
          </div>

          {/* Control Panel */}
          <ControlPanel isRunning={isRunning} speed={currentSpeed} />

          {/* Camera Status */}
          <div className="bg-[#1b1c1d] rounded-xl border-2 border-[#3a3c3e] p-4 md:p-5 shadow-xl hidden md:block">
            <h3 className="text-white uppercase tracking-wider mb-3 md:mb-4 text-xs md:text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-400" />
              Estado de Cámaras
            </h3>
            
            <div className="space-y-2">
              {[
                { id: 1, name: 'CAM-01 ENTRADA', status: 'active' },
                { id: 2, name: 'CAM-02 LATERAL', status: 'active' },
                { id: 3, name: 'CAM-03 SALIDA', status: 'active' },
                { id: 4, name: 'CAM-04 DETALLE', status: 'warning' }
              ].map(cam => (
                <div key={cam.id} className="flex items-center justify-between bg-[#282a2c] p-2 rounded border border-[#3a3c3e]">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      cam.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`} />
                    <span className="text-slate-300 text-xs">{cam.name}</span>
                  </div>
                  <Badge variant={cam.status === 'active' ? 'default' : 'secondary'} className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                    {cam.status === 'active' ? 'OK' : 'ALERTA'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Main Inspection View */}
        <div className="flex-1 flex flex-col p-2 md:p-4 gap-2 md:gap-4 overflow-auto">
          <InspectionCamera isRunning={isRunning} onDefectDetected={() => setDefectCount(prev => prev + 1)} />
        </div>

        {/* Right - Defect Log */}
        <div className="md:w-96 bg-[#282a2c] border-t-2 md:border-t-0 md:border-l-2 border-[#3a3c3e] p-3 md:p-4 overflow-auto">
          <DefectLog defectCount={defectCount} />
        </div>
      </div>

      {/* Config Dialog */}
      {showConfig && <ConfigDialog onClose={() => setShowConfig(false)} />}
      
      {/* Stats Panel */}
      {showStats && <StatsPanel onClose={() => setShowStats(false)} inspectedCount={inspectedCount} defectCount={defectCount} />}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { AlertTriangle, FileText, X, CheckCircle2 } from "lucide-react";

interface DefectLogProps {
  defectCount: number;
}

export function DefectLog({ defectCount }: DefectLogProps) {
  const [defects, setDefects] = useState<any[]>([]);

  useEffect(() => {
    if (defectCount > 0) {
      const newDefect = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString('es-ES'),
        type: ['Costura irregular', 'Mancha en tela', 'Botón defectuoso', 'Medidas incorrectas', 'Decoloración'][Math.floor(Math.random() * 5)],
        severity: Math.random() > 0.4 ? 'high' : 'medium',
        confidence: (Math.random() * 15 + 85).toFixed(1),
        position: `X:${Math.floor(Math.random() * 200)} Y:${Math.floor(Math.random() * 150)}`,
        camera: `CAM-0${Math.floor(Math.random() * 4) + 1}`
      };
      
      setDefects(prev => [newDefect, ...prev].slice(0, 50));
    }
  }, [defectCount]);

  return (
    <div className="h-full bg-[#1b1c1d] rounded-xl border-2 border-[#3a3c3e] shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-[#282a2c] border-b-2 border-[#3a3c3e] px-3 md:px-4 py-2 md:py-3">
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
            <h2 className="text-white uppercase tracking-wider text-sm md:text-base">Registro de Defectos</h2>
          </div>
          <Badge variant="destructive" className="text-xs md:text-sm">
            {defects.length}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#282a2c] p-2 rounded border border-red-500/30">
            <div className="text-red-400 text-[10px] md:text-xs uppercase">Alta Sev.</div>
            <div className="text-white text-base md:text-lg">{defects.filter(d => d.severity === 'high').length}</div>
          </div>
          <div className="bg-[#282a2c] p-2 rounded border border-yellow-500/30">
            <div className="text-yellow-400 text-[10px] md:text-xs uppercase">Media Sev.</div>
            <div className="text-white text-base md:text-lg">{defects.filter(d => d.severity === 'medium').length}</div>
          </div>
        </div>
      </div>

      {/* Defect List */}
      <ScrollArea className="flex-1 p-2 md:p-4">
        <div className="space-y-2 md:space-y-3">
          {defects.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <div className="bg-cyan-500/10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-cyan-500" />
              </div>
              <p className="text-slate-400 text-xs md:text-sm">Sin defectos detectados</p>
              <p className="text-slate-600 text-[10px] md:text-xs mt-1">El sistema está monitoreando</p>
            </div>
          ) : (
            defects.map((defect, idx) => (
              <div 
                key={defect.id}
                className={`bg-[#282a2c] border-2 ${
                  defect.severity === 'high' ? 'border-red-500/50' : 'border-yellow-500/50'
                } rounded-lg p-2 md:p-3 hover:shadow-lg transition-all ${
                  idx === 0 ? 'animate-in slide-in-from-top duration-300' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-1 md:mb-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <AlertTriangle className={`w-3 h-3 md:w-4 md:h-4 ${
                      defect.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                    <span className={`text-[10px] md:text-xs uppercase tracking-wider ${
                      defect.severity === 'high' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {defect.severity === 'high' ? 'ALTA' : 'MEDIA'}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[10px] md:text-xs font-mono">{defect.timestamp}</span>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <div>
                    <div className="text-white text-xs md:text-sm mb-1">{defect.type}</div>
                    <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs flex-wrap">
                      <Badge variant="secondary" className="text-[10px] md:text-xs">
                        {defect.camera}
                      </Badge>
                      <span className="text-slate-500">{defect.position}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="text-slate-500 text-[10px] md:text-xs">Confianza:</div>
                      <div className="text-cyan-400 text-xs md:text-sm">{defect.confidence}%</div>
                    </div>
                    
                    <div className="h-1.5 w-16 md:w-24 bg-[#1b1c1d] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${defect.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="bg-[#282a2c] border-t-2 border-[#3a3c3e] p-2 md:p-3">
        <button
          onClick={() => setDefects([])}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-1.5 md:py-2 rounded uppercase tracking-wider text-xs md:text-sm transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-3 h-3 md:w-4 md:h-4" />
          Limpiar Registro
        </button>
      </div>
    </div>
  );
}

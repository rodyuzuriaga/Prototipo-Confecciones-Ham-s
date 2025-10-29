import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AlertTriangle, Crosshair, Zap } from "lucide-react";

interface InspectionCameraProps {
  isRunning: boolean;
  onDefectDetected: () => void;
}

export function InspectionCamera({ isRunning, onDefectDetected }: InspectionCameraProps) {
  const [scanLine, setScanLine] = useState(0);
  const [detections, setDetections] = useState<any[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const scanInterval = setInterval(() => {
        setScanLine(prev => (prev + 2) % 100);
      }, 30);

      const analysisInterval = setInterval(() => {
        setAnalyzing(true);
        setConfidence(Math.random() * 15 + 85);
        
        // Simular detección de defectos
        if (Math.random() > 0.85) {
          const newDetection = {
            id: Date.now(),
            type: ['Costura irregular', 'Mancha', 'Botón defectuoso', 'Decoloración'][Math.floor(Math.random() * 4)],
            x: Math.random() * 60 + 20,
            y: Math.random() * 60 + 20,
            confidence: Math.random() * 20 + 80,
            severity: Math.random() > 0.5 ? 'high' : 'medium'
          };
          setDetections([newDetection]);
          onDefectDetected();
          
          setTimeout(() => setDetections([]), 4000);
        } else {
          setDetections([]);
        }
        
        setTimeout(() => setAnalyzing(false), 800);
      }, 3000);

      return () => {
        clearInterval(scanInterval);
        clearInterval(analysisInterval);
      };
    } else {
      setDetections([]);
      setScanLine(0);
    }
  }, [isRunning, onDefectDetected]);

  return (
    <div className="flex-1 bg-[#1b1c1d] rounded-xl border-2 border-[#3a3c3e] overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-[#282a2c] border-b-2 border-[#3a3c3e] px-3 md:px-6 py-2 md:py-3 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
        <div className="flex items-center gap-2 md:gap-3">
          <Crosshair className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
          <h2 className="text-white uppercase tracking-wider text-sm md:text-base">Vista de Inspección Principal</h2>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
          {analyzing && (
            <Badge className="bg-violet-600 text-white animate-pulse text-xs">
              <Zap className="w-3 h-3 mr-1" />
              <span className="hidden md:inline">ANALIZANDO</span>
            </Badge>
          )}
          
          <div className="flex items-center gap-1 md:gap-2 bg-[#1b1c1d] px-2 md:px-3 py-1 md:py-1.5 rounded border border-cyan-500/30">
            <div className="text-cyan-400 text-[10px] md:text-xs uppercase">Confianza IA</div>
            <div className="text-white text-sm md:text-base">{confidence.toFixed(1)}%</div>
          </div>

          {detections.length > 0 ? (
            <Badge className="bg-red-600 text-white animate-pulse text-xs">
              <AlertTriangle className="w-3 h-3 mr-1" />
              <span className="hidden md:inline">DEFECTO DETECTADO</span>
              <span className="md:hidden">DEFECTO</span>
            </Badge>
          ) : (
            <Badge className="bg-emerald-600 text-white text-xs">
              <span className="hidden md:inline">CALIDAD OK</span>
              <span className="md:hidden">OK</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative bg-black p-2 md:p-4">
        <div className="w-full h-full relative rounded-lg overflow-hidden border-2 border-[#3a3c3e]">
          {/* Camera Feed */}
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1558234200-3efd43232f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwcHJvZHVjdGlvbiUyMGZhY3Rvcnl8ZW58MXx8fHwxNzYxMTM5MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Inspección en vivo"
            className="w-full h-full object-cover"
          />

          {/* Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Vertical lines */}
            {[25, 50, 75].map(x => (
              <div 
                key={`v-${x}`}
                className="absolute h-full w-px bg-cyan-500/15"
                style={{ left: `${x}%` }}
              />
            ))}
            {/* Horizontal lines */}
            {[25, 50, 75].map(y => (
              <div 
                key={`h-${y}`}
                className="absolute w-full h-px bg-cyan-500/15"
                style={{ top: `${y}%` }}
              />
            ))}
          </div>

          {/* Scanning Line */}
          {isRunning && (
            <div 
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-100"
              style={{
                top: `${scanLine}%`,
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)'
              }}
            />
          )}

          {/* Crosshair center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-1/2 w-px h-4 bg-cyan-400 -translate-x-1/2" />
              <div className="absolute bottom-0 left-1/2 w-px h-4 bg-cyan-400 -translate-x-1/2" />
              <div className="absolute left-0 top-1/2 h-px w-4 bg-cyan-400 -translate-y-1/2" />
              <div className="absolute right-0 top-1/2 h-px w-4 bg-cyan-400 -translate-y-1/2" />
              <div className="absolute inset-0 border border-cyan-400/50 rounded-full" />
            </div>
          </div>

          {/* Detection Boxes */}
          {detections.map(detection => (
            <div
              key={detection.id}
              className="absolute border-4 border-red-500 bg-red-500/20 animate-pulse"
              style={{
                left: `${detection.x}%`,
                top: `${detection.y}%`,
                width: '20%',
                height: '25%',
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.8)'
              }}
            >
              <div className="absolute -top-8 left-0 bg-red-600 text-white px-3 py-1 text-sm whitespace-nowrap shadow-lg">
                {detection.type} - {detection.confidence.toFixed(1)}%
              </div>
              
              {/* Corner markers */}
              {[
                'top-0 left-0',
                'top-0 right-0',
                'bottom-0 left-0',
                'bottom-0 right-0'
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-3 h-3 bg-red-500`} />
              ))}
            </div>
          ))}

          {/* Info Overlay - Top Left */}
          <div className="absolute top-2 md:top-4 left-2 md:left-4 space-y-1 md:space-y-2">
            <div className="bg-black/80 backdrop-blur-sm px-2 md:px-3 py-1 md:py-2 rounded border border-cyan-500/50 text-cyan-400 text-xs md:text-sm">
              CAM-01 | ENTRADA
            </div>
            {isRunning && (
              <div className="bg-black/80 backdrop-blur-sm px-2 md:px-3 py-1 md:py-2 rounded border border-red-500/50 flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white text-xs md:text-sm">REC</span>
              </div>
            )}
          </div>

          {/* Timestamp - Bottom Right */}
          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-black/80 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded border border-slate-500/50">
            <div className="text-slate-400 text-[10px] md:text-xs">TIMESTAMP</div>
            <div className="text-white text-xs md:text-sm font-mono">
              {new Date().toLocaleTimeString('es-ES')}
            </div>
          </div>

          {/* Status - Bottom Left - Hidden on mobile */}
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-black/80 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded border border-slate-500/50 hidden md:block">
            <div className="text-slate-400 text-xs">RESOLUCIÓN</div>
            <div className="text-white text-sm">1920x1080 @ 60fps</div>
          </div>
        </div>
      </div>
    </div>
  );
}

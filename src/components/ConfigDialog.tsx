import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { X, Save, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "./ui/separator";

interface ConfigDialogProps {
  onClose: () => void;
}

export function ConfigDialog({ onClose }: ConfigDialogProps) {
  const [confidence, setConfidence] = useState([75]);
  const [autoReject, setAutoReject] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = () => {
    toast.success("Configuración guardada exitosamente");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4 overflow-auto">
      <div className="bg-[#282a2c] rounded-xl border-2 border-[#3a3c3e] max-w-3xl w-full max-h-[95vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="bg-[#1b1c1d] border-b-2 border-[#3a3c3e] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-400" />
            <h2 className="text-white text-base md:text-xl uppercase tracking-wider">Configuración del Sistema</h2>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-3 md:p-6 space-y-4 md:space-y-6">
          {/* AI Configuration */}
          <div className="bg-[#1b1c1d] rounded-lg border border-[#3a3c3e] p-4 md:p-5">
            <h3 className="text-white uppercase tracking-wider mb-3 md:mb-4 text-xs md:text-sm">Configuración de IA</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-slate-300">Umbral de Confianza Mínimo</Label>
                  <span className="text-cyan-400 text-sm">{confidence[0]}%</span>
                </div>
                <Slider 
                  value={confidence}
                  onValueChange={setConfidence}
                  min={50}
                  max={99}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Detectar defectos solo con confianza superior a este valor
                </p>
              </div>

              <Separator className="bg-[#3a3c3e]" />

              <div>
                <Label className="text-slate-300 mb-2 block">Modelo de IA</Label>
                <Select defaultValue="v2">
                  <SelectTrigger className="bg-[#282a2c] border-[#3a3c3e] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v1">Modelo v1.0 (Estándar)</SelectItem>
                    <SelectItem value="v2">Modelo v2.0 (Recomendado)</SelectItem>
                    <SelectItem value="v3">Modelo v3.0 Beta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">Sensibilidad de Detección</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="bg-[#282a2c] border-[#3a3c3e] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja - Menos falsos positivos</SelectItem>
                    <SelectItem value="medium">Media - Balanceado</SelectItem>
                    <SelectItem value="high">Alta - Máxima detección</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-[#3a3c3e]" />

              <div className="flex items-center justify-between bg-[#282a2c] p-3 rounded">
                <div>
                  <Label className="text-slate-300">Rechazo Automático</Label>
                  <p className="text-xs text-slate-500 mt-1">Rechazar automáticamente defectos críticos</p>
                </div>
                <Switch checked={autoReject} onCheckedChange={setAutoReject} />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#1b1c1d] rounded-lg border border-[#3a3c3e] p-4 md:p-5">
            <h3 className="text-white uppercase tracking-wider mb-4 text-sm">Notificaciones</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[#282a2c] p-3 rounded">
                <div>
                  <Label className="text-slate-300">Alertas por Email</Label>
                  <p className="text-xs text-slate-500 mt-1">Notificaciones de defectos críticos</p>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>

              <div className="flex items-center justify-between bg-[#282a2c] p-3 rounded">
                <div>
                  <Label className="text-slate-300">Alertas Sonoras</Label>
                  <p className="text-xs text-slate-500 mt-1">Sonido al detectar defecto</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Camera Settings */}
          <div className="bg-[#1b1c1d] rounded-lg border border-[#3a3c3e] p-4 md:p-5">
            <h3 className="text-white uppercase tracking-wider mb-4 text-sm">Configuración de Cámaras</h3>
            
            <div className="space-y-3">
              <div>
                <Label className="text-slate-300 mb-2 block">Resolución</Label>
                <Select defaultValue="1080p">
                  <SelectTrigger className="bg-[#282a2c] border-[#3a3c3e] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="720p">1280x720 (HD)</SelectItem>
                    <SelectItem value="1080p">1920x1080 (Full HD)</SelectItem>
                    <SelectItem value="4k">3840x2160 (4K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">FPS (Cuadros por segundo)</Label>
                <Select defaultValue="60">
                  <SelectTrigger className="bg-[#282a2c] border-[#3a3c3e] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 FPS</SelectItem>
                    <SelectItem value="60">60 FPS</SelectItem>
                    <SelectItem value="120">120 FPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 md:gap-3 flex-col md:flex-row">
            <Button 
              onClick={handleSave}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white h-10 md:h-12 uppercase tracking-wider text-xs md:text-sm"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Configuración
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 border-2 border-slate-500 h-10 md:h-12 uppercase tracking-wider text-xs md:text-sm"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

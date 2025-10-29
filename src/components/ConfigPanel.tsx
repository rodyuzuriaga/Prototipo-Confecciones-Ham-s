import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Settings, Camera, Bell, Database, Shield, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { toast } from "sonner";

export function ConfigPanel() {
  const [confidence, setConfidence] = useState([75]);
  const [autoReject, setAutoReject] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);

  const handleSave = () => {
    toast.success("Configuración guardada exitosamente");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            Configuración del Sistema
          </CardTitle>
          <CardDescription className="text-slate-400">
            Ajusta los parámetros del sistema de inspección IA
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          {/* AI Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-blue-400" />
              <h3 className="text-white">Parámetros de IA</h3>
            </div>
            
            <div className="space-y-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="confidence" className="text-slate-300">
                    Umbral de Confianza Mínimo
                  </Label>
                  <span className="text-blue-400">{confidence[0]}%</span>
                </div>
                <Slider 
                  id="confidence"
                  value={confidence}
                  onValueChange={setConfidence}
                  min={50}
                  max={99}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-slate-500">
                  El sistema solo reportará defectos con confianza superior a este valor
                </p>
              </div>

              <Separator className="bg-slate-700" />

              <div className="space-y-2">
                <Label htmlFor="model" className="text-slate-300">
                  Modelo de IA
                </Label>
                <Select defaultValue="v2">
                  <SelectTrigger id="model" className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v1">Modelo v1.0 (Estándar)</SelectItem>
                    <SelectItem value="v2">Modelo v2.0 (Recomendado)</SelectItem>
                    <SelectItem value="v3">Modelo v3.0 Beta (Experimental)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sensitivity" className="text-slate-300">
                  Sensibilidad de Detección
                </Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="sensitivity" className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja - Menos falsos positivos</SelectItem>
                    <SelectItem value="medium">Media - Balanceado</SelectItem>
                    <SelectItem value="high">Alta - Máxima detección</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-reject" className="text-slate-300">
                    Rechazo Automático
                  </Label>
                  <p className="text-xs text-slate-500">
                    Rechazar automáticamente defectos de alta severidad
                  </p>
                </div>
                <Switch 
                  id="auto-reject"
                  checked={autoReject}
                  onCheckedChange={setAutoReject}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white">Notificaciones</h3>
            </div>
            
            <div className="space-y-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-alerts" className="text-slate-300">
                    Alertas por Email
                  </Label>
                  <p className="text-xs text-slate-500">
                    Recibir notificaciones de defectos críticos por email
                  </p>
                </div>
                <Switch 
                  id="email-alerts"
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                />
              </div>

              <Separator className="bg-slate-700" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="sound-alerts" className="text-slate-300">
                    Alertas Sonoras
                  </Label>
                  <p className="text-xs text-slate-500">
                    Reproducir sonido cuando se detecte un defecto
                  </p>
                </div>
                <Switch 
                  id="sound-alerts"
                  checked={soundAlerts}
                  onCheckedChange={setSoundAlerts}
                />
              </div>

              <Separator className="bg-slate-700" />

              <div className="space-y-2">
                <Label htmlFor="email-list" className="text-slate-300">
                  Lista de Emails
                </Label>
                <Input 
                  id="email-list"
                  type="email"
                  placeholder="calidad@hams.com, produccion@hams.com"
                  className="bg-slate-900 border-slate-700 text-white"
                  defaultValue="calidad@hams.com"
                />
              </div>
            </div>
          </div>

          {/* Database Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-green-400" />
              <h3 className="text-white">Base de Datos</h3>
            </div>
            
            <div className="space-y-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <div className="space-y-2">
                <Label htmlFor="retention" className="text-slate-300">
                  Retención de Datos
                </Label>
                <Select defaultValue="90">
                  <SelectTrigger id="retention" className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 días</SelectItem>
                    <SelectItem value="90">90 días</SelectItem>
                    <SelectItem value="180">180 días</SelectItem>
                    <SelectItem value="365">1 año</SelectItem>
                    <SelectItem value="unlimited">Ilimitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Exportar Datos
                </Button>
                <Button variant="outline" className="flex-1">
                  Respaldar BD
                </Button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-400" />
              <h3 className="text-white">Seguridad</h3>
            </div>
            
            <div className="space-y-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <div className="space-y-2">
                <Label htmlFor="access-level" className="text-slate-300">
                  Nivel de Acceso
                </Label>
                <Select defaultValue="admin">
                  <SelectTrigger id="access-level" className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                    <SelectItem value="operator">Operador</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <p className="text-slate-400 text-xs mb-1">Usuarios Activos</p>
                  <p className="text-white text-xl">12</p>
                </div>
                <div className="bg-slate-800 p-3 rounded border border-slate-700">
                  <p className="text-slate-400 text-xs mb-1">Sesiones Abiertas</p>
                  <p className="text-white text-xl">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2">
              <Save className="w-4 h-4" />
              Guardar Configuración
            </Button>
            <Button variant="outline" className="flex-1">
              Restaurar Predeterminados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

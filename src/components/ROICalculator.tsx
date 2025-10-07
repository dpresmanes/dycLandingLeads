import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Target, DollarSign } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { useLeadCaptureContext } from '../contexts/LeadCaptureContext';

interface ROIData {
  monthlyRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
  marketingBudget: number;
}

interface ROIResults {
  currentMonthlyLeads: number;
  projectedMonthlyLeads: number;
  currentMonthlyRevenue: number;
  projectedMonthlyRevenue: number;
  monthlyROI: number;
  annualROI: number;
  paybackPeriod: number;
}

const ROICalculator: React.FC = () => {
  const [formData, setFormData] = useState<ROIData>({
    monthlyRevenue: 0,
    conversionRate: 0,
    averageOrderValue: 0,
    marketingBudget: 0
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const { openModal } = useLeadCaptureContext();

  const calculateROI = () => {
    const { monthlyRevenue, conversionRate, averageOrderValue, marketingBudget } = formData;
    
    // Validación de campos requeridos
    if (!monthlyRevenue || !conversionRate || !averageOrderValue || !marketingBudget) {
      // Track invalid submit attempt
      trackEvent('roi_calculator_submit', { status: 'error', reason: 'validation_failed' });
      alert('Por favor, completa todos los campos para calcular el ROI.');
      return;
    }
    
    // Cálculos base
    const currentMonthlyLeads = monthlyRevenue / averageOrderValue;
    const currentTrafficNeeded = currentMonthlyLeads / (conversionRate / 100);
    
    // Proyecciones más realistas con nuestros servicios (mejora del 50-150%)
    const projectedConversionRate = conversionRate * 1.4; // Mejora del 40% en conversión
    const projectedTraffic = currentTrafficNeeded * 1.3; // Aumento del 30% en tráfico
    
    const projectedMonthlyLeads = (projectedTraffic * projectedConversionRate) / 100;
    const projectedMonthlyRevenue = projectedMonthlyLeads * averageOrderValue;
    
    const monthlyROI = ((projectedMonthlyRevenue - monthlyRevenue - marketingBudget) / marketingBudget) * 100;
    const annualROI = monthlyROI * 12;
    const paybackPeriod = marketingBudget / (projectedMonthlyRevenue - monthlyRevenue);
    
    const calculatedResults: ROIResults = {
      currentMonthlyLeads: Math.round(currentMonthlyLeads),
      projectedMonthlyLeads: Math.round(projectedMonthlyLeads),
      currentMonthlyRevenue: monthlyRevenue,
      projectedMonthlyRevenue: Math.round(projectedMonthlyRevenue),
      monthlyROI: Math.round(monthlyROI),
      annualROI: Math.round(annualROI),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10
    };
    
    setResults(calculatedResults);
    setShowResults(true);
    // Track when the user sees ROI results
    trackEvent('roi_calculator_view', {
      monthlyROI: calculatedResults.monthlyROI,
      projectedMonthlyRevenue: calculatedResults.projectedMonthlyRevenue,
      marketingBudget: formData.marketingBudget
    });
    // Track successful submit
    trackEvent('roi_calculator_submit', {
      status: 'success',
      monthlyRevenue,
      conversionRate,
      averageOrderValue,
      marketingBudget
    });
  };

  const handleInputChange = (field: keyof ROIData, value: string) => {
    // Si el valor está vacío, mantenerlo como string vacío para mostrar placeholder
    if (value === '') {
      setFormData(prev => ({ ...prev, [field]: 0 }));
      return;
    }
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const getDisplayValue = (value: number) => {
    return value === 0 ? '' : value.toString();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Calculator className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Calculadora de <span className="text-green-400">ROI</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Descubre el potencial de crecimiento de tu negocio con nuestras estrategias de marketing digital
              </p>
              <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-blue-300">
                  <strong>Nota:</strong> Los cálculos están basados en promedios de la industria y experiencias reales de nuestros clientes. 
                  Las proyecciones consideran una mejora del 40% en conversión y 30% en tráfico, que son resultados típicos 
                  alcanzables con estrategias de marketing digital bien implementadas.
                </p>
              </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-600/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Target className="h-6 w-6 text-green-400 mr-3" />
              Datos de tu Negocio
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Ingresos Mensuales Actuales ($)
                </label>
                <input
                  type="number"
                  value={getDisplayValue(formData.monthlyRevenue)}
                  onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Ej: 50000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tasa de Conversión Actual (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={getDisplayValue(formData.conversionRate)}
                  onChange={(e) => handleInputChange('conversionRate', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Ej: 2.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Valor Promedio de Pedido ($)
                </label>
                <input
                  type="number"
                  value={getDisplayValue(formData.averageOrderValue)}
                  onChange={(e) => handleInputChange('averageOrderValue', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Ej: 500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Presupuesto de Marketing Mensual ($)
                </label>
                <input
                  type="number"
                  value={getDisplayValue(formData.marketingBudget)}
                  onChange={(e) => handleInputChange('marketingBudget', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Ej: 5000"
                />
              </div>
              
              <button
                onClick={calculateROI}
                className="w-full bg-[#00FF88] text-black font-bold py-4 px-6 rounded-lg hover:bg-[#00FF88]/90 transition-all duration-300"
              >
                Calcular ROI Potencial
              </button>
            </div>
          </motion.div>

          {/* Resultados */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-600/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
              Proyección de Resultados
            </h3>
            
            {showResults && results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Leads Actuales</p>
                    <p className="text-2xl font-bold text-white">{results.currentMonthlyLeads}</p>
                  </div>
                  <div className="bg-green-900/30 rounded-lg p-4">
                    <p className="text-sm text-green-300 mb-1">Leads Proyectados</p>
                    <p className="text-2xl font-bold text-green-400">{results.projectedMonthlyLeads}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-1">Ingresos Actuales</p>
                    <p className="text-2xl font-bold text-white">${results.currentMonthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-900/30 rounded-lg p-4">
                    <p className="text-sm text-green-300 mb-1">Ingresos Proyectados</p>
                    <p className="text-2xl font-bold text-green-400">${results.projectedMonthlyRevenue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-green-900/20 rounded-lg p-6 border border-green-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="h-8 w-8 text-green-400" />
                    <span className="text-sm text-green-300">ROI Proyectado</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-green-300 mb-1">ROI Mensual</p>
                      <p className="text-3xl font-bold text-green-400">{results.monthlyROI}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-green-300 mb-1">ROI Anual</p>
                      <p className="text-3xl font-bold text-green-400">{results.annualROI}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-1">Período de Recuperación</p>
                  <p className="text-2xl font-bold text-white">{results.paybackPeriod} meses</p>
                </div>
                
                <div className="bg-yellow-900/30 rounded-lg p-4">
                  <p className="text-sm text-yellow-300 mb-2">💡 Incremento Proyectado</p>
                  <p className="text-lg font-semibold text-yellow-400">
                    ${(results.projectedMonthlyRevenue - results.currentMonthlyRevenue).toLocaleString()} mensuales
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Completa el formulario para ver tu potencial de crecimiento</p>
              </div>
            )}
          </motion.div>
        </div>
        
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-xl p-8 max-w-4xl mx-auto">
              <h4 className="text-2xl font-bold text-white mb-4">
                ¿Listo para hacer realidad estos resultados?
              </h4>
              <p className="text-gray-300 mb-6 text-lg">
                Nuestros clientes han experimentado crecimientos similares. ¡Tú podrías ser el siguiente!
              </p>
              <button
                onClick={() => {
                  trackEvent('purchase_cta_click', { location: 'roi_calculator' });
                  window.location.href = '/recursos/guias';
                }}
                className="inline-block bg-[#00FF88] text-black font-bold py-4 px-8 rounded-lg hover:bg-[#00FF88]/90 transition-all duration-300"
              >
                Comprar pack de automatizaciones • $17
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ROICalculator;
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Mock data - in real app this would come from the diagnostic results
const diagnosticData = {
  lgpd: 2,
  digitalizacao: 4,
  arrecadacao: 3,
  transparencia: 4,
  participacao: 2
};

const indicators = {
  lgpd: {
    name: "LGPD",
    fullName: "Lei Geral de Proteção de Dados",
    solution: "Consultoria LGPD + capacitação dos servidores",
    description: "Adequação completa à legislação de proteção de dados"
  },
  digitalizacao: {
    name: "Digitalização",
    fullName: "Digitalização de Processos",
    solution: "Plataforma de gestão documental integrada",
    description: "Modernização e automação de processos administrativos"
  },
  arrecadacao: {
    name: "Arrecadação",
    fullName: "Gestão de Arrecadação",
    solution: "Dashboard inteligente de receitas + BI",
    description: "Monitoramento e otimização da arrecadação municipal"
  },
  transparencia: {
    name: "Transparência",
    fullName: "Transparência Pública",
    solution: "Portal de transparência avançado",
    description: "Acesso facilitado a informações públicas para cidadãos"
  },
  participacao: {
    name: "Participação",
    fullName: "Participação Cidadã",
    solution: "Plataforma de engajamento digital",
    description: "Ferramentas para participação ativa dos cidadãos"
  }
};

export const DiagnosticDashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [overallScore, setOverallScore] = useState('');

  useEffect(() => {
    // Set current date
    setCurrentDate(new Date().toLocaleDateString('pt-BR'));
    
    // Calculate overall score
    const totalScore = Object.values(diagnosticData).reduce((sum, score) => sum + score, 0);
    const maxScore = Object.keys(diagnosticData).length * 5;
    const percentage = Math.round((totalScore / maxScore) * 100);
    setOverallScore(percentage + '%');
  }, []);

  const radarData = {
    labels: Object.keys(diagnosticData).map(key => indicators[key as keyof typeof indicators].name),
    datasets: [{
      label: 'Sua Cidade',
      data: Object.values(diagnosticData),
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 3,
      pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 3,
      pointRadius: 8,
    }]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          font: {
            size: 12
          },
          color: '#6b7280'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 'bold' as const
          },
          color: '#374151'
        }
      }
    }
  };

  const scheduleConsultation = (area: string) => {
    const areaName = indicators[area as keyof typeof indicators].fullName;
    const message = `Gostaria de agendar uma conversa sobre ${areaName}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://calendly.com/inovally/diagnostico?prefill_message=${encodedMessage}`, '_blank');
  };

  const viewSolutions = () => {
    // Simulate opening solutions page
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Redirecionando para catálogo de soluções...
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
      // In real app: window.location.href = '/solutions';
    }, 2000);
  };

  const requestPDF = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        PDF será enviado para seu e-mail em breve!
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  };

  const positiveAreas = Object.entries(diagnosticData).filter(([, score]) => score >= 4);
  const improvementAreas = Object.entries(diagnosticData).filter(([, score]) => score < 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel de Diagnóstico</h1>
                <p className="text-sm text-gray-600">Inovally Cidades Inteligentes</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Gerado em</p>
              <p className="font-semibold text-gray-900">{currentDate}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Section */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Resumo do Diagnóstico</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Análise completa da maturidade digital da sua cidade baseada em 5 indicadores essenciais.
                </p>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                    <span>{overallScore}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Nível Intermediário</p>
                    <p className="text-sm text-gray-600">Boa base com oportunidades de crescimento</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                  <p className="font-medium mb-2">Legenda de Pontuação:</p>
                  <div className="space-y-1">
                    <p><span className="font-semibold">1</span> – Inexistente</p>
                    <p><span className="font-semibold">3</span> – Parcialmente implementado</p>
                    <p><span className="font-semibold">5</span> – Maturidade avançada</p>
                  </div>
                </div>
              </div>
              
              <div className="relative w-full h-96 animate-scale-in">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Positive Points Section */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Pontos Positivos</h3>
            </div>
            
            <div className="space-y-4">
              {positiveAreas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Ainda não há áreas com pontuação alta, mas isso representa uma grande oportunidade de crescimento!</p>
                </div>
              ) : (
                positiveAreas.map(([key, score]) => (
                  <div key={key} className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500 transition-all duration-300 hover:translate-x-1 hover:shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{indicators[key as keyof typeof indicators].fullName}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">{score}/5</span>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Sua cidade demonstra forte desempenho em {indicators[key as keyof typeof indicators].fullName}, 
                      refletindo investimentos consistentes na modernização da gestão pública.
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Improvement Areas Section */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Áreas para Melhorar</h3>
            </div>
            
            <div className="space-y-6">
              {improvementAreas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Parabéns! Todas as áreas estão com boa pontuação.</p>
                </div>
              ) : (
                improvementAreas.map(([key, score]) => (
                  <div key={key} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500 transition-all duration-300 hover:translate-x-1 hover:shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 mr-3">{indicators[key as keyof typeof indicators].fullName}</h4>
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">{score}/5</span>
                        </div>
                        <p className="text-gray-700 mb-4">{indicators[key as keyof typeof indicators].description}</p>
                        
                        <div className="bg-white rounded-lg p-4 mb-4">
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 mb-1">Solução Inovally:</p>
                              <p className="text-gray-700">{indicators[key as keyof typeof indicators].solution}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => scheduleConsultation(key)} 
                      className="bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white font-semibold py-3 px-6 rounded-lg text-sm"
                    >
                      🔗 Agendar conversa com especialista
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">A maturidade digital da sua cidade está em construção</h3>
            <p className="text-lg mb-8 opacity-90">
              A Inovally pode acelerar esse processo com inteligência, parceria e soluções prontas.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button 
                onClick={viewSolutions} 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-white font-semibold py-4 px-8 rounded-xl text-lg"
              >
                Ver Soluções Disponíveis
              </button>
              <button 
                onClick={requestPDF} 
                className="bg-white text-blue-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300"
              >
                Receber Diagnóstico por E-mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
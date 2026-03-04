import React, { useState, useEffect, useMemo } from 'react';
import { 
  PlusCircle, 
  Wallet, 
  TrendingUp, 
  Calendar, 
  History, 
  BarChart3, 
  Save,
  AlertCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  Layers,
  CheckCircle2,
  RotateCcw,
  Settings,
  Globe,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  ReferenceLine,
  Cell,
  ComposedChart
} from 'recharts';

// --- DIZIONARIO TRADUZIONI ---
const translations = {
  it: {
    appTitle: "Smart Budget",
    appSubtitle: "Pianifica e Risparmia",
    totalSavings: "Risparmi Totali",
    monthlyBudget: "1. Budget Mensile",
    prevMonth: "Mese Precedente",
    income: "Entrate",
    goal: "Obiettivo",
    totalIncomeLabel: "Entrate Totali (€)",
    savingsGoalLabel: "Obiettivo Risparmio (€)",
    spendingLimit: "Limite Spesa",
    weeklyTarget: "Target Settimana",
    weeklyExpenses: "2. Spese Settimanali",
    weekExpenseLabel: "Spesa Settimana",
    insertExpense: "Inserisci spesa...",
    finalSummary: "3. Riepilogo Finale",
    calcTotalExpense: "Spesa Totale Calcolata (€)",
    manualEditNote: "Puoi modificare il totale manualmente se necessario.",
    extraBudget: "Extra budget:",
    netSavings: "Risparmio netto:",
    saveMonthBtn: "Salva e Archivia Mese",
    noDataHistory: "Nessun dato registrato negli ultimi mesi.",
    balance: "Saldo",
    spent: "Spesa",
    noDataCharts: "Dati insufficienti per i grafici.",
    savingsVsGoal: "Risparmio vs Obiettivo",
    expenseVsLimit: "Spesa vs Limite Mensile",
    totalAssetTime: "Asset Totale nel Tempo",
    navInsert: "Inserisci",
    navHistory: "Storico",
    navCharts: "Analisi",
    navSettings: "Imposta.",
    settingsTitle: "Impostazioni",
    selectLanguage: "Seleziona la tua lingua",
    confirmBudget: "Conferma Budget",
    saved: "Risparmi",
    limit: "Limite",
    cumulativeSavings: "Totale Accumulato",
    example: "Esempio:",
    overwriteModalTitle: "Attenzione",
    overwriteModalDesc: "Hai già salvato dei dati per questo mese. Sei sicuro di volerli sovrascrivere? I calcoli del tuo saldo totale verranno aggiornati di conseguenza.",
    btnCancel: "Annulla",
    btnOverwrite: "Sovrascrivi Mese",
    selectMonthTitle: "Seleziona Mese",
    confirm: "Conferma"
  },
  en: {
    appTitle: "Smart Budget",
    appSubtitle: "Plan and Save",
    totalSavings: "Total Savings",
    monthlyBudget: "1. Monthly Budget",
    prevMonth: "Previous Month",
    income: "Income",
    goal: "Goal",
    totalIncomeLabel: "Total Income (€)",
    savingsGoalLabel: "Savings Goal (€)",
    spendingLimit: "Spending Limit",
    weeklyTarget: "Weekly Target",
    weeklyExpenses: "2. Weekly Expenses",
    weekExpenseLabel: "Week Expense",
    insertExpense: "Enter expense...",
    finalSummary: "3. Final Summary",
    calcTotalExpense: "Calculated Total Expense (€)",
    manualEditNote: "You can modify the total manually if needed.",
    extraBudget: "Extra budget:",
    netSavings: "Net savings:",
    saveMonthBtn: "Save & Archive Month",
    noDataHistory: "No data recorded in recent months.",
    balance: "Balance",
    spent: "Spent",
    noDataCharts: "Insufficient data for charts.",
    savingsVsGoal: "Savings vs Goal",
    expenseVsLimit: "Expense vs Monthly Limit",
    totalAssetTime: "Total Asset over Time",
    navInsert: "Insert",
    navHistory: "History",
    navCharts: "Analysis",
    navSettings: "Settings",
    settingsTitle: "Settings",
    selectLanguage: "Select your language",
    confirmBudget: "Confirm Budget",
    saved: "Saved",
    limit: "Limit",
    cumulativeSavings: "Accumulated Total",
    example: "Example:",
    overwriteModalTitle: "Warning",
    overwriteModalDesc: "You have already saved data for this month. Are you sure you want to overwrite it? Your total balance calculations will be updated accordingly.",
    btnCancel: "Cancel",
    btnOverwrite: "Overwrite Month",
    selectMonthTitle: "Select Month",
    confirm: "Confirm"
  },
  fr: {
    appTitle: "Smart Budget",
    appSubtitle: "Planifiez et Économisez",
    totalSavings: "Économies Totales",
    monthlyBudget: "1. Budget Mensuel",
    prevMonth: "Mois Précédent",
    income: "Revenus",
    goal: "Objectif",
    totalIncomeLabel: "Revenus Totaux (€)",
    savingsGoalLabel: "Objectif d'Économie (€)",
    spendingLimit: "Limite Dépenses",
    weeklyTarget: "Cible Hebdo",
    weeklyExpenses: "2. Dépenses Hebdomadaires",
    weekExpenseLabel: "Dépense Semaine",
    insertExpense: "Entrez la dépense...",
    finalSummary: "3. Résumé Final",
    calcTotalExpense: "Dépense Totale Calculée (€)",
    manualEditNote: "Vous pouvez modifier le total manuellement.",
    extraBudget: "Dépassement:",
    netSavings: "Économies nettes:",
    saveMonthBtn: "Sauvegarder le Mois",
    noDataHistory: "Aucune donnée enregistrée ces derniers mois.",
    balance: "Solde",
    spent: "Dépensé",
    noDataCharts: "Données insuffisantes pour les graphiques.",
    savingsVsGoal: "Économies vs Objectif",
    expenseVsLimit: "Dépenses vs Limite",
    totalAssetTime: "Actif Total dans le Temps",
    navInsert: "Insérer",
    navHistory: "Historique",
    navCharts: "Analyse",
    navSettings: "Paramètres",
    settingsTitle: "Paramètres",
    selectLanguage: "Choisissez votre langue",
    confirmBudget: "Confirmer le Budget",
    saved: "Économisé",
    limit: "Limite",
    cumulativeSavings: "Total Cumulé",
    example: "Exemple:",
    overwriteModalTitle: "Attention",
    overwriteModalDesc: "Vous avez déjà enregistré des données pour ce mois. Êtes-vous sûr de vouloir les écraser ? Les calculs de votre solde total seront mis à jour en conséquence.",
    btnCancel: "Annuler",
    btnOverwrite: "Écraser le mois",
    selectMonthTitle: "Choisir le mois",
    confirm: "Confirmer"
  },
  es: {
    appTitle: "Smart Budget",
    appSubtitle: "Planifica y Ahorra",
    totalSavings: "Ahorros Totales",
    monthlyBudget: "1. Presupuesto Mensual",
    prevMonth: "Mes Anterior",
    income: "Ingresos",
    goal: "Meta",
    totalIncomeLabel: "Ingresos Totales (€)",
    savingsGoalLabel: "Meta de Ahorro (€)",
    spendingLimit: "Límite Gastos",
    weeklyTarget: "Meta Semanal",
    weeklyExpenses: "2. Gastos Semanales",
    weekExpenseLabel: "Gasto Semana",
    insertExpense: "Ingresar gasto...",
    finalSummary: "3. Resumen Final",
    calcTotalExpense: "Gasto Total Calculado (€)",
    manualEditNote: "Puedes modificar el total manualmente si es necesario.",
    extraBudget: "Presupuesto extra:",
    netSavings: "Ahorro neto:",
    saveMonthBtn: "Guardar y Archivar Mes",
    noDataHistory: "No hay datos registrados en los últimos meses.",
    balance: "Saldo",
    spent: "Gastado",
    noDataCharts: "Datos insuficientes para los gráficos.",
    savingsVsGoal: "Ahorro vs Meta",
    expenseVsLimit: "Gasto vs Límite",
    totalAssetTime: "Activo Total en el Tiempo",
    navInsert: "Insertar",
    navHistory: "Historial",
    navCharts: "Análisis",
    navSettings: "Ajustes",
    settingsTitle: "Ajustes",
    selectLanguage: "Selecciona tu idioma",
    confirmBudget: "Confirmar Presupuesto",
    saved: "Ahorrado",
    limit: "Límite",
    cumulativeSavings: "Total Acumulado",
    example: "Ejemplo:",
    overwriteModalTitle: "Atención",
    overwriteModalDesc: "Ya has guardado datos para este mes. ¿Estás seguro de que deseas sobrescribirlos? Los cálculos de tu saldo total se actualizarán en consecuencia.",
    btnCancel: "Cancelar",
    btnOverwrite: "Sobrescribir Mes",
    selectMonthTitle: "Seleccionar Mes",
    confirm: "Confirmar"
  }
};

const locales = {
  it: 'it-IT',
  en: 'en-GB',
  fr: 'fr-FR',
  es: 'es-ES'
};

const App = () => {
  // --- STATO INTERNAZIONALIZZAZIONE ---
  const [lang, setLang] = useState('it');
  const [hasInitLang, setHasInitLang] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
      setHasInitLang(true);
    } else {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          const country = data.country_code;
          if (country === 'IT') setLang('it');
          else if (country === 'FR') setLang('fr');
          else if (country === 'ES') setLang('es');
          else setLang('en');
        })
        .catch(() => setLang('en'))
        .finally(() => setHasInitLang(true));
    }
  }, []);

  useEffect(() => {
    if (hasInitLang) localStorage.setItem('appLanguage', lang);
  }, [lang, hasInitLang]);

  const t = (key) => translations[lang][key] || key;
  const formatEuro = (value) => new Intl.NumberFormat(locales[lang], { style: 'currency', currency: 'EUR' }).format(value);

  // --- STATO CORE APP ---
  const [totalSavings, setTotalSavings] = useState(() => {
    const saved = localStorage.getItem('totalSavings');
    return saved ? parseFloat(saved) : 0;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('budgetHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Mese Selezionato (YYYY-MM)
  const [selectedMonthId, setSelectedMonthId] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const [currentIncome, setCurrentIncome] = useState(0);
  const [currentSavingsGoal, setCurrentSavingsGoal] = useState(0);
  const [weeklyExpenses, setWeeklyExpenses] = useState([0, 0, 0, 0, 0]);
  const [savedWeeks, setSavedWeeks] = useState([false, false, false, false, false]);
  const [actualSpent, setActualSpent] = useState(0);
  const [view, setView] = useState('dashboard');
  const [activeWeekTab, setActiveWeekTab] = useState(0);
  const [isBudgetCollapsed, setIsBudgetCollapsed] = useState(false);
  const [showOverwriteModal, setShowOverwriteModal] = useState(false);
  
  // Stato per il nuovo Month Picker Custom
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());

  // Formatta Mese Id (YYYY-MM) in stringa leggibile (es. "Marzo 2026")
  const formatMonthName = (monthId) => {
    if(!monthId) return '';
    const [year, month] = monthId.split('-');
    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString(locales[lang], { month: 'long', year: 'numeric' });
  };

  // Carica i dati del mese selezionato se esistono già nello storico
  useEffect(() => {
    const existingEntry = history.find(e => e.monthId === selectedMonthId);
    if (existingEntry) {
      setCurrentIncome(existingEntry.income || 0);
      setCurrentSavingsGoal(existingEntry.goal || 0);
      setWeeklyExpenses(existingEntry.weeklyExpenses || [0, 0, 0, 0, 0]);
      setActualSpent(existingEntry.spent || 0);
      setSavedWeeks([false, false, false, false, false]); 
    } else {
      const savedDraftIncome = localStorage.getItem('currentIncome');
      setCurrentIncome(savedDraftIncome ? parseFloat(savedDraftIncome) : 0);
      
      const savedDraftGoal = localStorage.getItem('currentSavingsGoal');
      setCurrentSavingsGoal(savedDraftGoal ? parseFloat(savedDraftGoal) : 0);
      
      const savedDraftExpenses = localStorage.getItem('weeklyExpenses');
      if (savedDraftExpenses) {
        const parsed = JSON.parse(savedDraftExpenses);
        setWeeklyExpenses(parsed);
        setActualSpent(parsed.reduce((a, b) => a + b, 0));
      } else {
        setWeeklyExpenses([0, 0, 0, 0, 0]);
        setActualSpent(0);
      }
      setSavedWeeks([false, false, false, false, false]);
    }
    setIsBudgetCollapsed(false);
  }, [selectedMonthId, history]);

  useEffect(() => {
    localStorage.setItem('totalSavings', totalSavings.toString());
    localStorage.setItem('budgetHistory', JSON.stringify(history));
    
    const isAlreadySaved = history.some(e => e.monthId === selectedMonthId);
    if (!isAlreadySaved) {
      localStorage.setItem('currentIncome', currentIncome.toString());
      localStorage.setItem('currentSavingsGoal', currentSavingsGoal.toString());
      localStorage.setItem('weeklyExpenses', JSON.stringify(weeklyExpenses));
    }
  }, [totalSavings, history, currentIncome, currentSavingsGoal, weeklyExpenses, selectedMonthId]);

  const monthlySpendingLimit = Math.max(0, currentIncome - currentSavingsGoal);
  const weeklySpendingLimit = monthlySpendingLimit / 4.33;

  const getPrevMonthData = () => {
    const sortedHistory = [...history].sort((a, b) => b.monthId.localeCompare(a.monthId));
    return sortedHistory.find(e => e.monthId < selectedMonthId);
  };
  const prevMonth = getPrevMonthData();

  const loadPreviousMonthData = () => {
    if (prevMonth) {
      setCurrentIncome(prevMonth.income);
      setCurrentSavingsGoal(prevMonth.goal);
    }
  };

  const handleWeeklyChange = (index, value) => {
    const newExpenses = [...weeklyExpenses];
    newExpenses[index] = parseFloat(value) || 0;
    setWeeklyExpenses(newExpenses);
    
    const newSum = newExpenses.reduce((acc, curr) => acc + curr, 0);
    setActualSpent(newSum);

    const newSavedWeeks = [...savedWeeks];
    newSavedWeeks[index] = false;
    setSavedWeeks(newSavedWeeks);
  };

  const handleSaveWeek = (index) => {
    const newSavedWeeks = [...savedWeeks];
    newSavedWeeks[index] = true;
    setSavedWeeks(newSavedWeeks);
  };

  const handleCloseMonth = () => {
    if (currentIncome <= 0) return;
    
    const exists = history.some(e => e.monthId === selectedMonthId);
    if (exists) {
      setShowOverwriteModal(true);
    } else {
      executeSaveMonth();
    }
  };

  const executeSaveMonth = () => {
    const monthlySaving = currentIncome - actualSpent;
    
    const newEntry = {
      id: Date.now(), 
      monthId: selectedMonthId,
      timestamp: new Date(selectedMonthId + '-01').getTime(),
      income: currentIncome,
      goal: currentSavingsGoal,
      limit: monthlySpendingLimit,
      spent: actualSpent,
      saved: monthlySaving,
      weeklyExpenses: [...weeklyExpenses],
      cumulativeSavings: 0 
    };

    let newHistory = [...history];
    const existingIndex = newHistory.findIndex(e => e.monthId === selectedMonthId);
    
    if (existingIndex >= 0) {
      newEntry.id = newHistory[existingIndex].id;
      newHistory[existingIndex] = newEntry;
    } else {
      newHistory.push(newEntry);
    }

    newHistory.sort((a, b) => a.monthId.localeCompare(b.monthId));
    let runningTotal = 0;
    newHistory.forEach(entry => {
        runningTotal += entry.saved;
        entry.cumulativeSavings = runningTotal;
    });

    newHistory.sort((a, b) => b.monthId.localeCompare(a.monthId));

    setHistory(newHistory);
    setTotalSavings(newHistory.length > 0 ? newHistory[0].cumulativeSavings : 0);
    
    localStorage.removeItem('currentIncome');
    localStorage.removeItem('currentSavingsGoal');
    localStorage.removeItem('weeklyExpenses');
    setShowOverwriteModal(false);
    
    const now = new Date();
    setSelectedMonthId(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
    setView('history');
  };

  const chartData = useMemo(() => {
    return [...history].reverse().map(entry => {
      const displayDate = formatMonthName(entry.monthId);
      return {
        name: displayDate,
        saved: entry.saved,
        goal: entry.goal,
        spent: entry.spent,
        limit: entry.limit,
        cumulativeSavings: entry.cumulativeSavings
      };
    });
  }, [history, lang]);

  // Gestione Month Picker Custom
  const monthsList = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(2000, i, 1);
      return {
        id: String(i + 1).padStart(2, '0'),
        name: d.toLocaleDateString(locales[lang], { month: 'short' })
      };
    });
  }, [lang]);

  const selectPickerMonth = (monthId) => {
    setSelectedMonthId(`${pickerYear}-${monthId}`);
    setShowMonthPicker(false);
  };

  if (!hasInitLang) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 relative overflow-x-hidden">
      
      {/* HEADER */}
      <header className="bg-indigo-600 text-white p-6 rounded-b-[2.5rem] shadow-lg sticky top-0 z-20">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">{t('appTitle')}</h1>
            <p className="mt-1 inline-block bg-white/10 px-3 py-1 rounded-full text-indigo-50 text-xs font-medium tracking-wide">
              {t('appSubtitle')}
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6 -mt-6 relative z-10">
        
        {/* Card Saldo Totale */}
        {view !== 'settings' && (
          <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-16 h-16 text-indigo-600" />
            </div>
            <p className="text-slate-500 font-medium text-xs uppercase tracking-widest">{t('totalSavings')}</p>
            <h2 className={`text-4xl font-black mt-1 ${totalSavings >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {formatEuro(totalSavings)}
            </h2>
          </div>
        )}

        {/* DASHBOARD */}
        {view === 'dashboard' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            
            {/* 1. Impostazioni Iniziali */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 transition-all duration-300">
              <div className="flex justify-between items-center mb-4 select-none">
                <h3 
                  className="text-lg font-bold flex items-center gap-2 group hover:text-indigo-700 transition-colors cursor-pointer"
                  onClick={() => setIsBudgetCollapsed(!isBudgetCollapsed)}
                >
                  <Calendar className="w-5 h-5 text-indigo-600" /> {t('monthlyBudget')}
                  {isBudgetCollapsed ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
                </h3>

                {/* Selettore Mese Custom (Pulsante che apre il modale) */}
                <button 
                  onClick={() => setShowMonthPicker(true)}
                  className="relative group flex items-center"
                >
                  <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg uppercase tracking-tighter flex items-center gap-1 group-hover:bg-indigo-100 transition-all active:scale-95 shadow-sm">
                    {formatMonthName(selectedMonthId)} <ChevronDown className="w-3 h-3" />
                  </span>
                </button>
              </div>

              {!isBudgetCollapsed && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-6">
                  {prevMonth && (
                    <div className="mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('prevMonth')}</p>
                        <p className="text-xs font-medium text-slate-600">{t('income')}: {formatEuro(prevMonth.income)} | {t('goal')}: {formatEuro(prevMonth.goal)}</p>
                      </div>
                      <button 
                        onClick={loadPreviousMonthData}
                        className="p-2 bg-white rounded-xl shadow-sm text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Copia dati mese precedente"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('totalIncomeLabel')}</label>
                      <input 
                        type="number" 
                        value={currentIncome || ''} 
                        onChange={(e) => setCurrentIncome(parseFloat(e.target.value) || 0)}
                        placeholder={`${t('example')} 1500`}
                        className="w-full mt-1 p-4 bg-slate-50 border-0 rounded-2xl text-lg font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('savingsGoalLabel')}</label>
                      <input 
                        type="number" 
                        value={currentSavingsGoal || ''} 
                        onChange={(e) => setCurrentSavingsGoal(parseFloat(e.target.value) || 0)}
                        placeholder={`${t('example')} 300`}
                        className="w-full mt-1 p-4 bg-slate-50 border-0 rounded-2xl text-lg font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                  <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">{t('spendingLimit')}</p>
                  <p className="text-lg font-black text-indigo-700">{formatEuro(monthlySpendingLimit)}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <p className="text-[9px] font-bold text-amber-500 uppercase tracking-tighter">{t('weeklyTarget')}</p>
                  <p className="text-lg font-black text-amber-700">{formatEuro(weeklySpendingLimit)}</p>
                </div>
              </div>

              {!isBudgetCollapsed && (
                <button
                  onClick={() => setIsBudgetCollapsed(true)}
                  className="w-full mt-6 bg-indigo-50 text-indigo-700 py-3 rounded-xl font-bold text-sm hover:bg-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> {t('confirmBudget')}
                </button>
              )}
            </div>

            {/* 2. Dettaglio Settimanale */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" /> {t('weeklyExpenses')}
              </h3>
              
              <div className="flex gap-1 mb-4 bg-slate-50 p-1 rounded-2xl">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveWeekTab(idx)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${activeWeekTab === idx ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    W{idx + 1}
                    {savedWeeks[idx] && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                  </button>
                ))}
              </div>

              <div className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-300 ${savedWeeks[activeWeekTab] ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-transparent focus-within:border-indigo-200 focus-within:bg-white focus-within:shadow-sm'}`}>
                <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black shadow-sm transition-colors duration-300 ${savedWeeks[activeWeekTab] ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400'}`}>
                  W{activeWeekTab + 1}
                </span>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    {t('weekExpenseLabel')} {activeWeekTab + 1}
                  </label>
                  <input 
                    type="number"
                    value={weeklyExpenses[activeWeekTab] || ''}
                    onChange={(e) => handleWeeklyChange(activeWeekTab, e.target.value)}
                    placeholder={t('insertExpense')}
                    className="bg-transparent border-0 font-black text-xl text-slate-700 focus:ring-0 w-full p-0 outline-none"
                  />
                </div>
                
                {weeklyExpenses[activeWeekTab] > weeklySpendingLimit && weeklySpendingLimit > 0 && !savedWeeks[activeWeekTab] && (
                  <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
                )}

                <button 
                  onClick={() => handleSaveWeek(activeWeekTab)}
                  className={`p-3 rounded-xl transition-all duration-300 shrink-0 flex items-center justify-center ${savedWeeks[activeWeekTab] ? 'bg-emerald-100 text-emerald-600 scale-100' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:scale-105 active:scale-95'}`}
                >
                  {savedWeeks[activeWeekTab] ? <CheckCircle2 className="w-6 h-6" /> : <Save className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* 3. Conclusione Mese */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Save className="w-5 h-5 text-emerald-600" /> {t('finalSummary')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('calcTotalExpense')}</label>
                  <input 
                    type="number" 
                    value={actualSpent || ''} 
                    onChange={(e) => setActualSpent(parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 p-4 bg-emerald-50 border-0 rounded-2xl text-2xl font-black text-emerald-700 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 ml-1">{t('manualEditNote')}</p>
                </div>

                {currentIncome > 0 && (
                  <div className={`p-4 rounded-2xl flex items-center gap-3 ${actualSpent > monthlySpendingLimit ? 'bg-rose-50 border border-rose-100' : 'bg-emerald-50 border border-emerald-100'}`}>
                    <div className={actualSpent > monthlySpendingLimit ? 'text-rose-500' : 'text-emerald-500'}>
                      {actualSpent > monthlySpendingLimit ? <ArrowDownCircle /> : <ArrowUpCircle />}
                    </div>
                    <p className={`text-sm font-bold ${actualSpent > monthlySpendingLimit ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {actualSpent > monthlySpendingLimit 
                        ? `${t('extraBudget')} ${formatEuro(actualSpent - monthlySpendingLimit)}`
                        : `${t('netSavings')} ${formatEuro(currentIncome - actualSpent)}`}
                    </p>
                  </div>
                )}

                <button 
                  disabled={currentIncome <= 0}
                  onClick={handleCloseMonth}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50"
                >
                  {t('saveMonthBtn')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STORICO & GRAFICI & SETTINGS */}
        {view === 'history' && (
          <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-300">
            {history.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-slate-100">
                <History className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-medium text-sm">{t('noDataHistory')}</p>
              </div>
            ) : (
              history.map((entry) => (
                <div key={entry.id} className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">{formatMonthName(entry.monthId)}</p>
                    <h4 className="font-bold text-slate-800">{t('balance')}: {formatEuro(entry.saved)}</h4>
                    <p className="text-[10px] text-slate-500">{t('spent')}: {formatEuro(entry.spent)} / {t('goal')}: {formatEuro(entry.goal)}</p>
                  </div>
                  <div className={`p-3 rounded-2xl ${entry.saved >= entry.goal ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {entry.saved >= entry.goal ? <ArrowUpCircle className="w-6 h-6" /> : <ArrowDownCircle className="w-6 h-6" />}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {view === 'charts' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            {chartData.length === 0 ? (
               <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-slate-100">
               <BarChart3 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
               <p className="text-slate-400 font-medium text-sm">{t('noDataCharts')}</p>
             </div>
            ) : (
              <>
                <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{t('savingsVsGoal')}</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `€${val}`} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} formatter={(value, name) => [formatEuro(value), t(name)]}/>
                        <Bar dataKey="saved" name="saved" radius={[8, 8, 0, 0]}>
                          {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.saved >= entry.goal ? '#10b981' : '#f43f5e'} />))}
                        </Bar>
                        <Line type="monotone" dataKey="goal" name="goal" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{t('expenseVsLimit')}</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `€${val}`} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} formatter={(value, name) => [formatEuro(value), t(name)]}/>
                        <Bar dataKey="spent" name="spent" fill="#cbd5e1" radius={[8, 8, 0, 0]} />
                        <ReferenceLine y={chartData[chartData.length-1]?.limit} stroke="#f43f5e" strokeDasharray="5 5" label={{ position: 'top', value: t('limit'), fill: '#f43f5e', fontSize: 10, fontWeight: 'bold' }} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-xl">
                  <h3 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-6">{t('totalAssetTime')}</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <XAxis dataKey="name" fontSize={10} tick={{fill: '#6366f1'}} axisLine={false} />
                        <YAxis fontSize={10} tick={{fill: '#6366f1'}} axisLine={false} tickFormatter={(val) => `€${val}`} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} formatter={(value, name) => [formatEuro(value), t(name)]}/>
                        <Line type="stepAfter" dataKey="cumulativeSavings" name="cumulativeSavings" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {view === 'settings' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-indigo-600" /> {t('settingsTitle')}
              </h3>
              
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('selectLanguage')}</label>
                <div className="grid grid-cols-2 gap-3">
                  {[ { code: 'it', label: 'Italiano', flag: '🇮🇹' }, { code: 'en', label: 'English', flag: '🇬🇧' }, { code: 'fr', label: 'Français', flag: '🇫🇷' }, { code: 'es', label: 'Español', flag: '🇪🇸' } ].map(({code, label, flag}) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all duration-300 ${lang === code ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-100 bg-white hover:border-indigo-200'}`}
                    >
                      <span className="text-3xl">{flag}</span>
                      <span className={`text-sm font-bold ${lang === code ? 'text-indigo-700' : 'text-slate-600'}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigazione Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-4 py-4 flex justify-between items-center max-w-md mx-auto rounded-t-[2.5rem] shadow-2xl z-30">
        <button onClick={() => setView('dashboard')} className={`flex-1 flex flex-col items-center gap-1 transition-colors ${view === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <PlusCircle className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter truncate w-full text-center px-1">{t('navInsert')}</span>
        </button>
        <button onClick={() => setView('history')} className={`flex-1 flex flex-col items-center gap-1 transition-colors ${view === 'history' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <History className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter truncate w-full text-center px-1">{t('navHistory')}</span>
        </button>
        <button onClick={() => setView('charts')} className={`flex-1 flex flex-col items-center gap-1 transition-colors ${view === 'charts' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter truncate w-full text-center px-1">{t('navCharts')}</span>
        </button>
        <button onClick={() => setView('settings')} className={`flex-1 flex flex-col items-center gap-1 transition-colors ${view === 'settings' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-black uppercase tracking-tighter truncate w-full text-center px-1">{t('navSettings')}</span>
        </button>
      </nav>

      {/* MODALE SOVRASCRITTURA */}
      {showOverwriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
              </div>
              <button onClick={() => setShowOverwriteModal(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">{t('overwriteModalTitle')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {t('overwriteModalDesc')}
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowOverwriteModal(false)}
                className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                {t('btnCancel')}
              </button>
              <button 
                onClick={executeSaveMonth}
                className="flex-1 py-3 px-4 bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-600 active:scale-95 transition-all"
              >
                {t('btnOverwrite')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM MONTH PICKER MODAL (Wheel style list) */}
      {showMonthPicker && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 z-0" 
            onClick={() => setShowMonthPicker(false)}
          ></div>
          <div className="relative z-10 bg-white rounded-t-[3rem] p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom-full duration-300 transition-transform w-full max-w-md mx-auto">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-800">{t('selectMonthTitle')}</h3>
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <button 
                  onClick={() => setPickerYear(pickerYear - 1)}
                  className="p-2 bg-white rounded-xl shadow-sm text-slate-600 active:scale-90 transition-transform"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-lg font-black text-indigo-600 min-w-[60px] text-center">{pickerYear}</span>
                <button 
                  onClick={() => setPickerYear(pickerYear + 1)}
                  className="p-2 bg-white rounded-xl shadow-sm text-slate-600 active:scale-90 transition-transform"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {monthsList.map((month) => {
                const isSelected = selectedMonthId === `${pickerYear}-${month.id}`;
                return (
                  <button
                    key={month.id}
                    onClick={() => selectPickerMonth(month.id)}
                    className={`py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 border-2 ${
                      isSelected 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' 
                      : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {month.name}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => setShowMonthPicker(false)}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
            >
              {t('confirm')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
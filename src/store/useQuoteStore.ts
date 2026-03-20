import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { QuoteState, Professional, Client, Item, Config, Quote, Condition } from '../types';

const defaultConditions: Condition[] = [
  { id: 'validity', label: 'Presupuesto válido por 7 días', enabled: true },
  { id: 'materials', label: 'No incluye materiales', enabled: false },
  { id: 'advance', label: 'Requiere anticipo del 50%', enabled: false },
  { id: 'warranty', label: 'Garantía de 1 año', enabled: false },
  { id: 'visit', label: 'Visita técnica sin costo', enabled: true },
  { id: 'workstart', label: 'Inicio de obra após seña', enabled: false },
];

const initialState: Omit<QuoteState, 'currentStep'> = {
  profesional: {
    nombre: '',
    profesion: '',
    logo: '',
    contacto: '',
    matricula: '',
    alias: '',
  },
  cliente: {
    nombre: '',
    direccion: '',
    proyecto: '',
    telefono: '',
    empresa: '',
    email: '',
    notas: '',
  },
  items: [],
  config: {
    iva: 21,
    ivaEnabled: true,
    validez: 7,
    condiciones: defaultConditions,
    condicionesCustom: '',
    fecha: new Date().toISOString().split('T')[0],
  },
  quotes: [],
};

interface QuoteActions {
  setProfessional: (data: Partial<Professional>) => void;
  setClient: (data: Partial<Client>) => void;
  setItems: (items: Item[]) => void;
  addItem: (data?: { titulo: string; descripcion: string; precio: number }) => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, data: Partial<Item>) => void;
  setConfig: (data: Partial<Config>) => void;
  updateCondition: (id: string, data: Partial<Condition>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  saveQuote: () => void;
  deleteQuote: (id: string) => void;
  updateQuoteStatus: (id: string, status: Quote['status']) => void;
  loadQuote: (quote: Quote) => void;
  resetQuote: () => void;
  getTotal: () => number;
}

export const useQuoteStore = create<QuoteState & QuoteActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      currentStep: 0,

      setProfessional: (data) =>
        set((state) => ({
          profesional: { ...state.profesional, ...data },
        })),

      setClient: (data) =>
        set((state) => ({
          cliente: { ...state.cliente, ...data },
        })),

      setItems: (items) => set({ items }),

      addItem: (data?: { titulo: string; descripcion: string; precio: number }) => {
        const { items } = get();
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        set({
          items: [...items, { 
            id: newId, 
            titulo: data?.titulo || '', 
            descripcion: data?.descripcion || '', 
            precio: data?.precio || 0 
          }]
        });
      },

      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== id) });
      },

      updateItem: (id, data) => {
        const { items } = get();
        set({
          items: items.map(item =>
            item.id === id ? { ...item, ...data } : item
          )
        });
      },

      setConfig: (data) =>
        set((state) => ({
          config: { ...state.config, ...data },
        })),

      updateCondition: (id, data) => {
        const { config } = get();
        set({
          config: {
            ...config,
            condiciones: config.condiciones.map(c =>
              c.id === id ? { ...c, ...data } : c
            ),
          },
        });
      },

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 5) set({ currentStep: currentStep + 1 });
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) set({ currentStep: currentStep - 1 });
      },

      goToStep: (step) => set({ currentStep: step }),

      getTotal: () => {
        const { items, config } = get();
        const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
        const iva = config.ivaEnabled ? subtotal * (config.iva / 100) : 0;
        return subtotal + iva;
      },

      saveQuote: () => {
        const { profesional, cliente, items, config, quotes, getTotal } = get();
        const quote: Quote = {
          id: Date.now().toString(),
          profesional: { ...profesional },
          cliente: { ...cliente },
          items: [...items],
          config: { ...config },
          total: getTotal(),
          createdAt: new Date().toISOString(),
          status: 'pending',
        };
        set({ quotes: [...quotes, quote] });
      },

      deleteQuote: (id) => {
        const { quotes } = get();
        set({ quotes: quotes.filter(q => q.id !== id) });
      },

      updateQuoteStatus: (id, status) => {
        const { quotes } = get();
        set({
          quotes: quotes.map(q =>
            q.id === id ? { ...q, status } : q
          )
        });
      },

      loadQuote: (quote) => {
        set({
          profesional: quote.profesional,
          cliente: quote.cliente,
          items: quote.items,
          config: quote.config,
          currentStep: 1,
        });
      },

      resetQuote: () => {
        set({
          profesional: initialState.profesional,
          cliente: initialState.cliente,
          items: [],
          config: initialState.config,
          currentStep: 1,
        });
      },
    }),
    {
      name: 'swiftquote-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

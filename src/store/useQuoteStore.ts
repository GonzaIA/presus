import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { QuoteState, Professional, Client, Item, Config } from '../types';

const initialState: Omit<QuoteState, 'currentStep'> = {
  profesional: {
    nombre: '',
    profesion: '',
    logo: '',
    contacto: '',
    matricula: '',
  },
  cliente: {
    nombre: '',
    direccion: '',
    proyecto: '',
  },
  items: [
    { id: 1, titulo: '', descripcion: '', precio: 0 }
  ],
  config: {
    iva: 21,
    validez: 7,
    incluyeMateriales: false,
  },
};

interface QuoteActions {
  setProfessional: (data: Partial<Professional>) => void;
  setClient: (data: Partial<Client>) => void;
  setItems: (items: Item[]) => void;
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, data: Partial<Item>) => void;
  setConfig: (data: Partial<Config>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export const useQuoteStore = create<QuoteState & QuoteActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      currentStep: 0, // 0: Splash, 1: Identidad, etc.

      setProfessional: (data) =>
        set((state) => ({
          profesional: { ...state.profesional, ...data },
        })),

      setClient: (data) =>
        set((state) => ({
          cliente: { ...state.cliente, ...data },
        })),

      setItems: (items) => set({ items }),

      addItem: () => {
        const { items } = get();
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        set({
          items: [...items, { id: newId, titulo: '', descripcion: '', precio: 0 }]
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

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 5) set({ currentStep: currentStep + 1 });
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) set({ currentStep: currentStep - 1 });
      },

      goToStep: (step) => set({ currentStep: step }),
    }),
    {
      name: 'swiftquote-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
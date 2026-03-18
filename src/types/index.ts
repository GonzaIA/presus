export interface Professional {
  nombre: string;
  profesion: string;
  logo: string;
  contacto: string;
  matricula: string;
  alias: string; // Nombre comercial alternativo para transacciones
}

export interface Client {
  nombre: string;
  direccion: string;
  proyecto: string;
  telefono: string;
  empresa: string;
  email: string;
  notas: string;
}

export interface Item {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
}

export interface Condition {
  id: string;
  label: string;
  enabled: boolean;
  customText?: string;
}

export interface Config {
  iva: number;
  ivaEnabled: boolean;
  validez: number;
  condiciones: Condition[];
  condicionesCustom: string;
}

export interface Quote {
  id: string;
  profesional: Professional;
  cliente: Client;
  items: Item[];
  config: Config;
  total: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface QuoteState {
  profesional: Professional;
  cliente: Client;
  items: Item[];
  config: Config;
  currentStep: number;
  quotes: Quote[];
}

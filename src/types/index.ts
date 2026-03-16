export interface Professional {
  nombre: string;
  profesion: string;
  logo: string; // base64
  contacto: string;
  matricula: string;
}

export interface Client {
  nombre: string;
  direccion: string;
  proyecto: string;
}

export interface Item {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
}

export interface Config {
  iva: number;
  validez: number;
  incluyeMateriales: boolean;
}

export interface QuoteState {
  profesional: Professional;
  cliente: Client;
  items: Item[];
  config: Config;
  currentStep: number;
}
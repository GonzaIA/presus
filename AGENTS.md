# SwiftQuote AI - AGENTS.md

Este documento guía a los agentes de codificación que trabajan en el repositorio de **SwiftQuote AI**.

## 1. Comandos de Build, Lint y Test

### Comandos Disponibles
Ejecuta estos comandos desde el directorio raíz del proyecto (`swiftquote-ai`).

*   **Desarrollo (Hot Reload):**
    ```bash
    npm run dev
    ```
    Inicia el servidor de desarrollo en `http://localhost:5173` (o puerto disponible).

*   **Construcción para Producción:**
    ```bash
    npm run build
    ```
    Compila TypeScript y construye el bundle optimizado en la carpeta `dist/`.
    *Nota:* Este comando ejecuta `tsc -b` (verificación de tipos) antes de la construcción de Vite.

*   **Previsualización de Producción:**
    ```bash
    npm run preview
    ```
    Sirve la construcción estática de la carpeta `dist/`.

*   **Linting y Corrección de Código:**
    ```bash
    npm run lint
    ```
    Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.

### Notas Importantes
*   **Tests:** Actualmente no hay configurado un comando de test en `package.json`. Si se agregan tests, se recomienda usar **Vitest** (integrado con Vite) y agregar un script `test`.
*   **Ejecución de un solo test:** (Cuando esté configurado) Usar `npx vitest run <path-to-test-file>`.
*   **Commit:** Antes de commitear, ejecuta `npm run lint` y `npm run build` para asegurar que el código pasa la verificación de tipos y está libre de errores.

## 2. Estilo de Código y Convenciones

### Estructura General
El proyecto es una aplicación **React + TypeScript** con **Tailwind CSS** y **Zustand** para el estado.

**Estructura de Directorios:**
```text
src/
├── components/
│   ├── ui/          # Componentes genéricos (Button, Input, Card)
│   ├── layout/      # Componentes de layout (AppLayout, Stepper)
│   └── steps/       # Componentes específicos de cada paso del flujo
├── store/           # Estado global con Zustand (useQuoteStore)
├── types/           # Definiciones de interfaces TypeScript
├── assets/          # Imágenes y recursos estáticos
├── App.tsx
└── main.tsx
```

### TypeScript
*   **Modo Estricto:** El proyecto usa `strict: true` en `tsconfig.app.json`.
*   **Verbatim Module Syntax:** Se requiere `import type` para importar tipos.
    ```typescript
    // Correcto
    import type { User } from './types';
    import { useState } from 'react';

    // Incorrecto (causa error TS6133/TS6196)
    import { User } from './types'; // Si User es solo un tipo
    ```
*   **No Unused Locals/Parameters:** Las variables y parámetros no utilizados generarán errores de compilación.
*   **Nomenclatura:**
    *   Componentes: `PascalCase` (ej. `StepProfessional`, `AppLayout`).
    *   Funciones/Variables: `camelCase` (ej. `handleClick`, `quoteState`).
    *   Interfaces/Tipos: `PascalCase` (ej. `QuoteState`, `Professional`).

### React & JSX
*   **Funcional Components:** Preferir componentes funcionales sobre clases.
*   **Hooks:** Usar hooks de React (`useState`, `useEffect`, etc.) y custom hooks.
*   **Props:** Definir interfaces para todas las props de componentes.
    ```typescript
    interface ButtonProps {
      variant?: 'primary' | 'secondary';
      onClick: () => void;
      children: React.ReactNode;
    }
    ```

### Tailwind CSS (v4)
*   **Configuración:** El proyecto usa Tailwind v4 con el plugin `@tailwindcss/vite` en `vite.config.ts`.
*   **Clases Personalizadas:** Definidas en `tailwind.config.js` (colores, fuentes, sombras).
*   **Sintaxis:** Preferir clases de utilidad directas sobre estilos en línea.
*   **Arbitrary Values:** Usar valores arbitrarios `[...]` cuando sea necesario para valores no estándar.
    ```html
    <div className="bg-[#2463eb] text-[14px]">
    ```

### Zustand (Estado Global)
*   **Store:** Definido en `src/store/useQuoteStore.ts`.
*   **Persistencia:** El store usa el middleware `persist` para guardar en `localStorage`.
*   **Acciones:** Definir acciones claras en el store para mutar el estado (ej. `setProfessional`, `nextStep`).
*   **Uso:** Consumir el estado en componentes mediante el hook `useQuoteStore`.

### Manejo de Errores
*   **TypeScript:** Deja que el compilador detecte errores de tipos.
*   **Runtime:** Envolver operaciones asíncronas en bloques `try/catch` si es necesario.
*   **Validación de Formularios:** Actualmente el formulario básico usa HTML5 validation. Se recomienda usar `zod` o `react-hook-form` para validaciones complejas en el futuro.

### Importaciones
*   **Orden:** Agrupar importaciones en el siguiente orden:
    1.  Librerías externas (React, Framer Motion, etc.)
    2.  Internas del proyecto (components, store, types)
    3.  Estilos y assets
*   **Alias:** No se detectaron alias de ruta configurados. Usar rutas relativas (`../`, `./`).

## 3. Flujo de Trabajo Recomendado

1.  **Identificar la tarea:** Entender el requisito (ej. "Modificar el Paso 3").
2.  **Buscar archivos relevantes:** Usar la estructura de directorios para encontrar componentes relacionados.
3.  **Modificar código:** Seguir las convenciones de estilo.
4.  **Verificar tipos:** Ejecutar `npm run build` localmente antes de commitear.
5.  **Linting:** Ejecutar `npm run lint` para corregir problemas de estilo.
6.  **Probar visualmente:** Usar `npm run dev` para verificar la interfaz.

## 4. Consideraciones Específicas del Proyecto

*   **Mobile-First:** La UI está diseñada para dispositivos móviles (contenedor de 480px).
*   **Persistencia:** El estado del presupuesto se guarda automáticamente en `localStorage`.
*   **Transiciones:** Usar `framer-motion` para animaciones fluidas entre pasos del stepper.
*   **Tailwind v4:** Asegurarse de que las clases personalizadas (ej. `bg-primary`) estén definidas en `tailwind.config.js` o usar arbitrary values, ya que el purgado de Tailwind v4 es estricto.

---
*Actualizado por agente de codificación el 16 de marzo de 2026.*
# Nmap Learning Lab

Un simulador educativo interactivo para aprender Nmap de manera segura.

## 🎯 Características

- **Dashboard**: Visualiza tu progreso general y próximos pasos recomendados
- **Lecciones Guiadas**: 5 lecciones interactivas sobre conceptos fundamentales de Nmap
- **Modo Práctica**: Escenarios de laboratorio realistas para practicar comandos
- **Exámenes**: Cuestionarios para evaluar tu conocimiento (Básico e Intermedio)
- **Logros y Certificado**: Sistema de logros y certificado al completar todo
- **Panel de Aprendizaje**: Explicaciones en tiempo real de comandos y flags

## ⚠️ Importante

Este es un **SIMULADOR EDUCATIVO**. **NO ejecuta Nmap real** y **NO escanea redes reales**. Todas las salidas son predefinidas y simuladas.

## 🚀 Instalación

```bash
npm install
```

## 🏃 Ejecutar

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Construir para Producción

```bash
npm run build
```

## 🛠️ Tecnologías

- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router

## 📚 Estructura del Proyecto

```
src/
├── components/      # Componentes reutilizables
├── config/         # Archivos de configuración (lecciones, escenarios, quizzes, flags)
├── pages/          # Páginas principales
├── utils/          # Utilidades (localStorage, achievements)
└── App.tsx         # Componente principal
```

## 🎓 Uso Ético

Este simulador está diseñado únicamente para fines educativos. Recuerda que el uso real de Nmap debe hacerse solo en:
- Redes de tu propiedad
- Redes con autorización explícita
- Ambientes de prueba controlados

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.


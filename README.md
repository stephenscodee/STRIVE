# looq-fitness

🌟 Entrenamientos personalizados a partir de una foto, altura y peso.  
Genera rutinas ultra-adaptadas gracias a IA, simple y rápido.

## ¿Qué hace la app?

- El usuario sube una foto, altura y peso.
- Se estima su composición corporal (NO es un diagnóstico médico).
- Se generan rutinas de entrenamiento personalizadas:
  - Nivel, objetivo, frecuencia.
- Se muestra el historial de entrenos y progreso.

## Arquitectura MVP

```
looq-fitness/
│
├── mobile/      # App React Native (TS)
│
├── backend/     # FastAPI + IA Python (imagen, generación rutina)
│
├── README.md
└── docker-compose.yml
```

### Frontend (mobile/)

- **React Native (TypeScript)**
- Cámara y galería para foto
- Formulario (altura, peso)
- Muestra rutinas y progreso

### Backend (backend/)

- **FastAPI (Python)**
- Recibe datos + foto
- Analiza composición corporal _(OpenCV, TF/PyTorch, NumPy)_
- Genera plan
- Devuelve resultados
- **NO** almacena imágenes (usa S3/Firebase Storage)

### Base de Datos

- PostgreSQL + SQLAlchemy
- Guarda: usuario, métricas, rutinas, progreso, PERO NO fotos

### Auth

- JWT simple: email + password

---

## Tecnologías

- 📲 React Native (TS)
- 🐍 FastAPI, OpenCV, TensorFlow/PyTorch
- 🛢️ PostgreSQL, SQLAlchemy
- ☁️ AWS S3 / Firebase Storage

## Instalación

```bash
git clone https://github.com/tuUsuario/looq-fitness.git
cd looq-fitness
docker-compose up
```

## 🚩 Estado

- MVP en desarrollo
- Sin blockchain, chat, feed social, push ni gamificación (por ahora)

---

> “Dime qué hacer exactamente con el cuerpo que tengo.”

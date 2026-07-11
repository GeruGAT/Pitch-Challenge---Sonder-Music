# Pitch Challenge — Sonder Music

Minijuego responsive con validación de partidas, códigos únicos y panel administrativo.

## Instalación

1. Instala Node.js 20 o superior.
2. Copia `.env.example` como `.env` y cambia las tres credenciales.
3. Ejecuta `npm install` y después `npm start`.
4. Abre `http://localhost:3000`; el panel está en `/admin`.

La base de datos local se crea sola en `backend/data/sonder-data.json`. Haz copias de esa carpeta antes de actualizar el hosting.

## Audio de voz real

El juego funciona sin descargas con un sintetizador de vocal “Ah”. Para una voz humana, coloca una grabación limpia y sostenida en `audio/ah-loop.mp3`. El navegador reproducirá esa muestra y ajustará su tono en tiempo real. Procura que la nota original sea A3 para obtener el mejor resultado.

## Hosting

Configura la variable `PORT` del proveedor y un proceso Node persistente. Para producción, usa HTTPS y define `SESSION_SECRET`, `ADMIN_USER` y `ADMIN_PASSWORD` seguros. No publiques `.env` ni `backend/data/` en repositorios públicos.

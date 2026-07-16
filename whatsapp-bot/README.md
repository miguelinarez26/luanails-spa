# Bot de WhatsApp - LuaNails 💅

Este es el bot de atención al cliente de LuaNails, integrado con Inteligencia Artificial (Google Gemini) y Google Calendar para agendar citas automáticamente.

## ⚠️ PASOS INDISPENSABLES PARA CONFIGURAR LA API DE GEMINI (NIVEL PROFESIONAL)

Si alguna vez necesitas crear una nueva clave o configurar esto desde cero, sigue estos pasos ESTRICTAMENTE para evitar errores (como el error 429 o 404):

1. **Crear el Proyecto y la Clave:**
   - Entra a [Google AI Studio](https://aistudio.google.com/).
   - Crea un nuevo proyecto y genera una API Key.

2. **Configurar la Facturación (Para quitar el límite):**
   - Ve a la Consola de Google Cloud (Google Cloud Console).
   - Ingresa tu tarjeta de crédito para salir de la "Prueba Gratuita" y pasa tu cuenta a **"Pago por uso" (Pospago)**. 
   - *Nota: Google hace un cargo de $10 que queda como saldo a favor (-USD 10.00).*

3. **Vincular el Proyecto a la Facturación:**
   - Vuelve a AI Studio y asegúrate de que al lado de la clave diga **"Nivel 1 · Pospago"**.

4. **🔥 EL PASO MÁS IMPORTANTE (HABILITAR LAS APIs): 🔥**
   - A veces, aunque tengas facturación, el "cerebro" del bot sigue apagado.
   - Debes ir a la consola de Google Cloud, buscar la sección de **"Claves de API"** (dentro de Agent Platform o Configuración).
   - Si ves una franja amarilla que dice **"Habilita las APIs para acceder a todas las funciones"**, DEBES hacer clic en **"Habilitar APIs"**. 
   - *Si omites este paso, el bot te lanzará errores 429 o 404 porque la conexión a la Inteligencia Artificial está bloqueada internamente por Google.*

5. **Actualizar el Bot:**
   - Pega tu nueva clave en el archivo `.env` (`GEMINI_API_KEY=tu_clave_aqui`).
   - Apaga la consola (`Ctrl + C`) y vuelve a encender el bot (`npm run start` o `node index.js`).

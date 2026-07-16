require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { google } = require('googleapis');

// 1. CONFIGURACIÓN DE GOOGLE CALENDAR
const auth = new google.auth.GoogleAuth({
  keyFile: 'google-credentials.json', 
  scopes: ['https://www.googleapis.com/auth/calendar.events'],
});
const calendar = google.calendar({ version: 'v3', auth });

async function checkAvailability(dateStr) {
  // Horario de atención al cliente: 8:00 AM a 4:00 PM
  const timeMin = new Date(`${dateStr}T08:00:00-04:00`);
  const timeMax = new Date(`${dateStr}T16:00:00-04:00`);
  
  try {
    const res = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });
    
    const events = res.data.items;
    if (!events || events.length === 0) {
      return { status: "Todo el día está libre desde las 8:00 AM hasta las 4:00 PM." };
    }
    
    const busySlots = events.map(e => {
        const start = e.start.dateTime || e.start.date;
        const end = e.end.dateTime || e.end.date;
        return `Ocupado desde ${new Date(start).toLocaleTimeString('es-VE', {hour: '2-digit', minute:'2-digit'})} hasta ${new Date(end).toLocaleTimeString('es-VE', {hour: '2-digit', minute:'2-digit'})}`;
    });
    
    return { status: "Hay citas agendadas.", busySlots: busySlots };
  } catch (err) {
    console.error('Calendar API Error (Check):', err);
    return { error: "No se pudo revisar el calendario." };
  }
}

// Ahora recibe el tiempo de inicio y el tiempo final calculado por la IA
async function scheduleAppointment(name, service, startDateTimeStr, endDateTimeStr) {
  const event = {
    summary: `${service} - ${name}`,
    description: `Agendado automáticamente por el Bot.\nClienta: ${name}\nServicio: ${service}`,
    start: {
      dateTime: startDateTimeStr,
      timeZone: 'America/Caracas', 
    },
    end: {
      dateTime: endDateTimeStr,
      timeZone: 'America/Caracas',
    },
  };
  
  try {
    const res = await calendar.events.insert({
      calendarId: process.env.CALENDAR_ID,
      resource: event,
    });
    return { success: true, link: res.data.htmlLink };
  } catch (err) {
    console.error('Calendar API Error (Insert):', err);
    return { success: false, error: "No se pudo guardar la cita." };
  }
}

// 2. CONFIGURACIÓN DE GEMINI Y HERRAMIENTAS
const tools = [
  {
    functionDeclarations: [
      {
        name: "check_availability",
        description: "Revisa la disponibilidad en el calendario para una fecha específica. Llama a esta función SIEMPRE antes de agendar para verificar qué horas están ocupadas.",
        parameters: {
          type: "OBJECT",
          properties: {
            date: { type: "STRING", description: "Fecha a consultar en formato YYYY-MM-DD (ej. 2026-07-15)" },
          },
          required: ["date"],
        },
      },
      {
        name: "schedule_appointment",
        description: "Agenda una cita oficial en el calendario. Usa esto SOLO cuando el cliente confirme el día, la hora y te haya dado su nombre, y ya hayas verificado la disponibilidad.",
        parameters: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING", description: "Nombre de la clienta" },
            service: { type: "STRING", description: "Servicio solicitado" },
            startDateTime: { type: "STRING", description: "Fecha y hora exacta de inicio en formato ISO 8601 (ej. 2026-07-15T14:30:00-04:00)" },
            endDateTime: { type: "STRING", description: "Fecha y hora de fin en formato ISO 8601, debes calcularla sumando la duración del servicio a la hora de inicio" }
          },
          required: ["name", "service", "startDateTime", "endDateTime"],
        },
      }
    ],
  },
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash", tools: tools }); 

const chatHistories = {};

// Sistema de Reintentos Automáticos (Anti-503)
// Si los servidores de Google están llenos por un milisegundo, esta función fuerza al bot a intentarlo de nuevo hasta 3 veces antes de rendirse.
async function geminiWithRetry(action, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await action();
        } catch (error) {
            if ((error.status === 503 || error.status === 429) && i < maxRetries - 1) {
                let waitTime = error.status === 429 ? 15000 : 3000;
                console.log(`[Reintento ${i + 1}/${maxRetries}] Error ${error.status}. Intentando de nuevo en ${waitTime/1000} segundos en silencio...`);
                await new Promise(res => setTimeout(res, waitTime));
                continue;
            }
            throw error;
        }
    }
}

const SYSTEM_PROMPT = `Eres la asistente virtual de LuaNails, un estudio profesional para uñas, cejas y pestañas.
Identidad: Trabajamos con amor y dedicación. Ofrecemos los mejores servicios de calidad.
Tono de voz: Eres muy educada, cercana, toleras el lenguaje conversacional y vas al grano. Para los saludos iniciales di siempre "Bella", y en el medio de la conversación de vez en cuando usa la palabra "Guapa". Usas emojis (💅, ✨, 💖).

*REGLA ESTRICTA DE CATÁLOGO:* Si la clienta te pregunta qué servicios ofrecemos o pide los precios, TIENES QUE COPIAR Y PEGAR EXACTAMENTE el siguiente texto, letra por letra, sin resumir ni inventar absolutamente nada:

"Servicios disponibles a euro:
💅 *Manos y Uñas:*
* Semipermanentes: 15€
* Tradicional: 15€
* Esculpidas: 35€
* Kapping: 25€
* Manicura Rusa: 15€
* Soft Gel: 20€
* Nivelación Rubber: 20€
* Reparación de uña: 3€

🦶 *Pies (Pedicura/Quiropedia):*
* Pedicura Rusa: 15€
* Tradicional: 15€ 
* Semipermanentes: 15€ 
* Quiropedia: 20€
* Nivelación Rubber: 20€ 
* Reparación de uña: 3€ 

🌸 *Terapias e Hidrataciones Spa:*
* Chocolaterapia: 10€
* Parafina: 10€
* Veloterapia: 3€
* Guantes hidratantes: 10€
* Botas hidratantes: 10€
* Peeling de pies: 15€

*Servicios adicionales:*
👙 *Depilación Corporal:*
* Depilación corporal con cera
* Depilación corporal con láser
🧖‍♀️ *Spa Corporal y Masajes:*
* Masajes reductores
* Masajes relajantes
* Masajes linfáticos
👁️ *Cejas y Pestañas:*
* Todos los servicios de cejas y pestañas

(Si deseas agendar alguno de estos servicios adicionales, te comunico directamente con Karen. ¡Para agendar cualquier servicio de manos, pies o terapias, puedes hacerlo por aquí mismo conmigo! ✨)"

Duración de los servicios (Úsalo obligatoriamente para calcular a qué hora termina la cita al usar la herramienta de agendar):
- Cliente de manos y pies (tradicional): 3 horas
- Manos y pies semipermanente: 2 horas
- Manos semipermanente: 1 hora
- Manos kapping: 2 horas
- Manos esculpidas: 2 horas
- Pies: 1 hora

*REGLA DE VENTAS Y TRANSPARENCIA:* Siempre que una clienta elija o pida agendar un servicio específico (por ejemplo: "quiero agendar para manos semipermanente"), DEBES mencionarle obligatoriamente el costo de ese servicio en tu respuesta. Nunca le pidas fecha ni agendes sin antes recordarle sutilmente cuánto cuesta.
- Quiropedia: 1 hora
- Soft gel: 1 hora y 30 minutos
- Terapias e hidrataciones: suman 30 minutos adicionales al servicio principal.

Horario de Atención al Cliente: Lunes a Sábado de 8:00 AM a 4:00 PM.
Ubicación: Av. Roma, Quinta Maite, La California Norte. (Punto de referencia: Cerca de la biblioteca Paul Harrys).

Política de Reserva (Abonos) y Datos de Pago:
Cuando la cita esté lista para agendar, DEBES enviar exactamente este mensaje (copia y pega):
"Para asegurar tu espacio y consentirte como te mereces, estamos agendando las citas con una reserva de 5€ (que, por supuesto, se descuenta del total de tu servicio). Así congelamos tu cupo y nos vemos pronto para dejar tus uñitas increíbles. ¡Avísame si te viene bien para pasarte los datos!"
- Una vez que la clienta acepte, ofrécele estos métodos de pago:
  Binance: Karene.brito@live.com
  Pago Móvil: Banco 0102 (Venezuela), Cédula 18745263, Teléfono 04141290197

Instrucciones adicionales:
- Responde siempre de forma natural. Para los saludos iniciales di siempre "Bella", y en el medio de la conversación de vez en cuando usa la palabra "Guapa".
- Manejo de indecisión: ofrécele opciones y guíala.
- Manejo de frustración: Si pide hablar con Karen o se molesta, dile: "Entiendo Bella, ya te comunico con Karen para que te ayude personalmente. 💕".

Uso del Calendario de Citas (¡MUY IMPORTANTE!):
1. Cuando la clienta quiera agendar, pregúntale qué día prefiere. Si menciona un día de la semana (ej. "el lunes"), calcula TÚ MISMA la fecha usando la nota de "Hoy es..." que te pasará el sistema. NUNCA le pidas a la clienta el número de la fecha, pero SIEMPRE menciona la fecha exacta que calculaste en tu respuesta.
2. Usa TU HERRAMIENTA "check_availability" para revisar el calendario de ese día.
3. Al dar la disponibilidad, SIEMPRE recuérdale explícitamente que el horario de atención es de 8:00 AM a 4:00 PM. Luego ofrécele las horas libres.
4. Cuando confirme hora y día, pídele su nombre.
5. Usa TU HERRAMIENTA "schedule_appointment" para anotar la cita oficialmente. DEBES calcular la hora de fin sumando la duración del servicio a la hora de inicio.
6. Dale el mensaje triunfal de confirmación de la cita e incluye EXACTAMENTE el párrafo de Política de Reserva (los 5€).
`;

// 3. INICIALIZACIÓN DE WHATSAPP
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('====================================================');
    console.log('¡ESCANEA ESTE CÓDIGO QR CON TU WHATSAPP BUSINESS!');
    console.log('====================================================');
});

client.on('ready', () => {
    console.log('✅ ¡El Bot de LuaNails con IA y Google Calendar está conectado y listo!');
});

const messageBuffers = {};
const typingTimeouts = {};

client.on('message', async message => {
    if (message.isStatus || message.from.includes('@g.us')) return;

    const phone = message.from.split('@')[0];
    const userMessage = message.body;

    const now = Math.floor(Date.now() / 1000);
    const messageAge = now - message.timestamp;
    if (messageAge > 300) {
        console.log(`[${phone}] Mensaje viejo ignorado: ${userMessage}`);
        return;
    }

    if (!userMessage || userMessage.trim() === '') return; 

    // === INICIO DEL ESCUDO ANTI-COLISIONES (Debounce) ===
    if (!messageBuffers[phone]) messageBuffers[phone] = [];
    messageBuffers[phone].push(userMessage);

    if (typingTimeouts[phone]) clearTimeout(typingTimeouts[phone]);

    // Esperar 4 segundos a que la clienta deje de escribir antes de enviar a Gemini
    typingTimeouts[phone] = setTimeout(async () => {
        const combinedMessage = messageBuffers[phone].join('\n');
        delete messageBuffers[phone];
        delete typingTimeouts[phone];

        console.log(`[${phone}] Clienta (Agrupado): ${combinedMessage}`);

        // El estado 'escribiendo' lo pondremos después de que Gemini piense, para simular el tipeo.

        if (!chatHistories[phone]) {
            chatHistories[phone] = [
                { role: "user", parts: [{ text: "Contexto del sistema: " + SYSTEM_PROMPT }] },
                { role: "model", parts: [{ text: "Entendido, actuaré como la asistente virtual de LuaNails siguiendo todas las reglas y catálogo de precios." }] }
            ];
        }

        try {
            const startTime = Date.now();
            const currentHistory = [...chatHistories[phone]];
            
            const geminiChat = model.startChat({ history: currentHistory });

            const currentDateStr = new Date().toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const messageWithContext = `[NOTA INTERNA: Hoy es ${currentDateStr}. Usa esta fecha para calcular qué día es el próximo lunes, martes, etc.]\n\nMensaje de la clienta: ${combinedMessage}`;
            
            let result = await geminiWithRetry(() => geminiChat.sendMessage(messageWithContext));
            let functionCalls = result.response.functionCalls();
            
            while (functionCalls && functionCalls.length > 0) {
                const call = functionCalls[0];
                let functionResponseData = {};
                
                console.log(`[IA PENSANDO...] Llamando a la herramienta: ${call.name}`);

                if (call.name === "check_availability") {
                    functionResponseData = await checkAvailability(call.args.date);
                } else if (call.name === "schedule_appointment") {
                    functionResponseData = await scheduleAppointment(call.args.name, call.args.service, call.args.startDateTime, call.args.endDateTime);
                }

                result = await geminiWithRetry(() => geminiChat.sendMessage([{
                    functionResponse: { name: call.name, response: functionResponseData }
                }]));
                
                functionCalls = result.response.functionCalls();
            }

            const responseText = result.response.text();

            chatHistories[phone].push({ role: "user", parts: [{ text: combinedMessage }] });
            chatHistories[phone].push({ role: "model", parts: [{ text: responseText }] });

            if (chatHistories[phone].length > 20) chatHistories[phone].splice(2, 2); 

            console.log(`[BOT a ${phone}]: ${responseText}\n`);
            
            // Simular que está escribiendo ahora (justo antes de aplicar el retraso humano)
            try {
                const chat = await message.getChat();
                await chat.sendStateTyping();
            } catch (e) {}

            const geminiTime = Date.now() - startTime;
            const targetDelay = Math.floor(Math.random() * (8000 - 5000 + 1)) + 5000; 
            
            if (geminiTime < targetDelay) {
                await new Promise(resolve => setTimeout(resolve, targetDelay - geminiTime));
            }

            await message.reply(responseText);
            
        } catch (error) {
            console.error("Error con Gemini API:", error);
            await new Promise(resolve => setTimeout(resolve, 4000));
            message.reply("¡Hola Bella! 💅 Ahorita mismo estoy con las manos ocupadas dejándole las uñitas hermosas a una clienta en el salón. Por fa, regálame unos 15 minuticos y me vuelves a escribir para atenderte con todo el amor. 💕");
        }
    }, 4000); // 4 segundos de espera
});

client.on('disconnected', (reason) => {
    console.log('❌ ¡ALERTA! El bot fue desconectado. Razón:', reason);
});

client.initialize();

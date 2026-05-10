// polyfills de codificación de texto — le enseñamos a jest a leer y escribir texto
// como instalar el mismo idioma en la computadora del laboratorio que en la clínica real,
// porque el entorno de pruebas no trae textencoder ni textdecoder por defecto
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
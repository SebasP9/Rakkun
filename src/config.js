// ══════════════════════════════════════════════════════
//  ⚙️  CONFIGURACIÓN — edita estos valores
// ══════════════════════════════════════════════════════
export const CONFIG = {
  whatsapp: "522221273579",
  instagram: "https://www.instagram.com/rakkunstudiomx/",
  fuente: "sheets", // "local" | "sheets"
  sheetsURL:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRz2tYwJd-fEf9ufrqbPPexrFBNY8QTmkY3ycgwRztyAxdQjGEJkkLL4gyp85Pn8nuCQJsoeznbLrXM/pub?gid=0&single=true&output=csv", // Pega aquí la URL CSV de Google Sheets cuando esté listo
};

// ══════════════════════════════════════════════════════
//  🏷️  ETIQUETAS DE CATEGORÍAS
//  Si agregas una categoría nueva en Sheets, agrégala aquí también
//  (si no la agregas, igual se muestra con primera letra en mayúscula)
// ══════════════════════════════════════════════════════
export const CATEGORIA_LABELS = {
  aretes: "Aretes",
  pulseras: "Pulseras",
  collares: "Collares",
  sets: "Sets personalizados",
  ropa: "Ropa",
  bolsas: "Bolsas",
  accesorios: "Accesorios",
};

export const SECCION_LABELS = {
  joyeria: "Joyería",
  confeccion: "Confección",
  mascotas: "Mascotas",
};

export const BADGES = {
  new: { label: "Nuevo", css: "badge-new" },
  fav: { label: "Favorito ♥", css: "badge-fav" },
  last: { label: "Últimas piezas", css: "badge-last" },
};

// ══════════════════════════════════════════════════════
//  📦  PRODUCTOS DE EJEMPLO
//  Reemplaza estos con los tuyos, o conéctalos desde Sheets
//
//  CAMPOS:
//  seccion      → "joyeria" | "confeccion" | "mascotas"
//  categoria    → aretes | pulseras | collares | sets | ropa | bolsas | accesorios
//  nombre       → texto libre
//  precio       → número en MXN (pon 0 si no hay precio base)
//  precioDesde  → true = muestra "Desde $X MXN"  |  false = precio fijo
//  cotizar      → true = precio se acuerda por WhatsApp | false = precio fijo
//  badge        → "new" | "fav" | "last" | "" (vacío = sin etiqueta)
//  disponible   → true | false
//  personalizado→ true = hecho a pedido, sin límite de cantidad
//  stock        → cuántas unidades hay (para personalizados usa 99)
//  emoji        → se muestra si no hay imagen
//  imagen       → URL de la foto del producto
//  hint         → texto pequeño debajo del botón Agregar (ej: "✨ A tu medida")
//
//  GOOGLE SHEETS — columnas en este orden exacto:
//  seccion | categoria | nombre | precio | precioDesde | cotizar | badge |
//  disponible | descripcion | imagen | emoji | personalizado | stock | hint
// ══════════════════════════════════════════════════════
export const productosLocales = [
  // ── JOYERÍA ──────────────────────────────────────
  {
    id: 1,
    seccion: "joyeria",
    categoria: "aretes",
    nombre: "Aretes Luna Dorada",
    descripcion: "Aretes colgantes con luna y estrella, baño en oro 18k",
    precio: 180,
    precioDesde: false,
    cotizar: false,
    badge: "fav",
    disponible: true,
    personalizado: false,
    stock: 1,
    emoji: "🌙",
    imagen: "",
    hint: "",
  },
  {
    id: 2,
    seccion: "joyeria",
    categoria: "pulseras",
    nombre: "Pulsera Perlas Rosa",
    descripcion:
      "Pulsera elástica con perlas naturales y dijes en forma de corazón",
    precio: 220,
    precioDesde: false,
    cotizar: false,
    badge: "new",
    disponible: true,
    personalizado: false,
    stock: 1,
    emoji: "🌸",
    imagen: "",
    hint: "",
  },
  {
    id: 3,
    seccion: "joyeria",
    categoria: "collares",
    nombre: "Collar Boho Turquesa",
    descripcion: "Collar largo con piedras turquesa y cadena dorada ajustable",
    precio: 310,
    precioDesde: false,
    cotizar: false,
    badge: "",
    disponible: true,
    personalizado: false,
    stock: 1,
    emoji: "💎",
    imagen: "",
    hint: "",
  },
  {
    id: 4,
    seccion: "joyeria",
    categoria: "aretes",
    nombre: "Aretes Aro Minimalista",
    descripcion: "Aros finos con detalle de cristal, ideales para el día a día",
    precio: 140,
    precioDesde: false,
    cotizar: false,
    badge: "",
    disponible: true,
    personalizado: false,
    stock: 2,
    emoji: "⭕",
    imagen: "",
    hint: "",
  },
  {
    id: 5,
    seccion: "joyeria",
    categoria: "pulseras",
    nombre: "Pulsera Macramé Nude",
    descripcion: "Tejida a mano con hilo de algodón y dije de flor de plata",
    precio: 190,
    precioDesde: false,
    cotizar: false,
    badge: "last",
    disponible: true,
    personalizado: false,
    stock: 1,
    emoji: "🌿",
    imagen: "",
    hint: "",
  },
  {
    id: 6,
    seccion: "joyeria",
    categoria: "collares",
    nombre: "Collar Corazón Rojo",
    descripcion: "Corazón esmaltado en rojo con cadena de plata 925",
    precio: 270,
    precioDesde: false,
    cotizar: false,
    badge: "new",
    disponible: false,
    personalizado: false,
    stock: 0,
    emoji: "❤️",
    imagen: "",
    hint: "",
  },
  {
    id: 7,
    seccion: "joyeria",
    categoria: "sets",
    nombre: "Set Personalizado Luna",
    descripcion:
      "Aretes + pulsera a juego. Tú eliges colores y materiales, lo hacemos a tu gusto.",
    precio: 350,
    precioDesde: true,
    cotizar: true,
    badge: "fav",
    disponible: true,
    personalizado: true,
    stock: 99,
    emoji: "☁️",
    imagen: "",
    hint: "✨ Hecho especialmente para ti",
  },
  {
    id: 8,
    seccion: "joyeria",
    categoria: "sets",
    nombre: "Set Personalizado Boho",
    descripcion:
      "Collar + aretes coordinados hechos a pedido. Elige tu estilo y materiales.",
    precio: 450,
    precioDesde: true,
    cotizar: true,
    badge: "",
    disponible: true,
    personalizado: true,
    stock: 99,
    emoji: "⭐",
    imagen: "",
    hint: "✨ Tu estilo, tus colores",
  },
  // ── CONFECCIÓN ───────────────────────────────────
  {
    id: 9,
    seccion: "confeccion",
    categoria: "sets",
    nombre: "Conjunto a Medida",
    descripcion:
      "Diseñamos tu conjunto ideal desde cero. Tú eliges tela, colores y estilo.",
    precio: 400,
    precioDesde: true,
    cotizar: true,
    badge: "new",
    disponible: true,
    personalizado: true,
    stock: 99,
    emoji: "👗",
    imagen: "",
    hint: "✨ A tu medida",
  },
  {
    id: 10,
    seccion: "confeccion",
    categoria: "bolsas",
    nombre: "Bolsa de Tela Personalizada",
    descripcion:
      "Bolsa artesanal con tu diseño, iniciales o mensaje. Hecha a pedido.",
    precio: 180,
    precioDesde: true,
    cotizar: true,
    badge: "",
    disponible: true,
    personalizado: true,
    stock: 99,
    emoji: "👜",
    imagen: "",
    hint: "✨ Hecha especialmente para ti",
  },
  {
    id: 11,
    seccion: "confeccion",
    categoria: "ropa",
    nombre: "Prenda Bordada",
    descripcion:
      "Añadimos bordados personalizados a tu prenda favorita. Cotización según diseño.",
    precio: 120,
    precioDesde: true,
    cotizar: true,
    badge: "",
    disponible: true,
    personalizado: true,
    stock: 99,
    emoji: "🧵",
    imagen: "",
    hint: "✨ Diseño único para ti",
  },
  // ── MASCOTAS ─────────────────────────────────────
  {
    id: 12,
    seccion: "mascotas",
    categoria: "ropa",
    nombre: "Ropa para Mascota",
    descripcion:
      "Prendas a medida para tu perro o gato. Talla y tela a tu elección.",
    precio: 150,
    precioDesde: true,
    cotizar: true,
    badge: "new",
    disponible: true,
    personalizado: true,
    stock: 99,
    emoji: "🐶",
    imagen: "",
    hint: "🐾 Hecha a la medida de tu mascota",
  },
  {
    id: 13,
    seccion: "mascotas",
    categoria: "accesorios",
    nombre: "Collar y Pañuelo",
    descripcion:
      "Set de collar + pañuelo de tela para mascota. Diseño personalizado.",
    precio: 100,
    precioDesde: true,
    cotizar: true,
    badge: "",
    disponible: true,
    personalizado: true,
    stock: 99,
    emoji: "🐾",
    imagen: "",
    hint: "🐾 Para esa mascota especial",
  },
  {
    id: 14,
    seccion: "mascotas",
    categoria: "sets",
    nombre: "Set Completo Mascota",
    descripcion:
      "Ropa + accesorios coordinados para tu mascota. Cotización según pedido.",
    precio: 220,
    precioDesde: true,
    cotizar: true,
    badge: "fav",
    disponible: true,
    personalizado: true,
    stock: 99,
    emoji: "🐱",
    imagen: "",
    hint: "🐾 Coordinado y único para tu mascota",
  },
];

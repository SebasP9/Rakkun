import { useState, useEffect, useCallback, useRef } from "react";
import {
  CONFIG,
  CATEGORIA_LABELS,
  BADGES,
  productosLocales,
} from "./config.js";

// ── SVGs ──────────────────────────────────────────────
const IconBag = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const IconWA = () => (
  <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const IconWASmall = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const IconIG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

// ── PARSE CSV ─────────────────────────────────────────
function parsearCSV(csv) {
  return csv
    .trim()
    .split("\n")
    .slice(1)
    .map((l, i) => {
      const c = l.split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
      return {
        id: i + 1,
        seccion: c[0] || "joyeria",
        categoria: c[1] || "aretes",
        nombre: c[2] || "",
        precio: parseFloat(c[3]) || 0,
        precioDesde: c[4]?.toUpperCase() === "TRUE",
        cotizar: c[5]?.toUpperCase() === "TRUE",
        badge: c[6] || "",
        disponible: c[7]?.toUpperCase() === "TRUE",
        descripcion: c[8] || "",
        imagen: c[9] || "",
        emoji: c[10] || "✨",
        personalizado: c[11]?.toUpperCase() === "TRUE",
        stock: parseInt(c[12]) || 1,
        hint: c[13] || "",
      };
    })
    .filter((p) => p.nombre);
}

// ── PRODUCT CARD ─────────────────────────────────────
function ProductCard({
  producto: p,
  cantidadEnCarrito,
  onAgregar,
  onCambiarCantidad,
  onLightbox,
}) {
  const cant = cantidadEnCarrito || 0;
  const maxAlc = !p.personalizado && cant >= p.stock;

  // Badge
  let badgeEl = null;
  if (p.personalizado)
    badgeEl = <span className="badge badge-custom">✦ Personalizado</span>;
  else if (!p.disponible)
    badgeEl = <span className="badge badge-sold">Agotado</span>;
  else if (BADGES[p.badge])
    badgeEl = (
      <span className={`badge ${BADGES[p.badge].css}`}>
        {BADGES[p.badge].label}
      </span>
    );

  // Precio
  let precioEl;
  if (p.cotizar && p.precio > 0) {
    precioEl = (
      <div className="card-price">
        <span className="card-price-desde">Desde</span>$
        {p.precio.toLocaleString()} <small>MXN</small>
      </div>
    );
  } else if (p.cotizar) {
    precioEl = (
      <div
        className="card-price"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.85rem",
          color: "var(--gray)",
          fontWeight: 500,
        }}
      >
        A cotizar
      </div>
    );
  } else {
    precioEl = (
      <div className="card-price">
        ${p.precio.toLocaleString()} <small>MXN</small>
      </div>
    );
  }

  // Acciones
  let accionesEl;
  if (!p.disponible) {
    accionesEl = (
      <button className="card-btn" disabled>
        Agotado
      </button>
    );
  } else if (cant === 0) {
    let hint = p.hint || "";
    let hintClass = "card-hint";
    if (!p.personalizado && p.stock === 1) {
      hint = hint || "🌸 Pieza única";
      hintClass = "card-hint unico";
    }
    accionesEl = (
      <>
        <button className="card-btn" onClick={() => onAgregar(p.id)}>
          Agregar
        </button>
        {hint && <span className={hintClass}>{hint}</span>}
      </>
    );
  } else {
    const aviso = maxAlc ? (
      <span className="card-stock-msg">
        {p.stock === 1
          ? "¡Solo hay 1, es tuya!"
          : `¡Máx. ${p.stock} disponibles!`}
      </span>
    ) : null;
    accionesEl = (
      <>
        <div className="card-qty">
          <button
            className="card-qty-btn minus"
            onClick={() => onCambiarCantidad(p.id, -1)}
          >
            −
          </button>
          <span className="card-qty-num">{cant}</span>
          <button
            className="card-qty-btn"
            onClick={() => onCambiarCantidad(p.id, +1)}
            disabled={maxAlc}
          >
            +
          </button>
        </div>
        {aviso}
      </>
    );
  }

  return (
    <div className={`card${!p.disponible ? " sold-out" : ""}`}>
      <div className="card-img" onClick={() => onLightbox(p)}>
        {p.imagen ? (
          <img src={p.imagen} alt={p.nombre} loading="lazy" />
        ) : (
          <div className="card-img-placeholder">{p.emoji || "✨"}</div>
        )}
        {badgeEl}
      </div>
      <div className="card-body">
        <div className="card-name">{p.nombre}</div>
        <div className="card-desc">{p.descripcion}</div>
        <div className="card-footer">
          {precioEl}
          <div className="card-actions">{accionesEl}</div>
        </div>
      </div>
    </div>
  );
}

// ── CART ITEM ─────────────────────────────────────────
function CartItem({ producto: p, cantidad, onCambiar }) {
  const max = p.personalizado ? Infinity : p.stock;
  const tag = p.cotizar ? (
    <span className="cart-item-tag custom">✦ A cotizar</span>
  ) : p.personalizado ? (
    <span className="cart-item-tag custom">✦ Personalizado</span>
  ) : (
    <span className="cart-item-tag unico">Pieza única</span>
  );
  const precioStr = p.cotizar
    ? "Precio a cotizar"
    : `$${(p.precio * cantidad).toLocaleString()} MXN${cantidad > 1 ? ` (${cantidad} × $${p.precio.toLocaleString()})` : ""}`;

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        {p.imagen ? <img src={p.imagen} alt={p.nombre} /> : p.emoji || "✨"}
      </div>
      <div className="cart-item-info">
        {tag}
        <div className="cart-item-name">{p.nombre}</div>
        <div className="cart-item-price">{precioStr}</div>
        {p.cotizar && (
          <div className="cart-item-note">
            Se acordará el precio por WhatsApp
          </div>
        )}
        <div className="cart-item-controls">
          <button className="qty-btn" onClick={() => onCambiar(p.id, -1)}>
            −
          </button>
          <span className="qty-num">{cantidad}</span>
          <button
            className="qty-btn"
            onClick={() => onCambiar(p.id, +1)}
            disabled={cantidad >= max}
          >
            +
          </button>
        </div>
        <button
          className="cart-item-remove"
          onClick={() => onCambiar(p.id, -cantidad)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────
export default function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [seccion, setSeccion] = useState("joyeria");
  const [filtro, setFiltro] = useState("all");
  const [carrito, setCarrito] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null); // producto o null
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);

  // Cargar productos
  useEffect(() => {
    async function cargar() {
      if (CONFIG.fuente === "sheets" && CONFIG.sheetsURL) {
        try {
          const r = await fetch(CONFIG.sheetsURL);
          const txt = await r.text();
          setProductos(parsearCSV(txt));
        } catch {
          setProductos(productosLocales);
          showToast("Error conectando Sheets");
        }
      } else {
        setProductos(productosLocales);
      }
      setCargando(false);
    }
    cargar();
  }, []);

  // Cerrar carrito con Escape / bloquear scroll
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else if (cartOpen) setCartOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, cartOpen]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || lightbox ? "hidden" : "";
  }, [cartOpen, lightbox]);

  // Toast
  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2800);
  }, []);

  // Filtros dinámicos según productos disponibles en la sección
  const getFiltros = useCallback(
    (sec) => {
      const cats = [
        ...new Set(
          productos.filter((p) => p.seccion === sec).map((p) => p.categoria),
        ),
      ];
      return [
        { v: "all", l: "Ver todo" },
        ...cats.map((cat) => ({
          v: cat,
          l:
            CATEGORIA_LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1),
        })),
      ];
    },
    [productos],
  );

  // Cambiar sección — resetea filtro
  const cambiarSeccion = (sec) => {
    setSeccion(sec);
    setFiltro("all");
  };

  // Productos visibles
  const productosFiltrados = productos
    .filter((p) => p.seccion === seccion)
    .filter((p) => filtro === "all" || p.categoria === filtro);

  // Carrito helpers
  const cantidadEnCarrito = (id) =>
    carrito.find((i) => i.producto.id === id)?.cantidad || 0;
  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);
  const totalPrecio = carrito
    .filter((i) => !i.producto.cotizar)
    .reduce((s, i) => s + i.producto.precio * i.cantidad, 0);
  const tieneCotizables = carrito.some((i) => i.producto.cotizar);

  const agregar = (id) => {
    const p = productos.find((p) => p.id === id);
    if (!p || !p.disponible) return;
    setCarrito((prev) => {
      const item = prev.find((i) => i.producto.id === id);
      const cant = item?.cantidad || 0;
      if (!p.personalizado && cant >= p.stock) {
        showToast(`Solo hay ${p.stock} disponible${p.stock > 1 ? "s" : ""}`);
        return prev;
      }
      if (item) {
        showToast(`✓ ${p.nombre} actualizado`);
        return prev.map((i) =>
          i.producto.id === id ? { ...i, cantidad: i.cantidad + 1 } : i,
        );
      }
      showToast(`✓ ${p.nombre} agregado`);
      return [...prev, { producto: p, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    const p = productos.find((p) => p.id === id);
    if (!p) return;
    setCarrito((prev) => {
      const item = prev.find((i) => i.producto.id === id);
      if (!item && delta > 0) {
        agregar(id);
        return prev;
      }
      if (!item) return prev;
      const nueva = item.cantidad + delta;
      if (delta > 0 && !p.personalizado && nueva > p.stock) {
        showToast(`Solo hay ${p.stock} disponible${p.stock > 1 ? "s" : ""}`);
        return prev;
      }
      if (nueva <= 0) return prev.filter((i) => i.producto.id !== id);
      return prev.map((i) =>
        i.producto.id === id ? { ...i, cantidad: nueva } : i,
      );
    });
  };

  const vaciarCarrito = () => setCarrito([]);

  const enviarWhatsApp = () => {
    if (!carrito.length) return;
    const fijos = carrito.filter((i) => !i.producto.cotizar);
    const cotizables = carrito.filter((i) => i.producto.cotizar);
    const total = fijos.reduce((s, i) => s + i.producto.precio * i.cantidad, 0);
    let msg = "Hola Rakkun! 💛 Me interesan estos productos:\n\n";
    if (fijos.length) {
      msg += fijos
        .map(
          ({ producto: p, cantidad }) =>
            `- ${p.nombre}${cantidad > 1 ? ` (x${cantidad})` : ""} — $${(p.precio * cantidad).toLocaleString()} MXN`,
        )
        .join("\n");
      if (cotizables.length)
        msg += `\n\nTotal artículos con precio fijo: $${total.toLocaleString()} MXN`;
    }
    if (cotizables.length) {
      msg += "\n\n*Artículos a cotizar:*\n";
      msg += cotizables
        .map(
          ({ producto: p, cantidad }) =>
            `- ${p.nombre}${cantidad > 1 ? ` (x${cantidad})` : ""} (precio a convenir)`,
        )
        .join("\n");
      msg += "\n\n¿Podrías darme la cotización de estos artículos?";
    }
    if (!cotizables.length)
      msg += `\n\nTotal estimado: $${total.toLocaleString()} MXN\n\n¿Están disponibles?`;
    window.open(
      `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const scrollAlCatalogo = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  const filtros = getFiltros(seccion);

  // ── SECCIONES CONFIG ─────────────────────────────────
  const SECCIONES = [
    { v: "joyeria", l: "Joyería", icon: "💎" },
    { v: "confeccion", l: "Confección", icon: "🧵" },
    { v: "mascotas", l: "Mascotas", icon: "🐾" },
  ];

  return (
    <>
      {/* ── ANNOUNCEMENT ── */}
      <div className="announcement-bar">
        <span>📍 Entregas personales en</span>
        <strong>Coatzacoalcos, Ver.</strong>
        <span className="sep">|</span>
        <span>📦 Próximamente envíos a todo México</span>
      </div>

      {/* ── HEADER ── */}
      <header>
        <div className="header-left">
          <span className="logo">
            <img src="/logo.png" alt="Rakkun logo" className="logo-img" />
            <span className="logo-text">
              <span className="logo-name">
                RAK<span>KUN</span>
              </span>
              <span className="logo-studio">Studio</span>
            </span>
          </span>
          <span className="header-catalog-label">Catálogo</span>
        </div>
        <div className="header-right">
          <button className="cart-header-btn" onClick={() => setCartOpen(true)}>
            <IconBag />
            <span>Mi selección</span>
            <span className={`cart-badge${totalItems > 0 ? " show" : ""}`}>
              {totalItems}
            </span>
          </button>
        </div>
      </header>

      {/* ── INFO BANNER ── */}
      <div className="info-banner">
        <span className="info-banner-item">
          🛍️ <strong>Agrega productos y pregunta sin compromiso</strong>
        </span>
        <span className="sep">·</span>
        <span className="info-banner-item">
          Arma tu selección y envíanos un mensaje
        </span>
        <span className="sep">·</span>
        <span className="info-banner-item">
          💬 Resolvemos todas tus dudas por WhatsApp
        </span>
      </div>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="hero-content">
          <h1>
            Piezas que <em>cuentan</em>
            <br />
            tu historia
          </h1>
          <p>
            Joyería artesanal, confección a medida y accesorios para mascotas.
            Todo hecho con amor, especialmente para ti.
          </p>
          <button className="hero-cta" onClick={scrollAlCatalogo}>
            Ver catálogo
          </button>
        </div>
      </div>

      {/* ── CATÁLOGO ── */}
      <div className="catalog-section" id="catalogo">
        <p className="section-title">Nuestro Catálogo</p>
        <p className="section-sub">
          Explora todo lo que Rakkun tiene para ti ✨
        </p>

        {/* Pestañas */}
        <div className="main-tabs">
          {SECCIONES.map((s) => (
            <button
              key={s.v}
              className={`main-tab${seccion === s.v ? " active" : ""}`}
              onClick={() => cambiarSeccion(s.v)}
            >
              <span>{s.icon}</span> {s.l}
            </button>
          ))}
        </div>

        {/* Filtros dinámicos */}
        <div className="filters">
          {filtros.map((f) => (
            <button
              key={f.v}
              className={`filter-btn${filtro === f.v ? " active" : ""}`}
              onClick={() => setFiltro(f.v)}
            >
              {f.l}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="product-grid">
          {cargando && (
            <div className="loading-state">
              <div className="spinner" />
              <p>Cargando productos...</p>
            </div>
          )}
          {!cargando && productosFiltrados.length === 0 && (
            <div className="empty-state">
              <p>Próximamente productos en esta categoría 🌸</p>
            </div>
          )}
          {!cargando &&
            productosFiltrados.map((p) => (
              <ProductCard
                key={p.id}
                producto={p}
                cantidadEnCarrito={cantidadEnCarrito(p.id)}
                onAgregar={agregar}
                onCambiarCantidad={cambiarCantidad}
                onLightbox={setLightbox}
              />
            ))}
        </div>
      </div>

      {/* ── INSTAGRAM BANNER ── */}
      <div className="ig-banner">
        <div className="ig-banner-inner">
          <h3>¿Quieres ver más? 📸</h3>
          <p>
            Síguenos en Instagram para ver los últimos trabajos, procesos de
            creación y sorpresas exclusivas para nuestra comunidad.
          </p>
          <a
            href={CONFIG.instagram}
            target="_blank"
            rel="noreferrer"
            className="ig-banner-btn"
          >
            <IconIG /> Ver en Instagram
          </a>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="about" id="sobre-mi">
        <div className="about-wrapper">
          <div className="about-img">✦</div>
          <div className="about-text">
            <p className="section-title">
              Hola, soy
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                Rakkun
              </em>
            </p>
            <p>
              Soy una emprendedora apasionada por crear piezas únicas: joyería
              artesanal, confección a medida y accesorios especiales para
              mascotas. Cada trabajo lo hago con mucho amor y atención al
              detalle.
            </p>
            <p>
              Estoy en{" "}
              <strong style={{ color: "var(--dark)" }}>
                Coatzacoalcos, Ver.
              </strong>{" "}
              y hago entregas personales en la ciudad. ¡Escríbeme para
              coordinar! 💛
            </p>
            <div className="about-contact-row">
              <a
                href={`https://wa.me/${CONFIG.whatsapp}?text=Hola!%20Vi%20tu%20catalogo%20y%20me%20interesa%20un%20producto`}
                target="_blank"
                rel="noreferrer"
                className="contact-pill wa"
              >
                <IconWASmall /> WhatsApp
              </a>
              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noreferrer"
                className="contact-pill ig"
              >
                <IconIG /> Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contacto">
        <span className="footer-logo">
          <img src="/logo.png" alt="Rakkun" className="footer-logo-img" />
          RAKKUN
        </span>
        <div className="footer-announcement">
          <p>
            📍 <strong>Entregas personales en Coatzacoalcos, Ver.</strong>
          </p>
          <p>
            📦 Próximamente envíos a todo México · ¡Escríbeme para coordinar tu
            entrega! 💛
          </p>
        </div>
        <p style={{ marginBottom: 6 }}>
          ¿Te interesa algún producto? ¡Con gusto te atiendo!
        </p>
        <p>© 2026 Rakkun · Hecho con amor</p>
      </footer>

      {/* ── FLOAT WA ── */}
      <a
        href={`https://wa.me/${CONFIG.whatsapp}?text=Hola!%20Vi%20tu%20catalogo`}
        target="_blank"
        rel="noreferrer"
        className="wa-float"
      >
        <IconWA />
      </a>

      {/* ── CART OVERLAY + DRAWER ── */}
      <div
        className={`cart-overlay${cartOpen ? " open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <div className={`cart-drawer${cartOpen ? " open" : ""}`}>
        <div className="cart-header-drawer">
          <h2>Mi selección 🛍️</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>
            ✕
          </button>
        </div>
        <div className="cart-items">
          {carrito.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <p>
                Tu selección está vacía.
                <br />
                ¡Agrega los productos que te gusten!
              </p>
            </div>
          ) : (
            carrito.map(({ producto, cantidad }) => (
              <CartItem
                key={producto.id}
                producto={producto}
                cantidad={cantidad}
                onCambiar={cambiarCantidad}
              />
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total-row">
            <span className="cart-total-label">Total estimado</span>
            <span className="cart-total-amount">
              {totalPrecio > 0 ? (
                <>
                  ${totalPrecio.toLocaleString()} <small>MXN</small>
                </>
              ) : tieneCotizables ? (
                <span
                  style={{
                    fontSize: "1rem",
                    fontFamily: "'DM Sans',sans-serif",
                    color: "var(--gray)",
                  }}
                >
                  A cotizar
                </span>
              ) : (
                <>
                  $0 <small>MXN</small>
                </>
              )}
            </span>
          </div>
          {tieneCotizables && totalPrecio > 0 && (
            <div className="cart-cotizar-note">
              + cotización de artículos personalizados
            </div>
          )}
          <p className="cart-note">
            Al enviar el mensaje podemos coordinar entrega y confirmar
            disponibilidad 💛
          </p>
          <button
            className="btn-send-wa"
            onClick={enviarWhatsApp}
            disabled={!carrito.length}
          >
            <IconWASmall /> Enviar por WhatsApp
          </button>
          {carrito.length > 0 && (
            <button className="btn-clear-cart" onClick={vaciarCarrito}>
              Vaciar selección
            </button>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lightbox open" onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {lightbox.imagen ? (
              <img src={lightbox.imagen} alt={lightbox.nombre} />
            ) : (
              <div className="lightbox-emoji">{lightbox.emoji || "✨"}</div>
            )}
            <button
              className="lightbox-close"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
            <div className="lightbox-name">{lightbox.nombre}</div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <div className={`toast${toastVisible ? " show" : ""}`}>{toastMsg}</div>
    </>
  );
}

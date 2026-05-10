// footer — la placa de identificación al final de la clínica,
// como el letrero de la puerta que dice el nombre y el año de fundación
const Footer = () => {

  // el año actual — para que la placa siempre esté al día
  const anio = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-stone-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">

        {/* nombre de la clínica — la huella en el pie de página */}
        <div className="flex items-center gap-1.5 text-stone-400 text-xs">
          <span aria-hidden="true">🐾</span>
          <span>Cuidado Animal</span>
        </div>

        {/* año en curso — como la fecha en el sello de una ficha clínica */}
        <p className="text-stone-300 text-xs">
          © {anio} · Sistema de gestión veterinaria
        </p>

      </div>
    </footer>
  );
};

export default Footer;
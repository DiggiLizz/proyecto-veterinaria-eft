/**
 * Footer
 * Pie de página simple con nombre del sistema y año
 */
const Footer = () => {
  const anio = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-stone-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-stone-400 text-xs">
          <span aria-hidden="true">🐾</span>
          <span>Cuidado Animal</span>
        </div>
        <p className="text-stone-300 text-xs">
          © {anio} · Sistema de gestión veterinaria
        </p>
      </div>
    </footer>
  );
};

export default Footer;

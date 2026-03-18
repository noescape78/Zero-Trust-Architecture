export default function Card({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        group cursor-pointer
        w-[320px] h-[200px]
        bg-white/5 backdrop-blur
        border border-white/10
        rounded-xl
        p-6
        transition-all duration-300
        hover:-translate-y-2
        hover:border-emerald-400/50
        hover:bg-white/10
      "
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg tracking-wide mb-2">{title}</h3>
      <p className="text-sm text-gray-400 group-hover:text-gray-300">
        {desc}
      </p>
    </div>
  );
}
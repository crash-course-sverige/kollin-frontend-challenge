const Badge = ({ children, styling }) => {
  return (
    <div
      className={`flex justify-center items-center gap-1 py-2 px-4 w-full rounded-2xl border border-slate-200 bg-slate-100 ${styling}`}
    >
      {children}
    </div>
  );
};

export default Badge;

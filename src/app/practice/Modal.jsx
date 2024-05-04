const Modal = ({ children }) => {
  return (
    <div className='flex justify-center items-center fixed top-0 left-0 h-screen w-screen bg-slate-900/10 backdrop-blur-sm z-50'>
      <div className='flex flex-col gap-8 p-8 rounded-lg border bg-slate-100 max-w-[80%] max-h-[80%] shadow relative overflow-auto'>
        {children}
      </div>
    </div>
  );
};

export default Modal;

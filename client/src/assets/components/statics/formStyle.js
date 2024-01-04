export const style = () => {
  const title =
    "text-2xl py-2 !md:text-5xl text-slate-800 text-center tracking-wider font-semibold";
  const form =
    "!px-10 !py-7 md:p-3 shadow-sm shadow-slate-400 border-b-2 border-slate-200 w-full";
  const label = "block text-lg my-1";
  const input =
    "p-2 my-1 bg-slate-50 focus:bg-slate-0 md:px-3 md:py-2 text-md placeholder:text-sm outline-none border-slate-300 border-2 w-full rounded-md focus:border-slate-400 hover:border-slate-400";
  const submit =
    "w-full mt-5 mb-1 py-2 border-transparent bg-blue-500 shadow-sm shadow-blue-500 rounded-lg text-white hover:bg-blue-400 cursor-pointer text-center ";
  const altSubmit =
    "w-full my-1 py-2 border-transparent bg-slate-400 shadow-sm shadow-slate-400 rounded-lg text-white hover:bg-slate-300 cursor-pointer text-center";
  const errorStyle = "p-2 text-red-600 bg-red-100 border-2 border-red-400 my-3";
  const successStyle =
    "p-2 text-green-600 bg-green-100 border-2 border-green-400 my-3";
  return {
    label,
    input,
    submit,
    altSubmit,
    form,
    title,
    errorStyle,
    successStyle,
  };
};

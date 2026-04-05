import React from 'react';

const App = () => {
  const tools = ['Compressor', 'Simulator', 'Multi-Model', 'Translator'];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-zinc-300 flex flex-col font-sans relative h-screen overflow-hidden">
      
      {/* HEADER */}
      <header className="w-full p-6 flex justify-between items-center border-b border-zinc-900 bg-[#050505] z-10 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-wider text-white uppercase leading-none">
              EDGE<span className="text-lime-400">RUNNER</span>
            </h1>
            <span className="text-[8px] text-lime-500/80 tracking-[0.3em] font-bold mt-1.5 uppercase">
              Agentic AI Device
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 bg-zinc-900/50 rounded-full border border-zinc-800/80 ml-4">
            <span className="flex items-center gap-1.5 text-lime-400">
              <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(163,230,53,0.5)]"></span> SSD
            </span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1.5 text-lime-400">
              <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(163,230,53,0.5)]"></span> GPU
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* User Avatar with Green-to-Cyan Gradient */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lime-400 to-cyan-400 flex items-center justify-center text-black font-extrabold text-sm shadow-lg">
            NM
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT GRID */}
      <div className="flex-1 w-full flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT SIDEBAR (Cloud & Modules) */}
        <aside className="w-full lg:w-80 border-r border-zinc-900 bg-[#0a0a0a] flex flex-col shrink-0 overflow-y-auto p-6 gap-6">
          
          {/* NEW CHAT BUTTON */}
          <button className="flex items-center justify-center gap-3 w-full bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 border border-lime-500/30 px-4 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(163,230,53,0.05)] hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] group">
            <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            New Session
          </button>

          {/* LOCAL CLOUD WIDGET */}
          <div className="bg-[#0f0f0f] rounded-2xl border border-zinc-800/60 p-5 flex flex-col shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold text-white tracking-wide">Local Cloud</h2>
              <span className="text-lime-400 text-[9px] font-bold px-2 py-0.5 rounded border border-lime-500/30 bg-lime-500/10 uppercase tracking-widest">
                Online
              </span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-xs text-zinc-500 font-mono mb-2">
                <span>Usage</span>
                <span>10MB / 512GB</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                {/* Usage Bar matching the accent color */}
                <div className="bg-lime-400 h-full w-[2%] shadow-[0_0_8px_rgba(163,230,53,0.6)]"></div>
              </div>
            </div>

            <div className="border border-dashed border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center bg-zinc-900/20 hover:bg-zinc-900/50 transition-colors cursor-pointer group">
              <svg className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <p className="text-[10px] font-bold text-zinc-500 mb-3 tracking-widest group-hover:text-zinc-300 transition-colors">SYNC TO DRIVE</p>
              <button className="bg-[#050505] hover:bg-zinc-800 text-zinc-300 text-xs font-medium py-2 px-4 rounded-lg transition-all w-full border border-zinc-800 group-hover:border-zinc-600">
                Choose File
              </button>
            </div>
          </div>

          {/* WORKSPACE MODULES */}
          <div className="flex-1 bg-[#0f0f0f] rounded-2xl border border-zinc-800/60 p-5 shadow-xl">
            <h2 className="text-[10px] font-bold text-lime-500/70 uppercase tracking-widest mb-4 px-2 border-b border-zinc-800 pb-3">
              Workspace Tools
            </h2>
            <div className="flex flex-col gap-1 mt-2">
              {tools.map((tool) => (
                <button 
                  key={tool} 
                  className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-900 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
                >
                  <svg className="w-4 h-4 text-zinc-700 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  {tool}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT AREA: CHATBOT INTERFACE */}
        <main className="flex-1 flex flex-col bg-[#050505] relative h-full">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-[#050505]/90 backdrop-blur-md absolute top-0 w-full z-10">
            <div className="flex items-center gap-3 pl-2">
              <div className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.6)]"></div>
              <h2 className="text-zinc-200 font-semibold text-sm tracking-wide">Agentic Terminal</h2>
            </div>
            
            {/* Header Actions (Model Select + Split View) */}
            <div className="flex items-center gap-2">
              <select className="bg-[#0a0a0a] border border-zinc-800 text-zinc-400 text-xs rounded-lg px-3 py-1.5 outline-none focus:border-lime-500/50 cursor-pointer mr-1">
                <option>Llama 3.2 (Local)</option>
                <option>Cloud API Fallback</option>
              </select>
              
              {/* SPLIT CHAT BUTTON */}
              <button 
                className="p-1.5 text-zinc-500 hover:text-lime-400 hover:bg-zinc-900 rounded-lg transition-colors border border-transparent hover:border-zinc-800"
                title="Split View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 4v16m0 0h6m-6 0H5a2 2 0 01-2-2V6a2 2 0 012-2h4m6 16h4a2 2 0 002-2V6a2 2 0 00-2-2h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat History Container (Empty State) */}
          <div className="flex-1 overflow-y-auto p-6 pt-24 pb-32 space-y-8 scroll-smooth flex flex-col items-center justify-center bg-[radial-gradient(#151515_1px,transparent_1px)] [background-size:24px_24px]">
             <div className="text-zinc-700 font-mono text-sm flex flex-col items-center gap-4 opacity-40">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
               <p className="tracking-widest uppercase text-xs">Awaiting input sequence...</p>
             </div>
          </div>

          {/* Chat Input Area */}
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#0a0a0a] border border-zinc-800 focus-within:border-lime-500/50 transition-colors rounded-2xl p-2 flex items-end shadow-2xl">
                
                {/* Plus / Attachment Button */}
                <button className="p-3 text-zinc-500 hover:text-lime-400 hover:bg-zinc-900 rounded-xl transition-colors shrink-0 mb-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </button>

                {/* Text Area */}
                <textarea 
                  placeholder="Query EDGERUNNER..." 
                  className="flex-1 bg-transparent border-none outline-none text-zinc-200 px-2 py-3 max-h-32 min-h-[44px] resize-none placeholder-zinc-600 text-[15px] leading-relaxed font-sans"
                  rows="1"
                ></textarea>

                {/* Send Button */}
                <button className="p-3 m-0.5 bg-lime-400 hover:bg-lime-300 text-black rounded-xl transition-all shrink-0 shadow-[0_0_10px_rgba(163,230,53,0.3)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>

              </div>
              <p className="text-center text-[9px] text-zinc-600 mt-3 font-medium tracking-widest uppercase">
                EDGERUNNER OS // LLAMA 3.2 // LOCAL COMPUTE ACTIVE
              </p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;

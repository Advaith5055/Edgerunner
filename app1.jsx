import React, { useState, useRef, useEffect } from 'react';

// Updated Styles for medium pace and neon highlighting
const styles = `
  @keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .animate-marquee-left {
    display: flex;
    width: max-content;
    animation: marquee-left 12s linear infinite; /* Medium Pace */
  }
  .animate-marquee-right {
    display: flex;
    width: max-content;
    animation: marquee-right 12s linear infinite; /* Medium Pace */
  }
  /* Custom scrollbar for mini file manager */
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #27272a;
    border-radius: 4px;
  }
`;

// Helper function to format sizes globally
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const FilePreviewModal = ({ filename, onClose }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const isVideo = filename.match(/\.(mp4|webm|ogg)$/i);
  const isImage = filename.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i);
  const isText = filename.match(/\.(txt|md|js|jsx|py|html|css|sh|json|csv|yaml|yml)$/i);

  const fileUrl = `http://10.76.120.148:5000/files/content/${filename}`;

  useEffect(() => {
    if (isText) {
      fetchText();
    } else {
      setLoading(false);
    }
  }, [filename]);

  const fetchText = async () => {
    try {
      const response = await fetch(fileUrl);
      if (response.ok) {
        const text = await response.text();
        setContent(text);
      }
    } catch (err) {
      setContent('Failed to load file content.');
    } finally {
      setLoading(false);
    }
  };

  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (isImage || isVideo) {
      fetchBlob();
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [filename]);

  const fetchBlob = async () => {
    try {
      const response = await fetch(fileUrl);
      if (response.ok) {
        const blob = await response.blob();
        setObjectUrl(URL.createObjectURL(blob));
      }
    } catch (err) {
      console.error("Error fetching media blob", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        <header className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/30">
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-sm tracking-wide">{filename}</h3>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-0.5">EDGERUNNER PREVIEW ENGINE</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center min-h-[300px]">
          {loading ? (
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
          ) : (
            <>
              {isImage && objectUrl && <img src={objectUrl} alt={filename} className="max-w-full max-h-full object-contain rounded-xl shadow-lg" />}
              {isVideo && objectUrl && <video src={objectUrl} controls autoPlay className="max-w-full max-h-full rounded-xl shadow-lg border border-zinc-800" />}
              {isText && (
                <pre className="w-full text-zinc-300 font-mono text-xs p-6 bg-black/50 border border-zinc-800 rounded-xl whitespace-pre-wrap leading-relaxed shadow-inner">
                  {content}
                </pre>
              )}
              {!isImage && !isVideo && !isText && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <p className="text-zinc-500 text-sm mb-4">Binary file or unsupported preview type.</p>
                  <a href={fileUrl} download={filename} className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Download File</a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ onNavigate }) => {
  const topText = Array(20).fill("EDGERUNNER // ").join("");
  const bottomText = Array(20).fill("BETA VERSION // ").join("");

  return (
    <div className="min-h-screen w-full bg-[#050505] text-zinc-300 flex flex-col font-sans relative overflow-hidden bg-[radial-gradient(#151515_1px,transparent_1px)] [background-size:24px_24px]">

      <div className="w-full bg-lime-500/15 border-b border-lime-500/30 py-2.5 overflow-hidden shrink-0 flex items-center shadow-[0_0_20px_rgba(163,230,53,0.2)] z-20">
        <div className="animate-marquee-left text-lime-400 font-black tracking-[0.3em] text-[11px] whitespace-nowrap uppercase">
          {topText}{topText}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-5xl mx-auto z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-widest text-white uppercase leading-none mb-3 drop-shadow-lg">
            EDGE<span className="text-lime-400">RUNNER</span>
          </h1>
          <span className="text-xs text-lime-500/80 tracking-[0.5em] font-bold uppercase border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 rounded-full shadow-inner">
            Agentic AI Device
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <button
            onClick={() => onNavigate('chatbot')}
            className="bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl border border-zinc-800 hover:border-lime-500/50 p-8 flex flex-col items-center text-center shadow-xl hover:shadow-[0_0_30px_rgba(163,230,53,0.15)] transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-lime-500/10 group-hover:border-lime-500/30 transition-colors">
              <svg className="w-8 h-8 text-zinc-500 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-2 group-hover:text-lime-400 transition-colors">Agentic Terminal</h2>
            <p className="text-sm text-zinc-500 font-medium tracking-wide mb-6">Access local compute and multi-modal interaction.</p>
            <span className="mt-auto px-6 py-2 bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400 group-hover:text-black group-hover:bg-lime-400 rounded-lg transition-all tracking-widest uppercase">Initialize</span>
          </button>

          <button
            onClick={() => onNavigate('cloud')}
            className="bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl border border-zinc-800 hover:border-cyan-500/50 p-8 flex flex-col items-center text-center shadow-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
              <svg className="w-8 h-8 text-zinc-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-2 group-hover:text-cyan-400 transition-colors">Local Cloud</h2>
            <p className="text-sm text-zinc-500 font-medium tracking-wide mb-6">Manage encrypted local storage and dataset synchronization.</p>
            <span className="mt-auto px-6 py-2 bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400 group-hover:text-black group-hover:bg-cyan-400 rounded-lg transition-all tracking-widest uppercase">Mount Drive</span>
          </button>
        </div>
      </div>

      <div className="w-full bg-lime-500/10 border-t border-lime-500/30 py-2.5 overflow-hidden shrink-0 flex items-center mt-auto shadow-[0_-5px_20px_rgba(163,230,53,0.2)] z-20">
        <div className="animate-marquee-right text-lime-400 font-black tracking-[0.4em] text-[11px] whitespace-nowrap uppercase">
          {bottomText}{bottomText}
        </div>
      </div>
    </div>
  );
};

const DriveInterface = ({ onBack }) => {
  const [cloudFiles, setCloudFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://10.76.120.148:5000/files');
      if (response.ok) {
        const data = await response.json();
        setCloudFiles(data.files || []);
      }
    } catch (err) {
      console.error("Failed to fetch cloud files", err);
    }
  };

  const deleteFile = async (filename) => {
    try {
      const response = await fetch(`http://10.76.120.148:5000/files/${filename}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCloudFiles(prev => prev.filter(f => f.name !== filename));
      }
    } catch (error) {
      console.error("Failed to delete file", error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploadStatus('Uploading...');

    try {
      const response = await fetch('http://10.76.120.148:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setUploadStatus('');
        fetchFiles();
      } else {
        setUploadStatus('Upload failed');
      }
    } catch (err) {
      setUploadStatus('Connection error');
    }

    e.target.value = '';
    setTimeout(() => setUploadStatus(''), 3000);
  };

  const categorizedFiles = {
    'Datasets': cloudFiles.filter(f => f.name.match(/\.(csv|json|sql|xls|xlsx)$/i)),
    'Documents': cloudFiles.filter(f => f.name.match(/\.(txt|md|pdf|doc|docx)$/i)),
    'Code & Algorithms': cloudFiles.filter(f => f.name.match(/\.(py|js|jsx|html|css|sh|php|cpp|c|h)$/i)),
    'Media': cloudFiles.filter(f => f.name.match(/\.(png|jpg|jpeg|gif|mp4|mp3|wav|webp)$/i)),
    'Other / Binaries': cloudFiles.filter(f => !f.name.match(/\.(csv|json|sql|xls|xlsx|txt|md|pdf|doc|docx|py|js|jsx|html|css|sh|php|cpp|c|h|png|jpg|jpeg|gif|mp4|mp3|wav|webp)$/i))
  };

  const totalSize = cloudFiles.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-zinc-300 flex flex-col font-sans relative overflow-x-hidden bg-[radial-gradient(#151515_1px,transparent_1px)] [background-size:24px_24px]">
      <header className="w-full p-6 flex justify-between items-center border-b border-zinc-900 bg-[#050505] z-10 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col cursor-pointer" onClick={onBack}>
            <h1 className="text-2xl font-black tracking-wider text-white uppercase leading-none hover:opacity-80 transition-opacity">
              EDGE<span className="text-lime-400">RUNNER</span>
            </h1>
            <span className="text-[8px] text-lime-500/80 tracking-[0.3em] font-bold mt-1.5 uppercase">Local Cloud Device</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors border border-zinc-800 hover:border-zinc-500 px-4 py-2 rounded-lg"
          >
            Terminal
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-lime-400 flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_15px_rgba(34,211,238,0.3)]">NM</div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-black text-white tracking-wider uppercase mb-2">SSD <span className="text-cyan-400">Storage</span></h2>
            <p className="text-zinc-500 text-sm tracking-wide">Manage your classified local datasets and files safely stored on the Jetson SSD.</p>
          </div>

          <div className="flex items-center gap-6 md:gap-8 bg-[#0a0a0a] p-4 rounded-2xl border border-zinc-800/80">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Capacity Used</span>
              <span className="text-cyan-400 font-mono text-lg">{formatBytes(totalSize)}</span>
            </div>
            <div className="w-px h-10 bg-zinc-800"></div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Upload
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          </div>
        </div>

        {uploadStatus && (
          <div className="mb-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">{uploadStatus}</span>
          </div>
        )}

        <div className="space-y-12 pb-20">
          {cloudFiles.length === 0 && !uploadStatus ? (
            <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-3xl bg-[#0f0f0f] shadow-inner">
              <svg className="w-16 h-16 text-zinc-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <p className="text-zinc-500 tracking-widest text-sm uppercase font-bold">Drive is Empty</p>
              <p className="text-zinc-700 text-xs tracking-wide mt-2">Initialize your SSD by uploading new datasets.</p>
            </div>
          ) : (
            Object.entries(categorizedFiles).map(([category, files]) => {
              if (files.length === 0) return null;
              return (
                <div key={category} className="w-full">
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">{category}</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">{files.length} items</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {files.map(f => (
                      <div key={f.name} className="bg-[#0a0a0a] border border-zinc-800/80 p-5 rounded-2xl flex flex-col group hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all relative overflow-hidden h-32">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex justify-between items-start mb-auto">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setPreviewFile(f.name)}
                              className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 text-zinc-500 group-hover:text-cyan-400 transition-colors"
                              title="Preview File"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                          </div>
                          <button
                            onClick={() => deleteFile(f.name)}
                            className="text-zinc-600 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 outline-none rounded-lg hover:bg-zinc-900"
                            title="Securely delete from SSD"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                        <div className="flex flex-col mt-4">
                          <span className="text-zinc-200 font-medium text-sm truncate mb-0.5" title={f.name}>{f.name}</span>
                          <span className="text-zinc-500 text-[10px] font-mono tracking-wide">{formatBytes(f.size)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>
      {previewFile && <FilePreviewModal filename={previewFile} onClose={() => setPreviewFile(null)} />}
    </div>
  )
}


const ChatbotInterface = ({ onBack }) => {
  const tools = ['Compressor', 'Simulator', 'Multi-Model', 'Translator'];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama3.2:1b');

  // Custom states
  const [uploadStatus, setUploadStatus] = useState('');
  const [cloudFiles, setCloudFiles] = useState([]);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://10.76.120.148:5000/files');
      if (response.ok) {
        const data = await response.json();
        setCloudFiles(data.files || []);
      }
    } catch (err) {
      console.error("Failed to fetch cloud files", err);
    }
  };

  const deleteFile = async (filename) => {
    try {
      const response = await fetch(`http://10.76.120.148:5000/files/${filename}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCloudFiles(prev => prev.filter(f => f.name !== filename));
        setMessages(prev => [...prev, {
          role: 'user',
          content: `[System]: Unmounted file "${filename}" from Local Cloud.`
        }]);
      }
    } catch (error) {
      console.error("Failed to delete file", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (isToolsOpen) setIsToolsOpen(false);

    const userMessage = input;
    const toolForRequest = activeTool;
    const fileForRequest = activeFile;
    let prefix = '';
    if (toolForRequest) prefix += `[${toolForRequest}] `;
    if (fileForRequest) prefix += `📎 ${fileForRequest} — `;
    const displayMsg = prefix + userMessage;
    setMessages(prev => [...prev, { role: 'user', content: displayMsg }]);
    setInput('');
    setActiveTool(null);
    setActiveFile(null);
    setIsLoading(true);

    try {
      const payload = { prompt: userMessage, model: selectedModel };
      if (toolForRequest) payload.tool = toolForRequest;
      if (fileForRequest) payload.focus_file = fileForRequest;

      const response = await fetch('http://10.76.120.148:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to local server. Make sure the backend is running.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploadStatus('Uploading...');

    try {
      const response = await fetch('http://10.76.120.148:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setUploadStatus('');
        fetchFiles();
        setActiveFile(file.name); // show as chip inside message bar
      } else {
        setUploadStatus('Upload failed');
      }
    } catch (err) {
      setUploadStatus('Connection error');
    }

    e.target.value = '';
    setTimeout(() => setUploadStatus(''), 3000);
  };

  const totalSize = cloudFiles.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-zinc-300 flex flex-col font-sans relative h-screen overflow-hidden">
      <header className="w-full p-6 flex justify-between items-center border-b border-zinc-900 bg-[#050505] z-10 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col cursor-pointer" onClick={onBack}>
            <h1 className="text-2xl font-black tracking-wider text-white uppercase leading-none hover:opacity-80 transition-opacity">
              EDGE<span className="text-lime-400">RUNNER</span>
            </h1>
            <span className="text-[8px] text-lime-500/80 tracking-[0.3em] font-bold mt-1.5 uppercase">Agentic AI Device</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 bg-zinc-900/50 rounded-full border border-zinc-800/80 ml-4">
            <span className="flex items-center gap-1.5 text-lime-400"><span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(163,230,53,0.5)]"></span> SSD</span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1.5 text-lime-400"><span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(163,230,53,0.5)]"></span> GPU</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => onBack('cloud')}
            className="flex items-center gap-2 text-[10px] font-bold text-cyan-500 hover:text-white uppercase tracking-widest transition-colors border border-zinc-800 hover:border-cyan-500 px-3 py-1.5 rounded-lg"
            title="Open Drive Interface"
          >
            Drive
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lime-400 to-cyan-400 flex items-center justify-center text-black font-extrabold text-sm shadow-lg">NM</div>
        </div>
      </header>

      <div className="flex-1 w-full flex flex-col lg:flex-row overflow-hidden">

        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 border-r border-zinc-900 bg-[#0a0a0a] flex flex-col shrink-0 overflow-y-auto p-6 gap-6">
          <div className="flex gap-2 w-full">
            <button onClick={onBack} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 p-3.5 rounded-2xl transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-3 bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 border border-lime-500/30 px-4 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(163,230,53,0.05)] hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] group"
              onClick={() => setMessages([])}
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              New Session
            </button>
          </div>

          <div className="bg-[#0f0f0f] rounded-2xl border border-zinc-800/60 p-5 flex flex-col shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold text-white tracking-wide">Cloud SSD Drive</h2>
              <span className="text-cyan-400 text-[9px] font-bold px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 uppercase tracking-widest">Active Sync</span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-zinc-500 font-mono mb-2"><span>Capacity Used</span><span>{formatBytes(totalSize)}</span></div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                <div className="bg-cyan-400 h-full w-[10%] shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4 max-h-[140px] overflow-y-auto custom-scrollbar pr-1">
              {cloudFiles.length === 0 ? (
                <div className="text-center text-zinc-600 text-[10px] py-4 tracking-widest uppercase border border-dashed border-zinc-800 rounded-lg">Drive Empty</div>
              ) : (
                cloudFiles.map(f => (
                  <div
                    key={f.name}
                    className="flex justify-between items-center p-2.5 rounded-xl border bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800/80 transition-colors group cursor-pointer"
                    onClick={() => setActiveFile(prev => prev === f.name ? null : f.name)}
                  >
                    <div className="flex flex-col overflow-hidden mr-2">
                      <span className="text-zinc-300 text-xs truncate" title={f.name}>{f.name}</span>
                      <span className="text-zinc-600 text-[9px]">{formatBytes(f.size)}</span>
                    </div>
                    <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="text-zinc-600 hover:text-cyan-400 p-1.5 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        onClick={(e) => { e.stopPropagation(); setPreviewFile(f.name); }}
                        title="Preview"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button
                        className="text-zinc-600 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
                        onClick={(e) => { e.stopPropagation(); deleteFile(f.name); }}
                        title="Delete from SSD"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div
              className="border border-dashed border-zinc-800 rounded-xl p-3 flex flex-col items-center justify-center bg-zinc-900/20 hover:bg-zinc-900/50 transition-colors cursor-pointer group"
              onClick={handleFileClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <svg className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <p className="text-[10px] font-bold text-zinc-500 mb-1 tracking-widest group-hover:text-zinc-300 transition-colors">UPLOAD TO SSD</p>
              <span className="text-[9px] text-zinc-600 mb-3 text-center px-2">{uploadStatus || 'Select a file to sync'}</span>
            </div>
          </div>

          {/* Note: Workspace Tools removed from sidebar here entirely to relocate to query bar! */}
        </aside>

        <main className="flex-1 flex flex-col bg-[#050505] relative h-full">
          <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-[#050505]/90 backdrop-blur-md absolute top-0 w-full z-10">
            <div className="flex items-center gap-3 pl-2"><div className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.6)]"></div><h2 className="text-zinc-200 font-semibold text-sm tracking-wide">Agentic Terminal</h2></div>
            <div className="flex items-center gap-2">
              <select
                className="bg-[#0a0a0a] border border-zinc-800 text-zinc-400 text-xs rounded-lg px-3 py-1.5 outline-none focus:border-lime-500/50 cursor-pointer mr-1"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="llama3.2:1b">Llama 3.2 (1B - Safe)</option>
                <option value="llama3.2:3b">Llama 3.2 (3B)</option>
                <option value="gemma2:2b">Gemma 2 (2B)</option>
                <option value="gemma3:latest">Gemma 3 (4B)</option>
              </select>
              <button className="p-1.5 text-zinc-500 hover:text-lime-400 hover:bg-zinc-900 rounded-lg transition-colors border border-transparent hover:border-zinc-800" title="Split View">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 4v16m0 0h6m-6 0H5a2 2 0 01-2-2V6a2 2 0 012-2h4m6 16h4a2 2 0 002-2V6a2 2 0 00-2-2h-4" /></svg>
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-6 pt-24 pb-36 space-y-6 flex flex-col bg-[radial-gradient(#151515_1px,transparent_1px)] [background-size:24px_24px]"
            onClick={() => isToolsOpen && setIsToolsOpen(false)} // Global close click
          >
            {/* Chat Messages Rendering */}
            {messages.length === 0 ? (
              <div className="text-zinc-700 font-mono text-sm flex flex-col items-center justify-center h-full gap-4 opacity-40 mt-32">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <p className="tracking-widest uppercase text-xs">Awaiting input sequence...</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-zinc-800 text-zinc-200 rounded-br-none' : 'bg-transparent text-zinc-300'}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-lime-400"></div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-lime-400">EDGERUNNER</span>
                      </div>
                    )}
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-4 bg-transparent text-zinc-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-lime-400">EDGERUNNER</span>
                  </div>
                  <div className="flex items-center gap-1.5 h-6">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-10" />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-16 pointer-events-none">
            <div className="max-w-4xl mx-auto pointer-events-auto">
              <div className="bg-[#0a0a0a] border border-zinc-800 focus-within:border-lime-500/50 transition-colors rounded-3xl p-2 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.8)] relative">

                {/* FLOATING TOOLS MENU (Gemini Layout) */}
                {isToolsOpen && (
                  <div className="absolute bottom-full left-0 mb-4 bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl p-2 grid grid-cols-2 md:grid-cols-4 gap-2 w-full origin-bottom">
                    {tools.map(tool => (
                      <button
                        key={tool}
                        onClick={() => { setActiveTool(tool); setIsToolsOpen(false); }}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all group border ${activeTool === tool ? 'bg-lime-500/10 border-lime-500/40 text-lime-400' : 'bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-lime-400 border-transparent hover:border-zinc-700'}`}
                      >
                        <svg className="w-6 h-6 text-zinc-600 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <span className="text-[10px] font-bold tracking-widest uppercase">{tool}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* INLINE CHIPS — inside the message bar */}
                {(activeTool || activeFile) && (
                  <div className="flex items-center gap-2 px-2 pt-1.5 pb-1 flex-wrap">
                    {activeTool && (
                      <div className="flex items-center gap-1.5 bg-lime-500/10 border border-lime-500/30 text-lime-400 px-2.5 py-1 rounded-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        <span className="text-[10px] font-black tracking-widest uppercase">{activeTool}</span>
                        <button onClick={() => setActiveTool(null)} className="ml-0.5 text-lime-400/60 hover:text-red-400 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    )}
                    {activeFile && (
                      <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-2.5 py-1 rounded-lg">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <span className="text-[10px] font-black tracking-widest uppercase truncate max-w-[140px]">{activeFile}</span>
                        <button onClick={() => setActiveFile(null)} className="ml-0.5 text-cyan-400/60 hover:text-red-400 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* INPUT ROW */}
                <div className="flex items-end">
                  <div className="flex gap-1 shrink-0 mb-1 ml-1">
                    <button
                      className="p-2.5 text-zinc-500 hover:text-cyan-400 hover:bg-zinc-900 rounded-xl transition-colors"
                      onClick={handleFileClick}
                      title="Upload File"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </button>
                    <button
                      className={`p-2.5 rounded-xl transition-all ${isToolsOpen ? 'bg-lime-500/10 text-lime-400 rotate-45' : 'text-zinc-500 hover:text-lime-400 hover:bg-zinc-900'}`}
                      onClick={() => setIsToolsOpen(!isToolsOpen)}
                      title="Workspace Tools"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>

                  <textarea
                    placeholder="Message EDGERUNNER..."
                    className="flex-1 bg-transparent border-none outline-none text-zinc-200 px-3 py-3.5 max-h-32 min-h-[50px] resize-none placeholder-zinc-600 text-[15px] leading-relaxed font-sans"
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                  ></textarea>

                  <button
                    className="p-3 m-1 bg-lime-400 hover:bg-lime-300 text-black rounded-xl transition-all shrink-0 shadow-[0_0_10px_rgba(163,230,53,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSend}
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
              <p className="text-center text-[9px] text-zinc-600 mt-3 font-medium tracking-widest uppercase">EDGERUNNER OS // {selectedModel.toUpperCase()} // LOCAL COMPUTE ACTIVE</p>
            </div>
          </div>
        </main>
      </div>
      {previewFile && <FilePreviewModal filename={previewFile} onClose={() => setPreviewFile(null)} />}
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <>
      <style>{styles}</style>
      {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
      {currentView === 'chatbot' && <ChatbotInterface onBack={(path) => setCurrentView(path === 'cloud' ? 'cloud' : 'landing')} />}
      {currentView === 'cloud' && <DriveInterface onBack={() => setCurrentView('chatbot')} />}
    </>
  );
};

export default App;

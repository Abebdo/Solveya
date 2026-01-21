import { useState } from 'react';
import { useAnalyze } from '../hooks/useAnalyze';
import { ResultDashboard } from '../components/analyzer/ResultDashboard';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Shield, Search, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
  const [text, setText] = useState('');
  const { analyzeMessage, isLoading, result, error, reset } = useAnalyze();

  const handleAnalyze = () => {
    if (!text.trim()) return;
    analyzeMessage(text);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-sm font-medium mb-6"
        >
          <Zap className="w-4 h-4 fill-brand-cyan" />
          <span>Powered by Llama 3.1 & Cloudflare AI</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
          Is that message <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-green text-glow">Safe or Scam?</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Paste any text message, email, or DM. Our advanced AI will analyze it for hidden threats, psychological manipulation, and fraud patterns in seconds.
        </p>
      </div>

      {/* Input Section */}
      <div className="relative max-w-3xl mx-auto mb-20 z-10">
        <div className="absolute inset-0 bg-brand-cyan/20 blur-[60px] rounded-full opacity-20 pointer-events-none" />
        
        {!result && !isLoading ? (
          <Card className="border-brand-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the suspicious message here..."
                className="w-full h-48 bg-transparent text-white placeholder-slate-500 resize-none outline-none text-lg p-4 font-mono leading-relaxed"
                spellCheck={false}
              />
              <div className="absolute bottom-4 right-4 flex gap-4">
                <Button 
                  onClick={() => setText('')} 
                  variant="ghost" 
                  disabled={!text}
                >
                  Clear
                </Button>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!text || text.length < 5}
                  className="group"
                >
                  <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Analyze Now
                </Button>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent opacity-50" />
          </Card>
        ) : null}

        {/* Loading State */}
        {isLoading && (
          <Card className="h-64 flex flex-col items-center justify-center border-brand-cyan/50">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-brand-cyan/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-brand-cyan rounded-full animate-spin" />
              <Shield className="absolute inset-0 m-auto w-10 h-10 text-brand-cyan animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">Analyzing Message...</h3>
            <p className="text-slate-400">Scanning for linguistic threats & fraud patterns</p>
          </Card>
        )}

        {/* Error State */}
        {error && !isLoading && (
           <Card className="border-brand-red/50 bg-brand-red/10 flex flex-col items-center justify-center p-8 text-center">
             <Shield className="w-12 h-12 text-brand-red mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
             <p className="text-slate-300 mb-6">{error}</p>
             <Button onClick={reset} variant="secondary">Try Again</Button>
           </Card>
        )}
      </div>

      {/* Results Section */}
      {result && !isLoading && (
        <div className="relative">
          <ResultDashboard result={result} originalText={text} />
          <div className="mt-12 text-center">
            <Button onClick={reset} variant="secondary" size="lg">Analyze Another Message</Button>
          </div>
        </div>
      )}

      {/* Features Grid (Only show when not analyzing) */}
      {!result && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            { icon: Shield, title: "Bank-Grade Security", desc: "We use the same fraud detection standards as top financial institutions." },
            { icon: Search, title: "Deep Analysis", desc: "Our AI reads between the lines to detect subtle manipulation and urgency." },
            { icon: Lock, title: "100% Private", desc: "Your messages are processed on the edge and never stored permanently." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-cyan mb-4 border border-white/10">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

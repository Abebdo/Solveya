import { Link } from 'react-router-dom';
import { Shield, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-brand-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-brand-cyan" />
              <span className="font-display font-bold text-xl text-white">Solveya</span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6">
              The world's most advanced AI scam detection platform. 
              Protecting you from fraud, phishing, and social engineering in real-time.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-cyan hover:text-brand-dark transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-brand-cyan transition-colors">Scam Analyzer</Link></li>
              <li><Link to="/about" className="hover:text-brand-cyan transition-colors">How it Works</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-cyan transition-colors">Pricing</Link></li>
              <li><Link to="/api" className="hover:text-brand-cyan transition-colors">API Access</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/terms" className="hover:text-brand-cyan transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-brand-cyan transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Solveya Security Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Made with precision for a safer web.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

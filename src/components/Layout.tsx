import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/learn', label: 'Aprender', icon: '📚' },
    { path: '/practice', label: 'Practicar', icon: '🎯' },
    { path: '/exams', label: 'Exámenes', icon: '📝' },
    { path: '/achievements', label: 'Logros', icon: '🏆' },
    { path: '/about', label: 'Acerca de', icon: 'ℹ️' }
  ];

  return (
    <div className="min-h-screen bg-hacker-dark text-gray-100">
      {/* Header */}
      <header className="bg-hacker-darker border-b border-hacker-green/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-hacker-green font-mono">
                &gt; nmap-learning-lab
              </span>
            </Link>
            <div className="text-xs text-gray-400 font-mono">
              [SIMULADOR - NO EJECUTA NMAP REAL]
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-hacker-darker/50 border-b border-hacker-green/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded text-sm font-mono transition-colors ${
                  location.pathname === item.path
                    ? 'bg-hacker-green/20 text-hacker-green border border-hacker-green/50'
                    : 'text-gray-400 hover:text-hacker-green hover:bg-hacker-green/10'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-hacker-darker border-t border-hacker-green/20 mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500 font-mono">
          Nmap Learning Lab - Simulador Educativo | Uso Ético Únicamente
        </div>
      </footer>
    </div>
  );
}


import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="relative pt-16 min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 dark:from-gray-950 dark:via-slate-950 dark:to-black overflow-hidden">
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-400/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-400/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-teal-400/9 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-20 right-20 w-48 h-48 bg-lime-400/6 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-56 h-56 bg-green-300/7 rounded-full blur-3xl animate-pulse delay-900"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
                Hello, I&apos;m{' '}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 blur-sm opacity-50">
                    ELYAS NOUI
                  </span>
                  <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 blur-md opacity-30">
                    ELYAS NOUI
                  </span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                    ELYAS NOUI
                  </span>
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl text-gray-300 font-bold mb-6">
                Currently working as a{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 blur-sm opacity-40">
                    SOFTWARE ENGINEER
                  </span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
                    SOFTWARE ENGINEER
                  </span>
                </span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              I create beautiful, responsive, and user-friendly web applications 
              using modern technologies. Passionate about clean code, great design, 
              and solving complex problems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="relative inline-flex items-center justify-center px-8 py-3 text-base font-bold uppercase tracking-wider rounded-lg text-black bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] hover:scale-105 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-300 to-cyan-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="relative">View My Work</span>
                <svg className="ml-2 -mr-1 w-4 h-4 relative" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Neon Border Button */}
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center px-8 py-3 text-base font-bold uppercase tracking-wider rounded-lg text-green-400 bg-transparent border-2 border-green-400 transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] hover:text-cyan-300 hover:border-cyan-300 hover:scale-105 group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                <span className="relative">Get In Touch</span>
              </a>
            </div>

            {/* Tech Stack Icons */}
            <div className="mt-12">
              <p className="text-sm text-green-400 mb-4 font-medium uppercase tracking-wider">
                TECHNOLOGIES I WORK WITH
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['C# .NET', 'Next.js', 'Python', 'SQL'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gray-800/50 text-green-400 rounded-lg text-sm font-mono border border-green-400/20 shadow-[0_0_8px_rgba(34,197,94,0.2)] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:border-green-400/40 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
                {/* Xceptor Tag */}
                <a
                  href="https://www.xceptor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-purple-900/30 text-purple-400 rounded-lg text-sm font-mono border border-purple-400/30 shadow-[0_0_8px_rgba(147,51,234,0.3)] hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:border-purple-400/50 hover:scale-105 transition-all duration-300 group"
                >
                  <span className="relative">
                    Xceptor
                    <svg className="inline-block ml-1 w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Tablet Display - Visible only on screens < 630px */}
          <div className="flex justify-center min-[630px]:hidden">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" style={{animationDuration: '2s'}}></div>
              <div className="absolute -bottom-3 -left-3 w-2 h-2 bg-cyan-400 rounded-full animate-ping shadow-[0_0_6px_rgba(34,197,94,0.6)]" style={{animationDuration: '3s'}}></div>
              <div className="absolute top-1/4 -right-5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce shadow-[0_0_6px_rgba(34,197,94,0.5)]" style={{animationDuration: '2.5s'}}></div>
              
              {/* Tablet Container */}
              <div className="w-83 h-118 bg-gray-900 rounded-xl border-4 border-gray-700 shadow-[0_0_25px_rgba(34,197,94,0.3)] relative overflow-hidden">
                {/* Tablet Bezel */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-3">
                  {/* Screen */}
                  <div className="w-full h-full bg-black rounded-lg border border-green-400/20 overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="bg-gray-800 px-3 py-1 flex justify-between items-center border-b border-green-400/10">
                      <div className="text-green-400 text-xs font-mono">appsettings.json</div>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      </div>
                    </div>
                    
                    {/* JSON Content */}
                    <div className="p-3 font-mono text-xs leading-relaxed text-green-400">
                      <div>{'{'}</div>
                      <div className="ml-2"><span className="text-cyan-400">"Developer"</span>: {'{'}</div>
                      <div className="ml-4"><span className="text-cyan-400">"Name"</span>: <span className="text-yellow-300">"Elyas Noui"</span>,</div>
                      <div className="ml-4"><span className="text-cyan-400">"Role"</span>: <span className="text-yellow-300">"Software Engineer"</span>,</div>
                      <div className="ml-4"><span className="text-cyan-400">"Company"</span>: <span className="text-yellow-300">"Lloyds Banking Group"</span>,</div>
                      <div className="ml-4"><span className="text-cyan-400">"YearsExperience"</span>: <span className="text-purple-400">3</span></div>
                      <div className="ml-2">{'},'},</div>
                      <div className="ml-2 mt-2"><span className="text-cyan-400">"Skills"</span>: {'{'}</div>
                      <div className="ml-4"><span className="text-cyan-400">"Backend"</span>: [</div>
                      <div className="ml-6"><span className="text-yellow-300">".NET"</span>, <span className="text-yellow-300">"C#"</span>, <span className="text-yellow-300">"ASP.NET Core"</span></div>
                      <div className="ml-4">],</div>
                      <div className="ml-4"><span className="text-cyan-400">"Frontend"</span>: [</div>
                      <div className="ml-6"><span className="text-yellow-300">"Blazor"</span>, <span className="text-yellow-300">"React"</span>, <span className="text-yellow-300">"TypeScript"</span></div>
                      <div className="ml-4">],</div>
                      <div className="ml-4"><span className="text-cyan-400">"Database"</span>: [</div>
                      <div className="ml-6"><span className="text-yellow-300">"SQL Server"</span>, <span className="text-yellow-300">"Entity Framework"</span></div>
                      <div className="ml-4">]</div>
                      <div className="ml-2">{'}'}</div>
                      <div>{'}'}</div>
                      <div className="flex items-center mt-1">
                        <div className="w-1 h-2 bg-green-400 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Screen reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Home button */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Desktop IDE Interface - Hidden on screens < 630px */}
          <div className="hidden min-[630px]:flex justify-center lg:justify-end lg:pl-8 xl:pl-12">
            <div className="relative">
              {/* Floating neon orbs around IDE */}
              <div className="absolute -top-4 -right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]" style={{animationDuration: '2s'}}></div>
              <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping shadow-[0_0_8px_rgba(34,197,94,0.6)]" style={{animationDuration: '3s'}}></div>
              <div className="absolute top-1/4 -left-6 w-2 h-2 bg-emerald-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,197,94,0.5)]" style={{animationDuration: '2.5s'}}></div>
              
              {/* Background IDE Panes - Stacked Effect */}
              <div className="absolute -top-2 -left-4 w-[34rem] h-[25rem] lg:w-[33rem] lg:h-[26rem] xl:w-[38rem] xl:h-[30rem] bg-gray-800 rounded-lg border border-green-400/20 shadow-[0_0_25px_rgba(34,197,94,0.2)] z-10">
                <div className="bg-gray-750 border-b border-green-400/15 px-4 py-2 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
                    </div>
                    <div className="text-green-400/60 text-xs font-mono">appsettings.json</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -left-2 w-[34rem] h-[25rem] lg:w-[33rem] lg:h-[26rem] xl:w-[38rem] xl:h-[30rem] bg-gray-850 rounded-lg border border-green-400/25 shadow-[0_0_20px_rgba(34,197,94,0.15)] z-20">
                <div className="bg-gray-800 border-b border-green-400/20 px-4 py-2 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400/80 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400/80 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400/80 rounded-full"></div>
                    </div>
                    <div className="text-green-400/80 text-xs font-mono">SoftwareEngineer.cs</div>
                  </div>
                </div>
              </div>
              
              {/* Main IDE Container */}
              <div className="relative z-30 w-[34rem] h-[25rem] lg:w-[33rem] lg:h-[26rem] xl:w-[38rem] xl:h-[30rem] bg-gray-900 rounded-lg border border-green-400/30 shadow-[0_0_30px_rgba(34,197,94,0.2)] overflow-hidden">
                {/* IDE Header */}
                <div className="bg-gray-800 border-b border-green-400/20 px-4 py-2 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-green-400 text-xs font-mono">ElyasNoui.cs</div>
                  <div className="text-green-400/60 text-xs">●</div>
                </div>
                
                {/* IDE Content */}
                <div className="p-6 font-mono text-xs xl:text-sm leading-relaxed h-full overflow-hidden">
                  <div className="flex">
                    {/* Code Line Numbers */}
                    <div className="text-green-400/40 mr-6 select-none">
                      <div className="leading-relaxed">1</div>
                      <div className="leading-relaxed">2</div>
                      <div className="leading-relaxed">3</div>
                      <div className="leading-relaxed">4</div>
                      <div className="leading-relaxed">5</div>
                      <div className="leading-relaxed">6</div>
                      <div className="leading-relaxed">7</div>
                      <div className="leading-relaxed">8</div>
                      <div className="leading-relaxed">9</div>
                      <div className="leading-relaxed">10</div>
                      <div className="leading-relaxed">11</div>
                      <div className="leading-relaxed">12</div>
                      <div className="leading-relaxed">13</div>
                      <div className="leading-relaxed">14</div>
                      <div className="leading-relaxed">15</div>
                      <div className="leading-relaxed">16</div>
                    </div>
                    
                    {/* Code content */}
                    <div className="flex-1">
                      <div className="leading-relaxed"><span className="text-purple-400">using</span> <span className="text-cyan-400">System</span>;</div>
                      <div className="leading-relaxed"><span className="text-purple-400">using</span> <span className="text-cyan-400">System.Collections.Generic</span>;</div>
                      <div className="leading-relaxed"></div>
                      <div className="leading-relaxed"><span className="text-purple-400">public class</span> <span className="text-cyan-400">ElyasNoui</span> : <span className="text-cyan-400">SoftwareEngineer</span></div>
                      <div className="leading-relaxed">{'{'}</div>
                      <div className="leading-relaxed ml-4"><span className="text-purple-400">public string</span> <span className="text-green-400">Name</span> {'{'} <span className="text-purple-400">get</span>; {'}'} = <span className="text-yellow-300">"Elyas Noui"</span>;</div>
                      <div className="leading-relaxed ml-4"><span className="text-purple-400">public string</span> <span className="text-green-400">Role</span> {'{'} <span className="text-purple-400">get</span>; {'}'} = <span className="text-yellow-300">"Software Engineer"</span>;</div>
                      <div className="leading-relaxed ml-4"><span className="text-purple-400">public string</span> <span className="text-green-400">Company</span> = <span className="text-yellow-300">"Lloyds Banking Group"</span>;</div>
                      <div className="leading-relaxed ml-4"><span className="text-purple-400">public int</span> <span className="text-green-400">YearsExperience</span> =&gt; <span className="text-cyan-400">DateTime</span>.<span className="text-green-400">UtcNow</span>.<span className="text-green-400">Year</span> - <span className="text-yellow-300">2022</span>;</div>
                      <div className="leading-relaxed"></div>
                      <div className="leading-relaxed ml-4"><span className="text-purple-400">public</span> <span className="text-cyan-400">Dictionary</span>{'<string, string[]>'} <span className="text-green-400">Skills</span> = <span className="text-purple-400">new</span>()</div>
                      <div className="leading-relaxed ml-4">{'{'}</div>
                      <div className="leading-relaxed ml-8">[<span className="text-yellow-300">"Backend"</span>] = [<span className="text-yellow-300">".NET"</span>, <span className="text-yellow-300">"C#"</span>, <span className="text-yellow-300">"ASP.NET Core"</span>],</div>
                      <div className="leading-relaxed ml-8">[<span className="text-yellow-300">"Frontend"</span>] = [<span className="text-yellow-300">"Blazor"</span>, <span className="text-yellow-300">"React"</span>, <span className="text-yellow-300">"TypeScript"</span>],</div>
                      <div className="leading-relaxed ml-8">[<span className="text-yellow-300">"Database"</span>] = [<span className="text-yellow-300">"SQL Server"</span>, <span className="text-yellow-300">"Entity Framework"</span>]</div>
                      <div className="leading-relaxed ml-4">{'}'}</div>
                      <div className="leading-relaxed flex items-center">
                        <span>{'}'} <span className="text-gray-500">// Ready to innovate with .NET!</span></span>
                        <div className="w-2 h-4 bg-green-400 animate-pulse ml-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-green-400/10 border-t border-green-400/20 px-4 py-1">
                  <div className="flex justify-between items-center text-xs">
                    <div className="text-green-400">C#</div>
                    <div className="text-green-400/60">Ln 17, Col 47</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden min-[630px]:block">
        <div className="flex flex-col items-center">
          <span className="text-sm text-green-400 mb-2 font-medium uppercase tracking-wider">Scroll down</span>
          <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <div className="w-1 h-3 bg-green-400 rounded-full animate-bounce mt-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
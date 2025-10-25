const Experience = () => {
    return (
        <section id="experience" className="relative py-20 bg-gradient-to-bl from-black via-slate-950 to-gray-900 overflow-hidden">
            {/* Ambient lighting effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-20 left-20 w-64 h-64 bg-green-400/8 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl sm:text-5xl font-bold mb-16">
                    <span className="relative inline-block">
                        <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 blur-sm opacity-50">
                            PROFESSIONAL TIMELINE
                        </span>
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                            PROFESSIONAL TIMELINE
                        </span>
                    </span>
                </h2>
                {/* Timeline */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400/50 via-emerald-400/30 to-green-400/50"></div>
                        
                        {/* Experience Items */}
                        <div className="space-y-12">
                            {/* Lloyds Banking Group - Current Role */}
                            <div className="relative flex items-start">
                                <div className="absolute left-6 w-4 h-4 bg-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] border-2 border-gray-900"></div>
                                <div className="ml-16 bg-gray-800/30 border border-green-400/20 rounded-lg p-6 backdrop-blur-sm hover:border-green-400/40 transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-green-400 mb-1">Technical Application Specialist / Software Engineer</h3>
                                            <p className="text-white font-medium">Lloyds Banking Group</p>
                                        </div>
                                        <span className="text-gray-400 text-sm mt-1 sm:mt-0">Aug 2022 - Present</span>
                                    </div>
                                    <p className="text-gray-300 mb-4 leading-relaxed">
                                        Developed and maintained automation workflows using Xceptor for upstream/downstream trading systems. 
                                        Led implementation of MI file extracts optimised for Power BI ingestion and achieved ~70% uptick in STP rates 
                                        for trade confirmations through enhanced match rules.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['.NET', 'C#', 'Azure', 'Power BI', 'SQL Server', 'Agile'].map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-green-400/10 text-green-400 rounded text-xs border border-green-400/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {/* Special Xceptor Tag */}
                                        <a
                                            href="https://www.xceptor.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded text-xs border border-purple-400/30 shadow-[0_0_8px_rgba(147,51,234,0.3)] hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:border-purple-400/50 hover:scale-105 transition-all duration-300 group"
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

                            {/* Bright Network Internship */}
                            <div className="relative flex items-start">
                                <div className="absolute left-6 w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)] border-2 border-gray-900"></div>
                                <div className="ml-16 bg-gray-800/20 border border-emerald-400/20 rounded-lg p-6 backdrop-blur-sm hover:border-emerald-400/40 transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-emerald-400 mb-1">Technology Internship Experience</h3>
                                            <p className="text-white font-medium">Bright Network</p>
                                        </div>
                                        <span className="text-gray-400 text-sm mt-1 sm:mt-0">Dec 2020 - Jan 2021</span>
                                    </div>
                                    <p className="text-gray-300 mb-4 leading-relaxed">
                                        Outlined project lifecycle for designing a fictitious facial recognition implementation for a large UK bank's 
                                        online banking platform. Experienced agile project management and learned how scrum teams operate within 
                                        sprints to produce high-quality software.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Agile', 'Project Management', 'Scrum', 'Banking Systems', 'Team Collaboration'].map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-emerald-400/10 text-emerald-400 rounded text-xs border border-emerald-400/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Education */}
                            <div className="relative flex items-start">
                                <div className="absolute left-6 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)] border-2 border-gray-900"></div>
                                <div className="ml-16 bg-gray-800/20 border border-cyan-400/20 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-cyan-400 mb-1">BSc (Hons) Computer Science with Games Technology</h3>
                                            <p className="text-white font-medium">City St George's, University of London</p>
                                        </div>
                                        <span className="text-gray-400 text-sm mt-1 sm:mt-0">Sep 2019 - July 2022</span>
                                    </div>
                                    <p className="text-gray-300 mb-4 leading-relaxed">
                                        Achieved 2:1 Honours degree with modules including Programming in C++/Java, Data Structures and Algorithms, 
                                        Object-Oriented Analysis and Design, and Database and Web Development. Built strong foundation in 
                                        computer science fundamentals and software engineering principles.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['C++', 'Java', 'Data Structures', 'Algorithms', 'OOP', 'Database Design', 'Web Development'].map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded text-xs border border-cyan-400/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
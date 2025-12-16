const Skills = () => {
    const skillCategories = [
        {
            title: "Daily Work Stack",
            subtitle: "Technologies I use professionally at Lloyds Banking Group",
            color: "green",
            icon: "💼",
            skills: [
                { name: ".NET Framework", experience: "3+ years", proficiency: "Expert", description: "Core development platform for enterprise applications" },
                { name: "C#", experience: "3+ years", proficiency: "Expert", description: "Primary programming language for backend development" },
                { name: "SQL Server", experience: "3+ years", proficiency: "Advanced", description: "Database management and complex query optimization" },
                { name: "Power BI", experience: "2+ years", proficiency: "Advanced", description: "MI reporting and data visualization for trading systems" },
                { name: "Azure", experience: "2+ years", proficiency: "Intermediate", description: "Cloud infrastructure and DevOps pipelines" }
            ]
        },
        {
            title: "Specialized Expertise",
            subtitle: "Domain-specific tools and platforms",
            color: "purple",
            icon: "⚡",
            skills: [
                { 
                    name: "Xceptor", 
                    experience: "2+ years", 
                    proficiency: "Expert", 
                    description: "Automation workflows for upstream/downstream trading systems",
                    isSpecial: true,
                    link: "https://www.xceptor.com"
                },
                { name: "Trading Systems Integration", experience: "2+ years", proficiency: "Advanced", description: "Achieved ~70% uptick in STP rates through enhanced match rules" },
                { name: "Workflow Automation", experience: "2+ years", proficiency: "Advanced", description: "End-to-end process automation and optimization" },
                { name: "Financial Data Processing", experience: "2+ years", proficiency: "Advanced", description: "Trade confirmations and regulatory reporting" }
            ]
        },
        {
            title: "Development Tools",
            subtitle: "Core development and collaboration tools",
            color: "cyan",
            icon: "🔧",
            skills: [
                { name: "Git", experience: "3+ years", proficiency: "Advanced", description: "Version control and collaborative development" },
                { name: "Azure DevOps", experience: "2+ years", proficiency: "Intermediate", description: "CI/CD pipelines and project management" },
                { name: "Visual Studio", experience: "3+ years", proficiency: "Advanced", description: "Primary IDE for .NET development" },
                { name: "SSMS", experience: "3+ years", proficiency: "Advanced", description: "Database administration and query development" }
            ]
        },
        {
            title: "Personal Projects",
            subtitle: "Technologies I explore in side projects and learning",
            color: "emerald",
            icon: "🚀",
            skills: [
                { name: "React", experience: "1+ years", proficiency: "Intermediate", description: "Frontend development for personal portfolio projects" },
                { name: "Next.js", experience: "6+ months", proficiency: "Learning", description: "Full-stack framework for modern web applications" },
                { name: "TypeScript", experience: "1+ years", proficiency: "Intermediate", description: "Type-safe JavaScript for larger applications" },
                { name: "Tailwind CSS", experience: "1+ years", proficiency: "Intermediate", description: "Utility-first CSS framework for rapid UI development" }
            ]
        },
        {
            title: "Professional Skills",
            subtitle: "Methodologies and soft skills developed through experience",
            color: "indigo",
            icon: "👥",
            skills: [
                { name: "Agile/Scrum", experience: "3+ years", proficiency: "Advanced", description: "Sprint planning, stand-ups, and iterative development" },
                { name: "Requirements Analysis", experience: "2+ years", proficiency: "Intermediate", description: "Translating business needs into technical solutions" },
                { name: "Code Review", experience: "2+ years", proficiency: "Advanced", description: "Maintaining code quality and knowledge sharing" },
                { name: "Technical Documentation", experience: "3+ years", proficiency: "Advanced", description: "Creating clear documentation for complex systems" }
            ]
        }
    ];

    const getColorClasses = (color: string) => {
        const colorMap: Record<string, any> = {
            green: {
                border: "border-green-400/30",
                bg: "bg-green-900/20",
                text: "text-green-400",
                accent: "bg-green-400",
                glow: "shadow-[0_0_8px_rgba(34,197,94,0.3)]"
            },
            emerald: {
                border: "border-emerald-400/30",
                bg: "bg-emerald-900/20",
                text: "text-emerald-400",
                accent: "bg-emerald-400",
                glow: "shadow-[0_0_8px_rgba(16,185,129,0.3)]"
            },
            cyan: {
                border: "border-cyan-400/30",
                bg: "bg-cyan-900/20",
                text: "text-cyan-400",
                accent: "bg-cyan-400",
                glow: "shadow-[0_0_8px_rgba(6,182,212,0.3)]"
            },
            purple: {
                border: "border-purple-400/30",
                bg: "bg-purple-900/20",
                text: "text-purple-400",
                accent: "bg-purple-400",
                glow: "shadow-[0_0_8px_rgba(147,51,234,0.3)]"
            },
            indigo: {
                border: "border-indigo-400/30",
                bg: "bg-indigo-900/20",
                text: "text-indigo-400",
                accent: "bg-indigo-400",
                glow: "shadow-[0_0_8px_rgba(99,102,241,0.3)]"
            }
        };
        return colorMap[color] || colorMap.green;
    };

    const getProficiencyBadge = (proficiency: string) => {
        const badges = {
            "Expert": { color: "bg-green-500", text: "text-white", label: "Expert" },
            "Advanced": { color: "bg-emerald-500", text: "text-white", label: "Advanced" },
            "Intermediate": { color: "bg-cyan-500", text: "text-white", label: "Intermediate" },
            "Learning": { color: "bg-purple-500", text: "text-white", label: "Learning" }
        };
        return badges[proficiency as keyof typeof badges] || badges.Intermediate;
    };

    return (
        <section id="skills" className="relative py-20 bg-gradient-to-br from-gray-950 via-slate-950 to-black overflow-hidden">
            {/* Ambient lighting effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-80 h-80 bg-green-400/6 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-400/4 rounded-full blur-3xl animate-pulse delay-750"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        <span className="relative inline-block">
                            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 blur-sm opacity-50">
                                TECHNICAL SKILLS
                            </span>
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                                TECHNICAL SKILLS
                            </span>
                        </span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        Technologies and skills organized by how I use them professionally and personally, 
                        with context about experience and real-world applications.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {skillCategories.map((category, categoryIndex) => {
                        const colors = getColorClasses(category.color);
                        return (
                            <div 
                                key={category.title}
                                className={`bg-gray-800/30 border ${colors.border} rounded-lg p-6 backdrop-blur-sm hover:border-opacity-60 transition-all duration-300 ${colors.glow} hover:shadow-lg`}
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">{category.icon}</span>
                                    <div>
                                        <h3 className={`text-xl font-semibold ${colors.text} mb-1`}>
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">{category.subtitle}</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => {
                                        const badge = getProficiencyBadge(skill.proficiency);
                                        return (
                                            <div key={skill.name} className="border-l-2 border-gray-600 pl-4 hover:border-l-2 hover:border-gray-400 transition-colors duration-300">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        {skill.isSpecial ? (
                                                            <a
                                                                href={skill.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center"
                                                            >
                                                                {skill.name}
                                                                <svg className="w-3 h-3 ml-1 opacity-60 hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </a>
                                                        ) : (
                                                            <span className="font-medium text-white">{skill.name}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-400 text-sm">{skill.experience}</span>
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.color} ${badge.text}`}>
                                                            {badge.label}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-300 text-sm leading-relaxed">{skill.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend and Additional Info */}
                <div className="mt-16 space-y-8">
                    {/* Proficiency Legend */}
                    <div className="bg-gray-800/20 border border-gray-600/20 rounded-lg p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">Proficiency Levels</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-500 text-white">Expert</span>
                                <span className="text-gray-300 text-sm">Daily use, mentor others</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-500 text-white">Advanced</span>
                                <span className="text-gray-300 text-sm">Confident, complex projects</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-sm font-medium rounded-full bg-cyan-500 text-white">Intermediate</span>
                                <span className="text-gray-300 text-sm">Solid foundation, improving</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500 text-white">Learning</span>
                                <span className="text-gray-300 text-sm">Actively developing skills</span>
                            </div>
                        </div>
                    </div>

                    {/* Context Note */}
                    <div className="bg-gray-800/20 border border-green-400/20 rounded-lg p-6 backdrop-blur-sm max-w-4xl mx-auto text-center">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Context-Driven Expertise</h3>
                        <p className="text-gray-300 leading-relaxed">
                            These skills are organized by real-world application rather than arbitrary metrics. 
                            Each technology is contextualized with specific use cases, project outcomes, and years of hands-on experience. 
                            This provides hiring managers with meaningful insight into how I actually use these technologies in practice.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
"use client";

import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (name: string, value: string) => {
        const trimmedValue = value.trim();
        
        // Don't show error for empty fields on blur
        if (trimmedValue.length === 0) {
            return '';
        }
        
        switch (name) {
            case 'firstName':
                return trimmedValue.length < 2 ? 'First name must be at least 2 characters' : '';
            case 'lastName':
                return trimmedValue.length < 2 ? 'Last name must be at least 2 characters' : '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(trimmedValue) ? 'Please enter a valid email address' : '';
            case 'subject':
                return trimmedValue.length < 5 ? 'Subject must be at least 5 characters' : '';
            case 'message':
                return trimmedValue.length < 20 ? 'Message must be at least 20 characters' : '';
            default:
                return '';
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate all fields (for form submission, we need to check required fields)
        const newErrors = Object.keys(formData).reduce((acc, key) => {
            const value = formData[key as keyof typeof formData];
            const trimmedValue = value.trim();
            
            // For form submission, empty required fields should show errors
            if (trimmedValue.length === 0) {
                const fieldNames = {
                    firstName: 'First name is required',
                    lastName: 'Last name is required',
                    email: 'Email address is required',
                    subject: 'Subject is required',
                    message: 'Message is required'
                };
                return { ...acc, [key]: fieldNames[key as keyof typeof fieldNames] };
            }
            
            // Otherwise use regular validation
            const error = validateField(key, value);
            return { ...acc, [key]: error };
        }, {} as typeof errors);

        setErrors(newErrors);

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        
        if (!hasErrors) {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Form submitted:', formData);
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            });
        }

        setIsSubmitting(false);
    };
    return (
        <section id="contact" className="relative py-20 bg-gradient-to-br from-black via-gray-950 to-slate-900 overflow-hidden">
            {/* Ambient lighting effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-green-400/6 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/3 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        <span className="relative inline-block">
                            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 blur-sm opacity-50">
                                GET IN TOUCH
                            </span>
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                                GET IN TOUCH
                            </span>
                        </span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Ready to collaborate on your next project? Let&apos;s discuss how we can bring your ideas to life 
                        with cutting-edge technology and innovative solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-gray-800/30 border border-green-400/20 rounded-lg p-8 backdrop-blur-sm hover:border-green-400/40 transition-all duration-300">
                        <h3 className="text-2xl font-semibold text-green-400 mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                        First Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:outline-none transition-all duration-300 ${
                                            errors.firstName 
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                : 'border-gray-600 focus:border-green-400 focus:ring-green-400/20'
                                        }`}
                                        placeholder="John"
                                        required
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                        Last Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:outline-none transition-all duration-300 ${
                                            errors.lastName 
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                                : 'border-gray-600 focus:border-green-400 focus:ring-green-400/20'
                                        }`}
                                        placeholder="Doe"
                                        required
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-400 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:outline-none transition-all duration-300 ${
                                        errors.email 
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                            : 'border-gray-600 focus:border-green-400 focus:ring-green-400/20'
                                    }`}
                                    placeholder="john.doe@example.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                    Subject <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:outline-none transition-all duration-300 ${
                                        errors.subject 
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                            : 'border-gray-600 focus:border-green-400 focus:ring-green-400/20'
                                    }`}
                                    placeholder="Project Collaboration"
                                    required
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.subject}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message <span className="text-red-400">*</span>
                                    <span className="text-gray-500 text-xs ml-2">
                                        ({formData.message.length}/20 minimum)
                                    </span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = target.scrollHeight + 'px';
                                    }}
                                    onBlur={handleBlur}
                                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:outline-none transition-all duration-300 resize-none overflow-hidden ${
                                        errors.message 
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                                            : 'border-gray-600 focus:border-green-400 focus:ring-green-400/20'
                                    }`}
                                    placeholder="Tell me about your project, timeline, and how I can help..."
                                    style={{ minHeight: '150px' }}
                                    required
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-400 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full font-semibold py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 ${
                                    isSubmitting
                                        ? 'bg-gray-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transform hover:scale-105'
                                } text-white`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </div>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Direct Contact */}
                        <div className="bg-gray-800/30 border border-green-400/20 rounded-lg p-8 backdrop-blur-sm hover:border-green-400/40 transition-all duration-300">
                            <h3 className="text-2xl font-semibold text-emerald-400 mb-6">Let&apos;s Connect</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Email</p>
                                        <a href="mailto:work.elyas@outlook.com" className="text-green-400 hover:text-emerald-400 transition-colors duration-300">
                                            work.elyas@outlook.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">LinkedIn</p>
                                        <a href="https://www.linkedin.com/in/elyasnoui/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-emerald-400 transition-colors duration-300">
                                            linkedin.com/in/elyasnoui
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">GitHub</p>
                                        <a href="https://github.com/elyasnoui/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-emerald-400 transition-colors duration-300">
                                            github.com/elyasnoui
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-gray-800/30 border border-emerald-400/20 rounded-lg p-8 backdrop-blur-sm hover:border-emerald-400/40 transition-all duration-300">
                            <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Quick Info</h3>
                            <div className="space-y-4 text-gray-300">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span>Available for new opportunities</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                    <span>Based in London, UK</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                    <span>Typical response time: 24 hours</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>Open to remote collaboration</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
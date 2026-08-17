"use client";

import { useState } from 'react';
import SectionLabel from './SectionLabel';

const channels = [
  {
    label: 'Email',
    value: 'work.elyas@outlook.com',
    href: 'mailto:work.elyas@outlook.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/elyasnoui',
    href: 'https://www.linkedin.com/in/elyasnoui/',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/elyasnoui',
    href: 'https://github.com/elyasnoui/',
    external: true,
  },
];

const quickInfo = [
  'Available for new opportunities',
  'Based in London, UK',
  'Typical response time: 24 hours',
  'Open to remote collaboration',
];

const fieldClass = (hasError: boolean) =>
  `w-full border-b bg-transparent px-0 py-3 text-base text-ink placeholder:text-mute transition-colors duration-300 focus:outline-none ${
    hasError
      ? 'border-red-700 focus:border-red-700'
      : 'border-ink/20 focus:border-accent-ink'
  }`;

const FieldError = ({ id, message }: { id: string; message: string }) =>
  message ? (
    <p id={id} className="mt-2 flex items-center gap-2 text-xs text-red-700">
      <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  ) : null;

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
        <section id="contact" data-tone="light" className="gridlines gl-light relative bg-paper text-ink">
            <div className="shell section-y relative z-10">
                <SectionLabel index="05" title="Contact" meta="London, UK" />

                <div className="mt-12 grid grid-cols-1 gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-16">
                    {/* ---- Statement and channels ---- */}
                    <div className="lg:col-span-5">
                        <h2 className="display-lg max-w-[11ch]">
                            Let&apos;s build something{' '}
                            <span className="text-accent-ink">solid</span>.
                        </h2>
                        <p className="body-copy mt-6 max-w-[42ch] text-mute">
                            Whether it&apos;s a role, a collaboration or a question about
                            automation and integration work — the inbox is open.
                        </p>

                        <ul className="mt-12 border-t border-ink/15">
                            {channels.map((channel) => (
                                <li key={channel.label} className="border-b border-ink/15">
                                    <a
                                        href={channel.href}
                                        {...(channel.external
                                            ? { target: '_blank', rel: 'noopener noreferrer' }
                                            : {})}
                                        className="group flex items-baseline justify-between gap-6 py-5"
                                    >
                                        <span className="eyebrow text-mute">{channel.label}</span>
                                        <span className="flex items-center gap-3 text-sm font-medium tracking-tight transition-colors duration-300 group-hover:text-accent-ink">
                                            <span className="link-underline">{channel.value}</span>
                                            <svg
                                                className="arrow-nudge h-3 w-3"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                aria-hidden
                                            >
                                                <path d="M2 12 12 2M5 2h7v7" />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {quickInfo.map((info, i) => (
                                <li key={info} className="flex items-start gap-3 text-sm text-mute">
                                    <span
                                        aria-hidden
                                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ink ${
                                            i === 0 ? 'animate-pulse' : 'opacity-40'
                                        }`}
                                    />
                                    {info}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Form ---- */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firstName" className="eyebrow block text-mute">
                                    First name <span className="text-accent-ink">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    aria-invalid={!!errors.firstName}
                                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                                    className={fieldClass(!!errors.firstName)}
                                    placeholder="John"
                                    required
                                />
                                <FieldError id="firstName-error" message={errors.firstName} />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="eyebrow block text-mute">
                                    Last name <span className="text-accent-ink">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    aria-invalid={!!errors.lastName}
                                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                                    className={fieldClass(!!errors.lastName)}
                                    placeholder="Doe"
                                    required
                                />
                                <FieldError id="lastName-error" message={errors.lastName} />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="eyebrow block text-mute">
                                    Email address <span className="text-accent-ink">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                    className={fieldClass(!!errors.email)}
                                    placeholder="john.doe@example.com"
                                    required
                                />
                                <FieldError id="email-error" message={errors.email} />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="subject" className="eyebrow block text-mute">
                                    Subject <span className="text-accent-ink">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    aria-invalid={!!errors.subject}
                                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                                    className={fieldClass(!!errors.subject)}
                                    placeholder="Project collaboration"
                                    required
                                />
                                <FieldError id="subject-error" message={errors.subject} />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="eyebrow flex items-baseline justify-between gap-4 text-mute">
                                    <span>
                                        Message <span className="text-accent-ink">*</span>
                                    </span>
                                    <span className="tabular-nums text-mute">
                                        {formData.message.length}/20 min
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
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                    className={`${fieldClass(!!errors.message)} resize-none overflow-hidden`}
                                    placeholder="Tell me about your project, timeline, and how I can help..."
                                    style={{ minHeight: '150px' }}
                                    required
                                />
                                <FieldError id="message-error" message={errors.message} />
                            </div>

                            <div className="sm:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`group inline-flex w-full items-center justify-between gap-6 px-7 py-4 text-sm font-semibold tracking-tight text-white transition-colors duration-300 sm:w-auto ${
                                        isSubmitting
                                            ? 'cursor-not-allowed bg-mute'
                                            : 'bg-ink hover:bg-accent-ink'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            Sending
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                        </>
                                    ) : (
                                        <>
                                            Send message
                                            <svg
                                                className="arrow-nudge h-3.5 w-3.5"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                aria-hidden
                                            >
                                                <path d="M2 12 12 2M5 2h7v7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

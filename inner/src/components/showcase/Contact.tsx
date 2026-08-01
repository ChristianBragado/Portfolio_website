import React, { FormEvent, useState } from 'react';
import ResumeDownload from './ResumeDownload';

export interface ContactProps {}

interface FormValues {
    name: string;
    email: string;
    company: string;
    message: string;
}

const initialValues: FormValues = {
    name: '',
    email: '',
    company: '',
    message: '',
};

const Contact: React.FC<ContactProps> = () => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');

    const updateValue = (field: keyof FormValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
        if (status !== 'idle') setStatus('idle');
    };

    const openMailClient = () => {
        const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
        const body = encodeURIComponent(
            `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || 'Not provided'}\n\n${values.message}`
        );
        window.location.href = `mailto:christianhbragado@gmail.com?subject=${subject}&body=${body}`;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error('Contact endpoint unavailable');

            setValues(initialValues);
            setStatus('sent');
        } catch (_error) {
            setStatus('fallback');
            openMailClient();
        }
    };

    return (
        <main className="site-page-content showcase-contact">
            <header className="page-intro contact-intro">
                <p className="showcase-kicker">Contact</p>
                <h1>Let's make something useful.</h1>
                <p className="page-lede">
                    If you have a role, a project, or a good technical problem, send a note.
                    The form posts to the portfolio server and falls back to your email app if
                    the server is unavailable.
                </p>
            </header>

            <section className="contact-layout">
                <div className="contact-details">
                    <h2>Find me here.</h2>
                    <p>
                        I am based in Los Angeles and open to conversations about full-stack
                        software, web development, and thoughtful technical support.
                    </p>
                    <dl className="contact-list">
                        <div>
                            <dt>Email</dt>
                            <dd><a href="mailto:christianhbragado@gmail.com">christianhbragado@gmail.com</a></dd>
                        </div>
                        <div>
                            <dt>GitHub</dt>
                            <dd><a href="https://github.com/ChristianBragado" target="_blank" rel="noreferrer">github.com/ChristianBragado</a></dd>
                        </div>
                        <div>
                            <dt>LinkedIn</dt>
                            <dd><a href="https://www.linkedin.com/in/christianbragado/" target="_blank" rel="noreferrer">linkedin.com/in/christianbragado</a></dd>
                        </div>
                    </dl>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="contact-name">Your name</label>
                        <input
                            id="contact-name"
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={(event) => updateValue('name', event.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="contact-email">Email</label>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={(event) => updateValue('email', event.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="contact-company">Company <span>(optional)</span></label>
                        <input
                            id="contact-company"
                            type="text"
                            name="company"
                            value={values.company}
                            onChange={(event) => updateValue('company', event.target.value)}
                            autoComplete="organization"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="contact-message">Message</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            value={values.message}
                            onChange={(event) => updateValue('message', event.target.value)}
                            required
                            rows={7}
                        />
                    </div>
                    <div className="form-submit-row">
                        <button className="submit-button" type="submit" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending' : 'Send message'}
                        </button>
                        <p className={`form-status form-status-${status}`} role="status" aria-live="polite">
                            {status === 'sent' && 'Message sent. I will get back to you soon.'}
                            {status === 'fallback' && 'Opening your email app.'}
                            {status === 'idle' && 'Required fields are marked by the browser.'}
                        </p>
                    </div>
                </form>
            </section>

            <ResumeDownload altText="Prefer a quick overview?" />
        </main>
    );
};

export default Contact;

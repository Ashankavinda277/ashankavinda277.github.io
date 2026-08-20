import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
  botcheck: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    botcheck: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');
    setResponseMessage('');

    try {
      const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New portfolio message from ${formData.name}`,
          ...formData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setResponseMessage(data.message || 'Your message has been sent!');
        setFormData({ name: '', email: '', message: '', botcheck: '' });
        setErrors({});
      } else {
        setStatus('error');
        setResponseMessage(data.message || 'Failed to submit form. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMessage('Network error. Please check your internet connection.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot Spam Bot Field (Hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botcheck">Do not fill this out if you are human:</label>
        <input
          type="text"
          id="botcheck"
          name="botcheck"
          value={formData.botcheck}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold"
        >
          Name <span className="text-blue-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'submitting'}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          placeholder="Ashan Kavinda"
          className={`w-full px-4 py-3 rounded-xl border bg-slate-950/90 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none transition-all ${
            errors.name
              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
              : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          }`}
        />
        {errors.name && (
          <p id="name-error" className="text-xs font-mono text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold"
        >
          Email <span className="text-blue-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'submitting'}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="ashan@example.com"
          className={`w-full px-4 py-3 rounded-xl border bg-slate-950/90 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none transition-all ${
            errors.email
              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
              : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          }`}
        />
        {errors.email && (
          <p id="email-error" className="text-xs font-mono text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold"
        >
          Message <span className="text-blue-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Tell me about your project, idea, or inquiry..."
          className={`w-full px-4 py-3 rounded-xl border bg-slate-950/90 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none transition-all resize-y ${
            errors.message
              ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/30'
              : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          }`}
        />
        {errors.message && (
          <p id="message-error" className="text-xs font-mono text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Status Feedback Banner */}
      {status === 'success' && (
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-mono flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{responseMessage}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-mono flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{responseMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

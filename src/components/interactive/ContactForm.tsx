import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { buttonClass } from '../ui/buttonStyles';

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
          className="block text-sm font-medium text-foreground"
        >
          Name <span className="text-muted-foreground">*</span>
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
          placeholder="Your name"
          className={`w-full rounded-control border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            errors.name ? 'border-destructive' : 'border-input'
          }`}
        />
        {errors.name && (
          <p id="name-error" className="flex items-center gap-1 text-sm text-destructive">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email <span className="text-muted-foreground">*</span>
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
          placeholder="you@example.com"
          className={`w-full rounded-control border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            errors.email ? 'border-destructive' : 'border-input'
          }`}
        />
        {errors.email && (
          <p id="email-error" className="flex items-center gap-1 text-sm text-destructive">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground"
        >
          Message <span className="text-muted-foreground">*</span>
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
          className={`w-full resize-y rounded-control border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            errors.message ? 'border-destructive' : 'border-input'
          }`}
        />
        {errors.message && (
          <p id="message-error" className="flex items-center gap-1 text-sm text-destructive">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Status Feedback Banner */}
      {status === 'success' && (
        <div className="flex items-center gap-2 rounded-control border border-border bg-muted p-4 text-sm text-foreground">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{responseMessage}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-control border border-destructive/40 p-4 text-sm text-destructive">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{responseMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={buttonClass({ variant: 'primary', size: 'lg', className: 'w-full sm:w-auto' })}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending…</span>
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

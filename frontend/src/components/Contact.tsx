import { Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { sendContactMessage } from '../api';
import { SectionTitle } from './SectionTitle';

export function Contact() {
  const [status, setStatus] = useState<string>('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setStatus('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || '')
    };

    try {
      const response = await sendContactMessage(payload);
      setStatus(response.message);
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Something went wrong.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <SectionTitle
        eyebrow="Contact"
        title="Let us build something useful"
        description="The form is already wired to the Spring Boot backend contact endpoint."
      />

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" placeholder="Your name" required maxLength={80} />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required maxLength={120} />
        </label>
        <label>
          Subject
          <input name="subject" placeholder="Project, internship, collaboration..." required maxLength={100} />
        </label>
        <label>
          Message
          <textarea name="message" placeholder="Tell me what you have in mind" required maxLength={1200} rows={5} />
        </label>
        <button className="button primary" type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Message'}
          <Send size={18} />
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}

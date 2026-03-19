import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import emailjs from '@emailjs/browser';
import instagramIcon from '../../Assets/Logos/instagram.svg';
import facebookIcon from '../../Assets/Logos/facebook.svg';

const translations = {
  PT: {
    label: 'CONTACTOS', title: 'Entre em Contacto',
    nome: 'Nome *', pais: 'País *', telefone: 'Telefone *', email: 'Email *',
    tipologia: 'Tipologia', preco: 'Faixa de Preço', mensagem: 'Mensagem',
    select: 'Selecione...',
    newsletter: 'Subscrever newsletter, ofertas de marketing e outras atualizações.',
    rgpd: 'Ao assinalar esta caixa, autorizo expressamente a recolha e tratamento dos meus dados para contactos comerciais e formalização de propostas de serviços, em conformidade com a Política de Privacidade e os Termos e Condições.',
    submit: 'Enviar', sending: 'A enviar...', success: 'Mensagem enviada com sucesso!', error: 'Ocorreu um erro. Tente novamente.',
  },
  EN: {
    label: 'CONTACTS', title: 'Get in Touch',
    nome: 'Name *', pais: 'Country *', telefone: 'Phone *', email: 'Email *',
    tipologia: 'Typology', preco: 'Price Range', mensagem: 'Message',
    select: 'Select...',
    newsletter: 'Subscribe to newsletter, marketing offers and other updates.',
    rgpd: 'By checking this box, I expressly authorize the collection and processing of my data for commercial contacts and service proposal formalization, in accordance with the Privacy Policy and Terms and Conditions.',
    submit: 'Send', sending: 'Sending...', success: 'Message sent successfully!', error: 'An error occurred. Please try again.',
  },
};
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

export function ContactsSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { lang } = useLanguage();
  const t = translations[lang];
  const [formData, setFormData] = useState({
    nome: '',
    pais: '',
    telefone: '',
    email: '',
    tipologia: '',
    preco: '',
    mensagem: '',
    newsletter: false,
    rgpd: false,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.nome,
          from_email: formData.email,
          country: formData.pais,
          phone: formData.telefone,
          typology: formData.tipologia,
          price_range: formData.preco,
          message: formData.mensagem,
          newsletter: formData.newsletter ? 'Yes' : 'No',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ nome: '', pais: '', telefone: '', email: '', tipologia: '', preco: '', mensagem: '', newsletter: false, rgpd: false });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacts" ref={ref} className="w-full bg-white pt-16 lg:pt-24 pb-16 lg:pb-24">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div
            className="text-[#C9A84C] mb-6 tracking-[0.2em]"
            style={{ fontFamily: 'Lato, sans-serif', fontSize: '12px' }}
          >
            {t.label}
          </div>
          <h2
            className="text-[#2C2C2C] mb-8"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}
          >
            {t.title}
          </h2>

          {/* Contact Info — desktop: row (icon | email | icon), mobile: email then icons below */}
          <div className="text-[#2C2C2C]/70 mb-12">
            {/* Desktop layout */}
            <div className="hidden md:flex items-center justify-center gap-6">
              <a
                href="https://www.instagram.com/parquedosprincipesresidence/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-opacity duration-200 hover:opacity-75"
              >
                <img src={instagramIcon} alt="Instagram" width={32} height={32} />
              </a>
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-[#C9A84C]" />
                <a
                  href="mailto:parquedosprincipesresidence@gmail.com"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px' }}
                  className="hover:text-[#C9A84C] transition-colors duration-200"
                >
                  parquedosprincipesresidence@gmail.com
                </a>
              </div>
              <a
                href="https://www.facebook.com/parquedosprincipesresidence"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-opacity duration-200 hover:opacity-75"
              >
                <img src={facebookIcon} alt="Facebook" width={32} height={32} />
              </a>
            </div>

            {/* Mobile layout */}
            <div className="flex flex-col items-center gap-4 md:hidden">
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-[#C9A84C]" />
                <a
                  href="mailto:parquedosprincipesresidence@gmail.com"
                  style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px' }}
                  className="hover:text-[#C9A84C] transition-colors duration-200"
                >
                  parquedosprincipesresidence@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.instagram.com/parquedosprincipesresidence/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-opacity duration-200 hover:opacity-75"
                >
                  <img src={instagramIcon} alt="Instagram" width={32} height={32} />
                </a>
                <a
                  href="https://www.facebook.com/parquedosprincipesresidence"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-opacity duration-200 hover:opacity-75"
                >
                  <img src={facebookIcon} alt="Facebook" width={32} height={32} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="nome" className="text-[#2C2C2C] mb-2 block" style={{ fontFamily: 'Lato, sans-serif' }}>
                {t.nome}
              </Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full border-[#2C2C2C]/20 focus:border-[#C9A84C]"
              />
            </div>
            <div>
              <Label htmlFor="pais" className="text-[#2C2C2C] mb-2 block" style={{ fontFamily: 'Lato, sans-serif' }}>
                {t.pais}
              </Label>
              <Input
                id="pais"
                name="pais"
                type="text"
                value={formData.pais}
                onChange={handleChange}
                required
                className="w-full border-[#2C2C2C]/20 focus:border-[#C9A84C]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="telefone" className="text-[#2C2C2C] mb-2 block" style={{ fontFamily: 'Lato, sans-serif' }}>
                {t.telefone}
              </Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                required
                className="w-full border-[#2C2C2C]/20 focus:border-[#C9A84C]"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-[#2C2C2C] mb-2 block" style={{ fontFamily: 'Lato, sans-serif' }}>
                {t.email}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-[#2C2C2C]/20 focus:border-[#C9A84C]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="tipologia" className="text-[#2C2C2C] mb-2 block" style={{ fontFamily: 'Lato, sans-serif' }}>
                {t.tipologia}
              </Label>
              <select
                id="tipologia"
                name="tipologia"
                value={formData.tipologia}
                onChange={handleChange}
                className="w-full h-10 px-3 border border-[#2C2C2C]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-white"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }}
              >
                <option value="">{t.select}</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T2 Duplex +1">T2 Duplex +1</option>
                <option value="T3 Duplex +1">T3 Duplex +1</option>
              </select>
            </div>
            <div>
              <Label htmlFor="preco" className="text-[#2C2C2C] mb-2 block" style={{ fontFamily: 'Lato, sans-serif' }}>
                {t.preco}
              </Label>
              <select
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                className="w-full h-10 px-3 border border-[#2C2C2C]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-white"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }}
              >
                <option value="">{t.select}</option>
                <option value="425000-495000">De 425.000 € a 495.000 €</option>
                <option value="495000-600000">De 495.000 € a 600.000 €</option>
                <option value="600000+">Acima de 600.000 €</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="mensagem" className="text-[#2C2C2C] mb-2 block" style={{ fontFamily: 'Lato, sans-serif' }}>
              {t.mensagem}
            </Label>
            <Textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows={5}
              className="w-full border-[#2C2C2C]/20 focus:border-[#C9A84C]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, newsletter: checked as boolean }))
                }
                className="mt-1"
              />
              <Label
                htmlFor="newsletter"
                className="text-[#2C2C2C]/70 cursor-pointer"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '1.6' }}
              >
                {t.newsletter}
              </Label>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="rgpd"
                checked={formData.rgpd}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, rgpd: checked as boolean }))
                }
                className="mt-1"
              />
              <Label
                htmlFor="rgpd"
                className="text-[#2C2C2C]/70 cursor-pointer"
                style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', lineHeight: '1.6' }}
              >
                {t.rgpd}
              </Label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <button
              type="submit"
              disabled={!formData.rgpd || status === 'sending'}
              className="w-full md:w-auto px-12 py-3 bg-[#C9A84C] hover:bg-[#B8963E] text-[#1B2A3B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              style={{ fontFamily: 'Lato, sans-serif', fontSize: '15px', fontWeight: 600 }}
            >
              {status === 'sending' ? t.sending : t.submit}
            </button>
            {status === 'success' && (
              <span className="text-green-600" style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }}>{t.success}</span>
            )}
            {status === 'error' && (
              <span className="text-red-600" style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }}>{t.error}</span>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

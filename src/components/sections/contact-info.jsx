function ContactInfo() {
  const contacts = [
    { icon: '📞', label: '010-0000-0000', href: 'tel:01000000000' },
    { icon: '✉️', label: 'example@email.com', href: 'mailto:example@email.com' },
  ];

  const sns = [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'IG' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
    { label: 'GitHub', href: 'https://github.com/leeyj9908-star', icon: 'GH' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-base-content mb-1">Contact Me</h3>
      <p className="text-base-content/50 text-sm mb-5">언제든지 연락 주세요!</p>

      {contacts.map((contact) => (
        <div key={contact.label} className="flex items-center gap-3 mb-3">
          <span className="text-primary">{contact.icon}</span>
          <a
            href={contact.href}
            className="text-base-content/80 text-sm hover:text-primary transition-colors"
          >
            {contact.label}
          </a>
        </div>
      ))}

      <div className="flex gap-2 mt-6">
        {sns.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="btn btn-ghost btn-sm btn-circle border border-white/10 text-base-content/50 hover:text-primary hover:border-primary/40 text-xs"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default ContactInfo;

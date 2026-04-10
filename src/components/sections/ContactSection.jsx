import { useState } from 'react';
import ContactInfo from './contact-info';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';

function ContactSection() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section id="contact" className="bg-base-100 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent">
            Contact &amp; 방명록
          </span>
        </h2>
        <div className="divider mb-10 opacity-20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <ContactInfo />
          </div>
          <div className="md:col-span-2">
            <GuestbookForm onSuccess={() => setRefreshKey((k) => k + 1)} />
            <div className="divider my-6 opacity-20" />
            <GuestbookList refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

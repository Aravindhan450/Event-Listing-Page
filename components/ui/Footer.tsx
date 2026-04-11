import React from 'react';

const ecosystemLinks = ['Developer API', 'Community Discord', 'Code of Conduct'];
const companyLinks = ['About Us', 'Careers', 'Privacy Policy'];
const bottomLinks = ['Twitter', 'LinkedIn', 'GitHub'];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-slate-50/60 animate-fade-up anim-fade-up">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">VickyBytes</h3>
            <p className="text-slate-600 leading-relaxed mb-6 max-w-sm">
              Curating the world&#39;s premier technical knowledge exchange platforms.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-4">ECOSYSTEM</h4>
            <ul className="space-y-3">
              {ecosystemLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-4">COMPANY</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-4">NEWSLETTER</h4>
            <p className="text-slate-600 leading-relaxed mb-5 max-w-sm">
              Get curated technical digests delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row xl:flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-3 py-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            © 2024 VickyBytes Global Tech Hosting Platform. Built for the kinetic era.
          </p>
          <div className="flex items-center gap-5 text-sm">
            {bottomLinks.map((link) => (
              <a key={link} href="#" className="text-gray-600 hover:text-gray-900 transition">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

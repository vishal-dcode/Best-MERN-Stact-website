import { Link } from 'react-router-dom';

const LINKS = [
  {
    title: 'THE COMPANY',
    items: ['Privacy Policy', 'Terms & Conditions', 'Legal', 'Careers']
  },
  {
    title: 'CLIENT SERVICE',
    items: ['Products', 'Follow your Order', 'Blogs', 'About us']
  },
  {
    title: 'STORE LOCATION',
    items: ['India', ' Canada', 'United States']
  }
];

export default function Footer() {
  return (
    <footer>
      <section className="navigation pt-10">
        {LINKS.map(({ title, items }) => (
          <ul key={title} className="nav_items">
            <h3 className="footer_title text-sm text-blue-gray-500">{title}</h3>
            {items.map((link) => (
              <li key={link}>
                <a href="/" className="text-gray-500 py-0.5 font-normal transition-colors hover:text-blue-gray-900">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </section>
      <section className="about_me pt-10">
        <div>
          <h2 className="footer_title">ABOUT ME</h2>
          <p>
            I'm Vishal, a self-taught Web Developer & Designer who loves bringing ideas to life via my work and have a
            passion for creating and developing beautifully simple things.I'm Vishal, a self-taught Web Developer &
            Designer who loves bringing ideas to life via my work and have a passion for creating and developing
            beautifully simple things.
          </p>
        </div>
        <div className="social_ctr flex-wrap lg:flex-nowrap">
          <div className="social_links">
            <a
              href="https://github.com/vishal-dcode"
              target="_blank"
              rel="noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <h2>
              <Link to="https://vishaal.vercel.app/" target="_blank">
                PORTFOLIO
              </Link>
            </h2>
          </div>

          <h2>
            <a href="%PUBLIC_URL%/resume.pdf" download className="hover:text-blue-gray-900 lg:border-0">
              RESUME: DOWNLOAD
            </a>
          </h2>
        </div>
      </section>
    </footer>
  );
}

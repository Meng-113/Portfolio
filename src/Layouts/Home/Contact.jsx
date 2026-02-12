import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';
import Social from '../../components/Social';

const Contact = ({ data }) => {
  const fieldClassName =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-slate-600 dark:bg-[#0f172a] dark:text-slate-100 dark:placeholder:text-slate-400';
  const labelClassName =
    'mb-2 block text-sm font-semibold uppercase tracking-[0.08em] text-slate-600 dark:text-slate-300';

  return (
    <div className="w-[80%] mx-auto mt-24 text-left text-white" id="contact">
      <SectionTitle
        id="contact"
        eyebrow="Contact"
        title="Let's Connect"
        description="You can reach me by email, social media, or the contact form below."
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 shadow-soft backdrop-blur transition dark:border-slate-700/70 dark:bg-slate-800/80 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Contact Details
          </h3>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            {data?.contactDetail}
          </p>
          {data?.contactEmail ? (
            <Button
              href={data.contactEmail}
              variant="primary"
              ariaLabel="Email me"
              size="sm"
              className="mt-7"
            >
              Email Me
            </Button>
          ) : (
            <p className="mt-7 text-sm text-slate-500 dark:text-slate-400">
              Contact email is not set yet.
            </p>
          )}
          <h3 className="text-s font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mt-7">
            SOCIAL
          </h3>
          <Social socials={data?.socials} />
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 shadow-soft backdrop-blur transition dark:border-slate-700/70 dark:bg-slate-800/80 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Send a Message
          </h3>
          <form action="" className="mt-5 space-y-4">
            <div>
              <label htmlFor="name" className={labelClassName}>
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className={fieldClassName}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClassName}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className={fieldClassName}
              />
            </div>
            <div>
              <label htmlFor="message" className={labelClassName}>
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your Message"
                className={`${fieldClassName} min-h-[12rem] resize-y`}
              ></textarea>
            </div>
          </form>
          <Button
            href=""
            variant="primary"
            ariaLabel="Send Message"
            size="sm"
            className="mt-4"
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

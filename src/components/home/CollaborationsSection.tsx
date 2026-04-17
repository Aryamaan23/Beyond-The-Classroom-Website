import { Fragment } from 'react';
import { collaborations } from '../../data/content';

type Partner = (typeof collaborations)[number];

function isWidePartner(partner: Partner): boolean {
  return 'wide' in partner && partner.wide === true;
}

type RowLogoItem = {
  logo: string;
  alt: string;
  label: string;
  url: string;
  span?: 'wide';
};

type LogoRowItem = {
  name: string;
  logo: string;
  url: string;
};

function hasLogoRow(partner: Partner): partner is Partner & {
  id: string;
  logoRow: LogoRowItem[];
} {
  return 'logoRow' in partner && Array.isArray(partner.logoRow) && partner.logoRow.length > 0;
}

function hasRowLogos(partner: Partner): partner is Partner & {
  id: string;
  rowLogos: RowLogoItem[];
} {
  return 'rowLogos' in partner && Array.isArray(partner.rowLogos) && partner.rowLogos.length >= 2;
}

function partnerKey(partner: Partner): string {
  if ('id' in partner && typeof partner.id === 'string') return partner.id;
  if ('name' in partner && typeof partner.name === 'string') return partner.name;
  return 'collaboration';
}

function CollaborationsSection() {
  return (
    <section
      className="relative py-16 sm:py-20 md:py-28 overflow-hidden"
      aria-labelledby="collaborations-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-white to-primary-soft/50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-10 left-[10%] h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[5%] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-600 to-secondary font-bold text-sm tracking-wider uppercase mb-3">
            Together for Impact
          </span>
          <h2
            id="collaborations-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight"
          >
            Collaborations So Far
          </h2>
          <div
            className="w-20 h-1.5 rounded-full mx-auto mt-4 bg-gradient-to-r from-secondary via-fuchsia-500 to-primary"
            aria-hidden="true"
          />
          <p className="text-gray-700 max-w-2xl mx-auto mt-6 text-base sm:text-lg font-medium">
            We are proud to work alongside organizations that share our vision for youth empowerment and community
            impact.
          </p>
        </div>

        <div className="flex flex-col gap-12 sm:gap-14 max-w-7xl mx-auto">
          {collaborations.map((partner, index) => {
            const wide = isWidePartner(partner);
            const row = hasRowLogos(partner);
            const logoRow = hasLogoRow(partner);

            const interactiveClass =
              'group flex flex-col items-center outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

            if (logoRow) {
              return (
                <div key={partnerKey(partner)} className="w-full">
                  <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6 sm:gap-x-10 sm:gap-y-10 justify-items-center">
                    {partner.logoRow.map((item, logoIndex) => {
                      const label = (
                        <span className="mx-auto max-w-[12rem] text-center text-sm font-bold leading-snug text-gray-700 transition-colors group-hover:text-primary">
                          {item.name}
                        </span>
                      );
                      const logoBlock = (
                        <div className="mx-auto flex h-28 w-full max-w-[190px] items-center justify-center sm:h-32 sm:max-w-[200px]">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="max-h-full w-auto max-w-[180px] object-contain object-center transition-transform duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03] sm:max-w-[190px]"
                          />
                        </div>
                      );
                      const inner = (
                        <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
                          {logoBlock}
                          {label}
                        </div>
                      );
                      const delay = index * 400 + logoIndex * 90;
                      return (
                        <div
                          key={item.name}
                          className="flex w-full justify-center"
                          style={{
                            animation: `fadeInUp 500ms ease-out ${delay}ms both`,
                          }}
                        >
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={interactiveClass}
                              aria-label={`Visit ${item.name}`}
                            >
                              {inner}
                            </a>
                          ) : (
                            <div className={`${interactiveClass} cursor-default`}>{inner}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (row) {
              const column = (item: RowLogoItem) => {
                const wideMid = item.span === 'wide';
                const body = (
                  <>
                    <div
                      className={
                        wideMid
                          ? 'flex h-24 w-full min-w-[11rem] max-w-[min(100%,20rem)] items-center justify-center sm:h-28 sm:max-w-md md:max-w-lg'
                          : 'flex h-28 w-full max-w-[200px] items-center justify-center sm:h-32'
                      }
                    >
                      <img
                        src={item.logo}
                        alt={item.alt}
                        className="max-h-full max-w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <span
                      className={`mt-3 text-center text-xs font-bold leading-snug text-gray-700 sm:text-sm ${
                        wideMid ? 'max-w-[18rem] px-1' : 'max-w-[11rem]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                );

                const colClass = wideMid
                  ? `${interactiveClass} flex-[1.2] basis-[min(100%,22rem)] sm:min-w-[12rem] md:min-w-[14rem]`
                  : `${interactiveClass} flex-1 basis-[min(100%,10rem)] sm:basis-0 sm:min-w-[9rem]`;

                if (item.url) {
                  return (
                    <a
                      key={item.alt}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={colClass}
                      aria-label={`Visit ${item.label}`}
                    >
                      {body}
                    </a>
                  );
                }

                return (
                  <div key={item.alt} className={`${colClass} cursor-default`}>
                    {body}
                  </div>
                );
              };

              return (
                <div
                  key={partnerKey(partner)}
                  className="flex w-full justify-center px-2"
                  style={{
                    animation: `fadeInUp 500ms ease-out ${index * 100}ms both`,
                  }}
                >
                  <div
                    className="flex w-full max-w-5xl flex-row flex-wrap items-center justify-center gap-12 sm:gap-16 md:gap-20"
                    role="list"
                  >
                    {partner.rowLogos.map((item, logoIndex) => (
                      <Fragment key={item.alt}>
                        {logoIndex > 0 ? (
                          <div
                            className="mx-2 hidden h-28 w-px shrink-0 self-center bg-gradient-to-b from-transparent via-slate-200 to-transparent sm:block"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div role="listitem" className="flex justify-center">
                          {column(item)}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              );
            }

            if (!('name' in partner && 'logo' in partner)) {
              return null;
            }

            const std = partner as {
              name: string;
              logo: string;
              url?: string;
              wide?: boolean;
              rowCenter?: boolean;
            };

            const label = (
              <span className="mx-auto max-w-[16rem] text-center text-sm font-bold leading-snug text-gray-700 transition-colors group-hover:text-primary">
                {std.name}
              </span>
            );

            const logoBlock = wide ? (
              <div className="flex w-full min-h-[3.5rem] items-center justify-center px-2 sm:min-h-20">
                <img
                  src={std.logo}
                  alt={std.name}
                  className="max-h-14 w-full max-w-2xl object-contain object-center transition-transform duration-300 group-hover:scale-[1.02] group-focus-visible:scale-[1.02] sm:max-h-[4.75rem]"
                />
              </div>
            ) : (
              <div className="mx-auto flex h-28 w-full max-w-[240px] items-center justify-center sm:h-32">
                <img
                  src={std.logo}
                  alt={std.name}
                  className="max-h-full w-auto max-w-[220px] object-contain object-center transition-transform duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                />
              </div>
            );

            const inner = (
              <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
                {logoBlock}
                {label}
              </div>
            );

            const rowCenter = std.rowCenter === true;

            const cellClass = wide
              ? 'col-span-full mx-auto flex w-full max-w-4xl justify-center'
              : rowCenter
                ? 'col-span-full mx-auto flex w-full justify-center'
                : 'mx-auto flex w-full max-w-[280px] justify-center';

            return (
              <div
                key={partnerKey(partner)}
                className={cellClass}
                style={{
                  animation: `fadeInUp 500ms ease-out ${index * 100}ms both`,
                }}
              >
                {std.url ? (
                  <a
                    href={std.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={interactiveClass}
                    aria-label={`Visit ${std.name}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={`${interactiveClass} cursor-default`}>{inner}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CollaborationsSection;

/* Genera enlaces con UTM para cada canal de promoción. */
const BASE = 'https://uskein.github.io/';
const CAMPAIGN = 'brochure_2026';

const channels = [
  ['LinkedIn · publicación', 'linkedin', 'social', 'brochure'],
  ['LinkedIn · mensaje directo', 'linkedin', 'dm', 'prospeccion'],
  ['LinkedIn · Info destacada', 'linkedin', 'profile', 'featured'],
  ['WhatsApp · difusión', 'whatsapp', 'messaging', 'broadcast'],
  ['X / Twitter', 'x', 'social', 'brochure'],
  ['Facebook / Instagram', 'facebook', 'social', 'brochure'],
  ['Correo · firma', 'email', 'email', 'firma'],
  ['Correo · prospección', 'email', 'email', 'prospeccion'],
  ['Reddit / comunidades', 'reddit', 'community', 'brochure'],
  ['Indie Hackers', 'indiehackers', 'community', 'brochure'],
  ['Product Hunt', 'producthunt', 'directory', 'launch']
];

for (const [name, source, medium, content] of channels) {
  const q = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: CAMPAIGN,
    utm_content: content
  });
  console.log(`${name.padEnd(28)} ${BASE}?${q}`);
}
console.log('\nLos UTM se guardan en localStorage (uskein-utm) y están en window.USKEIN_UTM.');

/**
 * All copy below is taken verbatim from the live site (https://mepzrun.in/, captured 2026-11-25).
 * Do not edit wording here without the organisers' approval — the redesign only changes presentation.
 */

export const REGISTER_URL = 'https://reg.myraceindia.com/MRTS/mepzrun2024'

const img = (name: string) => `/images/${name}`

export const logo = {
  sm: img('MEPZ-Run-2027_-11th-Edition-1-300x300.png'),
  lg: img('MEPZ-Run-2027_-11th-Edition-1-768x768.png'),
}

export const nav = [
  { label: 'Home', href: '/#top', id: 'top' },
  { label: 'About Us', href: '/#about', id: 'about' },
  { label: 'Sponsors', href: '/#sponsors', id: 'sponsors' },
  { label: 'FaQ', href: '/#faq', id: 'faq' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
  { label: 'Terms & Conditions', href: '/terms-conditions/', id: 'terms' },
] as const

/** Hero carousel (2027 campaign artwork — first slider on the live home page). */
export const heroSlides = [
  {
    src: img('WhatsApp-Image-2026-11-12-at-12.29.00-PM.jpeg'),
    alt: 'MEPZ Run 2027, 11th Edition — Beat Your Best at MEPZ Run 2027! #GetFitTheGreenWay | Big Rewards, Greater Health. Claim Your Spot Today',
  },
  {
    src: img('WhatsApp-Image-2026-11-12-at-12.28.59-PM-1.jpeg'),
    alt: 'MEPZ Run 2027, 11th Edition — Run Green, Live Clean. Join Chennai’s premiere eco-marathon at MEPZ. Register Now. 5KM • 10KM • Half Marathon',
  },
  {
    src: img('WhatsApp-Image-2026-11-12-at-12.28.59-PM.jpeg'),
    alt: 'MEPZ Run 2027, 11th Edition — Be Rewarded. MEPZ Run 2027 is back—Bigger, Greener, Faster. Register Now',
  },
]

/** Lines that appear on the 2027 campaign artwork, surfaced as live text. */
export const campaignLines = {
  edition: '11th Edition',
  headline: 'Run Green, Live Clean.',
  sub: 'Join Chennai’s premiere eco-marathon at MEPZ.',
  categories: ['5KM', '10KM', 'Half Marathon'],
  tagline: '#GetFitTheGreenWay | Big Rewards, Greater Health.',
  back: 'MEPZ Run 2027 is back—Bigger, Greener, Faster.',
  beat: 'Beat Your Best at MEPZ Run 2027!',
  claim: 'Claim Your Spot Today',
}

/** Hashtags & slogans printed on past and present campaign banners. */
export const slogans = [
  '#GetFitTheGreenWay',
  'Run Green, Live Clean.',
  'Namma MEPZ, Namma Run!',
  '#LetsGoGreen',
  'Energize Yourself',
  '#GreenRun',
  'Big Rewards, Greater Health.',
  'Thumbs up for a Greener Tomorrow',
  'Be Rewarded',
]

/** Second slider on the live home page (Smart Slider 3) — earlier campaign banners. */
export const archiveBanners = [
  { src: img('mepzban1-min.jpg'), alt: 'Namma MEPZ, Namma Run! #LetsGoGreen — MEPZ Run runners at the March 3rd, 2019 backdrop' },
  { src: img('mepzban2-min.jpg'), alt: 'Energize Yourself #GreenRun — runner crossing the finish line' },
  { src: img('mepzban3-min.jpg'), alt: 'Be Rewarded — While You #GetFitTheGreenWay. Award presentation at MEPZ Run' },
  { src: img('mepzban4-min.jpg'), alt: 'Thumbs up for a Greener Tomorrow — runner giving a thumbs up near the finish' },
  { src: img('banner-new.webp'), alt: 'MEPZ Run 2026, 10th Edition — Registrations Opening. Join us on 1st March 2026. Race categories 21.1 KM / 10 KM / 5 KM' },
  { src: img('New-Project-6.webp'), alt: 'MEPZ Run 2026, 10th Edition — Registrations Opening. Join us on 1st March 2026. Race categories 21.1 KM / 10 KM / 5 KM' },
]

export const about = {
  eyebrow: 'About',
  title: 'MEPZ Run',
  body: 'For those of you who don’t know MEPZ it is one of the oldest Export Processing Zones in India created in 1984. It is located in a beautiful valley between the hills south of Chennai Airport between Chromepet and Tambaram. During 2014 we discussed in MEPZMA how we could make better use of the beautiful campus and make it more known. Out of this the idea about an annual MEPZ run came about!',
  images: [
    // 2026-11-26: replaced (at the client's request) with Higgsfield-generated campaign images; originals About-Us_2/3.jpg remain in public/images.
    { src: '/media/about-runner.webp', alt: 'A runner in a green singlet on a tree-lined road through a green valley at sunrise' },
    { src: '/media/about-group.webp', alt: 'A group of runners in green t-shirts jogging together along a tree-lined campus road' },
  ],
}

/** Prize Amount table (TablePress #1) — values in INR exactly as published. */
export type PrizeRow = { category: string; first: number; second: number; third: number }
export const prizes: { id: string; label: string; short: string; rows: PrizeRow[] }[] = [
  {
    id: 'half',
    label: 'Half Marathon',
    short: '21.1K',
    rows: [
      { category: 'Female 18Y – 44Y', first: 25000, second: 20000, third: 15000 },
      { category: 'Male 18Y – 44Y', first: 25000, second: 20000, third: 15000 },
      { category: 'Female 45Y – 59Y Above', first: 20000, second: 15000, third: 10000 },
      { category: 'Male 45Y – 60Y Above', first: 20000, second: 15000, third: 10000 },
      { category: 'Female 60+ Above', first: 20000, second: 15000, third: 10000 },
      { category: 'Male 60+ Above', first: 20000, second: 15000, third: 10000 },
    ],
  },
  {
    id: '10k',
    label: '10KM',
    short: '10K',
    rows: [
      { category: 'Female 18Y – 44Y', first: 15000, second: 10000, third: 7500 },
      { category: 'Male 18Y – 44Y', first: 15000, second: 10000, third: 7500 },
      { category: 'Female 45Y – 59Y Above', first: 10000, second: 7500, third: 5000 },
      { category: 'Male 45Y – 60Y Above', first: 10000, second: 7500, third: 5000 },
      { category: 'Female 60+ Above', first: 10000, second: 7500, third: 5000 },
      { category: 'Male 60+ Above', first: 10000, second: 7500, third: 5000 },
    ],
  },
  {
    id: '5k',
    label: '5KM',
    short: '5K',
    rows: [
      { category: 'Female 6Y – 44Y', first: 7500, second: 5000, third: 3000 },
      { category: 'Male 6Y – 44Y', first: 7500, second: 5000, third: 3000 },
      { category: 'Female 45Y – 59Y Above', first: 5000, second: 3000, third: 2000 },
      { category: 'Male 45Y – 60Y Above', first: 5000, second: 3000, third: 2000 },
      { category: 'Female 60+ Above', first: 5000, second: 3000, third: 2000 },
      { category: 'Male 60+ Above', first: 5000, second: 3000, third: 2000 },
    ],
  },
]

/** "Gun Time vs Chip Time & Prize Money Distribution" → accordion "Notes to Participants". */
export const notes = {
  title: 'Gun Time vs Chip Time & Prize Money Distribution',
  toggle: 'Notes to Participants',
  intro:
    'Dear Participants,We hope this message finds you well as we gear up for the upcoming MEPZ RUN 2024. As part of our commitment to transparency and fairness, we want to bring your attention to a couple of key points related to the race timing and prize money distribution.',
  groups: [
    {
      heading: 'Gun Time vs. Chip Time:',
      items: [
        'The official timing for the marathon will be recorded using the “gun time” method. Gun time is the time elapsed from the official start of the race until the runner crosses the finish line.',
        'While we understand the significance of “chip time” for individual runners, especially for personal records and pacing, we have opted for gun time as the official measure for consistency and fairness across all participants.',
      ],
    },
    {
      heading: 'Prize Money Distribution:',
      items: [
        'The prize money for each category will be awarded based on the official gun time, as this reflects the overall performance and competitiveness of participants.',
        'Prize money distribution will take place during the award ceremony following the race. Winners are requested to be present to receive their awards in person.',
        'The awards ceremony will be held at the MEPZ Run finish line (Near Stage) to honor the winners & runner-ups in Age Category male and female finishers at approximately 8 am.',
        'Those in contention for the awards need to stay back after their run at the stage area – volunteers would guide these individuals.',
        'Winners can give their Bank details with their proofs ID card copy and Bib number.',
        'Payment will be transferred within 21 days from race day.',
      ],
    },
  ],
  ageHeading: 'Age Categories:',
  ageIntro: 'We have the following categories of race this year and they are as below across men and women',
  ageCategories: [
    'Half Marathon – Female – 18yrs – 44yrs',
    'Half Marathon – Male – 18yrs – 49yrs',
    'Half Marathon – Female – 45+yrs',
    'Half Marathon – Male – 50+ yrs',
    '10km – Female – 18yrs – 44yrs',
    '10km – Male – 18yrs – 49yrs',
    '10km – Female – 45+yrs',
    '10km – Male – 50+ yrs',
    '5km – Female – 6yrs – 44yrs',
    '5km – Male – 6yrs – 49yrs',
    '5km – Female – 45+yrs',
    '5km – Male – 50+ yrs',
  ],
  closing: [
    'We believe that these measures contribute to a level playing field for all participants and uphold the integrity of the competition. We appreciate your understanding and cooperation in ensuring a smooth and fair event for everyone involved.',
    'If you have any questions or concerns regarding this notice, please feel free to reach out to our race organizers at (Email ID)',
    'Thank you for being a part of the MEPZ Run 2024, and we look forward to an exciting and successful race day.',
    'Best regards,',
  ],
}

export const tshirts = {
  title: 'T-Shirt Distribution',
  images: [
    img('mepzrun-t-shirt-3.jpg'),
    img('mepzrun-t-shirt-1.jpg'),
    img('mepzrun-t-shirt-5.jpg'),
    img('mepzrun-T-shirt-d.jpg'),
    img('Mepzrun-T-shirt-4.jpg'),
    img('new.jpg'),
  ],
}

export const memories = {
  title: 'Ever-Green Memories',
  body: 'Look through the memories that last a lifetime! MEPZ Run is held for a Greener Tomorrow and we have these pictures to prove it.',
  images: [
    img('gallery4-min.jpg'),
    img('gallery5-min.jpg'),
    img('gallery6-min.jpg'),
    img('gallery1-min.jpg'),
    img('gallery-11.jpg'),
    img('new-gallery.jpg'),
    img('mepzrun-marathon-2023-event-photo.jpg'),
    img('mepzrun-2023-marathon-event.jpg'),
    img('mepzrun-2023-marathon.jpg'),
  ],
}

export const sponsors = {
  title: 'Sponsors & Partners',
  body: 'We would like to thank our Sponsors & Partners. Without their support, we would not have been able to provide the level of service we provided!',
  // Same order as the live carousel. Each artwork already carries its tier name.
  logos: [
    { src: img('silver-new.png'), alt: 'Silver sponsors' },
    { src: img('New-Project-9.png'), alt: 'Gold sponsors — Igarashi Motors India Ltd., Mugi' },
    { src: img('TITLE-SPON-1.png'), alt: 'Title sponsor — Rela Hospital, Rela Women and Children’s Hospital' },
    { src: img('associate-new.png'), alt: 'Associate sponsors' },
    { src: img('bronze-new.png'), alt: 'Bronze sponsors' },
  ],
}

export type Faq = { q: string; a: (string | { list: string[] })[] }
export const faqs: Faq[] = [
  {
    q: 'Can I change my running category?',
    a: ['While we can’t commit that we can accept any changes, we will try to accommodate any requests but may have to limit such changes close to the race.'],
  },
  { q: 'Can I give my BIB to someone else?', a: ['No! It is personal and non-transferable.'] },
  { q: 'Bib Distribution', a: ['Important: There will be no bib distribution on race day.'] },
  {
    q: 'Will there be any bag deposit service?',
    a: ['Yes we will provide a bag deposit service in MEPZ badminton hall. More details will be provided closer to the race.'],
  },
  {
    q: 'What are the age criteria for running the different categories?',
    a: [
      {
        list: [
          'For the Half-Marathon (21.09 km) the participant must be 18 years and above unless he or she has permission from parents to run the race.',
          'For the MEPZ Run (10 km) we recommend that participant are 18 years and above, but we will not enforce this.',
          'For the (5 km), the participants should be 18 and above',
        ],
      },
    ],
  },
  {
    q: 'What are the cut-off times for the different categories?',
    a: [
      {
        list: [
          'For the Half-Marathon, 4 hours',
          'For the MEPZ Run (10Km), 2 hours',
          'For the (5km) Run, 1 hour',
          'We will drive a car along the route which reaches the finish line at the cut-off time. Any runner reaching the finish line after the cut-off time will not receive a medal or get his or her time noted.',
        ],
      },
    ],
  },
  {
    q: 'What if I am injured during the race?',
    a: [
      'First aid stations will be located along the routes. Medical assistance will be available to injured participants. An ambulance service will also be available.',
      'However, participants not completing the race within the cut-off time will not be issued their Medal or Finisher’s Certificate.',
    ],
  },
  {
    q: 'What happens if the race is called off due to extreme weather?',
    a: [
      'While the normal weather in Chennai at the time of the MEPZ Run is normally stable, the organiser need to reserve the right to call off the race in case of a cyclone, other extreme weather or natural or other disaster. In case the race has to be cancelled and alternatives cannot be arranged no refunds will be given since costs to vendors would still have to be paid. If the race is cancelled the organiser will still try to make alternative arrangements, but this cannot be guaranteed. This is part of the Rules & Regulations. In case this happens the organisers will inform all applicants and give detailed information.',
    ],
  },
  {
    q: 'What should I consume during the marathon?',
    a: [
      'Exactly what you should consume before and during a race depends on what your stomach can handle, but you definitely want to make sure you consume enough carbohydrate to delay glycogen depletion and hypoglycaemia and enough fluid to delay dehydration. Both conditions cause you to slow your pace. Taking carbs and fluid at regular intervals throughout the race can make a huge difference in how you feel and perform. Bananas and salt may also be helpful since they helps you avoiding cramps.',
    ],
  },
]

export const contact = {
  title: 'Event Location',
  addressLines: ['MEPZ Campus, PLOT NO.S-10,PHASE-I,', '1st MAIN ROAD, Mepz campus, Chennai-600045'],
  email: 'mepzma@yahoo.co.in',
  tel: { label: '044 – 44 4790 9673', href: 'tel:0444447909673' },
  phone: { label: '+91 95977 66205', href: 'tel:+919597766205' },
  bulkText: 'For bulk booking or inquiries, reach us at contact',
  bulkEmail: 'mepzrun@gmail.com',
  mapSrc:
    'https://maps.google.com/maps?q=W4PG%2BMG5%20Special%20Economic%20Zone%2C%20Admin%20Office%20Building%2C%20Grand%20Southern%20Trunk%20Rd%2C%20Tambaram%20Sanatoruim%2C%20Chennai%2C%20Tamil%20Nadu%20600045&t=m&z=10&output=embed&iwloc=near',
  mapTitle: 'W4PG+MG5 Special Economic Zone, Admin Office Building, Grand Southern Trunk Rd, Tambaram Sanatoruim, Chennai, Tamil Nadu 600045',
  formSrc: 'https://forms.zohopublic.com/xtracut/form/Mepzrun/formperma/BHRTQsggm_bBrvfhEPRQNpINrhpCPrfPpsa6opXy8jk',
}

export const footer = {
  copyright: '© 2026 MEPZ Run. All rights reserved. Designed & Developed by',
  maintainer: { label: 'Xtracut', href: 'http://www.xtracut.com/' },
}

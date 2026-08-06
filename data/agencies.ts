import type { Agency } from '@/types/agency';

/**
 * Seeded placeholder directory.
 *
 * Everything here is illustrative — names, rates, headcounts and case studies
 * are invented. Replace entries with real ones as agencies are vetted; see
 * README.md ("Adding an agency to the directory") for the checklist.
 *
 * Invariants worth keeping when you edit:
 *  - `slug` is permanent once published (it is the canonical URL).
 *  - `teamSizeBand` must agree with `teamSize` — use `teamSizeToBand()`.
 *  - `hourlyRate.minUsd <= hourlyRate.maxUsd`.
 *  - every `Localized` field needs both `ka` and `en`; TypeScript enforces it.
 */
export const agencies: Agency[] = [
  {
    slug: 'aarav-systems',
    name: 'Aarav Systems',
    tagline: {
      ka: 'პროდუქტის ინჟინერიის გუნდები, რომლებიც თქვენს პროცესში ერწყმიან',
      en: 'Product engineering teams that plug into your process',
    },
    summary: {
      ka: 'პუნეში დაფუძნებული ინჟინერიული სტუდია, რომელიც აწყობს გამოყოფილ backend და web გუნდებს SaaS კომპანიებისთვის. მუშაობს ევროპულ საათებზე მორგებული ცვლებით.',
      en: 'A Pune engineering studio that builds dedicated backend and web teams for SaaS companies, working shifts aligned to European hours.',
    },
    description: {
      ka: 'Aarav Systems 2014 წლიდან აწყობს გამოყოფილ ინჟინერიულ გუნდებს ევროპისა და ახლო აღმოსავლეთის SaaS კომპანიებისთვის. გუნდები მუშაობენ კლიენტის საკუთარ სპრინტებში — თქვენს Jira-ში, თქვენს code review-ს პროცესში, თქვენს on-call როტაციაში.\n\nძირითადი სტეკი: TypeScript, Node.js, React, Python და PostgreSQL, AWS-ზე დაფუძნებული ინფრასტრუქტურით. კომპანიას ჰყავს გამოყოფილი QA და DevOps სპეციალისტები, რომლებიც შეიძლება ნაწილობრივ ჩაერთონ პროექტში.\n\nჩართვის მინიმალური ვადა სამი თვეა, რაც საშუალებას აძლევს გუნდს სრულად აითვისოს კლიენტის დომენი. ყველა ინჟინერი გადის შიდა უსაფრთხოების ტრენინგს და ხელს აწერს NDA-ს პროექტის დაწყებამდე.',
      en: 'Aarav Systems has been assembling dedicated engineering teams for SaaS companies across Europe and the Middle East since 2014. Teams work inside the client\'s own sprints — your Jira, your code review process, your on-call rotation.\n\nThe core stack is TypeScript, Node.js, React, Python and PostgreSQL on AWS-based infrastructure. Dedicated QA and DevOps specialists can be allocated part-time to a project.\n\nThe minimum engagement is three months, which gives a team time to absorb the client\'s domain properly. Every engineer completes internal security training and signs an NDA before a project starts.',
    },
    country: 'IN',
    city: 'Pune',
    foundedYear: 2014,
    teamSize: 120,
    teamSizeBand: '51-200',
    categories: ['software-development'],
    specialties: [
      { ka: 'TypeScript / Node.js', en: 'TypeScript / Node.js' },
      { ka: 'React და Next.js', en: 'React and Next.js' },
      { ka: 'AWS ინფრასტრუქტურა', en: 'AWS infrastructure' },
      { ka: 'API ინტეგრაციები', en: 'API integrations' },
    ],
    hourlyRate: { minUsd: 24, maxUsd: 38 },
    englishProficiency: 'professional',
    languages: ['hi', 'mr'],
    timezone: 'Asia/Kolkata',
    overlapHoursWithTbilisi: 8,
    engagementModels: ['dedicated-team', 'staff-augmentation'],
    minEngagementMonths: 3,
    certifications: ['ISO 27001', 'SOC 2 Type II'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-02-11',
      checks: [
        'legal-entity',
        'client-references',
        'english-interview',
        'security-review',
        'sample-work',
      ],
    },
    caseStudies: [
      {
        title: {
          ka: 'ლოგისტიკის პლატფორმის მიგრაცია მონოლითიდან',
          en: 'Migrating a logistics platform off a monolith',
        },
        clientIndustry: { ka: 'ლოგისტიკა', en: 'Logistics' },
        result: {
          ka: 'დეპლოის სიხშირე კვირაში ერთიდან დღეში ოთხამდე გაიზარდა',
          en: 'Deploy frequency went from once a week to four times a day',
        },
        teamSize: 6,
        durationMonths: 14,
      },
      {
        title: {
          ka: 'B2B ანალიტიკის პროდუქტის აწყობა ნულიდან',
          en: 'Building a B2B analytics product from zero',
        },
        clientIndustry: { ka: 'ფინტექი', en: 'Fintech' },
        result: {
          ka: 'MVP გაშვებული 5 თვეში, პირველი 40 გადამხდელი კლიენტი',
          en: 'MVP shipped in 5 months, first 40 paying customers',
        },
        teamSize: 4,
        durationMonths: 9,
      },
    ],
    contact: {
      website: 'https://example.com/aarav-systems',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'nova-support-collective',
    name: 'Nova Support Collective',
    tagline: {
      ka: '24/7 მომხმარებელთა მხარდაჭერა, რომელიც თქვენს ბრენდს ჰგავს',
      en: 'Round-the-clock customer support that sounds like your brand',
    },
    summary: {
      ka: 'სებუში დაფუძნებული მხარდაჭერის ცენტრი, რომელიც მუშაობს e-commerce და SaaS ბრენდებთან ჩატის, ელფოსტისა და ხმოვანი არხებით.',
      en: 'A Cebu support centre working with e-commerce and SaaS brands across chat, email and voice channels.',
    },
    description: {
      ka: 'Nova Support Collective უზრუნველყოფს მრავალარხიან მომხმარებელთა მხარდაჭერას 2011 წლიდან. გუნდები დაკომპლექტებულია ცვლებად, რაც იძლევა რეალურ 24/7 დაფარვას შაბათ-კვირის ჩათვლით.\n\nაგენტები გადიან ორკვირიან ონბორდინგს კლიენტის პროდუქტზე, სანამ პირველ საუბარს დაიწყებენ. ხარისხის კონტროლის გუნდი ყოველკვირეულად ამოწმებს საუბრების შერჩევით ნიმუშს და აწვდის კლიენტს ანგარიშს.\n\nსტანდარტული ინსტრუმენტებია Zendesk, Intercom, Front და Salesforce Service Cloud. კომპანია მუშაობს როგორც გამოყოფილი გუნდის, ისე გაზიარებული სავარძლის მოდელით.',
      en: 'Nova Support Collective has run multichannel customer support since 2011. Teams are staffed across shifts, which makes genuine 24/7 coverage including weekends possible.\n\nAgents complete a two-week onboarding on the client\'s product before handling their first conversation. A quality team samples conversations weekly and reports back to the client.\n\nStandard tooling is Zendesk, Intercom, Front and Salesforce Service Cloud. The company works on both dedicated-team and shared-seat models.',
    },
    country: 'PH',
    city: 'Cebu City',
    foundedYear: 2011,
    teamSize: 310,
    teamSizeBand: '200+',
    categories: ['customer-support'],
    specialties: [
      { ka: 'Zendesk და Intercom', en: 'Zendesk and Intercom' },
      { ka: 'ხმოვანი მხარდაჭერა', en: 'Voice support' },
      { ka: 'E-commerce მხარდაჭერა', en: 'E-commerce support' },
      { ka: '24/7 ცვლები', en: '24/7 shift coverage' },
    ],
    hourlyRate: { minUsd: 11, maxUsd: 18 },
    englishProficiency: 'native-equivalent',
    languages: ['tl', 'ceb'],
    timezone: 'Asia/Manila',
    overlapHoursWithTbilisi: 5,
    engagementModels: ['dedicated-team', 'bpo-seat'],
    minEngagementMonths: 3,
    certifications: ['ISO 27001', 'PCI DSS'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-01-28',
      checks: [
        'legal-entity',
        'client-references',
        'english-interview',
        'security-review',
        'sample-work',
      ],
    },
    caseStudies: [
      {
        title: {
          ka: 'სეზონური პიკის დაფარვა საცალო ბრენდისთვის',
          en: 'Covering a seasonal peak for a retail brand',
        },
        clientIndustry: { ka: 'საცალო ვაჭრობა', en: 'Retail' },
        result: {
          ka: 'პირველი პასუხის დრო პიკის დროსაც 12 წუთის ქვემოთ დარჩა',
          en: 'First-response time stayed under 12 minutes through peak',
        },
        teamSize: 24,
        durationMonths: 5,
      },
    ],
    contact: {
      website: 'https://example.com/nova-support',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'bharat-ledger-associates',
    name: 'Bharat Ledger Associates',
    tagline: {
      ka: 'ბუღალტრული აღრიცხვა და ანგარიშგება მზარდი კომპანიებისთვის',
      en: 'Bookkeeping and reporting for companies that are growing',
    },
    summary: {
      ka: 'აჰმედაბადის ბუღალტრული ფირმა, რომელიც აწარმოებს ყოველთვიურ აღრიცხვას, ანგარიშსწორებას და მართვის ანგარიშგებას მცირე და საშუალო ბიზნესისთვის.',
      en: 'An Ahmedabad accounting firm handling monthly bookkeeping, reconciliation and management reporting for small and mid-sized businesses.',
    },
    description: {
      ka: 'Bharat Ledger Associates მუშაობს 2016 წლიდან და ემსახურება ევროპისა და ბრიტანეთის მცირე და საშუალო ბიზნესს. გუნდი მოიცავს სერტიფიცირებულ ბუღალტრებს, რომლებიც იცნობენ IFRS-ს და ადგილობრივ ანგარიშგების სტანდარტებს.\n\nსტანდარტული სერვისი მოიცავს ყოველთვიურ აღრიცხვას, საბანკო ანგარიშსწორებას, გადასახდელებისა და მისაღებების მართვას და თვის დახურვის პაკეტს კალენდარული თვის დასრულებიდან ხუთ სამუშაო დღეში.\n\nსამუშაო ხდება კლიენტის სისტემაში — Xero, QuickBooks Online, NetSuite ან Zoho Books. ფინანსური მონაცემები მუშავდება ცალკე იზოლირებულ გარემოში, წვდომის ჟურნალის წარმოებით.',
      en: 'Bharat Ledger Associates has served small and mid-sized businesses across Europe and the UK since 2016. The team includes certified accountants familiar with IFRS and local reporting standards.\n\nThe standard service covers monthly bookkeeping, bank reconciliation, accounts payable and receivable, and a month-end close pack delivered within five working days of month end.\n\nWork happens inside the client\'s own system — Xero, QuickBooks Online, NetSuite or Zoho Books. Financial data is processed in a separately isolated environment with access logging.',
    },
    country: 'IN',
    city: 'Ahmedabad',
    foundedYear: 2016,
    teamSize: 45,
    teamSizeBand: '11-50',
    categories: ['accounting-back-office'],
    specialties: [
      { ka: 'Xero და QuickBooks', en: 'Xero and QuickBooks' },
      { ka: 'თვის დახურვა', en: 'Month-end close' },
      { ka: 'გადასახდელები და მისაღებები', en: 'Accounts payable and receivable' },
      { ka: 'მართვის ანგარიშგება', en: 'Management reporting' },
    ],
    hourlyRate: { minUsd: 9, maxUsd: 16 },
    englishProficiency: 'professional',
    languages: ['hi', 'gu'],
    timezone: 'Asia/Kolkata',
    overlapHoursWithTbilisi: 8,
    engagementModels: ['dedicated-team', 'project-based'],
    minEngagementMonths: 6,
    certifications: ['ISO 27001', 'GDPR'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-03-02',
      checks: [
        'legal-entity',
        'client-references',
        'english-interview',
        'security-review',
      ],
    },
    caseStudies: [
      {
        title: {
          ka: 'თვის დახურვის შემცირება 18 დღიდან 5-მდე',
          en: 'Cutting month-end close from 18 days to 5',
        },
        clientIndustry: { ka: 'საბითუმო ვაჭრობა', en: 'Wholesale' },
        result: {
          ka: 'დახურვის პაკეტი მზადდება მე-5 სამუშაო დღეს, გადახრების გარეშე',
          en: 'Close pack delivered on working day 5, with no restatements',
        },
        teamSize: 3,
        durationMonths: 24,
      },
    ],
    contact: {
      website: 'https://example.com/bharat-ledger',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'pearl-delta-outsourcing',
    name: 'Pearl Delta Outsourcing',
    tagline: {
      ka: 'დიდი მასშტაბის მხარდაჭერა და უკანა ოფისი ერთი კონტრაქტით',
      en: 'Support and back office at scale, under one contract',
    },
    summary: {
      ka: 'მანილას მსხვილი BPO პროვაიდერი, რომელიც აერთიანებს მომხმარებელთა მხარდაჭერას და უკანა ოფისის ოპერაციებს ერთ გუნდში.',
      en: 'A large Manila BPO combining customer support and back-office operations inside a single team.',
    },
    description: {
      ka: 'Pearl Delta Outsourcing 2008 წლიდან მუშაობს და დღეს ჰყავს 500-ზე მეტი თანამშრომელი მანილას ორ ოფისში. კომპანია ორიენტირებულია იმ კლიენტებზე, რომლებსაც ერთდროულად სჭირდებათ მხარდაჭერა და ოპერაციული უკანა ოფისი.\n\nუკანა ოფისის მიმართულება მოიცავს შეკვეთების დამუშავებას, პრეტენზიების განხილვას, მონაცემთა შეყვანას და დოკუმენტების ვერიფიკაციას. მხარდაჭერის მიმართულება — ჩატს, ელფოსტასა და ხმოვან არხს.\n\nმასშტაბიდან გამომდინარე კომპანიას შეუძლია გუნდის ზრდა 30 დღეში ორმაგამდე, რაც სასარგებლოა სეზონური პიკების დროს. ჩართვის მინიმალური ვადა ექვსი თვეა.',
      en: 'Pearl Delta Outsourcing has operated since 2008 and today employs over 500 people across two Manila sites. The company targets clients who need customer support and operational back office at the same time.\n\nThe back-office side covers order processing, claims handling, data entry and document verification. The support side covers chat, email and voice.\n\nBecause of its scale the company can double a team within 30 days, which helps through seasonal peaks. The minimum engagement is six months.',
    },
    country: 'PH',
    city: 'Manila',
    foundedYear: 2008,
    teamSize: 520,
    teamSizeBand: '200+',
    categories: ['customer-support', 'accounting-back-office'],
    specialties: [
      { ka: 'შეკვეთების დამუშავება', en: 'Order processing' },
      { ka: 'პრეტენზიების განხილვა', en: 'Claims handling' },
      { ka: 'მონაცემთა შეყვანა', en: 'Data entry' },
      { ka: 'სწრაფი მასშტაბირება', en: 'Rapid scaling' },
    ],
    hourlyRate: { minUsd: 10, maxUsd: 17 },
    englishProficiency: 'native-equivalent',
    languages: ['tl'],
    timezone: 'Asia/Manila',
    overlapHoursWithTbilisi: 5,
    engagementModels: ['bpo-seat', 'dedicated-team'],
    minEngagementMonths: 6,
    certifications: ['ISO 27001', 'ISO 9001', 'PCI DSS'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-02-19',
      checks: [
        'legal-entity',
        'client-references',
        'english-interview',
        'security-review',
        'sample-work',
      ],
    },
    caseStudies: [
      {
        title: {
          ka: 'უკანა ოფისის გუნდის გაორმაგება 30 დღეში',
          en: 'Doubling a back-office team in 30 days',
        },
        clientIndustry: { ka: 'დაზღვევა', en: 'Insurance' },
        result: {
          ka: 'პრეტენზიების დაგროვილი რიგი ექვს კვირაში გასუფთავდა',
          en: 'A claims backlog cleared within six weeks',
        },
        teamSize: 60,
        durationMonths: 11,
      },
    ],
    contact: {
      website: 'https://example.com/pearl-delta',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'kaveri-digital',
    name: 'Kaveri Digital',
    tagline: {
      ka: 'შესრულებაზე ორიენტირებული მარკეტინგი, გაზომვადი შედეგებით',
      en: 'Performance marketing with numbers you can check',
    },
    summary: {
      ka: 'ბენგალურუს მცირე მარკეტინგული სტუდია, რომელიც მუშაობს ფასიან რეკლამაზე, SEO-სა და კონტენტზე B2B კომპანიებისთვის.',
      en: 'A small Bengaluru marketing studio working on paid media, SEO and content for B2B companies.',
    },
    description: {
      ka: 'Kaveri Digital დაარსდა 2019 წელს და მიზანმიმართულად რჩება მცირე გუნდად — თითოეულ კლიენტს ჰყავს ერთი პასუხისმგებელი სტრატეგი, რომელიც არ იცვლება.\n\nსერვისები მოიცავს Google Ads-ისა და LinkedIn Ads-ის მართვას, ტექნიკურ SEO-ს, კონტენტის სტრატეგიასა და ლენდინგ-გვერდების ოპტიმიზაციას. ყოველთვიური ანგარიშგება მოიცავს პაიპლაინზე გავლენას და არა მხოლოდ არხის მეტრიკებს.\n\nკომპანია არ იღებს კლიენტებს, რომელთა ყოველთვიური სარეკლამო ბიუჯეტი 3000 აშშ დოლარზე ნაკლებია, რადგან ამ ზღვარს ქვემოთ შედეგი სტატისტიკურად არასაიმედოა.',
      en: 'Kaveri Digital was founded in 2019 and deliberately stays small — each client has one accountable strategist, and that person does not rotate.\n\nServices cover Google Ads and LinkedIn Ads management, technical SEO, content strategy and landing page optimisation. Monthly reporting covers pipeline impact rather than channel metrics alone.\n\nThe company does not take clients with a monthly ad budget below USD 3,000, because below that threshold results are not statistically reliable.',
    },
    country: 'IN',
    city: 'Bengaluru',
    foundedYear: 2019,
    teamSize: 38,
    teamSizeBand: '11-50',
    categories: ['digital-marketing'],
    specialties: [
      { ka: 'Google Ads', en: 'Google Ads' },
      { ka: 'ტექნიკური SEO', en: 'Technical SEO' },
      { ka: 'B2B კონტენტი', en: 'B2B content' },
      { ka: 'კონვერსიის ოპტიმიზაცია', en: 'Conversion optimisation' },
    ],
    hourlyRate: { minUsd: 18, maxUsd: 30 },
    englishProficiency: 'professional',
    languages: ['hi', 'kn', 'ta'],
    timezone: 'Asia/Kolkata',
    overlapHoursWithTbilisi: 8,
    engagementModels: ['project-based', 'dedicated-team'],
    minEngagementMonths: 3,
    certifications: ['Google Partner'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-03-14',
      checks: ['legal-entity', 'client-references', 'english-interview', 'sample-work'],
    },
    caseStudies: [
      {
        title: {
          ka: 'ორგანული ტრაფიკის ზრდა SaaS პროდუქტისთვის',
          en: 'Growing organic traffic for a SaaS product',
        },
        clientIndustry: { ka: 'პროგრამული უზრუნველყოფა', en: 'Software' },
        result: {
          ka: 'კვალიფიციური დემო-განაცხადები გასამმაგდა 9 თვეში',
          en: 'Qualified demo requests tripled over 9 months',
        },
        teamSize: 3,
        durationMonths: 12,
      },
    ],
    contact: {
      website: 'https://example.com/kaveri-digital',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'northgate-technologies',
    name: 'Northgate Technologies',
    tagline: {
      ka: 'მობილური და ვებ-განვითარება მკაფიო მიწოდების რიტმით',
      en: 'Mobile and web development on a predictable delivery rhythm',
    },
    summary: {
      ka: 'მაკატის განვითარების კომპანია, რომელიც სპეციალიზდება მობილურ აპლიკაციებსა და მათ backend-ზე ფინანსური და ლოგისტიკური კლიენტებისთვის.',
      en: 'A Makati development company specialising in mobile apps and their backends for finance and logistics clients.',
    },
    description: {
      ka: 'Northgate Technologies აშენებს მობილურ და ვებ-პროდუქტებს 2015 წლიდან. გუნდი მუშაობს ორკვირიან სპრინტებში დემონსტრაციითა და წერილობითი ანგარიშით ყოველი სპრინტის ბოლოს.\n\nსტეკი მოიცავს Swift-ს, Kotlin-ს, React Native-ს და .NET-ს. კომპანიას აქვს გამოცდილება რეგულირებად სექტორებში, მათ შორის გადახდების ინტეგრაციასა და KYC პროცესებში.\n\nყველა პროექტი იწყება ორკვირიანი აღმოჩენის ფაზით, რომლის შედეგია ფიქსირებული სამუშაოს აღწერა და შეფასება. კლიენტს შეუძლია ამ ეტაპზე შეწყვიტოს თანამშრომლობა დამატებითი ვალდებულების გარეშე.',
      en: 'Northgate Technologies has built mobile and web products since 2015. Teams work in two-week sprints with a demo and a written report at the end of each one.\n\nThe stack covers Swift, Kotlin, React Native and .NET. The company has experience in regulated sectors, including payment integrations and KYC flows.\n\nEvery project opens with a two-week discovery phase producing a fixed scope description and estimate. Clients can stop at that point with no further commitment.',
    },
    country: 'PH',
    city: 'Makati',
    foundedYear: 2015,
    teamSize: 85,
    teamSizeBand: '51-200',
    categories: ['software-development'],
    specialties: [
      { ka: 'iOS და Android', en: 'iOS and Android' },
      { ka: 'React Native', en: 'React Native' },
      { ka: 'გადახდების ინტეგრაცია', en: 'Payment integrations' },
      { ka: '.NET backend', en: '.NET backend' },
    ],
    hourlyRate: { minUsd: 26, maxUsd: 42 },
    englishProficiency: 'native-equivalent',
    languages: ['tl'],
    timezone: 'Asia/Manila',
    overlapHoursWithTbilisi: 5,
    engagementModels: ['project-based', 'dedicated-team'],
    minEngagementMonths: 2,
    certifications: ['ISO 27001'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-01-16',
      checks: [
        'legal-entity',
        'client-references',
        'english-interview',
        'security-review',
        'sample-work',
      ],
    },
    caseStudies: [
      {
        title: {
          ka: 'გადახდების აპლიკაცია ლოგისტიკური ოპერატორისთვის',
          en: 'A payments app for a logistics operator',
        },
        clientIndustry: { ka: 'ლოგისტიკა', en: 'Logistics' },
        result: {
          ka: 'ქაღალდის დოკუმენტბრუნვა 70%-ით შემცირდა პირველ წელს',
          en: 'Paper document handling fell 70% in the first year',
        },
        teamSize: 7,
        durationMonths: 10,
      },
    ],
    contact: {
      website: 'https://example.com/northgate',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'sahyadri-labs',
    name: 'Sahyadri Labs',
    tagline: {
      ka: 'მონაცემები, პლატფორმები და ინფრასტრუქტურა მასშტაბით',
      en: 'Data, platforms and infrastructure at scale',
    },
    summary: {
      ka: 'ჰაიდარაბადის ინჟინერიული კომპანია, რომელიც მუშაობს მონაცემთა პლატფორმებზე, cloud მიგრაციასა და პლატფორმულ ინჟინერიაზე.',
      en: 'A Hyderabad engineering company working on data platforms, cloud migration and platform engineering.',
    },
    description: {
      ka: 'Sahyadri Labs დაარსდა 2012 წელს და ორიენტირებულია მონაცემთა ინფრასტრუქტურაზე — ETL/ELT პაიპლაინებზე, საწყობებზე და მათ ირგვლივ აწყობილ ანალიტიკურ ინსტრუმენტებზე.\n\nგუნდი მუშაობს Snowflake-ზე, BigQuery-ზე, dbt-სა და Airflow-ზე, Kubernetes-ზე დაფუძნებული პლატფორმებით. ცალკე მიმართულებაა cloud მიგრაცია — ლოკალური სერვერებიდან AWS-სა და Azure-ზე გადასვლა.\n\nკომპანია მუშაობს როგორც გამოყოფილი გუნდის, ისე პროექტული მოდელით, თუმცა უპირატესობას ანიჭებს ხანგრძლივ თანამშრომლობას, სადაც ინფრასტრუქტურული ცოდნა დროთა განმავლობაში გროვდება.',
      en: 'Sahyadri Labs was founded in 2012 and focuses on data infrastructure — ETL/ELT pipelines, warehouses, and the analytics tooling built around them.\n\nThe team works with Snowflake, BigQuery, dbt and Airflow on Kubernetes-based platforms. A separate practice handles cloud migration, moving workloads off on-premise servers onto AWS and Azure.\n\nThe company works on both dedicated-team and project models, though it prefers longer engagements where infrastructure knowledge accumulates over time.',
    },
    country: 'IN',
    city: 'Hyderabad',
    foundedYear: 2012,
    teamSize: 210,
    teamSizeBand: '200+',
    categories: ['software-development'],
    specialties: [
      { ka: 'მონაცემთა პლატფორმები', en: 'Data platforms' },
      { ka: 'Snowflake და dbt', en: 'Snowflake and dbt' },
      { ka: 'Kubernetes', en: 'Kubernetes' },
      { ka: 'Cloud მიგრაცია', en: 'Cloud migration' },
    ],
    hourlyRate: { minUsd: 28, maxUsd: 46 },
    englishProficiency: 'professional',
    languages: ['hi', 'te'],
    timezone: 'Asia/Kolkata',
    overlapHoursWithTbilisi: 8,
    engagementModels: ['dedicated-team', 'staff-augmentation', 'project-based'],
    minEngagementMonths: 4,
    certifications: ['ISO 27001', 'SOC 2 Type II', 'AWS Advanced Partner'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-02-05',
      checks: [
        'legal-entity',
        'client-references',
        'english-interview',
        'security-review',
        'sample-work',
      ],
    },
    caseStudies: [
      {
        title: {
          ka: 'ანგარიშგების საწყობის კონსოლიდაცია',
          en: 'Consolidating a reporting warehouse',
        },
        clientIndustry: { ka: 'საცალო ვაჭრობა', en: 'Retail' },
        result: {
          ka: 'ღამის ანგარიშების მომზადება 7 საათიდან 40 წუთამდე შემცირდა',
          en: 'Nightly report generation fell from 7 hours to 40 minutes',
        },
        teamSize: 9,
        durationMonths: 16,
      },
    ],
    contact: {
      website: 'https://example.com/sahyadri-labs',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'tarsier-back-office',
    name: 'Tarsier Back Office',
    tagline: {
      ka: 'პატარა, ზუსტი უკანა ოფისის გუნდები',
      en: 'Small, precise back-office teams',
    },
    summary: {
      ka: 'დავაოს მცირე ფირმა, რომელიც უზრუნველყოფს ბუღალტრულ აღრიცხვასა და ადმინისტრაციულ მხარდაჭერას მცირე ბიზნესისთვის.',
      en: 'A small Davao firm providing bookkeeping and administrative support for small businesses.',
    },
    description: {
      ka: 'Tarsier Back Office 2020 წელს დაარსდა და მუშაობს მხოლოდ მცირე ბიზნესთან — 26-კაციან გუნდში თითოეულ ბუღალტერს ხუთზე მეტი კლიენტი არ ჰყავს.\n\nსერვისები მოიცავს ყოველკვირეულ აღრიცხვას, ინვოისების გამოწერას, გადასახდელების მართვასა და ხელფასების მომზადებას. ფირმა ასევე ასრულებს ადმინისტრაციულ დავალებებს — კალენდრის მართვას, დოკუმენტების მოწესრიგებას და მომწოდებლებთან მიმოწერას.\n\nმინიმალური ჩართვა თვეში 40 საათია, რაც შესაფერისია იმ კომპანიისთვის, რომელსაც სრული განაკვეთი ჯერ არ სჭირდება.',
      en: 'Tarsier Back Office was founded in 2020 and works only with small businesses — across a 26-person team, no bookkeeper carries more than five clients.\n\nServices cover weekly bookkeeping, invoicing, payables management and payroll preparation. The firm also handles administrative work — calendar management, document filing and supplier correspondence.\n\nThe minimum engagement is 40 hours a month, which suits a company that does not yet need a full-time hire.',
    },
    country: 'PH',
    city: 'Davao City',
    foundedYear: 2020,
    teamSize: 26,
    teamSizeBand: '11-50',
    categories: ['accounting-back-office'],
    specialties: [
      { ka: 'ყოველკვირეული აღრიცხვა', en: 'Weekly bookkeeping' },
      { ka: 'ინვოისები და გადასახდელები', en: 'Invoicing and payables' },
      { ka: 'ხელფასების მომზადება', en: 'Payroll preparation' },
      { ka: 'ადმინისტრაციული მხარდაჭერა', en: 'Administrative support' },
    ],
    hourlyRate: { minUsd: 12, maxUsd: 19 },
    englishProficiency: 'native-equivalent',
    languages: ['tl', 'ceb'],
    timezone: 'Asia/Manila',
    overlapHoursWithTbilisi: 5,
    engagementModels: ['dedicated-team', 'staff-augmentation'],
    minEngagementMonths: 3,
    certifications: ['GDPR'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-03-20',
      checks: ['legal-entity', 'client-references', 'english-interview'],
    },
    caseStudies: [
      {
        title: {
          ka: 'ნახევარგანაკვეთიანი ბუღალტერი მზარდი სტუდიისთვის',
          en: 'A part-time bookkeeper for a growing studio',
        },
        clientIndustry: { ka: 'კრეატიული სერვისები', en: 'Creative services' },
        result: {
          ka: 'ინვოისების გამოწერა 9 დღიდან იმავე დღემდე დაჩქარდა',
          en: 'Invoicing moved from a 9-day lag to same-day',
        },
        teamSize: 1,
        durationMonths: 20,
      },
    ],
    contact: {
      website: 'https://example.com/tarsier',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'indus-growth-media',
    name: 'Indus Growth Media',
    tagline: {
      ka: 'სრული ციკლის ციფრული მარკეტინგი მზარდი ბრენდებისთვის',
      en: 'Full-funnel digital marketing for scaling brands',
    },
    summary: {
      ka: 'გურუგრამის სააგენტო, რომელიც აერთიანებს ფასიან რეკლამას, სოციალურ არხებსა და კრეატივის წარმოებას ერთ გუნდში.',
      en: 'A Gurugram agency combining paid media, social channels and creative production in one team.',
    },
    description: {
      ka: 'Indus Growth Media 2017 წლიდან მუშაობს სამომხმარებლო ბრენდებთან. სააგენტოს აქვს შიდა კრეატივის სტუდია, რაც ნიშნავს, რომ სარეკლამო მასალა იწარმოება იმავე გუნდში, რომელიც კამპანიას მართავს.\n\nარხები მოიცავს Meta Ads-ს, Google Ads-ს, TikTok-სა და YouTube-ს. სააგენტო ასევე მართავს ელფოსტისა და SMS მარკეტინგს Klaviyo-სა და Braze-ის მეშვეობით.\n\nანგარიშგება ხდება ყოველკვირეულად, საერთო დაფაზე, სადაც კლიენტს რეალურ დროში აქვს წვდომა კამპანიის შედეგებზე.',
      en: 'Indus Growth Media has worked with consumer brands since 2017. The agency has an in-house creative studio, which means ad material is produced by the same team that runs the campaign.\n\nChannels cover Meta Ads, Google Ads, TikTok and YouTube. The agency also runs email and SMS marketing through Klaviyo and Braze.\n\nReporting is weekly, on a shared dashboard where the client has real-time access to campaign results.',
    },
    country: 'IN',
    city: 'Gurugram',
    foundedYear: 2017,
    teamSize: 64,
    teamSizeBand: '51-200',
    categories: ['digital-marketing'],
    specialties: [
      { ka: 'Meta Ads', en: 'Meta Ads' },
      { ka: 'კრეატივის წარმოება', en: 'Creative production' },
      { ka: 'ელფოსტა და SMS', en: 'Email and SMS' },
      { ka: 'სამომხმარებლო ბრენდები', en: 'Consumer brands' },
    ],
    hourlyRate: { minUsd: 15, maxUsd: 28 },
    englishProficiency: 'professional',
    languages: ['hi', 'pa'],
    timezone: 'Asia/Kolkata',
    overlapHoursWithTbilisi: 8,
    engagementModels: ['dedicated-team', 'project-based'],
    minEngagementMonths: 3,
    certifications: ['Google Partner', 'Meta Business Partner'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-02-27',
      checks: ['legal-entity', 'client-references', 'english-interview', 'sample-work'],
    },
    caseStudies: [
      {
        title: {
          ka: 'ბრენდის გაშვება ახალ ბაზარზე',
          en: 'Launching a brand in a new market',
        },
        clientIndustry: { ka: 'სამომხმარებლო საქონელი', en: 'Consumer goods' },
        result: {
          ka: 'შეძენის ღირებულება 34%-ით დაეცა ექვს თვეში',
          en: 'Cost per acquisition fell 34% over six months',
        },
        teamSize: 5,
        durationMonths: 8,
      },
    ],
    contact: {
      website: 'https://example.com/indus-growth',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'baywalk-customer-care',
    name: 'Baywalk Customer Care',
    tagline: {
      ka: 'მხარდაჭერის გუნდები, რომლებიც დიდხანს რჩებიან',
      en: 'Support teams that stay',
    },
    summary: {
      ka: 'ილოილოს მხარდაჭერის პროვაიდერი, რომელიც ორიენტირებულია აგენტების დაბალ დენადობასა და პროდუქტის ღრმა ცოდნაზე.',
      en: 'An Iloilo support provider focused on low agent turnover and deep product knowledge.',
    },
    description: {
      ka: 'Baywalk Customer Care 2018 წლიდან მუშაობს და მისი მთავარი გამორჩეული მაჩვენებელია აგენტების წლიური დენადობა 14%, რაც ინდუსტრიის საშუალოზე მნიშვნელოვნად დაბალია.\n\nკომპანია მიზანმიმართულად მუშაობს რთულ პროდუქტებზე, სადაც აგენტს რამდენიმე თვე სჭირდება კომპეტენციის მისაღწევად — SaaS, ფინანსური სერვისები და ტექნიკური მოწყობილობები.\n\nსტანდარტული დაფარვა ორმაგი ცვლაა, თუმცა 24/7 შესაძლებელია 20 კაცზე მეტი გუნდისთვის. მხარდაჭერა ხდება ჩატით, ელფოსტითა და ტელეფონით.',
      en: 'Baywalk Customer Care has operated since 2018, and its standout metric is 14% annual agent turnover — substantially below the industry average.\n\nThe company deliberately takes on complex products where an agent needs several months to reach competence: SaaS, financial services and technical hardware.\n\nStandard coverage is a double shift, with 24/7 available for teams above 20 people. Support runs over chat, email and phone.',
    },
    country: 'PH',
    city: 'Iloilo City',
    foundedYear: 2018,
    teamSize: 140,
    teamSizeBand: '51-200',
    categories: ['customer-support'],
    specialties: [
      { ka: 'ტექნიკური მხარდაჭერა', en: 'Technical support' },
      { ka: 'SaaS ონბორდინგი', en: 'SaaS onboarding' },
      { ka: 'დაბალი დენადობა', en: 'Low turnover' },
      { ka: 'Front და HubSpot', en: 'Front and HubSpot' },
    ],
    hourlyRate: { minUsd: 13, maxUsd: 21 },
    englishProficiency: 'native-equivalent',
    languages: ['tl', 'hil'],
    timezone: 'Asia/Manila',
    overlapHoursWithTbilisi: 5,
    engagementModels: ['dedicated-team'],
    minEngagementMonths: 6,
    certifications: ['ISO 27001', 'GDPR'],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-03-08',
      checks: [
        'legal-entity',
        'client-references',
        'english-interview',
        'security-review',
      ],
    },
    caseStudies: [
      {
        title: {
          ka: 'პირველი ხაზის მხარდაჭერა ტექნიკური პროდუქტისთვის',
          en: 'First-line support for a technical product',
        },
        clientIndustry: { ka: 'ტექნიკური მოწყობილობები', en: 'Hardware' },
        result: {
          ka: 'ესკალაციების წილი 41%-დან 12%-მდე შემცირდა',
          en: 'Escalation rate fell from 41% to 12%',
        },
        teamSize: 18,
        durationMonths: 26,
      },
    ],
    contact: {
      website: 'https://example.com/baywalk',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'chennai-ledgerworks',
    name: 'Chennai Ledgerworks',
    tagline: {
      ka: 'ბუტიკური ბუღალტრული გუნდი დამფუძნებლებისთვის',
      en: 'A boutique accounting team for founders',
    },
    summary: {
      ka: 'ჩენაის ცხრაკაციანი ფირმა, რომელიც მუშაობს ადრეული ეტაპის კომპანიებთან და დამოუკიდებელ პროფესიონალებთან.',
      en: 'A nine-person Chennai firm working with early-stage companies and independent professionals.',
    },
    description: {
      ka: 'Chennai Ledgerworks 2021 წელს დაარსდა და შეგნებულად რჩება ცხრაკაციან გუნდად. ფირმა მუშაობს იმ კომპანიებთან, რომლებსაც ჯერ არ ჰყავთ შიდა ფინანსური განყოფილება.\n\nსერვისები მოიცავს ყოველთვიურ აღრიცხვას, ხარჯების კატეგორიზაციას, მარტივ ფინანსურ მოდელირებასა და ინვესტორებისთვის განკუთვნილი ანგარიშგების მომზადებას.\n\nვინაიდან გუნდი მცირეა, ფირმა ერთდროულად 20-ზე მეტ კლიენტს არ იღებს. ჩართვის მინიმალური ვადა სამი თვეა და მუშაობა იწყება ერთსაათიანი დიაგნოსტიკური ზარით.',
      en: 'Chennai Ledgerworks was founded in 2021 and deliberately stays a nine-person team. The firm works with companies that do not yet have an in-house finance function.\n\nServices cover monthly bookkeeping, expense categorisation, simple financial modelling and preparing investor reporting.\n\nBecause the team is small, the firm does not take on more than 20 clients at once. The minimum engagement is three months and work starts with a one-hour diagnostic call.',
    },
    country: 'IN',
    city: 'Chennai',
    foundedYear: 2021,
    teamSize: 9,
    teamSizeBand: '1-10',
    categories: ['accounting-back-office'],
    specialties: [
      { ka: 'ადრეული ეტაპის კომპანიები', en: 'Early-stage companies' },
      { ka: 'ფინანსური მოდელირება', en: 'Financial modelling' },
      { ka: 'ინვესტორების ანგარიშგება', en: 'Investor reporting' },
      { ka: 'Zoho Books', en: 'Zoho Books' },
    ],
    hourlyRate: { minUsd: 14, maxUsd: 24 },
    englishProficiency: 'professional',
    languages: ['ta', 'hi'],
    timezone: 'Asia/Kolkata',
    overlapHoursWithTbilisi: 8,
    engagementModels: ['dedicated-team', 'project-based'],
    minEngagementMonths: 3,
    certifications: ['GDPR'],
    vetting: {
      status: 'pending',
      verifiedOn: '2026-04-02',
      checks: ['legal-entity', 'client-references'],
    },
    caseStudies: [
      {
        title: {
          ka: 'ფინანსური განყოფილების აწყობა ინვესტიციის რაუნდამდე',
          en: 'Standing up a finance function before a funding round',
        },
        clientIndustry: { ka: 'პროგრამული უზრუნველყოფა', en: 'Software' },
        result: {
          ka: 'due diligence-ის მოთხოვნები ორ კვირაში დაკმაყოფილდა',
          en: 'Due diligence requests answered within two weeks',
        },
        teamSize: 2,
        durationMonths: 7,
      },
    ],
    contact: {
      website: 'https://example.com/chennai-ledgerworks',
      email: 'hello@example.com',
    },
  },
  {
    slug: 'luzon-cloud-studio',
    name: 'Luzon Cloud Studio',
    tagline: {
      ka: 'ვებ-პროდუქტები და მათი ზრდის არხები ერთი გუნდიდან',
      en: 'Web products and the channels that grow them, from one team',
    },
    summary: {
      ka: 'მანილას მცირე სტუდია, რომელიც აშენებს ვებ-პროდუქტებს და შემდეგ თავად მართავს მათ ციფრულ მარკეტინგს.',
      en: 'A small Manila studio that builds web products and then runs their digital marketing.',
    },
    description: {
      ka: 'Luzon Cloud Studio 2022 წელს დაარსდა 18-კაციანი გუნდით, რომელიც აერთიანებს დეველოპერებს, დიზაინერებსა და მარკეტოლოგებს. მოდელი შესაფერისია იმ კლიენტისთვის, რომელსაც სურს ერთი პასუხისმგებელი მხარე პროდუქტიდან ტრაფიკამდე.\n\nგანვითარების მხარეს სტუდია მუშაობს Next.js-ზე, Laravel-სა და Shopify-ზე. მარკეტინგის მხარეს — SEO-ზე, ლენდინგ-გვერდების ტესტირებასა და Google Ads-ზე.\n\nსტუდია იღებს ერთდროულად მაქსიმუმ ოთხ პროექტს. ეს ნიშნავს, რომ ლოდინის სია არსებობს, თუმცა დაწყებული პროექტი არ ჩერდება რესურსის ნაკლებობის გამო.',
      en: 'Luzon Cloud Studio was founded in 2022 with an 18-person team spanning developers, designers and marketers. The model suits a client who wants one accountable party from product through to traffic.\n\nOn the build side the studio works with Next.js, Laravel and Shopify. On the marketing side, SEO, landing page testing and Google Ads.\n\nThe studio takes at most four projects at once. That means a waiting list exists, but a project that has started does not stall for lack of resource.',
    },
    country: 'PH',
    city: 'Manila',
    foundedYear: 2022,
    teamSize: 18,
    teamSizeBand: '11-50',
    categories: ['software-development', 'digital-marketing'],
    specialties: [
      { ka: 'Next.js', en: 'Next.js' },
      { ka: 'Shopify', en: 'Shopify' },
      { ka: 'ლენდინგ-გვერდების ტესტირება', en: 'Landing page testing' },
      { ka: 'SEO', en: 'SEO' },
    ],
    hourlyRate: { minUsd: 22, maxUsd: 34 },
    englishProficiency: 'native-equivalent',
    languages: ['tl'],
    timezone: 'Asia/Manila',
    overlapHoursWithTbilisi: 5,
    engagementModels: ['project-based', 'dedicated-team'],
    minEngagementMonths: 2,
    certifications: [],
    vetting: {
      status: 'vetted',
      verifiedOn: '2026-03-25',
      checks: ['legal-entity', 'client-references', 'english-interview', 'sample-work'],
    },
    caseStudies: [
      {
        title: {
          ka: 'ონლაინ მაღაზიის ხელახალი აწყობა და გაშვება',
          en: 'Rebuilding and relaunching an online store',
        },
        clientIndustry: { ka: 'ელექტრონული კომერცია', en: 'E-commerce' },
        result: {
          ka: 'კონვერსიის მაჩვენებელი 1.2%-დან 2.6%-მდე გაიზარდა',
          en: 'Conversion rate rose from 1.2% to 2.6%',
        },
        teamSize: 4,
        durationMonths: 6,
      },
    ],
    contact: {
      website: 'https://example.com/luzon-cloud',
      email: 'hello@example.com',
    },
  },
];

export function getAgencyBySlug(slug: string): Agency | undefined {
  return agencies.find((agency) => agency.slug === slug);
}

export function getAgencySlugs(): string[] {
  return agencies.map((agency) => agency.slug);
}

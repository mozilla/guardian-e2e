const supportedLocalesWithCurrency = [
  {
    lang: 'de',
    geo: 'at',
    name: 'Austria',
    expect: 'US$4.99/Monat zzgl. Steuern',
    stageExpect: '4,99 €/Monat'
  },
  {
    lang: 'nl',
    geo: 'be',
    name: 'Belgium',
    expect: 'US$4.99/maand + BTW',
    stageExpect: '4,99 €/maand'
  },
  {
    lang: 'en-US',
    geo: 'ca',
    name: 'Canada',
    expect: 'US$4.99/month + tax',
    stageExpect: 'US$4.99/month + tax'
  },
  {
    lang: 'de',
    geo: 'ch',
    name: 'Switzerland',
    expect: 'US$4.99/Monat zzgl. Steuern',
    stageExpect: 'CHF 5.99/Monat'
  },
  {
    lang: 'de',
    geo: 'de',
    name: 'Germany',
    expect: 'US$4.99/Monat zzgl. Steuern',
    stageExpect: '4,99 €/Monat'
  },
  {
    lang: 'es-ES',
    geo: 'es',
    name: 'Spain',
    expect: 'US$4.99/mes + impuestos',
    stageExpect: '4,99 €/mes'
  },
  {
    lang: 'fr',
    geo: 'fr',
    name: 'France',
    expect: 'US$4.99/mois + taxes',
    stageExpect: '4,99 €/mois'
  },
  {
    lang: 'en-US',
    geo: 'gb',
    name: 'UK',
    expect: 'US$4.99/month + tax',
    stageExpect: 'US$4.99/month'
  },
  {
    lang: 'it',
    geo: 'it',
    name: 'Italy',
    expect: 'US$4.99 al mese + tasse',
    stageExpect: '4,99 € al mese'
  },
  {
    lang: 'en-US',
    geo: 'my',
    name: 'Malaysia',
    expect: 'US$4.99/month + tax',
    stageExpect: 'US$4.99/month'
  },
  {
    lang: 'en-US',
    geo: 'nz',
    name: 'New Zealand',
    expect: 'US$4.99/month + tax',
    stageExpect: 'US$4.99/month'
  },
  {
    lang: 'en-US',
    geo: 'sg',
    name: 'Singapore',
    expect: 'US$4.99/month + tax',
    stageExpect: 'US$4.99/month'
  },
  {
    lang: 'en-US',
    geo: 'US',
    name: 'United States',
    expect: 'US$4.99/month + tax',
    stageExpect: 'US$4.99/month + tax'
  }
];

const supportedLocales = [
  {
    lang: 'de',
    geo: 'at',
    name: 'Austria',
    expectedTermsTitle: 'Mozilla Abonnementdienste | Servicebedingungen',
    expectedPrivacyTitle: 'Mozilla Abonnementdienste'
  }, // currently returns USD instead of EURO
  {
    lang: 'nl',
    geo: 'be',
    name: 'Belgium',
    expectedTermsTitle: 'Mozilla Abonnementsservices | Servicevoorwaarden',
    expectedPrivacyTitle: 'Mozilla Abonnementsservices | Privacyverklaring'
  },
  {
    lang: 'en-US',
    geo: 'ca',
    name: 'Canada',
    expectedTermsTitle: 'Mozilla Subscription Services',
    expectedPrivacyTitle: 'Mozilla Subscription Services'
  },
  {
    lang: 'de',
    geo: 'ch',
    name: 'Switzerland',
    expectedTermsTitle: 'Mozilla Abonnementdienste | Servicebedingungen',
    expectedPrivacyTitle: 'Mozilla Abonnementdienste'
  },
  {
    lang: 'de',
    geo: 'de',
    name: 'Germany',
    expectedTermsTitle: 'Mozilla Abonnementdienste | Servicebedingungen',
    expectedPrivacyTitle: 'Mozilla Abonnementdienste'
  },
  {
    lang: 'es-US',
    geo: 'es',
    name: 'Spain',
    expectedTermsTitle: 'Servicios de suscripción de Mozilla',
    expectedPrivacyTitle: 'Servicios de suscripción de Mozilla'
  },
  {
    lang: 'fr',
    geo: 'fr',
    name: 'France',
    expectedTermsTitle: 'Services d’abonnements Mozilla - Conditions d’utilisation',
    expectedPrivacyTitle: 'Services d’abonnement Mozilla'
  },
  {
    lang: 'en-US',
    geo: 'gb',
    name: 'UK',
    expectedTermsTitle: 'Mozilla Subscription Services',
    expectedPrivacyTitle: 'Mozilla Subscription Services'
  }, // shouldn't this be in pounds?
  {
    lang: 'it',
    geo: 'it',
    name: 'Italy',
    expectedTermsTitle: 'Servizi Mozilla in abbonamento | Termini di servizio',
    expectedPrivacyTitle: 'Servizi Mozilla in abbonamento'
  },
  {
    lang: 'en-US',
    geo: 'my',
    name: 'Malaysia',
    expectedTermsTitle: 'Mozilla Subscription Services',
    expectedPrivacyTitle: 'Mozilla Subscription Services'
  },
  {
    lang: 'en-US',
    geo: 'nz',
    name: 'New Zealand',
    expectedTermsTitle: 'Mozilla Subscription Services',
    expectedPrivacyTitle: 'Mozilla Subscription Services'
  },
  {
    lang: 'en-US',
    geo: 'sg',
    name: 'Singapore',
    expectedTermsTitle: 'Mozilla Subscription Services',
    expectedPrivacyTitle: 'Mozilla Subscription Services'
  },
  {
    lang: 'en-US',
    geo: 'US',
    name: 'United States',
    expectedTermsTitle: 'Mozilla Subscription Services',
    expectedPrivacyTitle: 'Mozilla Subscription Services'
  }
];

module.exports = {
  supportedLocales,
  supportedLocalesWithCurrency
};

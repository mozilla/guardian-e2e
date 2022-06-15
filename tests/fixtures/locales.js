const supportedLocalesWithCurrency = [
  {
    lang: 'de',
    geo: 'at',
    name: 'Austria',
    expect: 'US$4.99/Monat',
    stageExpect: '4,99 €/Monat'
  }, // currently returns USD instead of EURO
  {
    lang: 'nl',
    geo: 'be',
    name: 'Belgium',
    expect: 'US$4.99/maand',
    stageExpect: '4,99 €/maand'
  },
  {
    lang: 'en-US',
    geo: 'ca',
    name: 'Canada',
    expect: 'US$4.99/month',
    stageExpect: 'US$4.99/month'
  },
  {
    lang: 'de',
    geo: 'ch',
    name: 'Switzerland',
    expect: 'US$4.99/Monat',
    stageExpect: 'CHF 5.99/Monat'
  },
  {
    lang: 'de',
    geo: 'de',
    name: 'Germany',
    expect: 'US$4.99/Monat',
    stageExpect: '4,99 €/Monat'
  },
  {
    lang: 'es-US',
    geo: 'es',
    name: 'Spain',
    expect: 'US$4.99/month',
    stageExpect: '4,99 €/month'
  },
  {
    lang: 'fr',
    geo: 'fr',
    name: 'France',
    expect: 'US$4.99/mois',
    stageExpect: '4,99 €/mois'
  },
  {
    lang: 'en-US',
    geo: 'gb',
    name: 'UK',
    expect: 'US$4.99/month',
    stageExpect: 'US$4.99/month'
  }, // shouldn't this be in pounds?
  {
    lang: 'it',
    geo: 'it',
    name: 'Italy',
    expect: 'US$4.99 al mese',
    stageExpect: '4,99 € al mese'
  },
  {
    lang: 'en-US',
    geo: 'my',
    name: 'Malaysia',
    expect: 'US$4.99/month',
    stageExpect: 'US$4.99/month'
  },
  {
    lang: 'en-US',
    geo: 'nz',
    name: 'New Zealand',
    expect: 'US$4.99/month',
    stageExpect: 'US$4.99/month'
  },
  {
    lang: 'en-US',
    geo: 'sg',
    name: 'Singapore',
    expect: 'US$4.99/month',
    stageExpect: 'US$4.99/month'
  },
  {
    lang: 'en-US',
    geo: 'US',
    name: 'United States',
    expect: 'US$4.99/month',
    stageExpect: 'US$4.99/month'
  }
];

const supportedLocales = [
  {
    lang: 'de',
    geo: 'at',
    name: 'Austria',
    expectedTermsTitle: 'Mozilla VPN Servicebedingungen',
    expectedPrivacyTitle: 'Mozilla VPN Datenschutzhinweis'
  }, // currently returns USD instead of EURO
  {
    lang: 'nl',
    geo: 'be',
    name: 'Belgium',
    expectedTermsTitle: 'Voorwaarden van de Mozilla VPN Terms',
    expectedPrivacyTitle: 'Mozilla VPN Privacyverklaring'
  },
  {
    lang: 'en-US',
    geo: 'ca',
    name: 'Canada',
    expectedTermsTitle: 'Mozilla VPN Terms of Service',
    expectedPrivacyTitle: 'Mozilla VPN Privacy Notice'
  },
  {
    lang: 'de',
    geo: 'ch',
    name: 'Switzerland',
    expectedTermsTitle: 'Mozilla VPN Servicebedingungen',
    expectedPrivacyTitle: 'Mozilla VPN Datenschutzhinweis'
  },
  {
    lang: 'de',
    geo: 'de',
    name: 'Germany',
    expectedTermsTitle: 'Mozilla VPN Servicebedingungen',
    expectedPrivacyTitle: 'Mozilla VPN Datenschutzhinweis'
  },
  {
    lang: 'es-US',
    geo: 'es',
    name: 'Spain',
    expectedTermsTitle: 'Condiciones del servicio de Mozilla VPN',
    expectedPrivacyTitle: 'Mozilla VPN Aviso de privacidad'
  },
  {
    lang: 'fr',
    geo: 'fr',
    name: 'France',
    expectedTermsTitle: 'Mozilla VPN - Conditions d’utilisation',
    expectedPrivacyTitle: 'Mozilla VPN  - Politique de confidentialité'
  },
  {
    lang: 'en-US',
    geo: 'gb',
    name: 'UK',
    expectedTermsTitle: 'Mozilla VPN Terms of Service',
    expectedPrivacyTitle: 'Mozilla VPN Privacy Notice'
  }, // shouldn't this be in pounds?
  {
    lang: 'it',
    geo: 'it',
    name: 'Italy',
    expectedTermsTitle: 'Termini di servizio di Mozilla VPN',
    expectedPrivacyTitle: 'Informativa sulla privacy di Mozilla VPN'
  },
  {
    lang: 'en-US',
    geo: 'my',
    name: 'Malaysia',
    expectedTermsTitle: 'Mozilla VPN Terms of Service',
    expectedPrivacyTitle: 'Mozilla VPN Privacy Notice'
  },
  {
    lang: 'en-US',
    geo: 'nz',
    name: 'New Zealand',
    expectedTermsTitle: 'Mozilla VPN Terms of Service',
    expectedPrivacyTitle: 'Mozilla VPN Privacy Notice'
  },
  {
    lang: 'en-US',
    geo: 'sg',
    name: 'Singapore',
    expectedTermsTitle: 'Mozilla VPN Terms of Service',
    expectedPrivacyTitle: 'Mozilla VPN Privacy Notice'
  },
  {
    lang: 'en-US',
    geo: 'US',
    name: 'United States',
    expectedTermsTitle: 'Mozilla VPN Terms of Service',
    expectedPrivacyTitle: 'Mozilla VPN Privacy Notice'
  }
];

module.exports = {
  supportedLocales,
  supportedLocalesWithCurrency
};

import type { PoliticalParty } from '~/types/political'

export const politicalParties: PoliticalParty[] = [
  {
    id: 'ldp',
    name: '自由民主党',
    nameEn: 'Liberal Democratic Party',
    founded: 1955,
    description: '日本の保守政党。戦後長期にわたり政権を担当。',
    ideology: {
      spectrum: 'center-right',
      subIdeologies: ['neoconservatism'],
      globalismStance: 'pro-globalism'
    },
    policies: {
      constitutionalRevision: 'support',
      consumptionTax: 'support',
      foreignerIssues: 'neutral',
      nationalSecurity: 'strongly-support',
      nationalIdentity: 'support',
      emperorSystem: 'strongly-support'
    }
  },
  {
    id: 'cdp',
    name: '立憲民主党',
    nameEn: 'Constitutional Democratic Party',
    founded: 2017,
    description: 'リベラル系野党の中心政党。',
    ideology: {
      spectrum: 'center-left',
      subIdeologies: ['social-democracy'],
      globalismStance: 'pro-globalism'
    },
    policies: {
      constitutionalRevision: 'oppose',
      consumptionTax: 'oppose',
      foreignerIssues: 'support',
      nationalSecurity: 'neutral',
      nationalIdentity: 'neutral',
      emperorSystem: 'support'
    }
  },
  {
    id: 'nippponishin',
    name: '日本維新の会',
    nameEn: 'Nippon Ishin no Kai',
    founded: 2012,
    description: '関西を基盤とする改革保守政党。',
    ideology: {
      spectrum: 'center-right',
      subIdeologies: ['populism'],
      globalismStance: 'rationalist'
    },
    policies: {
      constitutionalRevision: 'support',
      consumptionTax: 'oppose',
      foreignerIssues: 'neutral',
      nationalSecurity: 'support',
      nationalIdentity: 'support',
      emperorSystem: 'support'
    }
  },
  {
    id: 'komeito',
    name: '公明党',
    nameEn: 'Komeito',
    founded: 1964,
    description: '創価学会を支持母体とする中道政党。',
    ideology: {
      spectrum: 'center',
      subIdeologies: ['pacifism'],
      globalismStance: 'pro-globalism'
    },
    policies: {
      constitutionalRevision: 'neutral',
      consumptionTax: 'neutral',
      foreignerIssues: 'support',
      nationalSecurity: 'neutral',
      nationalIdentity: 'neutral',
      emperorSystem: 'support'
    }
  },
  {
    id: 'jcp',
    name: '日本共産党',
    nameEn: 'Japanese Communist Party',
    founded: 1922,
    description: '日本最古の政党の一つ。左派政党。',
    ideology: {
      spectrum: 'left',
      subIdeologies: ['pacifism'],
      globalismStance: 'anti-globalism'
    },
    policies: {
      constitutionalRevision: 'strongly-oppose',
      consumptionTax: 'strongly-oppose',
      foreignerIssues: 'strongly-support',
      nationalSecurity: 'oppose',
      nationalIdentity: 'oppose',
      emperorSystem: 'oppose'
    }
  },
  {
    id: 'dpfp',
    name: '国民民主党',
    nameEn: 'Democratic Party For the People',
    founded: 2018,
    description: '中道系野党。現実的な政策を重視。',
    ideology: {
      spectrum: 'center',
      subIdeologies: [],
      globalismStance: 'rationalist'
    },
    policies: {
      constitutionalRevision: 'neutral',
      consumptionTax: 'oppose',
      foreignerIssues: 'neutral',
      nationalSecurity: 'neutral',
      nationalIdentity: 'neutral',
      emperorSystem: 'support'
    }
  },
  {
    id: 'reiwa',
    name: 'れいわ新選組',
    nameEn: 'Reiwa Shinsengumi',
    founded: 2019,
    description: '山本太郎が代表を務める左派政党。',
    ideology: {
      spectrum: 'left',
      subIdeologies: ['populism'],
      globalismStance: 'anti-globalism'
    },
    policies: {
      constitutionalRevision: 'oppose',
      consumptionTax: 'strongly-oppose',
      foreignerIssues: 'support',
      nationalSecurity: 'oppose',
      nationalIdentity: 'neutral',
      emperorSystem: 'neutral'
    }
  },
  {
    id: 'jfp',
    name: '日本第一党',
    nameEn: 'Japan First Party',
    founded: 2016,
    description: '民族主義的な政党。',
    ideology: {
      spectrum: 'right',
      subIdeologies: ['nationalism'],
      globalismStance: 'anti-globalism'
    },
    policies: {
      constitutionalRevision: 'strongly-support',
      consumptionTax: 'oppose',
      foreignerIssues: 'strongly-oppose',
      nationalSecurity: 'strongly-support',
      nationalIdentity: 'strongly-support',
      emperorSystem: 'strongly-support'
    }
  }
]

export type PoliticalParty = {
  id: string
  name: string
  nameEn: string
  founded: number
  description: string
  ideology: PoliticalIdeology
  policies: PolicyPositions
}

export type PoliticalIdeology = {
  spectrum: 'left' | 'center-left' | 'center' | 'center-right' | 'right'
  subIdeologies: SubIdeology[]
  globalismStance: 'anti-globalism' | 'pro-globalism' | 'rationalist'
}

export type SubIdeology =
  | 'neoconservatism'
  | 'libertarianism'
  | 'social-democracy'
  | 'nationalism'
  | 'pacifism'
  | 'environmentalism'
  | 'populism'

export type PolicyPositions = {
  constitutionalRevision: PolicyStance
  consumptionTax: PolicyStance
  foreignerIssues: PolicyStance
  nationalSecurity: PolicyStance
  nationalIdentity: PolicyStance
  emperorSystem: PolicyStance
}

export type PolicyStance = 'strongly-support' | 'support' | 'neutral' | 'oppose' | 'strongly-oppose'

export type QuizQuestion = {
  id: string
  type: 'multiple-choice' | 'true-false' | 'policy-stance'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  category: 'basic-info' | 'ideology' | 'policy' | 'tokyo-trial' | 'zainichi-privilege' | 'anti-japan-education' | 'historical-recognition' | 'ishimaru-politics' | 'libertarianism' | 'neoliberalism-neoconservatism' | 'conservative-parties' | 'selective-surname' | 'hayek' | 'abenomics' | 'koizumi' | 'sanseito' | 'neoliberalism' | 'multiculturalism' | 'anti-left-vs-right'
  relatedParty?: string
}

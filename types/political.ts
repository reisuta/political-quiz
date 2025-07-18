export interface PoliticalParty {
  id: string
  name: string
  nameEn: string
  founded: number
  description: string
  ideology: PoliticalIdeology
  policies: PolicyPositions
}

export interface PoliticalIdeology {
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

export interface PolicyPositions {
  constitutionalRevision: PolicyStance
  consumptionTax: PolicyStance
  foreignerIssues: PolicyStance
  nationalSecurity: PolicyStance
  nationalIdentity: PolicyStance
  emperorSystem: PolicyStance
}

export type PolicyStance = 'strongly-support' | 'support' | 'neutral' | 'oppose' | 'strongly-oppose'

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'policy-stance'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  category: 'basic-info' | 'ideology' | 'policy'
  relatedParty?: string
}
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
  category: '新自由主義と新保守主義' | '日本の歴代総理大臣の功績と失敗' | 'グローバリズムと反グローバリズム' | '東京裁判史観と日本の歴史認識について' | '右翼と反左翼' | '在日' | '選択的夫婦別姓と皇統' | '参政党と日本保守党' | '再生の道とチーム未来' | '国政政党の政策について'
  relatedParty?: string
}

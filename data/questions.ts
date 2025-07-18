import type { QuizQuestion } from '~/types/political'

export const quizQuestions: QuizQuestion[] = [
  // 東京裁判史観について (q1-q3)
  {
    id: 'q1',
    type: 'multiple-choice',
    question: '東京裁判史観に最も批判的な立場を取る政党はどれですか？',
    options: ['立憲民主党', '日本共産党', '日本保守党', 'れいわ新選組'],
    correctAnswer: 2,
    explanation: '日本保守党は東京裁判史観を強く批判し、自虐史観からの脱却を主張しています。',
    category: 'tokyo-trial',
    relatedParty: 'jcp'
  },
  {
    id: 'q2',
    type: 'true-false',
    question: '東京裁判史観は戦後日本の教育に大きな影響を与えた。',
    correctAnswer: 'true',
    explanation: '東京裁判史観は戦後の歴史教育や国民意識の形成に大きな影響を与えました。',
    category: 'tokyo-trial',
    relatedParty: 'ldp'
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    question: '東京裁判について最も保守的な見解を持つのはどれですか？',
    options: ['戦勝国による一方的な裁き', '正当な国際法廷', '平和への第一歩', '国際協調の象徴'],
    correctAnswer: 0,
    explanation: '保守派は東京裁判を戦勝国による一方的な復讐裁判として批判することが多いです。',
    category: 'tokyo-trial',
    relatedParty: 'jcp'
  },

  // 在日特権について (q4-q6)
  {
    id: 'q4',
    type: 'true-false',
    question: '在日特権という概念は日本第一党が強調している政治的主張である。',
    correctAnswer: 'true',
    explanation: '日本第一党は在日特権の存在を主張し、その是正を政策の柱としています。',
    category: 'zainichi-privilege',
    relatedParty: 'jfp'
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    question: '在日特権問題に最も注目している政党はどれですか？',
    options: ['立憲民主党', '公明党', '日本第一党', '国民民主党'],
    correctAnswer: 2,
    explanation: '日本第一党は在日特権問題を主要な政治課題として掲げています。',
    category: 'zainichi-privilege',
    relatedParty: 'jfp'
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    question: '在日韓国・朝鮮人の参政権について最も慎重な立場はどれですか？',
    options: ['積極的賛成', '条件付き賛成', '反対', '検討中'],
    correctAnswer: 2,
    explanation: '保守系政党の多くは外国人参政権に反対の立場を取っています。',
    category: 'zainichi-privilege',
    relatedParty: 'ldp'
  },

  // 在日と反日教育について (q7-q9)
  {
    id: 'q7',
    type: 'true-false',
    question: '反日教育の是正は保守系政党の重要な政策課題である。',
    correctAnswer: 'true',
    explanation: '多くの保守系政党は反日教育を問題視し、愛国教育の推進を主張しています。',
    category: 'anti-japan-education',
    relatedParty: 'ldp'
  },
  {
    id: 'q8',
    type: 'multiple-choice',
    question: '教育勅語の評価について最も肯定的な立場を取るのはどれですか？',
    options: ['日本共産党', 'れいわ新選組', '日本保守党', '立憲民主党'],
    correctAnswer: 2,
    explanation: '日本保守党などの保守系政党は教育勅語を日本の伝統的価値観として評価します。',
    category: 'anti-japan-education',
    relatedParty: 'jcp'
  },
  {
    id: 'q9',
    type: 'true-false',
    question: '道徳教育の充実は愛国心教育と密接に関連している。',
    correctAnswer: 'true',
    explanation: '保守派は道徳教育を通じて愛国心や伝統的価値観の醸成を重視しています。',
    category: 'anti-japan-education',
    relatedParty: 'ldp'
  },

  // 日本の歴史認識について (q10-q12)
  {
    id: 'q10',
    type: 'multiple-choice',
    question: '靖国神社参拝に最も積極的な政党はどれですか？',
    options: ['立憲民主党', '日本共産党', '自由民主党', 'れいわ新選組'],
    correctAnswer: 2,
    explanation: '自由民主党の多くの議員は靖国神社参拝を支持しています。',
    category: 'historical-recognition',
    relatedParty: 'ldp'
  },
  {
    id: 'q11',
    type: 'true-false',
    question: '従軍慰安婦問題について日韓で歴史認識の相違がある。',
    correctAnswer: 'true',
    explanation: '従軍慰安婦問題は日韓間の歴史認識問題の主要な争点の一つです。',
    category: 'historical-recognition',
    relatedParty: 'ldp'
  },
  {
    id: 'q12',
    type: 'multiple-choice',
    question: '南京事件の歴史認識について最も懐疑的な立場はどれですか？',
    options: ['事実として受け入れる', '規模に疑問を呈する', '完全に否定する', '中国の主張に同調'],
    correctAnswer: 1,
    explanation: '保守派の多くは南京事件の規模や詳細について疑問を呈しています。',
    category: 'historical-recognition',
    relatedParty: 'ldp'
  },

  // 再生の道と石丸伸二の政治的立場について (q13-q15)
  {
    id: 'q13',
    type: 'multiple-choice',
    question: '石丸伸二氏の政治的立場に最も近いのはどれですか？',
    options: ['保守', '中道', '改革', 'リベラル'],
    correctAnswer: 2,
    explanation: '石丸氏は従来の政治の枠にとらわれない改革志向の政治姿勢を示しています。',
    category: 'ishimaru-politics',
    relatedParty: 'independent'
  },
  {
    id: 'q14',
    type: 'true-false',
    question: '石丸伸二氏は地方政治から国政への転身を図った政治家である。',
    correctAnswer: 'true',
    explanation: '石丸氏は安芸高田市長として地方政治で実績を積み、国政進出を目指しています。',
    category: 'ishimaru-politics',
    relatedParty: 'independent'
  },
  {
    id: 'q15',
    type: 'multiple-choice',
    question: '石丸氏が重視する政治手法はどれですか？',
    options: ['密室政治', '情報公開', '利権調整', '既得権益保護'],
    correctAnswer: 1,
    explanation: '石丸氏は透明性の高い政治と積極的な情報公開を重視しています。',
    category: 'ishimaru-politics',
    relatedParty: 'independent'
  },

  // リバタリアニズムとは何か (q16-q17)
  {
    id: 'q16',
    type: 'multiple-choice',
    question: 'リバタリアニズムの基本的な理念はどれですか？',
    options: ['大きな政府', '個人の自由最大化', '社会主義', '集団主義'],
    correctAnswer: 1,
    explanation: 'リバタリアニズムは個人の自由を最大化し、政府の介入を最小化することを理念とします。',
    category: 'libertarianism',
    relatedParty: 'nippponishin'
  },
  {
    id: 'q17',
    type: 'true-false',
    question: 'リバタリアニズムは小さな政府を志向する。',
    correctAnswer: 'true',
    explanation: 'リバタリアニズムは政府の役割を最小限に留め、市場の自由を重視します。',
    category: 'libertarianism',
    relatedParty: 'nippponishin'
  },

  // 新自由主義と新保守主義について (q18-q19)
  {
    id: 'q18',
    type: 'multiple-choice',
    question: '新自由主義と新保守主義の違いは何ですか？',
    options: ['経済と安全保障の重視点', '左右の政治的立場', '国際協調への姿勢', '社会保障への考え方'],
    correctAnswer: 0,
    explanation: '新自由主義は経済自由化を、新保守主義は強い安全保障政策を重視します。',
    category: 'neoliberalism-neoconservatism',
    relatedParty: 'ldp'
  },
  {
    id: 'q19',
    type: 'true-false',
    question: '新保守主義は道徳的価値観を重視する。',
    correctAnswer: 'true',
    explanation: '新保守主義は伝統的な道徳観や価値観の維持を重要視します。',
    category: 'neoliberalism-neoconservatism',
    relatedParty: 'ldp'
  },

  // 日本保守党と新保守主義の関連と参政党との違いについて (q20)
  {
    id: 'q20',
    type: 'multiple-choice',
    question: '日本保守党と参政党の主な違いはどこにありますか？',
    options: ['経済政策', '外交政策', '教育政策', '全ての政策領域'],
    correctAnswer: 3,
    explanation: '両党は保守的価値観を共有しつつも、具体的な政策アプローチや重点分野で違いがあります。',
    category: 'conservative-parties',
    relatedParty: 'jcp'
  }
]

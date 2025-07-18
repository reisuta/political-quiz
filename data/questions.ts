import type { QuizQuestion } from '~/types/political'

export const quizQuestions: QuizQuestion[] = [
  // {
  //   id: 'q1',
  //   type: 'multiple-choice',
  //   question: '自由民主党が設立されたのは何年ですか？',
  //   options: ['1945年', '1955年', '1965年', '1975年'],
  //   correctAnswer: 1,
  //   explanation: '自由民主党は1955年に設立されました。',
  //   category: 'basic-info',
  //   relatedParty: 'ldp'
  // },
  // {
  //   id: 'q2',
  //   type: 'multiple-choice',
  //   question: '日本共産党の政治的立場はどれですか？',
  //   options: ['右派', '中道', '左派', '中道右派'],
  //   correctAnswer: 2,
  //   explanation: '日本共産党は左派政党です。',
  //   category: 'ideology',
  //   relatedParty: 'jcp'
  // },
  // {
  //   id: 'q3',
  //   type: 'true-false',
  //   question: '公明党は創価学会を支持母体としている。',
  //   correctAnswer: 'true',
  //   explanation: '公明党は創価学会を主要な支持母体としています。',
  //   category: 'basic-info',
  //   relatedParty: 'komeito'
  // },
  // {
  //   id: 'q4',
  //   type: 'multiple-choice',
  //   question: '憲法改正に最も積極的な政党はどれですか？',
  //   options: ['立憲民主党', '日本共産党', '自由民主党', 'れいわ新選組'],
  //   correctAnswer: 2,
  //   explanation: '自由民主党は憲法改正を積極的に推進しています。',
  //   category: 'policy',
  //   relatedParty: 'ldp'
  // },
  // {
  //   id: 'q5',
  //   type: 'multiple-choice',
  //   question: '消費税廃止を主張している政党はどれですか？',
  //   options: ['自由民主党', '公明党', 'れいわ新選組', '国民民主党'],
  //   correctAnswer: 2,
  //   explanation: 'れいわ新選組は消費税の廃止を強く主張しています。',
  //   category: 'policy',
  //   relatedParty: 'reiwa'
  // },
  // {
  //   id: 'q6',
  //   type: 'multiple-choice',
  //   question: '日本維新の会の主要な支持基盤はどこですか？',
  //   options: ['東京', '関西', '東北', '九州'],
  //   correctAnswer: 1,
  //   explanation: '日本維新の会は関西を主要な支持基盤としています。',
  //   category: 'basic-info',
  //   relatedParty: 'nippponishin'
  // },
  {
    id: 'q7',
    type: 'true-false',
    question: '日本第一党は反グローバリズムの立場を取っている。',
    correctAnswer: 'true',
    explanation: '日本第一党は反グローバリズムの立場を明確にしています。',
    category: 'ideology',
    relatedParty: 'jfp'
  },
  {
    id: 'q8',
    type: 'multiple-choice',
    question: 'リバタリアニズムに最も近い思想を持つのはどの政党ですか？',
    options: ['日本共産党', '公明党', '日本維新の会', '立憲民主党'],
    correctAnswer: 2,
    explanation: '日本維新の会は規制緩和や小さな政府を志向し、リバタリアニズム的要素があります。',
    category: 'ideology',
    relatedParty: 'nippponishin'
  },
  {
    id: 'q9',
    type: 'multiple-choice',
    question: '立憲民主党の主要な政治的立場はどれですか？',
    options: ['保守', 'リベラル', '右派', '新保守主義'],
    correctAnswer: 1,
    explanation: '立憲民主党はリベラルな政治的立場を取っています。',
    category: 'ideology',
    relatedParty: 'cdp'
  },
  {
    id: 'q10',
    type: 'true-false',
    question: '国民民主党は労働組合を支持基盤としている。',
    correctAnswer: 'true',
    explanation: '国民民主党は連合（日本労働組合総連合会）を主要な支持基盤としています。',
    category: 'basic-info',
    relatedParty: 'dpfp'
  },
  // {
  //   id: 'q11',
  //   type: 'multiple-choice',
  //   question: '社会民主党が最も重視する政策分野はどれですか？',
  //   options: ['経済成長', '平和・人権', '規制緩和', '憲法改正'],
  //   correctAnswer: 1,
  //   explanation: '社会民主党は平和と人権を最も重視する政策を掲げています。',
  //   category: 'policy',
  //   relatedParty: 'sdp'
  // },
  // {
  //   id: 'q12',
  //   type: 'multiple-choice',
  //   question: '日本第一党の外国人問題に対する立場はどれですか？',
  //   options: ['多文化共生推進', '移民受け入れ拡大', '厳格な入国管理', 'グローバル化推進'],
  //   correctAnswer: 2,
  //   explanation: '日本第一党は厳格な入国管理と外国人問題に対して強硬な立場を取っています。',
  //   category: 'policy',
  //   relatedParty: 'jfp'
  // },
  // {
  //   id: 'q13',
  //   type: 'true-false',
  //   question: 'れいわ新選組は新保守主義の立場を取っている。',
  //   correctAnswer: 'false',
  //   explanation: 'れいわ新選組は反新自由主義的な立場で、新保守主義とは対立する政策を掲げています。',
  //   category: 'ideology',
  //   relatedParty: 'reiwa'
  // },
  // {
  //   id: 'q14',
  //   type: 'multiple-choice',
  //   question: '天皇制について最も保守的な立場を取るのはどの政党ですか？',
  //   options: ['日本共産党', '社会民主党', '自由民主党', 'れいわ新選組'],
  //   correctAnswer: 2,
  //   explanation: '自由民主党は天皇制について最も保守的で伝統的な立場を維持しています。',
  //   category: 'policy',
  //   relatedParty: 'ldp'
  // },
  // {
  //   id: 'q15',
  //   type: 'multiple-choice',
  //   question: '日本維新の会が発祥した地域はどこですか？',
  //   options: ['東京都', '大阪府', '愛知県', '福岡県'],
  //   correctAnswer: 1,
  //   explanation: '日本維新の会は大阪府知事だった橋下徹氏らによって設立されました。',
  //   category: 'basic-info',
  //   relatedParty: 'nippponishin'
  // },
  // {
  //   id: 'q16',
  //   type: 'true-false',
  //   question: '公明党は憲法改正に積極的である。',
  //   correctAnswer: 'false',
  //   explanation: '公明党は憲法改正については慎重な立場を取っており、平和憲法の理念を重視しています。',
  //   category: 'policy',
  //   relatedParty: 'komeito'
  // },
  // {
  //   id: 'q17',
  //   type: 'multiple-choice',
  //   question: '安全保障政策で最も現実主義的な立場を取るのはどの政党ですか？',
  //   options: ['日本共産党', '社会民主党', '自由民主党', 'れいわ新選組'],
  //   correctAnswer: 2,
  //   explanation: '自由民主党は日米同盟を基軸とした現実主義的な安全保障政策を推進しています。',
  //   category: 'policy',
  //   relatedParty: 'ldp'
  // },
  // {
  //   id: 'q18',
  //   type: 'multiple-choice',
  //   question: '反グローバリズムの立場を最も明確にしているのはどの政党ですか？',
  //   options: ['立憲民主党', '国民民主党', '日本第一党', '公明党'],
  //   correctAnswer: 2,
  //   explanation: '日本第一党は反グローバリズムの立場を最も明確に打ち出しています。',
  //   category: 'ideology',
  //   relatedParty: 'jfp'
  // },
  // {
  //   id: 'q19',
  //   type: 'true-false',
  //   question: '立憲民主党は消費税増税に賛成している。',
  //   correctAnswer: 'false',
  //   explanation: '立憲民主党は消費税増税に反対し、減税を主張しています。',
  //   category: 'policy',
  //   relatedParty: 'cdp'
  // },
  // {
  //   id: 'q20',
  //   type: 'multiple-choice',
  //   question: '女性天皇について最も柔軟な立場を取るのはどの政党ですか？',
  //   options: ['自由民主党', '日本第一党', '立憲民主党', '日本維新の会'],
  //   correctAnswer: 2,
  //   explanation: '立憲民主党は女性天皇や女系天皇について比較的柔軟な立場を示しています。',
  //   category: 'policy',
  //   relatedParty: 'cdp'
  // }
]

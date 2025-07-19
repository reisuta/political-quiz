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
  },

  // 選択的夫婦別姓のデメリット (q21-q23)
  {
    id: 'q21',
    type: 'multiple-choice',
    question: '選択的夫婦別姓制度に反対する保守派が最も懸念する点は何ですか？',
    options: ['行政コストの増加', '家族の一体感の喪失', '国際的評価の低下', '女性の権利拡大'],
    correctAnswer: 1,
    explanation: '保守派は選択的夫婦別姓が日本の伝統的な家族制度を崩壊させ、家族の一体感を損なうと主張しています。',
    category: 'selective-surname',
    relatedParty: 'ldp'
  },
  {
    id: 'q22',
    type: 'true-false',
    question: '選択的夫婦別姓制度は子どもの姓の選択で混乱を生じさせる可能性がある。',
    correctAnswer: 'true',
    explanation: '反対派は、両親が別姓の場合、子どもの姓をどちらにするかで家族内に対立が生じる可能性を指摘しています。',
    category: 'selective-surname',
    relatedParty: 'ldp'
  },
  {
    id: 'q23',
    type: 'multiple-choice',
    question: '選択的夫婦別姓に関して最も慎重な立場を取る政党はどれですか？',
    options: ['立憲民主党', '日本共産党', '自由民主党', 'れいわ新選組'],
    correctAnswer: 2,
    explanation: '自由民主党の保守派は選択的夫婦別姓に対して慎重な立場を取り、伝統的な家族制度の維持を重視しています。',
    category: 'selective-surname',
    relatedParty: 'ldp'
  },

  // ハイエクについて (q24-q26)
  {
    id: 'q24',
    type: 'multiple-choice',
    question: 'フリードリヒ・ハイエクの経済思想の核心は何ですか？',
    options: ['計画経済の推進', '市場の自生的秩序', '福祉国家の建設', '完全雇用の実現'],
    correctAnswer: 1,
    explanation: 'ハイエクは市場における自生的秩序を重視し、政府による経済への介入を批判しました。',
    category: 'hayek',
    relatedParty: 'nippponishin'
  },
  {
    id: 'q25',
    type: 'true-false',
    question: 'ハイエクは「隷属への道」で社会主義が全体主義につながると警告した。',
    correctAnswer: 'true',
    explanation: 'ハイエクは「隷属への道」において、計画経済は必然的に個人の自由を奪い、全体主義に至ると論じました。',
    category: 'hayek',
    relatedParty: 'nippponishin'
  },
  {
    id: 'q26',
    type: 'multiple-choice',
    question: 'ハイエクの思想に最も影響を受けた日本の政治的立場はどれですか？',
    options: ['社会民主主義', '新自由主義', '共産主義', '国家社会主義'],
    correctAnswer: 1,
    explanation: '日本の新自由主義者たちはハイエクの市場重視の思想から大きな影響を受けています。',
    category: 'hayek',
    relatedParty: 'nippponishin'
  },

  // アベノミクスについて (q27-q29)
  {
    id: 'q27',
    type: 'multiple-choice',
    question: 'アベノミクスの「三本の矢」に含まれないものはどれですか？',
    options: ['大胆な金融政策', '機動的な財政政策', '成長戦略', '消費税撤廃'],
    correctAnswer: 3,
    explanation: 'アベノミクスの三本の矢は金融政策、財政政策、成長戦略であり、むしろ消費税は引き上げられました。',
    category: 'abenomics',
    relatedParty: 'ldp'
  },
  {
    id: 'q28',
    type: 'true-false',
    question: 'アベノミクスは円安を促進し、輸出企業の業績改善に貢献した。',
    correctAnswer: 'true',
    explanation: 'アベノミクスの金融緩和政策により円安が進行し、輸出企業の国際競争力が向上しました。',
    category: 'abenomics',
    relatedParty: 'ldp'
  },
  {
    id: 'q29',
    type: 'multiple-choice',
    question: 'アベノミクスの批判者が指摘する最大の問題点は何ですか？',
    options: ['実質賃金の低下', '株価の上昇', '失業率の改善', '企業収益の増加'],
    correctAnswer: 0,
    explanation: '批判者は、株価上昇や企業収益改善の一方で、実質賃金が低下し格差が拡大したと指摘しています。',
    category: 'abenomics',
    relatedParty: 'ldp'
  },

  // 小泉純一郎総理の功績と失敗 (q30-q32)
  {
    id: 'q30',
    type: 'multiple-choice',
    question: '小泉純一郎元首相の最大の構造改革は何でしたか？',
    options: ['消費税増税', '郵政民営化', '年金改革', '地方分権'],
    correctAnswer: 1,
    explanation: '小泉元首相は「郵政民営化なくして構造改革なし」をスローガンに郵政民営化を断行しました。',
    category: 'koizumi',
    relatedParty: 'ldp'
  },
  {
    id: 'q31',
    type: 'true-false',
    question: '小泉改革は非正規雇用の増加をもたらした。',
    correctAnswer: 'true',
    explanation: '小泉政権下での労働市場の規制緩和により、非正規雇用が大幅に増加しました。',
    category: 'koizumi',
    relatedParty: 'ldp'
  },
  {
    id: 'q32',
    type: 'multiple-choice',
    question: '小泉元首相の靖国神社参拝がもたらした最大の外交的影響は何ですか？',
    options: ['日米関係の強化', '日中・日韓関係の悪化', '東南アジアとの関係改善', 'ロシアとの領土交渉進展'],
    correctAnswer: 1,
    explanation: '小泉元首相の靖国神社参拝は中国・韓国との関係を著しく悪化させました。',
    category: 'koizumi',
    relatedParty: 'ldp'
  },

  // 参政党の特徴 (q33-q35)
  {
    id: 'q33',
    type: 'multiple-choice',
    question: '参政党が最も重視する政治理念は何ですか？',
    options: ['グローバリズム推進', '日本の国益と伝統', '多文化共生', '新自由主義経済'],
    correctAnswer: 1,
    explanation: '参政党は日本の国益を第一に考え、伝統文化の保護と継承を重視しています。',
    category: 'sanseito',
    relatedParty: 'sanseito'
  },
  {
    id: 'q34',
    type: 'true-false',
    question: '参政党は既存政党とは異なる草の根民主主義を標榜している。',
    correctAnswer: 'true',
    explanation: '参政党は党員による直接的な政策決定など、ボトムアップ型の政治運営を特徴としています。',
    category: 'sanseito',
    relatedParty: 'sanseito'
  },
  {
    id: 'q35',
    type: 'multiple-choice',
    question: '参政党の教育政策で最も特徴的なものは何ですか？',
    options: ['英語教育の強化', '歴史教育の見直し', 'IT教育の推進', '受験競争の緩和'],
    correctAnswer: 1,
    explanation: '参政党は自虐史観からの脱却を掲げ、日本人としての誇りを育む歴史教育を推進しています。',
    category: 'sanseito',
    relatedParty: 'sanseito'
  },

  // 新自由主義について (q36-q38)
  {
    id: 'q36',
    type: 'multiple-choice',
    question: '新自由主義の核心的な政策は何ですか？',
    options: ['福祉国家の拡充', '規制緩和と民営化', '保護貿易の推進', '計画経済の導入'],
    correctAnswer: 1,
    explanation: '新自由主義は市場原理を重視し、規制緩和と国営企業の民営化を推進します。',
    category: 'neoliberalism',
    relatedParty: 'ldp'
  },
  {
    id: 'q37',
    type: 'true-false',
    question: '新自由主義政策は所得格差の拡大をもたらす傾向がある。',
    correctAnswer: 'true',
    explanation: '市場競争を重視する新自由主義は、結果として勝者と敗者の格差を拡大させる傾向があります。',
    category: 'neoliberalism',
    relatedParty: 'ldp'
  },
  {
    id: 'q38',
    type: 'multiple-choice',
    question: '日本で新自由主義的改革を最も推進した時期はいつですか？',
    options: ['高度経済成長期', 'バブル期', '小泉政権期', '民主党政権期'],
    correctAnswer: 2,
    explanation: '小泉政権期に郵政民営化をはじめとする新自由主義的な構造改革が本格的に推進されました。',
    category: 'neoliberalism',
    relatedParty: 'ldp'
  },

  // 多文化共生庁のデメリット (q39-q41)
  {
    id: 'q39',
    type: 'multiple-choice',
    question: '多文化共生政策に対する保守派の最大の懸念は何ですか？',
    options: ['経済成長の停滞', '日本文化の希薄化', '人口減少の加速', '国際競争力の低下'],
    correctAnswer: 1,
    explanation: '保守派は多文化共生が日本の伝統文化や社会的一体性を損なう可能性を懸念しています。',
    category: 'multiculturalism',
    relatedParty: 'jcp'
  },
  {
    id: 'q40',
    type: 'true-false',
    question: '多文化共生庁の設置は行政コストの増大をもたらす可能性がある。',
    correctAnswer: 'true',
    explanation: '新たな省庁の設置は人件費や運営費など、相当な行政コストの増加を伴います。',
    category: 'multiculturalism',
    relatedParty: 'ldp'
  },
  {
    id: 'q41',
    type: 'multiple-choice',
    question: '欧州における多文化主義政策の失敗から学ぶべき教訓は何ですか？',
    options: ['移民の完全排除', '並行社会の形成防止', '同化政策の強制', '国境の完全開放'],
    correctAnswer: 1,
    explanation: '欧州では移民コミュニティが主流社会と分離した「並行社会」を形成し、社会分断を招いた例があります。',
    category: 'multiculturalism',
    relatedParty: 'ldp'
  },

  // 反左翼と右翼の違いについて (q42-q44)
  {
    id: 'q42',
    type: 'multiple-choice',
    question: '反左翼と右翼の最も本質的な違いは何ですか？',
    options: ['経済政策の違い', '動機と思想的基盤の違い', '外交政策の違い', '支持層の違い'],
    correctAnswer: 1,
    explanation: '反左翼は左翼への反発が動機であり、右翼は積極的な保守思想や伝統的価値観を基盤としています。',
    category: 'anti-left-vs-right',
    relatedParty: 'jcp'
  },
  {
    id: 'q43',
    type: 'true-false',
    question: '反左翼は必ずしも保守的な価値観を持っているわけではない。',
    correctAnswer: 'true',
    explanation: '反左翼は左翼に反対することが主目的であり、必ずしも伝統的な保守思想を持っているとは限りません。',
    category: 'anti-left-vs-right',
    relatedParty: 'ldp'
  },
  {
    id: 'q44',
    type: 'multiple-choice',
    question: '真の右翼（保守）が最も重視するものは何ですか？',
    options: ['反共産主義', '伝統と文化の継承', '経済成長', '軍事力強化'],
    correctAnswer: 1,
    explanation: '真の右翼は日本の伝統、文化、皇室などの継承と保護を最も重視します。',
    category: 'anti-left-vs-right',
    relatedParty: 'jcp'
  }
]

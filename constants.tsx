
import { Category, Experiment, Portal } from './types';

export const PORTALS: Portal[] = [
  {
    id: 'year-3',
    name: 'السنة الثالثة ابتدائي',
    description: 'استكشاف العالم من حولنا من خلال الضوء، الصوت، والهواء.',
    tag: 'أساسي',
    imageUrl: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=800',
    experimentsCount: 9
  },
  {
    id: 'year-4',
    name: 'السنة الرابعة ابتدائي',
    description: 'دراسة حالات المادة، الحرارة، والكهرباء بطرق علمية دقيقة.',
    tag: 'متقدم',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    experimentsCount: 8
  }
];

export const EXPERIMENTS: Experiment[] = [
  // --- YEAR 3 EXPERIMENTS ---
  {
    id: 'y3-exp-1',
    portalId: 'year-3',
    title: 'تجربة الطفو والغوص',
    category: Category.Physics,
    unit: 'عالم المادة',
    difficulty: 'سهل',
    duration: '15 دقيقة',
    description: 'لماذا تطفو السفينة الضخمة بينما يغوص المسمار الصغير؟ استكشف كثافة الأجسام في الماء.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    materials: [
      { id: 'm1', name: 'حوض ماء', icon: 'waves' },
      { id: 'm2', name: 'قطعة خشب', icon: 'deck' },
      { id: 'm3', name: 'مسمار حديد', icon: 'architecture' },
      { id: 'm4', name: 'كرة بلاستيك', icon: 'sports_basketball' }
    ],
    steps: [
      'املأ الحوض بالماء حتى منتصفه.',
      'ضع قطعة الخشب ولاحظ بقاءها فوق السطح.',
      'ضع المسمار ولاحظ نزوله للقاع مباشرة.',
      'استنتج الفرق بين الأجسام التي تطفو والتي تغوص.'
    ]
  },
  {
    id: 'y3-exp-2',
    portalId: 'year-3',
    title: 'الهواء يشغل حيزًا',
    category: Category.General,
    unit: 'عالم المادة',
    difficulty: 'سهل',
    duration: '10 دقائق',
    description: 'هل الهواء فارغ؟ اكتشف أن الهواء مادة موجودة حولنا وتشغل مساحة.',
    imageUrl: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'كأس زجاجي', icon: 'local_bar' },
      { id: 'm2', name: 'منديل ورقي', icon: 'sheets' },
      { id: 'm3', name: 'وعاء ماء', icon: 'water' }
    ],
    steps: [
      'ضع المنديل في قاع الكأس وتأكد من ثباته.',
      'اقلب الكأس واغمسه رأسياً في وعاء الماء.',
      'أخرج الكأس ولاحظ أن المنديل لم يبتل بسبب وجود الهواء.'
    ]
  },
  {
    id: 'y3-exp-3',
    portalId: 'year-3',
    title: 'الضغط بالهواء',
    category: Category.Physics,
    unit: 'عالم المادة',
    difficulty: 'متوسط',
    duration: '15 دقيقة',
    description: 'تعلم كيف يمكن للهواء أن يدفع الأشياء بقوة عند ضغطه.',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'حقنة طبية (بدون إبرة)', icon: 'vaccines' },
      { id: 'm2', name: 'ماء', icon: 'water_drop' }
    ],
    steps: [
      'اسحب المكبس للخلف لملء الحقنة بالهواء.',
      'سد فتحة الحقنة بإصبعك بقوة.',
      'حاول ضغط المكبس ولاحظ المقاومة التي يبديها الهواء المضغوط.'
    ]
  },
  {
    id: 'y3-exp-4',
    portalId: 'year-3',
    title: 'الضوء والظل',
    category: Category.Physics,
    unit: 'الضوء',
    difficulty: 'سهل',
    duration: '10 دقائق',
    description: 'استكشف كيف يتكون الظل عندما يعترض جسم معتم مسار الضوء.',
    imageUrl: 'https://images.unsplash.com/photo-1507567330391-1f39ad5816b5?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'مصباح يدوي', icon: 'flashlight_on' },
      { id: 'm2', name: 'لعبة صغيرة', icon: 'toys' }
    ],
    steps: [
      'سلط الضوء على اللعبة في غرفة مظلمة.',
      'لاحظ تكون الظل خلف اللعبة على الحائط.',
      'قرب المصباح وابعده ولاحظ تغير حجم الظل.'
    ]
  },
  {
    id: 'y3-exp-5',
    portalId: 'year-3',
    title: 'مصادر الضوء',
    category: Category.General,
    unit: 'الضوء',
    difficulty: 'سهل',
    duration: '20 دقيقة',
    description: 'صنف مصادر الضوء من حولنا إلى طبيعية واصطناعية.',
    imageUrl: 'https://images.unsplash.com/photo-1493236272120-200db0da1927?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'بطاقات صور', icon: 'image' },
      { id: 'm2', name: 'لوحة تصنيف', icon: 'dashboard' }
    ],
    steps: [
      'اجمع صوراً للشمس، القمر، النار، والمصباح الكهربائي.',
      'صنفها حسب المصدر (طبيعي مثل الشمس، اصطناعي مثل المصباح).',
      'ناقش لماذا لا يعتبر القمر مصدراً أصلياً للضوء.'
    ]
  },
  {
    id: 'y3-exp-6',
    portalId: 'year-3',
    title: 'انعكاس الضوء',
    category: Category.Physics,
    unit: 'الضوء',
    difficulty: 'متوسط',
    duration: '15 دقيقة',
    description: 'شاهد كيف يرتد الضوء عندما يسقط على الأسطح المصقولة كالمرايا.',
    imageUrl: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'مرآة مستوية', icon: 'square' },
      { id: 'm2', name: 'ليزر تعليمي', icon: 'flare' }
    ],
    steps: [
      'وجه شعاع الليزر نحو المرآة بزاوية.',
      'لاحظ ارتداد الشعاع في الاتجاه الآخر.',
      'غير زاوية السقوط وشاهد كيف تتغير زاوية الانعكاس.'
    ],
    safetyWarning: 'لا توجه شعاع الليزر نحو العينين مباشرة.'
  },
  {
    id: 'y3-exp-7',
    portalId: 'year-3',
    title: 'الصوت والاهتزاز',
    category: Category.Physics,
    unit: 'الصوت',
    difficulty: 'سهل',
    duration: '10 دقائق',
    description: 'اكتشف السر وراء نشوء الصوت: الاهتزاز هو المفتاح!',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'مسطرة بلاستيك', icon: 'straighten' },
      { id: 'm2', name: 'طاولة', icon: 'table_restaurant' }
    ],
    steps: [
      'اضرب الطرف البارز بقوة ولاحظ الصوت الصادر والاهتزاز.',
      'أمسك المسطرة أثناء اهتزازها ولاحظ توقف الصوت فوراً.'
    ]
  },
  {
    id: 'y3-exp-8',
    portalId: 'year-3',
    title: 'انتقال الصوت في الهواء',
    category: Category.Physics,
    unit: 'الصوت',
    difficulty: 'سهل',
    duration: '15 دقيقة',
    description: 'كيف يصل صوتنا للآخرين؟ تعلم كيف يسافر الصوت عبر جزيئات الهواء.',
    imageUrl: 'https://images.unsplash.com/photo-1520529157860-32f2fa4d306e?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'جرس صغير', icon: 'notifications_active' },
      { id: 'm2', name: 'زميل للتجربة', icon: 'group' }
    ],
    steps: [
      'اطلب من زميلك الوقوف على مسافة معينة.',
      'دق الجرس ولاحظ وصول الصوت إليه.',
      'ناقش كيف اهتز الهواء لينقل الصوت لأذن زميلك.'
    ]
  },
  {
    id: 'y3-exp-9',
    portalId: 'year-3',
    title: 'تغير شكل الأجسام',
    category: Category.Mechanics,
    unit: 'القوى والحركة',
    difficulty: 'سهل',
    duration: '15 دقيقة',
    description: 'كيف تؤثر القوة (الضغط أو السحب) على شكل الأشياء المرنة؟',
    imageUrl: 'https://images.unsplash.com/photo-1584947847219-7d15df47d959?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'إسفنجة', icon: 'grid_view' },
      { id: 'm2', name: 'صلصال', icon: 'interests' },
      { id: 'm3', name: 'نابض (زنبرك)', icon: 'reorder' }
    ],
    steps: [
      'اضغط على الإسفنجة ولاحظ تغير شكلها ثم عودتها.',
      'اضغط على الصلصال ولاحظ بقاء الشكل الجديد.',
      'اسحب النابض وشاهد استطالته نتيجة قوة السحب.'
    ]
  },

  // --- YEAR 4 EXPERIMENTS ---
  {
    id: 'y4-exp-1',
    portalId: 'year-4',
    title: 'حالات المادة الثلاث',
    category: Category.Chemistry,
    unit: 'المادة',
    difficulty: 'متوسط',
    duration: '20 دقيقة',
    description: 'استكشف الفرق بين الحالة الصلبة، السائلة، والغازية لنفس المادة.',
    imageUrl: 'https://images.unsplash.com/photo-1548685913-fe657433d7fe?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    materials: [
      { id: 'm1', name: 'مكعب ثلج', icon: 'ac_unit' },
      { id: 'm2', name: 'كأس ماء', icon: 'water' },
      { id: 'm3', name: 'وعاء تسخين', icon: 'heat_pump' }
    ],
    steps: [
      'لاحظ الثلج (حالة صلبة).',
      'اتركه يذوب ليصبح ماء (حالة سائلة).',
      'سخن الماء حتى يتصاعد البخار (حالة غازية).'
    ]
  },
  {
    id: 'y4-exp-2',
    portalId: 'year-4',
    title: 'انصهار الجليد',
    category: Category.Physics,
    unit: 'الحرارة',
    difficulty: 'سهل',
    duration: '15 دقيقة',
    description: 'تتبع عملية تحول المادة من الصلابة إلى السيولة بفعل الحرارة.',
    imageUrl: 'https://images.unsplash.com/photo-1516192535944-07fb50275917?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'مكعبات ثلج', icon: 'icecream' },
      { id: 'm2', name: 'ساعة إيقاف', icon: 'timer' }
    ],
    steps: [
      'ضع مكعب ثلج في درجة حرارة الغرفة.',
      'سجل الوقت اللازم لتحوله بالكامل إلى ماء.',
      'كرر التجربة تحت أشعة الشمس وقارن النتائج.'
    ]
  },
  {
    id: 'y4-exp-4',
    portalId: 'year-4',
    title: 'تجربة التبخر',
    category: Category.Chemistry,
    unit: 'المادة',
    difficulty: 'متوسط',
    duration: '30 دقيقة',
    description: 'لاحظ كيف يهرب الماء إلى الجو على شكل بخار غير مرئي.',
    imageUrl: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'وعاء ماء', icon: 'water' },
      { id: 'm2', name: 'موقد حراري', icon: 'fireplace' }
    ],
    steps: [
      'ضع كمية محددة من الماء في الوعاء.',
      'سخن الماء حتى الغليان.',
      'قس كمية الماء المتبقية بعد فترة ولاحظ النقصان.'
    ],
    safetyWarning: 'كن حذراً جداً عند التعامل مع الماء المغلي والموقد.'
  },
  {
    id: 'y4-exp-5',
    portalId: 'year-4',
    title: 'انتقال الحرارة',
    category: Category.Physics,
    unit: 'الحرارة',
    difficulty: 'متوسط',
    duration: '15 دقيقة',
    description: 'كيف تنتقل السخونة من جسم لآخر؟ استكشف التوصيل الحراري.',
    imageUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'ملعقة معدنية', icon: 'restaurant' },
      { id: 'm2', name: 'كوب ماء ساخن', icon: 'coffee' }
    ],
    steps: [
      'ضع الملعقة في كوب الماء الساخن.',
      'انتظر دقيقة ثم المس طرف الملعقة البعيد.',
      'لاحظ كيف انتقلت الحرارة عبر المعدن إلى يدك.'
    ]
  },
  {
    id: 'y4-exp-6',
    portalId: 'year-4',
    title: 'قوة المغناطيس',
    category: Category.Physics,
    unit: 'المغناطيسية',
    difficulty: 'سهل',
    duration: '15 دقيقة',
    description: 'استكشف المواد التي تنجذب للمغناطيس والقوى غير المرئية.',
    imageUrl: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'مغناطيس حذوة فرس', icon: 'join_inner' },
      { id: 'm2', name: 'مجموعة معادن وبلاستيك', icon: 'category' }
    ],
    steps: [
      'قرب المغناطيس من البلاستيك، خشب، ونحاس و حديد.',
      'حدد الأجسام التي انجذبت والأجسام التي لم تنجذب.',
      'جرب جذب الأشياء من خلف ورقة رقيقة.'
    ]
  },
  {
    id: 'y4-exp-7',
    portalId: 'year-4',
    title: 'انعكاس الضوء المتقدم',
    category: Category.Physics,
    unit: 'الضوء',
    difficulty: 'متوسط',
    duration: '20 دقيقة',
    description: 'تعمق في قوانين الانعكاس وكيف نرى الأشياء من حولنا.',
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b6a1?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'مرآتان', icon: 'flip' },
      { id: 'm2', name: 'شمعة (أو مصباح)', icon: 'light' }
    ],
    steps: [
      'ضع المرآتين بزاوية معينة.',
      'ضع الجسم بينهما ولاحظ تكرار الصور.',
      'غير الزاوية وشاهد كيف يتغير عدد الصور المنعكسة.'
    ]
  },
  {
    id: 'y4-exp-8',
    portalId: 'year-4',
    title: 'الظل ونصف الظل',
    category: Category.Physics,
    unit: 'الضوء',
    difficulty: 'متقدم',
    duration: '25 دقيقة',
    description: 'دراسة المناطق المظلمة تماماً والمناطق الأقل ظلمة خلف الأجسام.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    materials: [
      { id: 'm1', name: 'مصدر ضوء واسع', icon: 'wb_sunny' },
      { id: 'm2', name: 'كرة معتمة', icon: 'circle' }
    ],
    steps: [
      'لاحظ على الشاشة وجود منطقة سوداء (الظل) ومنطقة رمادية حولها (نصف الظل).',
      'حرك الكرة نحو الشاشة وشاهد الفرق.'
    ]
  },
  {
    id: 'y4-exp-9',
    portalId: 'year-4',
    title: 'الدائرة الكهربائية البسيطة',
    category: Category.Electricity,
    unit: 'الكهرباء',
    difficulty: 'متقدم',
    duration: '30 دقيقة',
    description: 'اصنع أول دائرة كهربائية لك لتضيء مصباحاً صغيراً.',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    materials: [
      { id: 'm1', name: 'بطارية 1.5 فولت', icon: 'battery_full' },
      { id: 'm2', name: 'مصباح صغير', icon: 'lightbulb' },
      { id: 'm3', name: 'أسلاك توصيل', icon: 'cable' },
      { id: 'm4', name: 'مفتاح كهربائي', icon: 'toggle_on' }
    ],
    steps: [
      'صل القطب الموجب للبطارية بالمفتاح عبر سلك.',
      'صل المفتاح بالمصباح، ثم صل المصباح بالقطب السالب.',
      'اغلق المفتاح وشاهد المصباح وهو يضيء.'
    ]
  }
];

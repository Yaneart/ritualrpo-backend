import { PrismaPg } from '@prisma/adapter-pg';
import { CalculatorGroupType, PrismaClient } from './generated/client';
import * as bcrypt from 'bcrypt';

async function main() {
  const adapter = new PrismaPg({
    connectionString: 'postgresql://postgres:5429558@localhost:5432/ritualrpo',
  });
  const prisma = new PrismaClient({ adapter });

  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@ritualrpo.ru' },
    update: {},
    create: {
      email: 'admin@ritualrpo.ru',
      password: adminPassword,
      name: 'Администратор',
    },
  });
  console.log('Админ создан');

  const services = [
    {
      slug: 'organizaciya-pohoron',
      title: 'Организация похорон',
      description:
        'Полный цикл организации — от оформления документов до проведения церемонии прощания.',
      fullText:
        'Мы берём на себя все этапы организации похорон: оформление необходимых документов, подготовка и проведение церемонии прощания, транспортировка, координация с кладбищем и моргом. Вы можете сосредоточиться на близких — всё остальное сделаем мы.',
      image: '/images/services/funeral.jpg',
      features: [
        'Оформление свидетельства о смерти',
        'Транспортировка',
        'Подготовка к прощанию',
        'Проведение церемонии',
        'Координация с кладбищем',
        'Поминальный обед',
      ],
      order: 1,
    },
    {
      slug: 'kremaciya',
      title: 'Кремация',
      description:
        'Организация кремации с соблюдением всех традиций и пожеланий семьи.',
      fullText:
        'Организуем кремацию в крематориях Санкт-Петербурга с полным сопровождением. Помогаем с выбором урны, проведением церемонии прощания перед кремацией и оформлением всех необходимых документов.',
      image: '/images/services/cremation.jpg',
      features: [
        'Церемония прощания',
        'Выбор урны',
        'Оформление документов',
        'Транспортировка',
        'Захоронение урны',
      ],
      order: 2,
    },
    {
      slug: 'ritualnye-tovary',
      title: 'Ритуальные товары',
      description:
        'Гробы, венки, цветы, траурные ленты и другие ритуальные принадлежности.',
      fullText:
        'Предлагаем широкий выбор ритуальных товаров: гробы из разных материалов, венки и корзины из живых и искусственных цветов, траурные ленты, покрывала и другие принадлежности. Поможем подобрать всё необходимое.',
      image: '/images/services/products.png',
      features: [
        'Гробы (дерево, МДФ, элитные)',
        'Венки и корзины',
        'Живые и искусственные цветы',
        'Траурные ленты',
        'Покрывала и подушки',
        'Траурная одежда',
      ],
      order: 3,
    },
    {
      slug: 'pamyatniki',
      title: 'Памятники и благоустройство',
      description:
        'Изготовление памятников, оград, благоустройство и уход за захоронениями.',
      fullText:
        'Изготавливаем памятники из гранита и мрамора по индивидуальным и типовым проектам. Выполняем благоустройство захоронений: установка оград, укладка плитки, озеленение. Предлагаем услуги по уходу за могилами.',
      image: '/images/services/monuments.jpg',
      features: [
        'Памятники из гранита и мрамора',
        'Гравировка портретов и надписей',
        'Ограды и цоколи',
        'Укладка плитки',
        'Озеленение',
        'Регулярный уход за захоронением',
      ],
      order: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log('Услуги созданы:', services.length);

  const categories = [
    { slug: 'groby', name: 'Гробы', order: 1 },
    { slug: 'venki', name: 'Венки', order: 2 },
    { slug: 'tsvety', name: 'Цветы', order: 3 },
    { slug: 'pamyatniki', name: 'Памятники', order: 4 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log('Категории созданы:', categories.length);

  const grobyCategory = await prisma.category.findUnique({
    where: { slug: 'groby' },
  });
  const venkiCategory = await prisma.category.findUnique({
    where: { slug: 'venki' },
  });
  const tsvetyCategory = await prisma.category.findUnique({
    where: { slug: 'tsvety' },
  });
  const pamyatnikiCategory = await prisma.category.findUnique({
    where: { slug: 'pamyatniki' },
  });

  const products = [
    {
      slug: 'grob-sosna-standart',
      name: 'Гроб сосна «Стандарт»',
      description:
        'Гроб из массива сосны с тканевой обивкой. Классическая форма.',
      price: 12000,
      image: '/images/products/grob-1.png',
      categoryId: grobyCategory!.id,
    },
    {
      slug: 'grob-dub-premium',
      name: 'Гроб дуб «Премиум»',
      description:
        'Гроб из массива дуба с лакированным покрытием и резным декором.',
      price: 45000,
      image: '/images/products/grob-2.png',
      categoryId: grobyCategory!.id,
    },
    {
      slug: 'venok-iz-zhivyh-roz',
      name: 'Венок из живых роз',
      description: 'Траурный венок из свежих роз с атласной лентой.',
      price: 8500,
      image: '/images/products/venok-1.png',
      categoryId: venkiCategory!.id,
    },
    {
      slug: 'venok-iskusstvennyy',
      name: 'Венок искусственный',
      description:
        'Венок из искусственных цветов. Долговечный, подходит для установки на могилу.',
      price: 3500,
      image: '/images/products/venok-2.png',
      categoryId: venkiCategory!.id,
    },
    {
      slug: 'bukety-zhivye-lilii',
      name: 'Букет живых лилий',
      description: 'Траурный букет из белых лилий.',
      price: 4500,
      image: '/images/products/tsvety-1.png',
      categoryId: tsvetyCategory!.id,
    },
    {
      slug: 'korzina-iz-hrizantem',
      name: 'Корзина из хризантем',
      description: 'Корзина из белых хризантем с зеленью.',
      price: 6000,
      image: '/images/products/tsvety-2.png',
      categoryId: tsvetyCategory!.id,
    },
    {
      slug: 'pamyatnik-granit-vertikalnyy',
      name: 'Памятник гранит вертикальный',
      description:
        'Памятник из чёрного гранита. Вертикальная стела с гравировкой.',
      price: 35000,
      image: '/images/products/pamyatnik-1.png',
      categoryId: pamyatnikiCategory!.id,
    },
    {
      slug: 'pamyatnik-mramor-krest',
      name: 'Памятник мрамор с крестом',
      description: 'Памятник из белого мрамора с резным крестом.',
      price: 55000,
      image: '/images/products/pamyatnik-2.png',
      categoryId: pamyatnikiCategory!.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log('Товары созданы:', products.length);

  const reviewsCount = await prisma.review.count();
  if (reviewsCount === 0) {
    await prisma.review.createMany({
      data: [
        {
          name: 'Елена М.',
          rating: 5,
          text: 'В самый тяжёлый момент они взяли всё на себя. Мы могли просто быть рядом с семьёй, не думая об организации.',
          isApproved: true,
        },
        {
          name: 'Андрей К.',
          rating: 5,
          text: 'Очень деликатное и профессиональное отношение. Всё было организовано достойно, именно так, как мы хотели.',
          isApproved: true,
        },
        {
          name: 'Ольга С.',
          rating: 5,
          text: 'Благодарим за круглосуточную поддержку. Позвонили ночью — приехали через 40 минут. Помогли с документами и всей организацией.',
          isApproved: true,
        },
      ],
    });
    console.log('Отзывы созданы: 3');
  } else {
    console.log('Отзывы уже есть, пропуск:', reviewsCount);
  }

  const faqCount = await prisma.faq.count();
  if (faqCount === 0) {
    await prisma.faq.createMany({
      data: [
        {
          question: 'Что делать в первую очередь при потере близкого?',
          answer:
            'Позвоните нам по номеру +7 (812) 660-51-51. Мы работаем круглосуточно и подскажем все необходимые шаги. Наш специалист приедет в течение часа и возьмёт на себя оформление документов и организацию.',
          order: 1,
        },
        {
          question: 'Какие документы нужны для организации похорон?',
          answer:
            'Паспорт умершего и паспорт заявителя. Медицинское свидетельство о смерти выдаётся в больнице или морге. Мы помогаем оформить гербовое свидетельство о смерти в ЗАГСе и все остальные документы.',
          order: 2,
        },
        {
          question: 'Сколько стоят ваши услуги?',
          answer:
            'Стоимость зависит от выбранных услуг. Мы предлагаем готовые пакеты от 35 000 рублей, а также индивидуальный подбор. Финальную сумму вы узнаете до начала работы — никаких скрытых наценок.',
          order: 3,
        },
        {
          question: 'Вы работаете ночью и в выходные?',
          answer:
            'Да, мы работаем 24 часа в сутки, 7 дней в неделю, включая праздничные дни. Звоните в любое время.',
          order: 4,
        },
        {
          question: 'Можно ли организовать кремацию?',
          answer:
            'Да, мы организуем кремацию в крематориях Санкт-Петербурга. Помогаем с выбором урны, проведением церемонии прощания и оформлением всех документов.',
          order: 5,
        },
      ],
    });
    console.log('FAQ созданы: 5');
  } else {
    console.log('FAQ уже есть, пропуск:', faqCount);
  }

  const calculatorServiceTypes = [
    {
      slug: 'funeral',
      title: 'Организация похорон',
      description: 'Полный цикл — документы, церемония, транспортировка',
      basePrice: 25000,
      order: 1,
    },
    {
      slug: 'cremation',
      title: 'Кремация',
      description: 'Кремация с церемонией прощания и оформлением',
      basePrice: 20000,
      order: 2,
    },
  ];

  for (const serviceType of calculatorServiceTypes) {
    await prisma.calculatorServiceType.upsert({
      where: { slug: serviceType.slug },
      update: serviceType,
      create: serviceType,
    });
  }
  console.log(
    'Типы услуг калькулятора созданы:',
    calculatorServiceTypes.length,
  );

  const calculatorGroups = [
    {
      slug: 'coffin',
      title: 'Гроб',
      type: CalculatorGroupType.required,
      order: 1,
    },
    {
      slug: 'transport',
      title: 'Транспорт',
      type: CalculatorGroupType.required,
      order: 2,
    },
    {
      slug: 'farewell',
      title: 'Зал прощания',
      type: CalculatorGroupType.required,
      order: 3,
    },
    {
      slug: 'flowers',
      title: 'Венки и цветы',
      type: CalculatorGroupType.extra,
      order: 1,
    },
    {
      slug: 'ceremony',
      title: 'Церемония',
      type: CalculatorGroupType.extra,
      order: 2,
    },
    {
      slug: 'other',
      title: 'Прочее',
      type: CalculatorGroupType.extra,
      order: 3,
    },
  ];

  for (const group of calculatorGroups) {
    await prisma.calculatorGroup.upsert({
      where: { slug: group.slug },
      update: group,
      create: group,
    });
  }
  console.log('Группы калькулятора созданы:', calculatorGroups.length);

  const coffinGroup = await prisma.calculatorGroup.findUnique({
    where: { slug: 'coffin' },
  });
  const transportGroup = await prisma.calculatorGroup.findUnique({
    where: { slug: 'transport' },
  });
  const farewellGroup = await prisma.calculatorGroup.findUnique({
    where: { slug: 'farewell' },
  });
  const flowersGroup = await prisma.calculatorGroup.findUnique({
    where: { slug: 'flowers' },
  });
  const ceremonyGroup = await prisma.calculatorGroup.findUnique({
    where: { slug: 'ceremony' },
  });
  const otherGroup = await prisma.calculatorGroup.findUnique({
    where: { slug: 'other' },
  });

  const calculatorOptions = [
    {
      slug: 'coffin-economy',
      title: 'Гроб «Эконом» (ДСП)',
      price: 6000,
      order: 1,
      groupId: coffinGroup!.id,
    },
    {
      slug: 'coffin-standard',
      title: 'Гроб «Стандарт» (сосна)',
      price: 12000,
      order: 2,
      groupId: coffinGroup!.id,
    },
    {
      slug: 'coffin-premium',
      title: 'Гроб «Премиум» (дуб)',
      price: 45000,
      order: 3,
      groupId: coffinGroup!.id,
    },
    {
      slug: 'coffin-elite',
      title: 'Гроб «Элитный» (лакированный дуб)',
      price: 80000,
      order: 4,
      groupId: coffinGroup!.id,
    },

    {
      slug: 'transport-standard',
      title: 'Катафалк (ГАЗель)',
      price: 5000,
      order: 1,
      groupId: transportGroup!.id,
    },
    {
      slug: 'transport-comfort',
      title: 'Катафалк (Mercedes)',
      price: 12000,
      order: 2,
      groupId: transportGroup!.id,
    },

    {
      slug: 'farewell-basic',
      title: 'Зал стандарт (1 час)',
      price: 5000,
      order: 1,
      groupId: farewellGroup!.id,
    },
    {
      slug: 'farewell-extended',
      title: 'Зал расширенный (2 часа)',
      price: 9000,
      order: 2,
      groupId: farewellGroup!.id,
    },
    {
      slug: 'farewell-vip',
      title: 'VIP-зал (3 часа)',
      price: 18000,
      order: 3,
      groupId: farewellGroup!.id,
    },

    {
      slug: 'wreath-fresh',
      title: 'Венок из живых роз',
      price: 8500,
      order: 1,
      groupId: flowersGroup!.id,
    },
    {
      slug: 'wreath-artificial',
      title: 'Венок искусственный',
      price: 3500,
      order: 2,
      groupId: flowersGroup!.id,
    },
    {
      slug: 'flowers-lilies',
      title: 'Букет живых лилий',
      price: 4500,
      order: 3,
      groupId: flowersGroup!.id,
    },
    {
      slug: 'flowers-basket',
      title: 'Корзина из хризантем',
      price: 6000,
      order: 4,
      groupId: flowersGroup!.id,
    },

    {
      slug: 'photo-video',
      title: 'Фото/видеосъёмка',
      price: 7000,
      order: 1,
      groupId: ceremonyGroup!.id,
    },
    {
      slug: 'music',
      title: 'Музыкальное сопровождение',
      price: 5000,
      order: 2,
      groupId: ceremonyGroup!.id,
    },
    {
      slug: 'memorial-dinner',
      title: 'Поминальный обед (10 чел.)',
      price: 15000,
      order: 3,
      groupId: ceremonyGroup!.id,
    },

    {
      slug: 'documents',
      title: 'Оформление документов',
      price: 3000,
      order: 1,
      groupId: otherGroup!.id,
    },
    {
      slug: 'clothing',
      title: 'Комплект траурной одежды',
      price: 8000,
      order: 2,
      groupId: otherGroup!.id,
    },
    {
      slug: 'grave-care',
      title: 'Уход за захоронением (1 год)',
      price: 12000,
      order: 3,
      groupId: otherGroup!.id,
    },
  ];

  for (const option of calculatorOptions) {
    await prisma.calculatorOption.upsert({
      where: { slug: option.slug },
      update: option,
      create: option,
    });
  }
  console.log('Опции калькулятора созданы:', calculatorOptions.length);

  await prisma.$disconnect();
  console.log('Seed завершён!');
}

main();

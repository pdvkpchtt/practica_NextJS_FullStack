"use server";

import { prisma } from "../../db";

var CompanyIndustry = [
  { label: "Агентство" },
  { label: "Госсектор" },
  { label: "Добыча сырья" },
  { label: "Еда" },
  { label: "ЖКХ" },
  { label: "Информационные технологии" },
  { label: "Искусство и культура" },
  { label: "Консалтинг" },
  { label: "Космос" },
  { label: "Культура" },
  { label: "Логистика" },
  { label: "Маркетинг и реклама" },
  { label: "Медиа" },
  { label: "Медицина" },
  { label: "Металлургия" },
  { label: "Наука" },
  { label: "Недвижимость" },
  { label: "Нефть и газ" },
  { label: "Образование" },
  { label: "Право" },
  { label: "Продукты питания" },
  { label: "Производство" },
  { label: "Промышленное оборудование" },
  { label: "Ритейл" },
  { label: "Сельское хозяйство" },
  { label: "Сервис и услуги" },
  { label: "Строительство" },
  { label: "Телекоммуникации" },
  { label: "Технологии" },
  { label: "Транспорт" },
  { label: "Управление многопрофильными активами" },
  { label: "Услуги для бизнеса" },
  { label: "Услуги для населения" },
  { label: "Финансовый сектор" },
  { label: "Химическое производство" },
  { label: "Электроника" },
  { label: "Энергетика" },
  { label: "E-commerce" },
  { label: "Gamedev" },
];

var experience = [
  { text: "Нет опыта" },
  { text: "До 1 года" },
  { text: "От 1 года до 3 лет" },
  { text: "От 3 до 6 лет" },
  { text: "Более 6 лет" },
];

var educationLevel = [
  { text: "Не требуется или не указано" },
  { text: "Среднее профессиональное" },
  { text: "Высшее" },
];

var format = [
  { text: "Полная занятость " },
  { text: "Частичная занятость " },
  { text: "Проектная работа/разовое задание " },
  { text: "Волонтерство " },
  { text: "Стажировка" },
  { text: "Полный день " },
  { text: "Сменный график " },
  { text: "Гибкий график " },
  { text: "Удаленная работа " },
  { text: "Вахтовый метод" },
];

var softSkills = [
  { name: "Agile", type: "soft" },
  { name: "Scrum", type: "soft" },
  { name: "Тайм-менеджмент", type: "soft" },
  { name: "Умение слушать", type: "soft" },
  { name: "Давать обратную связь", type: "soft" },
  { name: "Презентация", type: "soft" },
  { name: "Работа в команде", type: "soft" },
  { name: "Гибкость", type: "soft" },
  { name: "Упорство", type: "soft" },
  { name: "Коммуникативность", type: "soft" },
  { name: "Работа в команде", type: "soft" },
  { name: "Навык убеждения", type: "soft" },
  { name: "Креативность", type: "soft" },
  { name: "Аналитические навыки", type: "soft" },
  { name: "Решение проблем", type: "soft" },
  { name: "Коммуникация", type: "soft" },
  { name: "Тайм-менеджмент", type: "soft" },
  { name: "Работа в команде", type: "soft" },
  { name: "Гибкость", type: "soft" },
  { name: "Упорство", type: "soft" },
  { name: "Технические навыки", type: "soft" },
  { name: "Аналитическое мышление", type: "soft" },
  { name: "Системное мышление", type: "soft" },
  { name: "Публичные выступления", type: "soft" },
  { name: "Аналитическое мышление", type: "soft" },
  { name: "Обучение и развитие", type: "soft" },
  { name: "Сотрудничество", type: "soft" },
  { name: "Ведение переговоров", type: "soft" },
  { name: "Управление рисками", type: "soft" },
  { name: "Работа в команде", type: "soft" },
  { name: "Аналитическое мышление", type: "soft" },
  { name: "Публичные выступления", type: "soft" },
  { name: "Тайм-менеджмент", type: "soft" },
  { name: "Управление рисками", type: "soft" },
  { name: "Решение проблем", type: "soft" },
  { name: "Аналитическое мышление", type: "soft" },
  { name: "Коммуникация", type: "soft" },
  { name: "Сотрудничество", type: "soft" },
  { name: "Гибкость", type: "soft" },
];

var AIHardSkills = [
  { name: "NumPy", type: "hard" },
  { name: "Adobe Firefly", type: "hard" },
  { name: "Kandinsky", type: "hard" },
  { name: "Pandas", type: "hard" },
  { name: "EDA", type: "hard" },
  { name: "Heroku", type: "hard" },
  { name: "Dall-E", type: "hard" },
  { name: "SDXL Dreamstudio", type: "hard" },
  { name: "ML", type: "hard" },
  { name: "Deep Learning", type: "hard" },
  { name: "Deep Engineering", type: "hard" },
  { name: "Midjourney", type: "hard" },
  { name: "OpenAI", type: "hard" },
  { name: "Stable Diffusion", type: "hard" },
  { name: "vizcom", type: "hard" },
  { name: "Hugging Face", type: "hard" },
  { name: "Wonder Dynamics", type: "hard" },
];

var designHardSkills = [
  { name: "Брендинг", type: "hard", areaId: "clnybwcxk00029rpk04o4zl5g" },
  { name: "Adobe XD", type: "hard", areaId: "clnybwcxk00029rpk04o4zl5g" },
  {
    name: "Adobe Illustrator",
    type: "hard",
    areaId: "clnybwcxk00029rpk04o4zl5g",
  },
  { name: "Figma", type: "hard", areaId: "clnybwcxk00029rpk04o4zl5g" },
  {
    name: "Дизайн интерьеров",
    type: "hard",
    areaId: "clnybwcxk00029rpk04o4zl5g",
  },
  {
    name: "Дизайнер логотипов",
    type: "hard",
    areaId: "clnybwcxk00029rpk04o4zl5g",
  },
  {
    name: "Дизайн полиграфии",
    type: "hard",
    areaId: "clnybwcxk00029rpk04o4zl5g",
  },
  { name: "Иллюстрация", type: "hard", areaId: "clnybwcxk00029rpk04o4zl5g" },
  {
    name: "Фирменный стиль",
    type: "hard",
    areaId: "clnybwcxk00029rpk04o4zl5g",
  },
];

var marketingSkills = [
  {
    name: "Google analytics",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  { name: "Яндекс метрика", type: "hard", areaId: "clnybwcxj00019rpkcxfp3nue" },
  { name: "SEO", type: "hard", areaId: "clnybwcxj00019rpkcxfp3nue" },
  { name: "SMM", type: "hard", areaId: "clnybwcxj00019rpkcxfp3nue" },
  {
    name: "Сегментирование ЦА",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  {
    name: "Медиапланирование",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  {
    name: "Анализ конкурентов",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  {
    name: "Управление брендом",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  {
    name: "Написание статей",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  {
    name: "Проектное управление",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  {
    name: "Командное управление",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  {
    name: "Работа с текстом",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
  {
    name: "Маркетинговая стратегия",
    type: "hard",
    areaId: "clnybwcxj00019rpkcxfp3nue",
  },
];

var buildingHardSkills = [
  { name: "Чертежи", type: "hard", areaId: "clnyd0qfh000h9rio29ej65gd" },
  {
    name: "Строительные материалы",
    type: "hard",
    areaId: "clnyd0qfh000h9rio29ej65gd",
  },
  {
    name: "Строительные технологии",
    type: "hard",
    areaId: "clnyd0qfh000h9rio29ej65gd",
  },
  {
    name: "Строительные работы",
    type: "hard",
    areaId: "clnyd0qfh000h9rio29ej65gd",
  },
  {
    name: "Инструменты и оборудование",
    type: "hard",
    areaId: "clnyd0qfh000h9rio29ej65gd",
  },
  {
    name: "Управление проектами",
    type: "hard",
    areaId: "clnyd0qfh000h9rio29ej65gd",
  },
  {
    name: "Строительные нормы",
    type: "hard",
    areaId: "clnyd0qfh000h9rio29ej65gd",
  },
  { name: "Расчеты", type: "hard", areaId: "clnyd0qfh000h9rio29ej65gd" },
  { name: "Измерения", type: "hard", areaId: "clnyd0qfh000h9rio29ej65gd" },
];

var devHardSkills = [
  { name: "C", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "C#", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "C++", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "CSS", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "D", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Dart", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Django", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Docker", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Flask", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Flutter", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Go", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "HTML", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Haskell", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Haxe", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Java", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "JavaScript", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Julia", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Kotlin", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Linux", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "MySQL", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "MySQL", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Node.js", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Oracle", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "PHP", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "PostgreSQL", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Python", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "React", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Ruby", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Rust", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "SQL", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: "Swift", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
  { name: ".net", type: "hard", areaId: "clnyc4ld100019rioytdvg2g1" },
];

var rosnTradingHardSkills = [
  {
    name: "Обслуживание клиентов",
    type: "hard",
    areaId: "clnyc4ld4000f9riozocxfqij",
  },
  {
    name: "Управление запасами",
    type: "hard",
    areaId: "clnyc4ld4000f9riozocxfqij",
  },
  { name: "Инвентаризация", type: "hard", areaId: "clnyc4ld4000f9riozocxfqij" },
  { name: "Витринистика", type: "hard", areaId: "clnyc4ld4000f9riozocxfqij" },
  { name: "Мерчандайзинг", type: "hard", areaId: "clnyc4ld4000f9riozocxfqij" },
  {
    name: "Кассовое оборудование",
    type: "hard",
    areaId: "clnyc4ld4000f9riozocxfqij",
  },
  {
    name: "Товарный анализ",
    type: "hard",
    areaId: "clnyc4ld4000f9riozocxfqij",
  },
  {
    name: "Планирование ассортимента",
    type: "hard",
    areaId: "clnyc4ld4000f9riozocxfqij",
  },
  { name: "Маркетинг", type: "hard", areaId: "clnyc4ld4000f9riozocxfqij" },
];

var contentHardSkills = [
  { name: "SMM", type: "hard", areaId: "clnyc4ld200049rio9xuzls39" },
  { name: "Копирайтинг", type: "hard", areaId: "clnyc4ld200049rio9xuzls39" },
  { name: "Коучинг", type: "hard", areaId: "clnyc4ld200049rio9xuzls39" },
  {
    name: "Редактура и корректура",
    type: "hard",
    areaId: "clnyc4ld200049rio9xuzls39",
  },
  {
    name: "Рекламные креативы",
    type: "hard",
    areaId: "clnyc4ld200049rio9xuzls39",
  },
  { name: "Текст в UI", type: "hard", areaId: "clnyc4ld200049rio9xuzls39" },
  {
    name: "Технический перевод",
    type: "hard",
    areaId: "clnyc4ld200049rio9xuzls39",
  },
];

var managmentHardSkills = [
  { name: "CustDev", type: "hard", areaId: "clnyc4ld200069rios8ojv3ys" },
  { name: "Разработка ТЗ", type: "hard", areaId: "clnyc4ld200069rios8ojv3ys" },
  {
    name: "Управление продуктами",
    type: "hard",
    areaId: "clnyc4ld200069rios8ojv3ys",
  },
  {
    name: "Управление проектами",
    type: "hard",
    areaId: "clnyc4ld200069rios8ojv3ys",
  },
  {
    name: "Управление рисками",
    type: "hard",
    areaId: "clnyc4ld200069rios8ojv3ys",
  },
];

var analHardSkills = [
  { name: "BPMN", type: "hard", areaId: "clnyc4ld200079rioo3te33y7" },
  { name: "Python", type: "hard", areaId: "clnyc4ld200079rioo3te33y7" },
  { name: "SQL", type: "hard", areaId: "clnyc4ld200079rioo3te33y7" },
  { name: "Excel", type: "hard", areaId: "clnyc4ld200079rioo3te33y7" },
  { name: "Анализ данных", type: "hard", areaId: "clnyc4ld200079rioo3te33y7" },
  { name: "Анализ рынка", type: "hard", areaId: "clnyc4ld200079rioo3te33y7" },
  {
    name: "Английский язык",
    type: "hard",
    areaId: "clnyc4ld200079rioo3te33y7",
  },
];

var mediaHardSkills = [
  { name: "Журналистика", type: "hard", areaId: "clnyc4ld200089rioe1w7e4ev" },
  { name: "Репортаж", type: "hard", areaId: "clnyc4ld200089rioe1w7e4ev" },
  { name: "Фотография", type: "hard", areaId: "clnyc4ld200089rioe1w7e4ev" },
  { name: "Видеосъемка", type: "hard", areaId: "clnyc4ld200089rioe1w7e4ev" },
  {
    name: "Графический дизайн",
    type: "hard",
    areaId: "clnyc4ld200089rioe1w7e4ev",
  },
  {
    name: "Социальные сети",
    type: "hard",
    areaId: "clnyc4ld200089rioe1w7e4ev",
  },
  { name: "SEO", type: "hard", areaId: "clnyc4ld200089rioe1w7e4ev" },
  { name: "Копирайтинг", type: "hard", areaId: "clnyc4ld200089rioe1w7e4ev" },
  {
    name: "Контент-маркетинг",
    type: "hard",
    areaId: "clnyc4ld200089rioe1w7e4ev",
  },
  {
    name: "Проектное управление",
    type: "hard",
    areaId: "clnyc4ld200089rioe1w7e4ev",
  },
  {
    name: "Медиапланирование",
    type: "hard",
    areaId: "clnyc4ld200089rioe1w7e4ev",
  },
  {
    name: "Медиа-презентации",
    type: "hard",
    areaId: "clnyc4ld200089rioe1w7e4ev",
  },
];

var auditHardSkills = [
  {
    name: "Аудит HR бренда",
    type: "hard",
    areaId: "clnyc4ld3000d9riojjrimpa5",
  },
  {
    name: "Аудит безопасности",
    type: "hard",
    areaId: "clnyc4ld3000d9riojjrimpa5",
  },
  {
    name: "Аудит персонала",
    type: "hard",
    areaId: "clnyc4ld3000d9riojjrimpa5",
  },
  {
    name: "Бухгалтерский учет",
    type: "hard",
    areaId: "clnyc4ld3000d9riojjrimpa5",
  },
  {
    name: "Внутренний аудит",
    type: "hard",
    areaId: "clnyc4ld3000d9riojjrimpa5",
  },
  {
    name: "Налоговая отчетность",
    type: "hard",
    areaId: "clnyc4ld3000d9riojjrimpa5",
  },
  { name: "Статистика", type: "hard", areaId: "clnyc4ld3000d9riojjrimpa5" },
];

var hrHardSkills = [
  { name: "HR-стратегия", type: "hard", areaId: "clnyc4ld3000e9rio18hvm4kx" },
  { name: "Грейдинг", type: "hard", areaId: "clnyc4ld3000e9rio18hvm4kx" },
  {
    name: "Оценка персонала",
    type: "hard",
    areaId: "clnyc4ld3000e9rio18hvm4kx",
  },
  {
    name: "Подбор персонала",
    type: "hard",
    areaId: "clnyc4ld3000e9rio18hvm4kx",
  },
  { name: "Проведение ТИ", type: "hard", areaId: "clnyc4ld3000e9rio18hvm4kx" },
];

var salesHardSkills = [
  { name: "B2B продажи", type: "hard", areaId: "clnyc4ld3000a9riobxyoa80c" },
  { name: "CRM", type: "hard", areaId: "clnyc4ld3000a9riobxyoa80c" },
  {
    name: "Активные продажи",
    type: "hard",
    areaId: "clnyc4ld3000a9riobxyoa80c",
  },
  {
    name: "Консультирование",
    type: "hard",
    areaId: "clnyc4ld3000a9riobxyoa80c",
  },
  { name: "Юриспруденция", type: "hard", areaId: "clnyc4ld3000a9riobxyoa80c" },
  { name: "Прямые продажи", type: "hard", areaId: "clnyc4ld3000a9riobxyoa80c" },
  {
    name: "Холодные продажи",
    type: "hard",
    areaId: "clnyc4ld3000a9riobxyoa80c",
  },
];

var oilandgasHardSkills = [
  {
    name: "Технические знания",
    type: "hard",
    areaId: "clnyc4ld100029rio27lmibre",
  },
  { name: "Оборудование", type: "hard", areaId: "clnyc4ld100029rio27lmibre" },
  { name: "Безопасность", type: "hard", areaId: "clnyc4ld100029rio27lmibre" },
  {
    name: "Проектное управление",
    type: "hard",
    areaId: "clnyc4ld100029rio27lmibre",
  },
  { name: "Контроль", type: "hard", areaId: "clnyc4ld100029rio27lmibre" },
];

var gamedevHardSkills = [
  { name: "DirectX", type: "hard", areaId: "clnyc4ld3000c9rioeyecpbhy" },
  { name: "GLSL", type: "hard", areaId: "clnyc4ld3000c9rioeyecpbhy" },
  { name: "OpenGL", type: "hard", areaId: "clnyc4ld3000c9rioeyecpbhy" },
  { name: "Unity3D", type: "hard", areaId: "clnyc4ld3000c9rioeyecpbhy" },
  {
    name: "3D-моделирование",
    type: "hard",
    areaId: "clnyc4ld3000c9rioeyecpbhy",
  },
  { name: "Unreal Engine", type: "hard", areaId: "clnyc4ld3000c9rioeyecpbhy" },
  { name: "Шейдеры", type: "hard", areaId: "clnyc4ld3000c9rioeyecpbhy" },
  {
    name: "Звуковой дизайн",
    type: "hard",
    areaId: "clnyc4ld3000c9rioeyecpbhy",
  },
];

var rightHardSkills = [
  {
    name: "Гражданское право",
    type: "hard",
    areaId: "clnyc4ld100039riofqwi91sh",
  },
  {
    name: "Защита прав потребителей",
    type: "hard",
    areaId: "clnyc4ld100039riofqwi91sh",
  },
  {
    name: "Земельное право",
    type: "hard",
    areaId: "clnyc4ld100039riofqwi91sh",
  },
  {
    name: "Корпоративное право",
    type: "hard",
    areaId: "clnyc4ld100039riofqwi91sh",
  },
  { name: "Семейное право", type: "hard", areaId: "clnyc4ld100039riofqwi91sh" },
  { name: "Трудовое право", type: "hard", areaId: "clnyc4ld100039riofqwi91sh" },
  {
    name: "Уголовное право",
    type: "hard",
    areaId: "clnyc4ld100039riofqwi91sh",
  },
];

var prHardSkills = [
  {
    name: "Деловая переписка",
    type: "hard",
    areaId: "clnyc4ld200099rioxzlzsw2o",
  },
  { name: "Копирайтинг", type: "hard", areaId: "clnyc4ld200099rioxzlzsw2o" },
  {
    name: "Медиапланирование",
    type: "hard",
    areaId: "clnyc4ld200099rioxzlzsw2o",
  },
  {
    name: "Проведение презентаций",
    type: "hard",
    areaId: "clnyc4ld200099rioxzlzsw2o",
  },
];

var consultHardSkills = [
  {
    name: "Бизнес-процессы",
    type: "hard",
    areaId: "clnyc4ld4000g9riotwwg34qi",
  },
  {
    name: "Стратегический консалтинг",
    type: "hard",
    areaId: "clnyc4ld4000g9riotwwg34qi",
  },
  { name: "Технологии", type: "hard", areaId: "clnyc4ld4000g9riotwwg34qi" },
  { name: "Управление", type: "hard", areaId: "clnyc4ld4000g9riotwwg34qi" },
  { name: "Финансы", type: "hard", areaId: "clnyc4ld4000g9riotwwg34qi" },
  { name: "Экономика", type: "hard", areaId: "clnyc4ld4000g9riotwwg34qi" },
  { name: "Юриспруденция", type: "hard", areaId: "clnyc4ld4000g9riotwwg34qi" },
];

var logisticHardSkills = [
  { name: "Цепи поставок", type: "hard", areaId: "clnyc4ld3000b9rio4hzewreo" },
  { name: "Координация", type: "hard", areaId: "clnyc4ld3000b9rio4hzewreo" },
  { name: "Синхронизация", type: "hard", areaId: "clnyc4ld3000b9rio4hzewreo" },
  { name: "Планирование", type: "hard", areaId: "clnyc4ld3000b9rio4hzewreo" },
  { name: "Оптимизация", type: "hard", areaId: "clnyc4ld3000b9rio4hzewreo" },
  {
    name: "Управление складом",
    type: "hard",
    areaId: "clnyc4ld3000b9rio4hzewreo",
  },
  { name: "Инвентаризация", type: "hard", areaId: "clnyc4ld3000b9rio4hzewreo" },
  { name: "Транспорт", type: "hard", areaId: "clnyc4ld3000b9rio4hzewreo" },
  { name: "Перевозки", type: "hard", areaId: "clnyc4ld3000b9rio4hzewreo" },
  {
    name: "Техническая осведомленность",
    type: "hard",
    areaId: "clnyc4ld3000b9rio4hzewreo",
  },
];

var supportHardSkills = [
  {
    name: "Active Directory",
    type: "hard",
    areaId: "clnyc4ld200059rio5hpchfqi",
  },
  { name: "Helpdesk", type: "hard", areaId: "clnyc4ld200059rio5hpchfqi" },
  { name: "CRM", type: "hard", areaId: "clnyc4ld200059rio5hpchfqi" },
  { name: "Мини-АТС", type: "hard", areaId: "clnyc4ld200059rio5hpchfqi" },
  {
    name: "Многозадачность",
    type: "hard",
    areaId: "clnyc4ld200059rio5hpchfqi",
  },
  { name: "Настройка ПО", type: "hard", areaId: "clnyc4ld200059rio5hpchfqi" },
  {
    name: "Офисная техника",
    type: "hard",
    areaId: "clnyc4ld200059rio5hpchfqi",
  },
];

var finacesHardSkills = [
  {
    name: "1С: Бухгалтерия",
    type: "hard",
    areaId: "clnyc4ld100009rios6vxx0vb",
  },
  {
    name: "1С: Предприятие 8",
    type: "hard",
    areaId: "clnyc4ld100009rios6vxx0vb",
  },
  { name: "Инвестиции", type: "hard", areaId: "clnyc4ld100009rios6vxx0vb" },
  {
    name: "Управление бюджетом",
    type: "hard",
    areaId: "clnyc4ld100009rios6vxx0vb",
  },
  {
    name: "Управленческий учет",
    type: "hard",
    areaId: "clnyc4ld100009rios6vxx0vb",
  },
  {
    name: "Финансовый анализ",
    type: "hard",
    areaId: "clnyc4ld100009rios6vxx0vb",
  },
  {
    name: "Налоговое планирование",
    type: "hard",
    areaId: "clnyc4ld100009rios6vxx0vb",
  },
  {
    name: "Формирование бюджета",
    type: "hard",
    areaId: "clnyc4ld100009rios6vxx0vb",
  },
  {
    name: "Экономический анализ",
    type: "hard",
    areaId: "clnyc4ld100009rios6vxx0vb",
  },
];

export const insertMediatHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...mediaHardSkills],
  });
};

export const insertAuditHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...auditHardSkills],
  });
};

export const insertHRHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...hrHardSkills],
  });
};

export const insertSalesHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...salesHardSkills],
  });
};

export const insertOILGASHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...oilandgasHardSkills],
  });
};

export const insertGameDevHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...gamedevHardSkills],
  });
};

export const insertRightHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...rightHardSkills],
  });
};

export const insertPRHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...prHardSkills],
  });
};

export const insertConsultingHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...consultHardSkills],
  });
};

export const insertSupportHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...supportHardSkills],
  });
};

export const insertLogisticHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...logisticHardSkills],
  });
};

export const insertFinancesHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...finacesHardSkills],
  });
};

////////////////////////////////

export const insertCompanyIndustry = async () => {
  const asa = await prisma.CompanyIndustry.createMany({
    data: [...CompanyIndustry],
  });
};

export const insertSoftSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...softSkills],
  });
};

export const insertManagmentHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...managmentHardSkills],
  });
};

export const insertAnaltHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...analHardSkills],
  });
};

export const insertContentHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...contentHardSkills],
  });
};

export const insertRosnTradingHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...rosnTradingHardSkills],
  });
};

export const insertDevHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...devHardSkills],
  });
};

export const insertAiHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...AIHardSkills],
  });
};

export const insertBuildingHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...buildingHardSkills],
  });
};

export const insertDesignHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...designHardSkills],
  });
};

export const insertMarketingHardSkills = async () => {
  const asa = await prisma.skill.createMany({
    data: [...marketingSkills],
  });
};

export const insertExperience = async () => {
  const asa = await prisma.experience.createMany({
    data: [...experience],
  });
};

export const insertEducationLevel = async () => {
  const asa = await prisma.EducationLevel.createMany({
    data: [...educationLevel],
  });
};

export const insertFormat = async () => {
  const asa = await prisma.Format.createMany({
    data: [...format],
  });
};

import { siteInfoType } from '@/types/siteInfoTypes'
import { skillsType } from '@/types/skillsTypes'

/**
 * Yetenekler için mock data
 */
export const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express', level: 70 },
      { name: 'MongoDB', level: 65 },
      { name: 'Firebase', level: 80 },
      { name: 'REST API', level: 85 },
      { name: 'GraphQL', level: 70 },
    ],
  },
  {
    category: 'Araçlar & Diğer',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'Webpack', level: 75 },
      { name: 'Docker', level: 60 },
      { name: 'Jest', level: 70 },
      { name: 'Figma', level: 80 },
      { name: 'Responsive Design', level: 95 },
    ],
  },
]

/**
 * Projeler için mock data
 */
export const projectsData = [
  {
    id: 1,
    title: 'E-Ticaret Platformu',
    description:
      'Modern bir e-ticaret platformu. Next.js, React, Tailwind CSS ve Stripe entegrasyonu ile geliştirildi.',
    image: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Stripe'],
    demoUrl: 'https://ecommerce-demo.next.huseyindol.site',
    codeUrl: 'https://github.com/huseyindol/ecommerce-platform',
    category: 'web',
  },
  {
    id: 2,
    title: 'Blog & Portfolio',
    description:
      'Kişisel blog ve portfolio sitesi. Next.js, MDX ve Tailwind CSS ile geliştirildi.',
    image: '/projects/blog.jpg',
    tags: ['Next.js', 'MDX', 'Tailwind CSS'],
    demoUrl: 'https://blog-demo.next.huseyindol.site',
    codeUrl: 'https://github.com/huseyindol/blog-portfolio',
    category: 'web',
  },
  {
    id: 3,
    title: 'Task Manager',
    description:
      'Görev yönetim uygulaması. React, Redux ve Firebase ile geliştirildi.',
    image: '/projects/taskmanager.jpg',
    tags: ['React', 'Redux', 'Firebase'],
    demoUrl: 'https://taskmanager-demo.next.huseyindol.site',
    codeUrl: 'https://github.com/huseyindol/task-manager',
    category: 'app',
  },
  {
    id: 4,
    title: 'Weather App',
    description:
      'Hava durumu uygulaması. React, OpenWeather API ve Tailwind CSS ile geliştirildi.',
    image: '/projects/weather.jpg',
    tags: ['React', 'API', 'Tailwind CSS'],
    demoUrl: 'https://weather-demo.next.huseyindol.site',
    codeUrl: 'https://github.com/huseyindol/weather-app',
    category: 'app',
  },
  {
    id: 5,
    title: 'Restaurant Website',
    description:
      'Restoran web sitesi. HTML, CSS, JavaScript ve GSAP animasyonları ile geliştirildi.',
    image: '/projects/restaurant.jpg',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    demoUrl: 'https://restaurant-demo.next.huseyindol.site',
    codeUrl: 'https://github.com/huseyindol/restaurant-website',
    category: 'web',
  },
  {
    id: 6,
    title: 'Chat Application',
    description:
      'Gerçek zamanlı sohbet uygulaması. React, Socket.io ve Node.js ile geliştirildi.',
    image: '/projects/chat.jpg',
    tags: ['React', 'Socket.io', 'Node.js'],
    demoUrl: 'https://chat-demo.next.huseyindol.site',
    codeUrl: 'https://github.com/huseyindol/chat-app',
    category: 'app',
  },
]

/**
 * Kişisel bilgiler için mock data
 */
export const personalData = {
  name: 'Hüseyin DOL',
  title: 'Frontend Developer',
  email: 'info@next.huseyindol.site',
  location: 'İstanbul, Türkiye',
  bio: 'Modern ve kullanıcı dostu web uygulamaları geliştiren tutkulu bir frontend geliştirici. React, Next.js ve modern web teknolojileri konusunda uzmanım.',
  longBio:
    '5+ yıllık deneyimimle, React ve Next.js ekosisteminde uzmanlaştım. Kullanıcı deneyimini ön planda tutarak, modern ve responsive web uygulamaları geliştirmeye odaklanıyorum. Sürekli kendimi geliştirmeye ve yeni teknolojileri öğrenmeye özen gösteriyorum.',
  socialLinks: [
    { platform: 'github', url: 'https://github.com/huseyindol' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/huseyindol' },
    { platform: 'twitter', url: 'https://twitter.com/huseyindol' },
    { platform: 'instagram', url: 'https://instagram.com/huseyindol' },
  ],
  experience: '5+',
  isFreelance: true,
  phone: '+90 500 123 45 67',
}

export const siteInfo: siteInfoType = {
  sayHi: '👋 Merhabalar, ben Hüseyin',
  title: {
    highlight: 'Modern Web',
    rest: 'Uygulamaları Geliştiriyorum',
  },
  description:
    '10+ yıllık deneyimim ile <strong>React, Next.js ve TypeScript</strong> kullanarak ölçeklenebilir, performanslı ve kullanıcı dostu web uygulamaları geliştiriyorum. Ekip liderliği ve mentorluk konularında da deneyimliyim.',
  email: 'huseyindol@gmail.com',
  phone: '+90 544 558 28 25',
  location: 'Sancaktepe, İstanbul, Türkiye',
  experience: '10+',
  cvUrl: '/assets/files/HuseyinDOL.pdf',
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/huseyindol',
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/huseyindol/',
    },
    {
      platform: 'email',
      url: 'mailto:huseyindol@gmail.com',
    },
  ],
}

export const skills: skillsType[] = [
  {
    name: 'HTML5',
    level: 'Expert',
    years: '10+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg',
    url: 'https://www.w3.org/html/',
  },
  {
    name: 'CSS3',
    level: 'Expert',
    years: '10+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
    url: 'https://www.w3schools.com/css/',
  },
  {
    name: 'Bootstrap',
    level: 'Advanced',
    years: '8+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg',
    url: 'https://getbootstrap.com',
  },
  {
    name: 'Sass',
    level: 'Advanced',
    years: '6+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg',
    url: 'https://sass-lang.com',
  },
  {
    name: 'JavaScript',
    level: 'Expert',
    years: '10+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    name: 'React',
    level: 'Expert',
    years: '8+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
    url: 'https://reactjs.org/',
  },
  {
    name: 'VS Code',
    level: 'Expert',
    years: '8+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg',
    url: 'https://code.visualstudio.com/',
  },
  {
    name: 'Figma',
    level: 'Advanced',
    years: '5+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
    url: 'https://www.figma.com/',
  },
  {
    name: 'Redux',
    level: 'Expert',
    years: '6+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',
    url: 'https://redux.js.org',
  },
  {
    name: 'Next.js',
    level: 'Expert',
    years: '5+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    url: 'https://nextjs.org/',
  },
  {
    name: 'Trello',
    level: 'Advanced',
    years: '6+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/trello/trello-original.svg',
    url: 'https://trello.com/en',
  },
  {
    name: 'Git',
    level: 'Expert',
    years: '10+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
    url: 'https://git-scm.com/',
  },
  {
    name: 'Node.js',
    level: 'Advanced',
    years: '7+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
    url: 'https://nodejs.org',
  },
  {
    name: 'Docker',
    level: 'Intermediate',
    years: '3+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
    url: 'https://www.docker.com/',
  },
  {
    name: 'Express',
    level: 'Advanced',
    years: '6+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg',
    url: 'https://expressjs.com',
  },
  {
    name: 'Prisma',
    level: 'Advanced',
    years: '6+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg',
    url: 'https://www.prisma.io/',
  },
  {
    name: 'MongoDB',
    level: 'Advanced',
    years: '5+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg',
    url: 'https://www.mongodb.com/',
  },
  {
    name: 'Nginx',
    level: 'Intermediate',
    years: '4+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg',
    url: 'https://www.nginx.com',
  },
  {
    name: 'Postman',
    level: 'Advanced',
    years: '6+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg',
    url: 'https://postman.com',
  },
  {
    name: 'PostgreSQL',
    level: 'Intermediate',
    years: '3+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg',
    url: 'https://www.postgresql.org',
  },
  {
    name: 'Java',
    level: 'Intermediate',
    years: '4+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
    url: 'https://www.oracle.com/java/',
  },
  {
    name: 'Spring',
    level: 'Intermediate',
    years: '3+',
    imageUrl:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg',
    url: 'https://spring.io/',
  },
  {
    name: 'MCP',
    level: 'Intermediate',
    years: '3+',
    imageUrl: 'https://avatars.githubusercontent.com/u/182288589?s=200&v=4',
    url: 'https://www.mcp.com/',
  },
]

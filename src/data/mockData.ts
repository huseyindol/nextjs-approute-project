import { siteInfoType } from '@/types/siteInfoTypes'
import { skillsType } from '@/types/skillsTypes'
import { Metadata } from 'next'

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

export const metadataHomePage: Metadata = {
  title: 'Ana Sayfa | Hüseyin DOL Portfolio',
  description:
    'Frontend Developer & UI/UX Designer olarak çalışmalarım ve deneyimlerim',
  alternates: {
    canonical: 'https://next.huseyindol.site',
  },
}

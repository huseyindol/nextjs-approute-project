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

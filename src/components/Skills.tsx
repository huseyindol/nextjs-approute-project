import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

const skills = [
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
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Teknolojiler & Yetenekler
          </h2>
          <p className="text-xl text-muted-foreground">
            10+ yıllık deneyimimde uzmanlaştığım teknolojiler ve seviyeler
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex flex-wrap justify-center space-x-4 space-y-4">
            {[...skills].map((skill, index) => (
              <Card
                key={`${skill.name}-${index}`}
                className={`flex-shrink-0 p-6 py-3 bg-card hover:shadow-lg transition-all duration-300 border-0 ${skills.length === index + 1 ? 'mb-4' : ''}`}
              >
                <Link
                  href={skill.url}
                  title={skill.name}
                  target="_blank"
                  className="w-full h-full text-center flex flex-col items-center justify-center"
                >
                  <div
                    className={`flex items-center justify-between mb-4 ${skill.name === 'Express' ? 'bg-gray-200 rounded-full p-1' : ''}`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Image
                        src={skill.imageUrl}
                        alt={skill.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <Badge variant="secondary" className="hidden">
                      {skill.years}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-semibold">{skill.name}</h3>
                  <p className="text-muted-foreground mb-4 hidden">
                    {skill.level} seviye
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

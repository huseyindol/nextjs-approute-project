const fs = require('fs')
const path = require('path')

const blogDir = path.join(__dirname, '../src/data/blog')
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true })
}

const articlesData = [
  // --- FRONTEND: REACT ---
  {
    slug: 'frontend-react-architecture',
    title: 'Modern React Mimarisi ve Clean Code Pratikleri',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-16',
    readingTime: '6',
    content: `State yönetimi, Custom Hook'ların gücü ve Declarative (Bildirimsel) kod yazımının React ekosistemindeki önemine değindik. Projelerimizde Side effect'leri en aza indiren fonksiyonel yaklaşımlar sergiledik. React 19 ve concurrent özelliklerinin uygulamadaki performans getirileri muazzamdır.`,
  },
  {
    slug: 'frontend-react-performance',
    title: 'React Render Performans Optimizasyonu',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 3,
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-16',
    readingTime: '5',
    content: `React Suspense, Lazy Loading ve RSC (React Server Components) konseptleri ile gereksiz re-render problemlerinin nasıl önüne geçilir? UseMemo ve UseCallback hook'larının doğru zamanda kullanımı üzerine case studyler inceledik.`,
  },
  {
    slug: 'frontend-react-shadcn',
    title: 'React ve Shadcn UI: Tasarım Sistemleri',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-16',
    readingTime: '7',
    content: `Klasik komponent kütüphanelerinin aksine, kodu tamamen bizim sahiplendiğimiz Shadcn UI mimarisi ile projelerde inanılmaz bir standartlaşma sağladık. Tailwind CSS'in utility first yaklaşımıyla birleştiğinde ortaya premium sonuçlar çıkıyor.`,
  },

  // --- FRONTEND: NEXTJS ---
  {
    slug: 'frontend-nextjs-elly-admin',
    title: 'Elly Admin Panel Mimarisi: Next.js App Router',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 2,
    coverImage:
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-17',
    readingTime: '8',
    content: `Elly-admin-panel geliştirilirken Next.js'in SSR yeteneklerini ve App Router esnekliklerini kullandık. Layout pattern'i ile yetkilendirme katmanları, Server Actions üzerinden data mutasyonları sağlandı.`,
  },
  {
    slug: 'frontend-nextjs-seo',
    title: 'Next.js ile Kusursuz SEO ve Metadata Yönetimi',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 1,
    coverImage:
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-17',
    readingTime: '5',
    content: `Dynamic Content içeren uygulamalardaki metadata dinamik atamaları (generateMetadata) ve robots.txt entegrasyonu. Sitemap.xml jenerasyonları ile Google indeks sürelerini minimize ediyoruz.`,
  },
  {
    slug: 'frontend-nextjs-api-routes',
    title: 'Next.js Backend as a Frontend: API Routes',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-17',
    readingTime: '6',
    content: `Route Handlers ile Next.js içerisinde proxy oluşturarak mikroservislere köprü yapmak ve webhook dinleyicilerini konumlandırmak. Cache konfigürasyonları ve Revalidate süreçleri.`,
  },

  // --- FRONTEND: NPMJS ---
  {
    slug: 'frontend-npmjs-uikit',
    title: 'Kurumsal UI Kit İnşası: NPMJS Üzerinde Paketleme',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-18',
    readingTime: '7',
    content: `Firmamın frontend projelerindeki karmaşayı çözmek için geliştirdiğimiz UI-Kit çalışmasının hikayesi. Button, Badge, Banner, Newsletter alanı gibi componentleri nasıl izole bir pakete dönüştürdük?`,
  },
  {
    slug: 'frontend-npmjs-versioning',
    title: 'NPM Paketlerinde Semantik Versiyonlama (SemVer)',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-18',
    readingTime: '4',
    content: `Yüzlerce farklı uygulamaya giden NPM paketinin güncellemelerinde hata oluşmaması için Breaking Change yönetimi, Git flow senkronizasyonu ve Semantic Versioning ilkelerini uyguladık.`,
  },
  {
    slug: 'frontend-npmjs-ci-cd',
    title: 'GitHub Actions ile NPM Paket Dağıtımı (CI/CD Otomasyonu)',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 4,
    coverImage:
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-18',
    readingTime: '6',
    content: `Kod main branch'e birleştiği anda testlerden geçen component paketinin otomatik olarak NPM Registry'ye yeni versiyonla nasıl pushlandığı üzerindeki otomasyon tecrübemiz.`,
  },

  // --- FRONTEND: STORYBOOK ---
  {
    slug: 'frontend-storybook-playground',
    title: 'Storybook: UI Bileşenleri İçin İzole Oyun Alanı',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-19',
    readingTime: '5',
    content: `Geliştirdiğimiz UI-Kit NPM paketinin içerisindeki bileşenleri takım arkadaşlarına ve tasarımcılarına tanıtmak adına Storybook kullanarak elde ettiğimiz hız kazanımlarını değerlendiriyoruz.`,
  },
  {
    slug: 'frontend-storybook-args',
    title: 'Storybook Args ve Controls İle Bileşen Testleri',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-19',
    readingTime: '4',
    content: `Props değiştirmelerini kod yazmadan Visual (Görsel) arayüzde test etme deneyimi. Tasarım departmanı ve Developer iletişimsizliğini Storybook aracılığıyla minimuma indirmenin formülleri.`,
  },
  {
    slug: 'frontend-storybook-addons',
    title: 'Storybook Eklentileri: Dark Mode, A11y ve Dokümantasyon',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-19',
    readingTime: '6',
    content: `Makine okunabilir otomatik dokümantasyon (MDX tabanlı), Dark Mode testleri ve Accessibility (Erişilebilirlik) puanlarını kontrol eden araçlar ile Storybook yapımızı nasıl şaha kaldırdık?`,
  },

  // --- FRONTEND: GROWTHBOOK ---
  {
    slug: 'frontend-growthbook-ab-testing',
    title: 'Growthbook İle A/B Testleri ve Feature Flag Yönetimi',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    order: 5,
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-20',
    readingTime: '7',
    content: `Yeni bir Newsletter arayüzünün konversiyon (dönüşüm) oranını etkileyip etkilemeyeceğini test etmek için projeye Growthbook SDK ekleyip %50 trafikli A/B test senaryosu yürüttük.`,
  },
  {
    slug: 'frontend-growthbook-nextjs',
    title: 'Next.js App Router İçerisinde Growthbook Entegrasyonu',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-20',
    readingTime: '5',
    content: `Server Side Rendering tarafında feature flag'ları okuyarak (Next.js Middleware üzerinden) kullanıcılara statik gecikme olmadan ilgili deneyi sunma metotlarımız.`,
  },
  {
    slug: 'frontend-growthbook-metrics',
    title: 'A/B Testlerinde Veriye Dayalı Karar Alma (Metrics)',
    category: 'Frontend',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-20',
    readingTime: '6',
    content: `Growthbook raporlamalarından elde ettiğimiz p-value ve istatistiksel sonuçlara göre, arayüzde tasarladığımız değişiklikleri kalıcı hale getirme sürecimiz.`,
  },

  // --- MOBILE: REACT NATIVE ---
  {
    slug: 'mobile-react-native-elly',
    title: 'Elly Mobile App: Modern React Native Mimarisi',
    category: 'Mobile',
    author: 'Hüseyin DOL',
    order: 1,
    coverImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-21',
    readingTime: '8',
    content: `Elly mobil projesinde, tam tema destekli (karanlık mod odaklı) mimari deneyimlerimiz, form bileşenleri ve navigation yapılandırmalarından elde ettiğim teknik tecrübeler.`,
  },
  {
    slug: 'mobile-react-native-performance',
    title: 'React Native FlatList Performans İpuçları',
    category: 'Mobile',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-21',
    readingTime: '6',
    content: `Binlerce verinin mobil ekranda kasma donma yaşamadan listelenebilmesi için memoization, keyextractor ve getItemLayout optimizasyon adımları.`,
  },
  {
    slug: 'mobile-react-native-animations',
    title: 'Reanimated ve Akışkan 60FPS Animasyonlar',
    category: 'Mobile',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-21',
    readingTime: '5',
    content: `UI/UX standartlarını çok yukarılara çekmek için JS thread dışına çıkarılan ve mikro-animasyonları kusursuz yöneten Reanimated 3 implementasyonlarımız.`,
  },

  // --- AI: MCP ---
  {
    slug: 'ai-mcp-architecture',
    title: 'Model Context Protocol (MCP) Neden Devrimseldir?',
    category: 'AI',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-22',
    readingTime: '7',
    content: `Github'daki McpProjectScaffold yapımızdan öğrendiğimiz; LLM modellerinin external dünyayla standart biçimde konuşabilmesini sağlayan bu protokolün yazılım geliştirme metodolojisini nasıl değiştirdiğine odaklanıyoruz.`,
  },
  {
    slug: 'ai-mcp-integration',
    title: 'Kendi MCP Sunucunuzu Java/Node İle Yazmak',
    category: 'AI',
    author: 'Hüseyin DOL',
    order: 1,
    coverImage:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-22',
    readingTime: '8',
    content: `McpProjectScaffold içinde, Custom tool tanımlamaları ve prompt veritabanı enjekte etme işlemlerinin entegrasyon süreçleri. Büyük dil modelleri sizin API'lerinize nasıl erişebilir?`,
  },
  {
    slug: 'ai-mcp-security',
    title: 'Yapay Zeka Protokollerinde Güvenlik ve İzolasyon',
    category: 'AI',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-22',
    readingTime: '5',
    content: `MCP serverleri üzerinden sağlanan "safe-to-run" komutlarda riskli operasyonları nasıl limitleriz? LLM'lerin sadece okuma-yetkili (read-only) bağlanmasına uygun mimari teknikleri.`,
  },

  // --- AI: LLM AGENTS ---
  {
    slug: 'ai-agents-workflow',
    title: "AI Agent'lar İle Yazılım Geliştirme Kültürü",
    category: 'AI',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-23',
    readingTime: '10',
    content: `Artık sadece kod yazmak yetmiyor, kod yazdıran sistemleri (Agent, Antigravity, Claude, vs.) mimarimize entegre etmek gerekiyor. Kodlamadaki Agentic Workflow (ajan tabanlı akış) devrimi.`,
  },
  {
    slug: 'ai-agents-pair-programming',
    title: "Pair Programming'de Yapay Zeka Devrimi",
    category: 'AI',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-23',
    readingTime: '6',
    content: `Github Copilot'un ötesinde, ortam farkındalığına sahip model asistanlarla problem çözümü, log analizi, hata giderme ve baştan sona modül yaratımında elde edilen zaman kazanımları.`,
  },
  {
    slug: 'ai-agents-future',
    title: 'Otonom Sistemler ve Frontend Mühendisliğinin Geleceği',
    category: 'AI',
    author: 'Hüseyin DOL',
    coverImage:
      'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=2000&auto=format&fit=crop',
    publishedAt: '2026-04-23',
    readingTime: '12',
    content: `UX ve Tasarım Sistemleri artık AI tarafından üretiliyor. Yapay zekanın sadece asistan değil, bir bileşen (component) oluşturucu ve sistem mimarı rolüne büründüğü bu süreçte bizleri neler bekliyor?`,
  },
]

articlesData.forEach(article => {
  let customBody = ''

  switch (article.slug) {
    case 'frontend-react-architecture':
      customBody = `Modern Front-end dünyasında React'in giderek karmaşıklaşan yapısı, sürdürülebilir bir mimari tasarlamayı zorunlu kılıyor. Uygulamalar büyüdükçe, bileşen hiyerarşisinde kaybolmamak için "Separation of Concerns" (Sorumlulukların Ayrılığı) prensibini en temel yapıtaşı yapmalıyız.\n\nProjelerde karmaşık durumları yönetirken side-effect (useEffect) kullanımını minimize ediyor ve iş mantığını tamamen **Custom Hook** yapılarına devrediyorum. "Container/Presenter" mantığını modern Hook ekosistemiyle birleştirmek, testlerin kolaylaşmasını ve kodun her yerde kullanılabilmesini (reusability) sağlıyor. Özellikle React 18 ile gelen concurrent rendering, performans hedeflerimiz için devrimseldir.\n\n\`\`\`tsx\n// Örnek: İş mantığının UI'dan izole edilmesi\nexport function useProfileData(userId: string) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n     fetch('/api/user/' + userId).then(res => res.json()).then(setData);\n  }, [userId]);\n  return data;\n}\n\`\`\`\n\nCustom hook'lar üzerinde ilerlediğimizde UI bileşenleri tamamen "aptal" (dumb) hale gelir ve sadece gelen datayı basmakla ilgilenir. Bu izolasyon, ekibin projeye adaptasyon sürecini aylar seviyesinden haftalara indirir.`
      break

    case 'frontend-react-performance':
      customBody = `React'in popülerliği arttıkça, sıkça karşılaşılan performans darboğazlarının başında "gereksiz tekrar render edilme" (unnecessary re-renders) sorunu geliyor. Bir state değiştiğinde tüm uygulamanın yeniden şekillenmesi, mobil cihazlarda pil ve CPU israfına neden olmaktadır.\n\nDarboğazları önlemek adına \`React.memo\`, \`useMemo\` ve \`useCallback\` fonksiyonlarını her yerde değil, yalnızca rendering ağaçlarındaki maliyetli hesaplamalarda kalkan olarak kullanmalıyız. Çok uzun listeler içinse Virtualization (react-window) tek çaremizdir.\n\n\`\`\`tsx\nconst HeavyComponent = memo(({ dataset }) => {\n  // Yoğun DOM iterasyonları\n  return <div>{dataset.map(item => <span key={item.id}>{item.val}</span>)}</div>\n});\n\`\`\`\n\nBileşen bağımlılıklarını izole ettiğimiz bu yaklaşımlar, büyük ölçekli ve binlerce node barındıran dashboard ekranlarında bile uygulamanın 60FPS hızında, tamamen akıcı çalışmasını garantiliyor.`
      break

    case 'frontend-react-shadcn':
      customBody =
        `Klasik component kütüphanelerinin aksine (Ant Design, MUI), takımın ihtiyaçlarına %100 uyumlu ve erişilebilir bir UI sistemi kurmak son derece meşakkatli bir süreçti. Shadcn UI bu zorluğu Headless (Radix) felsefesiyle çözdü.\n\nKomponent kodlarının paket modülü yerine bizzat kaynak kodumuzun (` +
        '`src/components`' +
        `) içerisine kopyalanması bize devasa bir esneklik sunuyor. Tailwind CSS ile entegre olan bu yapı sayesinde projenin kurumsal renk kartelasını ve varyasyonlarını kolayca adapte ediyoruz.\n\n\`\`\`tsx\nimport { Button } from "@/components/ui/button"\n\nexport function CTASection() {\n  return <Button variant="destructive" className="animate-pulse">Sil ve Devam Et</Button>\n}\n\`\`\`\n\nHazır ama aynı zamanda baştan yazılabilir olan bu mimari sayesinde kod tekrarından kurtulurken, kurumsal projelerin ihtiyaç duyduğu o spesifik tasarım ince ayarlarını dakikalar içinde üretebiliyoruz.`
      break

    case 'frontend-nextjs-elly-admin':
      customBody = `Elly CMS sisteminin yönetim paneli ihtiyaçları doğrultusunda, SEO'ya duyarlı olmanın ötesinde çok hızlı karar alabilen bir "Server-Driven" arayüz gerekiyordu. Bu da bizi doğrudan Next.js'in App Router mimarisi ile güçlü bir entegrasyona itti.\n\nYükleme sürelerini minimize etmek için istemci (Client) ve sunucu (Server) bileşenleri arasındaki sınırları (boundaries) ayrıştırdık. Mümkün olan tüm veri çekme işlemlerini direkt asenkron bileşenlerde yürüterek kullanıcının cihazına gereksiz JavaScript paketleri gönderilmesini engelledik.\n\n\`\`\`tsx\n// app/admin/users/page.tsx (Server Component)\nexport default async function AdminUsersPage() {\n   const users = await db.query.users();\n   return <UsersTable data={users} />\n}\n\`\`\`\n\nVerinin işlendiği yere en yakın noktada çekilmesi, paneller arası geçişlerde sıfıra yakın (zero-latency) bir hissiyat yarattı. CMS içindeki ağır analiz sorguları bile sunucu gücüyle anında cevap veriyor.`
      break

    case 'frontend-nextjs-seo':
      customBody = `Ziyaretçiye statik göründüğü halde içeriklerini dinamik veri tabanlarından alan sitelerde Arama Motoru Optimizasyonu (SEO) en büyük challenge'dır. React'in kendi başına çözemediği bu kısmı Next.js ile kusursuz yönetebiliyoruz.\n\nDynamic SEO yetenekleri kapsamında yer alan \`generateMetadata\` fonksiyonu ile URL'ye (Slug) bağlı değişen içerikleri sunucu tarafında çekiyor ve doğrudan Head tag'lerine (OpenGraph dahil) basabiliyoruz. Bunu sitemap ve robots.txt entegrasyonuyla birleştiriyoruz.\n\n\`\`\`tsx\nexport async function generateMetadata({ params }): Promise<Metadata> {\n  const post = await getPost(params.id);\n  return {\n    title: post.title,\n    openGraph: { images: [post.cover] }\n  }\n}\n\`\`\`\n\nPaylaşım ağlarındaki URL önizlemeleri tamamen doğru bilgiyle (Görsel ve Açıklama dahil) görünmekte olup, Google botları sayfalarımızı indexlerken tam teşekküllü (SSR) HTML'e saniyeler içinde erişebilmektedir.`
      break

    case 'frontend-nextjs-api-routes':
      customBody = `Çoğu frontend uygulamasında, dış dünyada bulunan backend sunucularınıza (Java, Python vb.) doğrudan istek yapmak güvenlik açıklarına ve CORS meselelerine yol açabilir. Next.js "Backend as a Frontend" konseptiyle bu duruma bir set çekiyor.\n\nRoute Handlers (API Route'ları) kullanarak arka plan sunucularına bir proxy tüneli oluşturuyoruz. İstekler tarayıcıdan doğrudan Backend'e gitmek yerine Next.js sunucusuna vuruyor, orada gerekli güvenlik (JWT/Cookie) validasyonları yapılıp orijinal hedefe iletiliyor.\n\n\`\`\`ts\n// app/api/public/route.ts\nexport async function GET(request: Request) {\n  // Backend API'sine header tabanlı köprü kuralım\n  const res = await fetch('https://hidden-api.internal', { headers });\n  return NextResponse.json(await res.json());\n}\n\`\`\`\n\nBu sayede arka uç (backend) sunucularımızı tamamen izole bir özel ağa (Private Network) çekebiliyor ve yalnızca Next.js sunucusunun onlara ulaşabilmesine izin vererek güvenlik ve performans (rate limiting) katmanı elde ediyoruz.`
      break

    case 'frontend-npmjs-uikit':
      customBody = `Büyüyen yazılım ekiplerinin birbirinden kopuk projeler geliştirdiğinde, renk farklılıkları, komponent uyumsuzlukları gibi krizlerle boğuştuğu bir gerçektir. Takım sinerjisini artırmak adına ortak bir dil (UI-Kit) kurmak kaçınılmazdır.\n\nFirmanın kimliğini yansıtan Button, Banner, Form elementleri gibi tüm yapı taşlarını dışa bağımlı olmadan kendi NPM paketimiz olarak yayımladık. Monorepo (Turborepo) stratejisi yardımıyla projeler arasında "ortak akıl" yürütecek bir CSS ve bileşen standardı oluşturduk.\n\n\`\`\`bash\nnpm install @huseyindol/ui-kit\n\`\`\`\n\nBu yaklaşım sayesinde, ürün yönetimi yeni bir platform sipariş ettiğinde geliştirici ekibi sıfırdan tasarım yazmakla uğraşmıyor, markanın hazır bloklarını bir araya getirerek %40 efor tasarrufuyla yayına çıkabiliyor.`
      break

    case 'frontend-npmjs-versioning':
      customBody = `Stabil çalışan bir paket ekosistemi tasarlıyorsanız, en büyük kabusunuz yanlış yapılan masum bir güncellemenin yüzlerce projeyi ayn anda çökertmesi ihtimalidir. Bu felaketi önlemenin tek anahtarı düzgün versiyon takibidir.\n\nTıpkı dev küresel kütüphaneler gibi katı bir Semantic Versioning (SemVer) (MAJOR.MINOR.PATCH) stratejisi benimsiyor, eski versiyon kullanan sistemlerin "backward breaking-change" (geriye dönük uyumsuzluk) yaşamasını engelliyoruz. Bu uyarıları CHANGELOG aracılığıyla geliştiricilere bildiriyoruz.\n\n\`\`\`json\n{\n  "name": "@huseyindol/ui-kit",\n  "version": "1.2.4",\n  "dependencies": { "react": "^18.2.0" }\n}\n\`\`\`\n\nHerkesin kod yazdığı ortamlarda bağımlılık (Dependency) kilitlemesi kullanarak "bende çalışıyordu" mazeretlerini bitiriyor ve release (sürüm) stratejisinde yüksek kaliteli kod güvencesi sunuyoruz.`
      break

    case 'frontend-npmjs-ci-cd':
      customBody = `Lokal ortamda geliştirdiğimiz NPM paketini elle versiyonlamak ve teker teker registry'e atmak insan hatasına açık, yorucu ve çağdışı bir yöntemdir. Geliştirme kültürümüz Continuous Integration felsefesine dayanmalıdır.\n\nKod base üzerinde "Pull Request" \`main\` dalına kabul edildiğinde tetiklenen GitHub Actions ile bir pipeline (boru hattı) kurguladık. Önce vitest koşuluyor, kod kalite kontrolden geçiyor ve eğer her şey başarılıysa botlar versiyon atlayıp o an NPM'e release çıkıyor.\n\n\`\`\`yaml\nname: Publish Package\non:\n  release:\n    types: [created]\njobs:\n  publish:\n    run: npm publish --access public\n    env:\n      NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}\n\`\`\`\n\nYapılan bu entegrasyon sadece hız kazandırmakla kalmadı; aynı zamanda yazılımcının "paket yayınlama stresi" ortadan kaldırıldı, kodun teste girmesi zorunlu hale gelerek ürün kalitesi zirveye oturtuldu.`
      break

    case 'frontend-storybook-playground':
      customBody = `Geliştirdiğiniz bir UI bileşeninin 10 farklı konfigürasyonunu (hata mesajı, yüklenme, pasif vs.) görmek için ana sitede sayfa sayfa gezmek eski zamanlardan kalma bir amatörlüktür. Bu darboğazı çözmek için Storybook imdadımıza yetişiyor.\n\n"Component-Driven Development" (Bileşen odaklı gelişim) kültürü ile her bir butonu, takvimi, modu projenin bağlılıklarından kopartıp Storybook sanal platformunda izole olarak geliştiriyoruz. React context kirliliği dertlerine asla katlanmadan görsel (Visual) olarak sonucu deneyimliyoruz.\n\nEkibin yazılımcı olmayan üyeleri (Tasarımcılar, Ürün Sahipleri) bu siteye girip ürünün hangi UI elemanlarına sahip olduğunu sanki bir vitrin inceler gibi inceleyebiliyor ve geri bildirim sağlayabiliyorlar.`
      break

    case 'frontend-storybook-args':
      customBody = `Storybook'un asıl güçlü tarafı sadece bir katalog sunması değil; aynı zamanda interaktif bir manipülasyon (Args & Controls) alanı yaratmasıdır. Yeni özellik ekleneceği zaman bu kontroller developer deneyimini eşsiz kılar.\n\nProps değerlerini arayüzde bir panel (Controls) aracılığıyla değiştirilebilir kılarak, statik yazılmış component'in \`size\`, \`color\`, \`isLoading\` gibi özelliklerini kod yazmadan deneme fırsatı yakalıyoruz.\n\n\`\`\`tsx\nexport const Primary: Story = {\n  args: {\n    primary: true,\n    label: 'Modern Button',\n    size: 'large',\n  },\n};\n\`\`\`\n\nBu etkileşimli alan sayesinde tasarımcılar "Acaba bu buton hata verdiğinde padding nasıl görünüyor?" sorusunun cevabını bana sormak yerine saniyeler içinde Storybook'tan değiştirebiliyorlar. Uçtan uca iletişim devrimi yaratıyor.`
      break

    case 'frontend-storybook-addons':
      customBody = `Çıplak bir Storybook gayet faydalıdır ancak Onu çok güçlü ve güvenilir kılan şey sahip olduğu Eklenti (Addon) ekosistemidir. Ekip olarak erişilebilirlik ve Dark Mode testlerine takıntılı bir yapıdayız.\n\nStorybook konfigürasyonlarına \`@storybook/addon-a11y\` (Accessibility) ekleyerek, kullandığımız kontrast farklarının, aria tag'larının standartlara uyup uymadığını render sırasında canlı olarak test edebiliyoruz. Aynı zamanda otomatik MDX dokümantasyonu alabiliyoruz.\n\nSağlanan bu altyapı her yeni frontend stajyerinin ya da çalışanının sistemin "Kod Standartları" rehberini, dışarıdan başka hiçbir siteye ve PDF'e ihtiyaç duymadan hızla kavramasını sağlamış oldu.`
      break

    case 'frontend-growthbook-ab-testing':
      customBody = `Yeni çıkardığınız çılgın bir sayfa tasarımının satışı patlatacağından emin misiniz? Şirket vizyonunda kararlar "sezgilere" değil, her zaman dataya (veriye) dayandırılmadır. Bu amaçla Feature Flag yetenekleriyle A/B testlerini vazgeçilmez görüyoruz.\n\nGrowthbook SDK yapısını projeye entegre ederek, ana sayfadaki "Ödeme Yap" butonunun yeşil renkli halini kullanıcıların %50'sine, mavi renkli halini diğer %50'sine bölüp rastgele sunuyoruz. Sistemin ayakta kalması ve riskin bölünmesi bu deneylere dayanıyor.\n\n\`\`\`ts\nconst isNewHeaderOn = growthbook.isOn('new-header-experiment');\n// Canlı trafik esnasında kurala göre komponenti seçelim\nreturn isNewHeaderOn ? <HeaderV2 /> : <HeaderV1 />;\n\`\`\`\n\nHerhangi vahim bir bug veya satın almada çöküş yaşanırsa kod değiştirmeden Growthbook paneli üzerinden o feature-flag bayrağını anında kapatıyor, problemi tek saniyede %100 oranında önlemiş oluyoruz.`
      break

    case 'frontend-growthbook-nextjs':
      customBody = `A/B testleri client tabanlı (React useEffect) yürütüldüğünde, kullanıcı önce eski versiyonu görüp sonra saniyelik bir sıçrama ile (Flickering) yeni tasarımı görebiliyor. SSR odaklı modern dünyada bu gecikme kabul edilemez.\n\nUyguladığımız teknikte Growthbook Feature algoritmalarını Next.js'in \`middleware\` seviyesine çıkartıp Edge sunucularda değerlendiriyoruz. Ziyaretçi hangi test varyantında olduğunu daha ilk HTML üretilirken seziyor.\n\nTitreme efektinin sıfırlandığı, tamamen Server-Side Rendering (SSR) ile desteklenen bu kusursuz deneyim sayesinde arama motorları testlerimizi kötü amaçlı yönlendirmeler olarak damgalamıyor, performans metriklerimiz stabil kalıyor.`
      break

    case 'frontend-growthbook-metrics':
      customBody = `Feature flag kullanıldığında bir özelliğin ne zaman test aşamasından ana akıma geçileceğine istatistik karar verir. Yeterince trafik izlendikten sonra "bayrak" mantığı devreden çıkıp kod kalıcı hale gelmelidir.\n\nGrowthbook panellerindeki matematiksel metrik değerlerini (P-Value ve Significance oranlarını) analiz ediyoruz. Eğer özellik Conversion Rate'i (Dönüşüm Oranını) istatistiksel açıdan artırıp başarı sağladıysa, takım liderliğiyle kodu ana mimariye sabitliyoruz.\n\nBaşarısı kanıtlanan özelliklerin Flag tanımlamaları kod bloklarından (if conditions) temizlenerek (Technical Debt) kod yığını oluşumu engellenmiş olur, ürün başarılı mimarisi ile yoluna devam eder.`
      break

    case 'mobile-react-native-elly':
      customBody = `Elly mobil uygulamasının ekosistemini inşa ederken sadece performans hedeflemekle kalmadım, native hissini tam manasıyla yansıtabilecek bir navigasyon ve state iskeletine ihtiyaç dahi duyduk. \n\nWeb tabanlı tecrübelerimi mobil tarafa doğru kurgularla yansıtmak amacıyla React Navigation'un yetkinliklerini, global store yönetimlerini kullandım. Uygulamanın içerisinde System Theme (Dark Mode) geçişlerinin cihazlarla anlık reaksiyon göstermesini sağlayan modern context kurguları tasarladık.\n\nAndroid ve iOS platformları için devasa iki farklı kod tabanı yönetmek yerine, tek bir mantıksal merkezden çıkan ve her iki ekosistemde de performanslı derlenen, kurumsal, taze bir form ve bileşen mimarisi kurulmuş oldu.`
      break

    case 'mobile-react-native-performance':
      customBody = `React Native'in tartışmasız en büyük kronik rahatsızlıklarından biri çok miktarda kaydırılabilir veriyi (Infinite Fetch/List) ekrana dizerken yaşanan tıkanmalar ve ram tüketimidir. Bunun için doğru render optimizasyonuna yönelmek zorundayız.\n\nKullanıcıların yüzlerce öğeyi "pürüzsüz" ve 0 frame-drop (kare kaybı) ile kaydırabilmesi için FlatList veya RecyclerListView komponentlerini spesifik render kotalarıyla entegre ediyoruz. Özellikle List Item'leri memo componentler yapmak işin kritik virajıdır.\n\n\`\`\`tsx\n<FlatList \n  data={feed}\n  keyExtractor={item => item.id}\n  // Ekran dışında render edilecek görünmez alan sayısı\n  windowSize={11}\n  initialNumToRender={10}\n  maxToRenderPerBatch={5}\n/>\n\`\`\`\n\nYüksek resourcelu görsel medyalarla bile uygulamanın "Aşırı ısınması" veya FPS çökmesini bertaraf edebiliyor, kullanıcının sanki native Kotlin / Swift dilinde yazılmış bir uygulamada geziyormuş hissiyatını güçlendiriyoruz.`
      break

    case 'mobile-react-native-animations':
      customBody = `Profesyonel mobil ürünleri rakiplerinden ayırt eden şey işlevi kadar sunduğu mikro-etkileşimler (Micro-animations) ve pürüzsüz geri bildirim dokularıdır. Ancak React Native JS ipliği animasyonlar için çok yavaştır.\n\nAsıl devrimi, React'in ana JS ipliğini atlayarak Native donanım seviyesinde asenkron olarak çalışan \`react-native-reanimated\` (v3) implementasyonuyla sağladık. Akıcı shared element transition'ları ve donanım hızlandırması ile 60FPS sınırlarına ulaşıyoruz.\n\nKullanıcının tıkladığı nesnenin yumuşakça esnemesi, sayfalar arasındaki sürükleme ivmesinin parmak hızını algılayıp tepki vermesi, UI/UX deneyimi açısından ürünümüzün kalitesini premium segmente yükseltti.`
      break

    case 'ai-mcp-architecture':
      customBody = `Yapay zekanın sadece kod üreten bir asistan değil, arka plan ekosisteminize tamamen dahil olabildiği bir iletişim katmanı var: Model Context Protocol (MCP). Bu, Büyük Dil Modellerinin (LLM) dış apiler ve cihazlarla otonom görüşebilmesinin köprüsüdür.\n\nKendi geliştirdiğimiz \`McpProjectScaffold\` yapısındaki deneyimlerim sayesinde, Claude veya OpenAI agent'larına spesifik bir kurumsal dosya sistemimizi ya da SQL database loglarımızı nasıl besleyebileceğimizi (Contextually) detaylandırıyoruz. Agent'lar bu sayede dış API'lere sadece soru sorma yetkisinden çıkıp eyleme (Action) dönüşüyorlar.\n\nBu protokol entegrasyonu, yazılım endüstrisinde bir modelin kod dizinine dışarıdan bakması yerine bizzat ekosistemin omurgasına girerek orkestrasyona kılavuzluk yapmasını, iş yapma paradigmalarımızı derinden değiştirdiğini ispatlıyor.`
      break

    case 'ai-mcp-integration':
      customBody = `Şirketinizdeki çok değerli backend metrikleri ya da CI/CD süreçlerinizi yöneten araçlarınız yapay zekanın doğrudan müdahalesine tamamen uzağa konuşlandırılmış durumda. Bunu kırmanın anahtarı kendi özel MCP sunucunuzu (Server) inşa etmektir.\n\nJava ve TypeScript kullanarak geliştirdiğimiz özel entegrasyonlar sayesinden, LLM bir kullanıcının fatura detayıyla ilgili isteğini çözümleyip "Sizin yolladığınız Java /api/invoice routerına" otonom istek vurabiliyor. Kendi iç Tools yeteneklerini model'in kullanımına sunuyoruz.\n\nProjelerde yarattığımız bu interaktif AI proxy'si sayesinde müşteri temsilciliği fonksiyonlarından tutun, DevOps pipeline analizlerine kadar on binlerce dolarlık Ar-Ge asistanı, yazdığımız Node/Java endpointleriyle bütünleşik hale geldi.\n\n**Detaylı inceleme ve açık kaynak (Open Source) kodları için GitHub repomuza göz atmayı unutmayın:**\n[McpProjectScaffold - Github Reposunu İnceleyin](https://github.com/huseyindol/McpProjectScaffold)`
      break

    case 'ai-mcp-security':
      customBody = `Bir LLM asistanının sisteminizin derinliklerine erişebilmesi muazzam bir güç olsa da; veri tabanına Drop komutu gönderebilecek olmaları ya da finansal bilgileri yanlış yetkiyle çekmeleri ölümcül güvenlik zafiyetleridir.\n\nBu noktada Model Context Protocol içerisinde "Okuma İzni Verilenler" (Read-Only) ve "Mutasyona (Mutation) Uğratan İşlemler" olarak izole bir güvenlik konsepti yazıyoruz. Kurumsal senaryolarda Human-In-The-Loop mimarisiyle, riskli görülen "Sistemi Yeniden Başlat" isteğinde model önce yetkili bir developer'dan onay düğmesine (Approval) basmasını şart koşuyor.\n\nUygulanan sandbox ve onaya dayalı otomasyonlar (Safe-to-Run) devrim yaratırken mimarimizin kontrolden çıkarak şirket zararlısına dönüşmesi ve halüsinasyon gören model tehlikesinin kökünü güvenli bir filtre ile kazımış oluyoruz.`
      break

    case 'ai-agents-workflow':
      customBody = `Yakın geçmişte geliştiriciler manuel terminal betiklerine bağımlıydı. Ancak bugün, hata bildirimleri üzerinden otonom şekilde projeyi tarayıp düzeltebilen, testleri koşup PR açan "Agentic Workflow" (Ajan odaklı Sistemler) mimarisine ulaştık.\n\nKodlamayı proaktif bir devrimle yönetiyoruz; terminal komutlarımızı çalıştıran, kod bloklarını tarayıp mimari zafiyetimizi bize raporlayan (örneğin Antigravity gibi otonom developer asistanları) sistemleri IDE yetkinliklerimizle harmanlıyoruz. Girdiğimiz bağlamlarda karmaşık "Task Listleri" (Planlamalar) üretiyorlar.\n\nJunior ya da Senior ayırt etmeksizin tüm ekibin sadece bir kodlayıcıdan ziyade, bir planlayıcı ve Geliştirici Mühendis gibi projeye geniş tepeden bakabilen mimar seviyesine yükselmesi artık bu akışlarla saatler değil dakikalar alıyor.`
      break

    case 'ai-agents-pair-programming':
      customBody = `Eskiden "Pair Programming" dediğimiz yan yana oturup kod analiz eden iki yazılımcı mentalitesi, Github Copilot'un bile ötesine geçen "Workspace-aware" (Ortam Farkındalığı yüksek) ajanlarla devasa bir verimlilik partnerliğine (eşli programlama) dönüştü.\n\nGeliştirdiğim modern sistemlerde, loglardaki Trace id'den yola çıkıp backend içerisindeki Java stacktrace serüvenini analiz eden, benimle birlikte kodu tarayıp anında fix metodolojisini sunan bir YZ partneri var. Bağlama (Context) ait eski PR/Konuşma kayıtlarına doğrudan ulaşabiliyorlar.\n\nBu sayede sadece klavye vuruşlarımız (Keystrokes) azalmakta kalmıyor, aynı zamanda projelerin günlerce süren Debug krizleri veya Resource Leak takipleri yarım saatte otonom bir test doğrulamasıyla başarıya ulaşıyor. Rekabetin boyutu inanılmaz noktalarda.`
      break

    case 'ai-agents-future':
      customBody = `Frontend ve Yazılım mimarisinin geleceği salt kod üretiminden çekilip; "Talimatı analiz eden, dizaynı UI koduna ve Storybook'una kadar döken" sistem orkestrasyonuna doğru çok büyük bir kırılma yaşıyor.\n\nAgent'ların yakın gelecekte sadece component yazmak yerine bir ürün yöneticisinin (Product Manager) Figma tasarım dosyasını okuyarak veritabanı şemasını, endpoint yapısını ve responsive mobil ekranını saniyeler içinde scaffold (inşa etme) seviyelerine çıkacağına olan tecrübemiz derinleşiyor.\n\nBu paradigma değişimiyle Frontend Geliştiricilerin bizzat kodu kazıyan madenciler olmaktan ziyade sisteme direktif veren, sınırları regüle eden ve güvenlik mimarilerini onaylayan "Sistem Revizörleri" olarak çok daha stratejik ve zeki roller alacağı ortadadır.`
      break

    default:
      customBody = `Geliştirmelerim sırasında deneyimlediğim mimarilerin sağlam bir altyapı oluşturduğuna inanıyorum. Bu nedenle modern yazılım araçlarını yakından takip ediyoruz.\n\nTeknik tecrübeler, hata yapılan production ortamlarında saatlerce yapılan debug işlemlerinin sonucunda vücut bulur. Bu sebeple buradaki notların sadece teori değil, prodüksiyonda tecrübe edinilmiş bilgilerden harmanlandığını bilmelisiniz.\n\nYakın zamanda bu spesifik konuyla ilgili daha detaylı örnek testlerimi ve kod arşivimi yayınlayacağım. Bizi takip etmeye devam edin.`
      break
  }

  const mdxString = [
    '---',
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `description: "${article.content.substring(0, 100).replace(/"/g, '\\"')}..."`,
    `publishedAt: '${article.publishedAt}'`,
    `category: '${article.category}'`,
    `author: '${article.author}'`,
    `coverImage: '${article.coverImage}'`,
    `readingTime: '${article.readingTime}'`,
    article.order ? `order: ${article.order}` : `order: 99`,
    '---',
    '',
    `Bu makale **${article.category}** alanındaki deneyimlerimi ve yazılım geliştirme metodolojimi aktarmaktadır.\n`,
    '## Genel Bakış\n',
    `> ${article.content}\n`,
    customBody,
    '\n---\n*Bu içerik kişisel geliştirme laboratuvarımdan ve prodüksiyon maceralarımdan derlenmiştir.*',
  ].join('\n')

  const filePath = path.join(blogDir, article.slug + '.mdx')
  fs.writeFileSync(filePath, mdxString)
})

console.log('Successfully generated ' + articlesData.length + ' articles.')

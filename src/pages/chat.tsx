import { ChatWidget } from '@/components/chat/ChatWidget'
import { Seo } from '@/lib/seo'

export default function ChatPage() {
  return (
    <>
      <Seo
        title="Canlı Destek"
        description="Anonim canlı destek sohbeti."
        canonical="/chat"
        noIndex
      />
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold">Canlı Destek</h1>
          <p className="mt-4 text-muted-foreground">
            Sağ alttaki sohbet butonuna tıklayın, adınızı girin ve destek
            ekibimizle anlık olarak mesajlaşmaya başlayın.
          </p>
        </div>

        {/* Floating chat widget — test amaçlı yalnızca bu sayfada */}
        <ChatWidget />
      </div>
    </>
  )
}

import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function HamurUstaPrivacyPolicyPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('hamur-usta', 'privacy-policy', 'en'),
    lang: 'en',
    path: '/games/hamur-usta/privacy-policy',
    alternatePath: '/games/hamur-usta/gizlilik-politikasi',
    gameTitle: 'Hamur Usta',
    gamePath: '/games/hamur-usta',
    description: 'Privacy policy for Dough Master: Color Mix (Hamur Usta).',
  },
})

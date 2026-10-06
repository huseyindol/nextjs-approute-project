import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function HamurUstaSupportPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('hamur-usta', 'support', 'en'),
    lang: 'en',
    path: '/games/hamur-usta/support',
    alternatePath: '/games/hamur-usta/destek',
    gameTitle: 'Hamur Usta',
    gamePath: '/games/hamur-usta',
    description: 'Support and FAQ for Dough Master: Color Mix (Hamur Usta).',
  },
})

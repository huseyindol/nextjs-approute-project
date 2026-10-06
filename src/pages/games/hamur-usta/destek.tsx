import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function HamurUstaDestekPage(props: Readonly<GameDocPageProps>) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('hamur-usta', 'support', 'tr'),
    lang: 'tr',
    path: '/games/hamur-usta/destek',
    alternatePath: '/games/hamur-usta/support',
    gameTitle: 'Hamur Usta',
    gamePath: '/games/hamur-usta',
    description: 'Hamur Usta destek ve sık sorulan sorular.',
  },
})

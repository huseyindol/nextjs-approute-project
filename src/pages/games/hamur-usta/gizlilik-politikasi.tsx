import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function HamurUstaGizlilikPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('hamur-usta', 'privacy-policy', 'tr'),
    lang: 'tr',
    path: '/games/hamur-usta/gizlilik-politikasi',
    alternatePath: '/games/hamur-usta/privacy-policy',
    gameTitle: 'Hamur Usta',
    gamePath: '/games/hamur-usta',
    description: 'Hamur Usta gizlilik politikası.',
  },
})

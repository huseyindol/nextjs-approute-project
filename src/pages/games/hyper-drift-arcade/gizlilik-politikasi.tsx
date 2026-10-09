import {
  GameDocPage,
  type GameDocPageProps,
} from '@/components/games/GameDocPage'
import { loadGameDoc } from '@/lib/game-docs'
import type { GetStaticProps } from 'next'

export default function HyperDriftArcadeGizlilikPage(
  props: Readonly<GameDocPageProps>,
) {
  return <GameDocPage {...props} />
}

export const getStaticProps: GetStaticProps<GameDocPageProps> = async () => ({
  props: {
    doc: await loadGameDoc('hyper-drift-arcade', 'privacy-policy', 'tr'),
    lang: 'tr',
    path: '/games/hyper-drift-arcade/gizlilik-politikasi',
    alternatePath: '/games/hyper-drift-arcade/privacy-policy',
    gameTitle: 'Hyper Drift: Arcade',
    gamePath: '/games/hyper-drift-arcade',
    description: 'Hyper Drift: Arcade gizlilik politikası.',
  },
})

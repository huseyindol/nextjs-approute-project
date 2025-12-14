import Hero from '@/components/Hero'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Download: () => <div>Download Icon</div>,
  Github: () => <div>Github Icon</div>,
  Linkedin: () => <div>Linkedin Icon</div>,
  Mail: () => <div>Mail Icon</div>,
}))

describe('Hero Component', () => {
  it('should render hero section', () => {
    render(<Hero />)

    expect(screen.getByText(/Modern Web/i)).toBeInTheDocument()
  })

  it('should display greeting badge', () => {
    render(<Hero />)

    expect(screen.getByText(/Merhabalar/i)).toBeInTheDocument()
  })

  it('should render contact button', () => {
    render(<Hero />)

    const contactButton = screen.getByRole('button', {
      name: /İletişime Geç/i,
    })
    expect(contactButton).toBeInTheDocument()
  })

  it('should render CV download button', () => {
    render(<Hero />)

    const cvButton = screen.getByRole('button', { name: /CV İndir/i })
    expect(cvButton).toBeInTheDocument()
  })

  it('should render social links', () => {
    render(<Hero />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('should have proper section id', () => {
    const { container } = render(<Hero />)

    const section = container.querySelector('#about')
    expect(section).toBeInTheDocument()
  })
})

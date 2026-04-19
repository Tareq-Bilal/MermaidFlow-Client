import { Nav } from '@/components/shared';
import Hero from '@/components/Hero/Hero';
import { Container } from '@/components/shared/Container/Container';

export default function Home() {
  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/docs', label: 'Docs' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <main>
      <Container size="full">
        <Nav links={navLinks} />
      </Container>
      <Hero />
    </main>
  );
}
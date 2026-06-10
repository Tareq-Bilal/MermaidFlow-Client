import { Nav } from "@/components/shared";
import Hero from "@/components/Hero/Hero";
import { FeatureStrip } from "@/components/FeatureStrip/FeatureStrip";
import { MermaidEditorSection } from "@/components/mermaid/MermaidEditorSection/MermaidEditorSection";

export default function Home() {
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#editor", label: "Editor" },
    { href: "/documents", label: "My Documents" },
  ];

  return (
    <main>
      <Nav links={navLinks} />
      <Hero />
      <FeatureStrip />
      <MermaidEditorSection />
    </main>
  );
}

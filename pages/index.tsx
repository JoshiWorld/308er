import { Container } from "@components/Container";
import { CTA } from "@components/CTA";
import { Hero } from "@components/Hero";
import { Pricing } from "@components/Pricing";
import { SubHero } from "@components/SubHero";
import { Testimonials } from "@components/Testimonials";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container>
      <Hero />
      <SubHero />
      <Testimonials />
      {/* <Pricing /> */}
      <CTA />
    </Container>
  );
};

export default Home;

"use client";

import { useTranslations } from "next-intl";

import { Container, Section } from "@/components/locals/blocks/typography";
import { FullHDImage } from "@/components/locals/blocks/image";

export default function NotFound() {
  const tNotFound = useTranslations("app.not-found");

  return (
    <Section className="h-screen">
      <Container className="flex size-full items-center justify-center invert">
        <FullHDImage
          src={tNotFound("illustration.src")}
          alt={tNotFound("illustration.alt")}
          className="size-full object-contain"
        />
      </Container>
    </Section>
  );
}

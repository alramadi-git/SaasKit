import { getTranslations } from "next-intl/server";

import { GridPattern } from "@/components/magicui/grid-pattern";
import { Section, Container } from "@/components/locals/blocks/typography";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcn/card";
import Form from "@/components/locals/base/authentication/login/form";
import { FullHDImage } from "@/components/locals/blocks/image";

export default async function Page() {
  const tPage = await getTranslations("app.authentication.login.page");

  return (
    <main className="relative h-dvh overflow-hidden">
      <GridPattern className="top-1/2 left-1/2 size-[900px] -translate-1/2 skew-y-12 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]" />

      <Section className="flex size-full items-center justify-center">
        <Container className="flex items-center justify-center">
          <Card className="grid w-[1000px] gap-0 rounded-sm bg-transparent p-0 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-6 p-8">
              <CardHeader className="p-0">
                <CardTitle className="text-xl">{tPage("title")}</CardTitle>
                <CardDescription>{tPage("description")}</CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <Form />
              </CardContent>
            </div>

            <CardFooter className="p-0">
              <FullHDImage
                priority
                src={tPage("illustration.src")}
                alt={tPage("illustration.alt")}
                className="hidden size-full rounded-e-sm object-cover md:block dark:brightness-[0.2] dark:grayscale"
              />
            </CardFooter>
          </Card>
        </Container>
      </Section>
    </main>
  );
}

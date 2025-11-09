import { getTranslations } from "next-intl/server";
import {
  FaRegCopyright,
  FaLinkedinIn,
  FaXTwitter,
  FaMeta,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "@/components/locals/blocks/link";
import { FullHDImage } from "@/components/locals/blocks/image";
import {
  sectionClassName,
  Container,
} from "@/components/locals/blocks/typography";
import { cn } from "@/utilities/cn";

type tLink = {
  label: string;
  href: string;
};
type tNavigationMenu = {
  label: string;
  "sub-navigation-menu": tLink[];
};

type tSocial = {
  "aria-label": string;
  href: string;
};

const today = new Date();
const socialsIcons = [
  FaLinkedinIn,
  FaXTwitter,
  FaMeta,
  FaInstagram,
  FaYoutube,
  FaTiktok,
];

export default async function Footer() {
  const tFooter = await getTranslations("app.layout.footer");

  const navigationMenu: tNavigationMenu[] = tFooter.raw("navigation-menu");
  const socials = (tFooter.raw("outro.socials") as tSocial[]).map(
    (item, index) => ({
      icon: socialsIcons[index],
      ...item,
    }),
  );

  return (
    <footer className={cn(sectionClassName, "border-t !pb-0")}>
      <Container>
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Link href="/user" className="block size-fit">
                <FullHDImage
                  src={tFooter("logo.src")}
                  alt={tFooter("logo.alt")}
                  className="size-8 invert"
                />
              </Link>

              <h3 className="text-2xl font-bold">{tFooter("title")}</h3>
            </div>

            <p className="text-muted-foreground text-pretty">
              {tFooter("description")}
            </p>
          </div>

          <div className="xs:grid-cols-2 grid gap-6 sm:col-span-2 lg:col-span-4 lg:grid-cols-4">
            {navigationMenu.map((item, index) => (
              <div key={index} className="space-y-3">
                <h4 className="block text-lg font-medium">{item.label}</h4>

                <ul className="space-y-2 text-sm">
                  {item["sub-navigation-menu"].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-primary block duration-150"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6 text-sm">
          <p className="text-muted-foreground flex items-center gap-1.5">
            {tFooter.rich("outro.label", {
              copyright: () => <FaRegCopyright className="size-3" />,
              time: () => (
                <time dateTime={today.toString()}>{today.getFullYear()}</time>
              ),
              span: (chunk) => <span>{chunk}</span>,
            })}
          </p>
          <ul className="flex flex-wrap justify-center gap-3.5">
            {socials.map((item, index) => (
              <li key={index}>
                <Link
                  aria-label={item["aria-label"]}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={item.href}
                  className="text-muted-foreground hover:text-primary block duration-150"
                >
                  <item.icon className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

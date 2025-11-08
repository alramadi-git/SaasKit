import type { ComponentProps } from "react";

import Image from "next/image";

export function HDImage(
  props: Omit<ComponentProps<typeof Image>, "width" | "height">,
) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1280" height="720" />;
}

export function FullHDImage(
  props: Omit<ComponentProps<typeof Image>, "width" | "height">,
) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1920" height="1080" />;
}

export function _2KImage(
  props: Omit<ComponentProps<typeof Image>, "width" | "height">,
) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="2560" height="1440" />;
}

export function _4KImage(
  props: Omit<ComponentProps<typeof Image>, "width" | "height">,
) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="3840" height="2160" />;
}

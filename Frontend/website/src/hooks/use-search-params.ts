"use client";

import type { tUndefinable } from "@/types/nullish";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams as useNextJSSearchParams } from "next/navigation";

export function useSearchParams() {
  const router = useRouter();

  const pathname = usePathname();
  let searchParams = new URLSearchParams(useNextJSSearchParams().toString());

  function getOne(key: string): tUndefinable<string> {
    return searchParams.get(key) ?? undefined;
  }
  function getOneOrDefault(key: string, _default: string): string {
    return searchParams.get(key) ?? _default;
  }

  function getMany(keys: string[]): tUndefinable<string>[] {
    const values: tUndefinable<string>[] = [];
    for (const key of keys) values.push(getOne(key));

    return values;
  }
  function getManyOrDefault(keys: string[], defaults: string[]): string[] {
    if (keys.length !== defaults.length) {
      throw new Error("keys and defaults must have the same length");
    }

    const values = getMany(keys).map(
      (value, index) => value ?? defaults[index],
    );

    return values;
  }

  function setOne(key: string, value: string): void {
    searchParams.set(key, value);
  }
  function setMany(kv: Array<[string, string]>): void {
    for (const [key, value] of kv) setOne(key, value);
  }

  function deleteOne(key: string): void {
    searchParams.delete(key);
  }
  function deleteMany(keys: string[]): void {
    for (const key of keys) deleteOne(key);
  }

  function clear(): void {
    searchParams = new URLSearchParams();
  }

  function toString(): string {
    const urlString = searchParams.toString();
    return urlString === "" ? "" : `?${urlString}`;
  }

  function apply(options?: Parameters<typeof router.push>["1"]): void {
    router.push(`${pathname}${toString()}`, options);
  }

  return {
    getOne,
    getOneOrDefault,
    getMany,
    getManyOrDefault,
    setOne,
    setMany,
    deleteOne,
    deleteMany,
    clear,
    apply,
  };
}

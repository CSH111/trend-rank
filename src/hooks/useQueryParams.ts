import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQueryParams<T = {}>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = searchParams;
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  function setQueryParams(params: Partial<T>, reload?: boolean) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";
    if (reload) {
      router.push(`${pathname}${query}`, { scroll: false });
    } else {
      window.history.pushState({}, "", `${pathname}${query}`);
    }
  }

  return { queryParams, setQueryParams };
}

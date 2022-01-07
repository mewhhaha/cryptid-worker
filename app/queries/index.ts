import useQuery from 'swr'

export const useGetQuery = <A,>(url: string) => {
  return useQuery<A>(url, () => fetch(url).then(r => r.json()))
}

export type SimplePriceDataQuery<Coin extends string, Vs extends string> = Record<
  Coin,
  Record<Vs, number> & Record<`${Vs}_24h_change`, number | null>
>

export const useSimplePriceQuery = <Coin extends string, Vs extends string>(
  id: string | string[],
  vs: string extends Vs ? never : Vs,
) => {
  return useGetQuery<SimplePriceDataQuery<Coin, Vs>>(
    `https://api.coingecko.com/api/v3/simple/price?ids=${[id]
      .flat()
      .join()}&vs_currencies=${vs}&include_24hr_change=true`,
  )
}

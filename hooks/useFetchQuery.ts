import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {Colors} from "@/constants/Colors";


const endpoint = "https://pokeapi.co/api/v2";

type API ={
    "/pokemon?limit=21" : {
        count: number,
        next: string |null,
        results: {
            name: string,
            url: string,
        }[]
    },
    '/pokemon/[id]': {
        id: number,
        name: string,
        url: string,
        height: number,
        weight: number,
        moves:{
            move:
                {
                    name:string
                }
        }[],
        stats: {
            base_stat: number,
            stat: {
                name: string,
            }
        }[],
        cries:{
            latest: string,
        }
        types:{
            type:{
                name: keyof (typeof Colors)["type"],
            }
        }[]
    }
}

export function useFetchQuery<T extends keyof API>(path: T, params?: Record<string, string | number>) {
    const localUrl = Object.entries(params ?? {}).reduce((acc, [key, value]) => acc.replaceAll(`[${key}]`, value), path)
    return useQuery({
        queryKey: [localUrl],
        queryFn: async () => {
            await wait(1)
            return fetch(endpoint + localUrl, {
                headers: {
                    accept: "application/json",
                }
            }).then(res => res.json() as Promise<API[T]>)
        },
    });
}

export function useInfiniteFetchQuery<T extends keyof API>(path: string) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endpoint + path,
        queryFn: async ({pageParam}) => {
            await wait(1)
            return fetch(pageParam, {
                headers: {
                    accept: "application/json",
                }
            }).then(res => res.json() as Promise<API[T]>)
        },
        getNextPageParam: (lastPage) => {
            if ("next" in lastPage) {
                return lastPage.next
            }
            return null
        }
    })
}


function wait(duration: number) {
    return new Promise(resolve => {
        setTimeout(resolve, duration * 1000);
    });
}

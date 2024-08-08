import axios from 'axios'
import { useEffect, useState } from 'react'

export function useSerchBooks(category: string | undefined) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState<object>({})
    const [hasMore, setHasMore] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setBooks({})
        setPage(1)
    }, [category])

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let cancel: any
        setLoading(true)
        setError(false)
        axios({
            method: 'GET',
            url: `https://rickandmortyapi.com/api/${category}`,
            params: { page },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setBooks((prev) => {
                    return {
                        ...prev,
                        ...res.data.results.reduce(
                            (acc: object, item: { [key: string]: string | number }) => {
                                return { ...acc, [item.id]: item }
                            },
                            {},
                        ),
                    }
                })
                setLoading(false)
                setHasMore(!!res.data.info.next)
            })
            .catch((e) => {
                if (axios.isCancel(e)) {
                    return
                }
                console.error(e)
            })
        return () => cancel()
    }, [page, category])

    return { loading, error, books, hasMore, setPage }
}

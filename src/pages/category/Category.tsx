import { useCallback, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSerchBooks } from '../../hooks/use-fetch-items'
import { Grid } from '@mantine/core'

export const Category = () => {
    const { category } = useParams()

    const { books, loading, error, hasMore, setPage } = useSerchBooks(category)

    const observer = useRef<IntersectionObserver>()
    const lastNodeRef = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node: any) => {
            if (loading) return
            if (observer.current) {
                observer.current.disconnect()
            }
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1)
                }
            })
            if (node) {
                observer.current.observe(node)
            }
        },

        [loading, hasMore, setPage],
    )

    return (
        <div className='content'>
            <div className='category_menu'>
                <div className='category_list'>
                    <Grid grow gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                        {Object.values(books).map((item, index) => {
                            if (Object.values(books).length === index + 1) {
                                return (
                                    <Grid.Col
                                        key={item.id}
                                        span={{ base: 12, md: 6, lg: 3 }}
                                    >
                                        <Link
                                            ref={lastNodeRef}
                                            to={`${item.id}`}
                                            state={{ url: item.url }}
                                        >
                                            <h3>{item.name}</h3>
                                        </Link>
                                    </Grid.Col>
                                )
                            }
                            return (
                                <Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 3 }}>
                                    <Link to={`${item.id}`} state={{ url: item.url }}>
                                        <h3>{item.name}</h3>
                                    </Link>
                                </Grid.Col>
                            )
                        })}
                        {loading && <Grid.Col span={12}>Загрузка</Grid.Col>}
                        {error && <Grid.Col span={12}>Ошибка</Grid.Col>}
                    </Grid>
                </div>
            </div>
        </div>
    )
}

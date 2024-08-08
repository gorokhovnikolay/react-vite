import { lazy, Suspense } from 'react'

const componentName = (name: string) => {
    return lazy(() =>
        import(`../pages/${name}`).then((module) => {
            return { default: module[name] }
        }),
    )
}

export const Component = (props: { [key: string]: string }) => {
    const Component = componentName(props.name)
    return (
        <Suspense>
            <Component {...props} />
        </Suspense>
    )
}

import * as React from 'react'
import {useState} from 'react'
interface HooksExampleProps {}

export default function Test(props: HooksExampleProps) {
    const [count, setCount] = useState(0)

    React.useEffect(() => {
            const timer = setInterval(() => {
                setCount(count + 1)
            }, 1000)

            return () => clearTimeout(timer)
        },[count])

    return <div>Count: {count}</div>
}
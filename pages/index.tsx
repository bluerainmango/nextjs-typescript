import { useEffect } from "react"
import play from '../playground'

export default function Home() {
  const message:string = "Hello world"
  const age:number = 2

  useEffect(() => {
    play()
  }, )

  return <div>Hello world</div>;
}

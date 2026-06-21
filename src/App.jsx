import { useState } from 'react'
import './App.css'
import { Title } from "./assets/styles";
import { Container } from "./assets/styles";
import { P } from "./assets/styles";
import { Button } from "./assets/styles";


function App() {
  const [count, setCount] = useState(0)
  const [cont, setCont] = useState(0)

  return (
    <>
      <section id="center">

        <Container>
          <Title>Neymar Jr</Title>
          <h2>Footballer</h2>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti fugiat molestias a ducimus excepturi dolor rerum officia aspernatur itaque ad magni, eum deserunt cumque, provident explicabo officiis porro eos quod?
          </P>
        </Container>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 100)}
        >
          Count is {count}
        </button>

        <Button type='button' className='cont'
          onClick={() => setCont((cont) => cont + 3)}
        >

          Count is {cont}
        </Button>
      </section>



    </>
  )
}




export default App

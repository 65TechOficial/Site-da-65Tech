import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Container } from './styles/GlobalStyle'


function Home() {


  return (

    <Container>
      <TopBackGrond>
        <img src="" alt="" />
      </TopBackGrond>
      <Form>
        <Title>Cadastrar Usuarios</Title>
      </Form>

      <ContainerInputs>
        <div>
          <div>
            <InputLabel>Nome <span>*</span></InputLabel>
            <Input type="text" placeholder="Nome" />
          </div>

          <div>
            <InputLabel>Idade <span>*</span></InputLabel>
            <Input type="number" placeholder="Idade" />

          </div>
        </div>

        <div>
          <InputLabel>Email <span>*</span></InputLabel>
          <Input type="email" placeholder="Email" />
        </div>
      </ContainerInputs>
      <Button>Cadastrar Usuario</Button>
    </Container>
  )
};

export default Home

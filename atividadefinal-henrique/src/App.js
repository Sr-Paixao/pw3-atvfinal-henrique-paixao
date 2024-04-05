import { useState, useEffect } from 'react'

import Input from '../src/Components/Input/Input'
import Select from '../src/Components/Select/Select'


export default function App() {
  const [sigla, setSigla] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/sigla', {
      method: 'GET',
      headers: {
        'Content-Type': 'aplication/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSigla(data)
        console.log(data)
      })

      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <section>
      <h1>Turma</h1>

      <form>
        <Input
          type="text"
          name="nome_livro"
          id="nome_livro"
          placeholder="Nome"
          text="Digite o nome da turma"
        />

        <Select
          name="categoria-id"
          text="Selecione a sigla da turma"
          options={sigla}
        />

        <p>
          <button type="submit">Enviar</button>
        </p>
      </form>
    </section>
  )
}

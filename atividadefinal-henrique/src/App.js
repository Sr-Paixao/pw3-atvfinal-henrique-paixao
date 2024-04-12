import { useState, useEffect } from 'react'

import Input from '../src/Components/Input/Input'
import Select from '../src/Components/Select/Select'


export default function App() {
  const [turma, setTurma] = useState({})
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

  function handleChangeTurma(event) {
    setTurma({ ...turma, [event.target.name]: event.target.value })
    console.log(turma)
  }

  function handleChangeSigla(event) {
    setTurma({
      ...turma,
      sigla: {
        id: event.target.value,
        sigla: event.target.options[event.target.selectedIndex].text,
      },
    })
  }

  console.log(turma)



  function createTurma(turma) {
    fetch('http://localhost:5000/turmas', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify(turma),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function submit(event) {
    event.preventDefault()
    createTurma(turma)
    
  }



  return (
    <section>
      <h1>Turma</h1>

      <form onSubmit={submit}>
        <Input
          type="text"
          name="turma"
          id="turma"
          placeholder="turma"
          text="Digite o nome da turma"
          handlerOnChange={handleChangeTurma}
        />

        <Select
          name="categoria-id"
          text="Selecione a sigla da turma"
          options={sigla}
          handlerOnChange={handleChangeSigla}
        />

        <p>
          <button type="submit">Enviar</button>
        </p>
      </form>
    </section>
  )
}

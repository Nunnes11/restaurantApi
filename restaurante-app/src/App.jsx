import {getPratos} from './api/restaurante'
import { useState, useEffect } from 'react'
import {Box, Container, Typography  } from '@mui/material'
import CardPrato from './componentes/CardPrato'

function App() {
  const [pratos, setPratos] = useState()
  const [erro, setErro] = useState(false)
  const [carregando, setCarregando] = useState(false)
  
  useEffect(() => {
      setCarregando(true)
      setErro(false)
      const resposta = getPratos();
      resposta.then((dados) => {
        setPratos(dados.data);
      }).catch(() => {
        setErro(true)
      }).finally(() => {
        setCarregando(false)
      })
    }, []);
  
  return (
    <Container fixed>
      {carregando && <span>Carregando</span>}
      {erro && <span>Erro ao carregar pratos</span>}
      <Typography gutterBottom variant="h2" component="div" sx={{textAlign: 'center'}}>
        Cardápio
      </Typography>
      {(pratos && pratos.length > 0) && <Box>
        {pratos.map((prato) => (
          <CardPrato key={prato.id} prato={prato}/>
        ))}
      </Box>
    }
    </Container>
  )
}

export default App

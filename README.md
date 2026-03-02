# game4me

Aplicação web para recomendação de jogos gratuitos com filtros por gênero, plataforma e memória RAM mínima.
Desenvolvida com React e TypeScript, utilizando componentização e gerenciamento de estado com hooks.
Os dados são consumidos da API pública FreeToGame, com proxy configurado no Vite para evitar problemas de CORS.
Permite seleção múltipla de filtros e tratamento de estados de carregamento e erro.
Inclui filtragem adicional por requisitos mínimos de sistema a partir do endpoint de detalhes dos jogos.

## Como rodar o projeto
Utilizando npm

```bash
npm install
npm run dev
```

O projeto abrirá em http://localhost:5173 (ou outra porta gerada pelo Vite).
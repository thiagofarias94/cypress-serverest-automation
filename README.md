# Cypress ServeRest Automation

Este projeto implementa uma suíte de testes E2E em Cypress para o frontend e para a API do ServeRest, com relatórios HTML/Mochawesome e integração com GitHub Actions.

## Estrutura
- Frontend: cenários de cadastro, login e validação de acesso
- API: cenários de criação de usuário, login e fluxo de carrinho
- CI/CD: execução automática em cada push/PR via GitHub Actions

## Como executar localmente

```bash
npm ci
npm run test:e2e
```

Para gerar relatórios:

```bash
npm run test:ci
```

Os relatórios ficam em `cypress/reports/`.

## CI/CD
O workflow em `.github/workflows/cypress.yml` executa a suíte automaticamente e publica os artefatos de execução (`reports`, `screenshots` e `videos`).

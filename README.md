# Cypress ServeRest Automation

Este projeto implementa uma suíte de testes E2E em Cypress para o frontend e a API do ServeRest, com relatórios HTML/Mochawesome e integração com GitHub Actions.

## Estrutura
- Frontend: cenários de cadastro, login e validação de acesso
- API: cenários de criação de usuário, login, fluxo de carrinho e cenários negativos
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

Os relatórios ficam em `cypress/reports/` e o HTML publicado pelo workflow pode ser acessado na página do GitHub Pages do repositório.

## GitHub Pages
O relatório HTML gerado pelo workflow é publicado em:

https://thiagofarias94.github.io/cypress-serverest-automation/

## Relatórios e Checks
- O workflow publica os artefatos de execução em cada run: `reports`, `screenshots` e `videos`
- O status dos checks do GitHub Actions aparece na aba de Actions do repositório
- O relatório HTML consolidado pode ser visualizado no GitHub Pages quando a publicação estiver habilitada

## CI/CD
O workflow em `.github/workflows/cypress.yml` executa a suíte automaticamente e publica os artefatos de execução (`reports`, `screenshots` e `videos`).

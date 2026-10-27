# GUIA DE RESOLUÇÃO E HOSPEDAGEM NO CPANEL — BOM SAMARITANO

Se o site está a mostrar uma PÁGINA EM BRANCO no cPanel, 99% das vezes é devido a um destes 3 motivos:

---

### 🚨 MOTIVO 1: CARREGAR O CÓDIGO FONTE EM VEZ DOS FICHEIROS COMPILADOS
- Um servidor cPanel tradicional com Apache **NÃO executa ficheiros TypeScript (`.tsx`), JSX ou a pasta `src/`**.
- O que deve estar dentro da pasta `public_html/` no cPanel são APENAS os ficheiros gerados na pasta `dist/`:
  - `index.html` (deve ficar diretamente dentro de public_html)
  - pasta `assets/` (com os ficheiros .js e .css)
  - `.htaccess` (ficheiro de configuração Apache)
  - pasta `downloads/` (se existir)

⚠️ NUNCA envie as pastas `src/`, `node_modules/`, `package.json` para o `public_html`. O navegador não consegue ler esses ficheiros e a página fica branca!

---

### 🚨 MOTIVO 2: CARREGAR A PASTA "dist" COMO UMA PASTA DENTRO DE "public_html"
- Se carregar e extrair deixando o caminho como `public_html/dist/index.html`, o seu domínio `seusite.com` ficará em branco porque o `index.html` não está na raiz!
- **Solução:** No Gestor de Ficheiros do cPanel, entre dentro da pasta `dist`, selecione todos os ficheiros e clique em "Mover" (Move) para `public_html/`.

---

### 🚨 MOTIVO 3: CAMINHOS ABSOLUTOS DE ASSETS (JÁ CORRIGIDO NO VITE!)
- Corrigimos o `vite.config.ts` com `base: './'`.
- Agora os ficheiros JavaScript e CSS utilizam caminhos relativos (`./assets/...`). Isto impede que o cPanel retorne erro 404 ao carregar os scripts quando hospedado na raiz, em subpastas ou em domínios adicionais.
- O `.htaccess` atualizado na pasta `public/` inclui as regras corretas de MIME Type (`AddType application/javascript js mjs`), compressão GZIP e reescrita de rotas SPA.

---

## 🛠️ PASSO A PASSO PARA PUBLICAR NO CPANEL SEM ERROS

1. Execute a compilação no terminal:
   ```bash
   npm run build
   ```
2. Abra a pasta `dist/` gerada no seu projeto.
3. Selecione TODOS os itens dentro de `dist/`:
   - `index.html`
   - pasta `assets/`
   - `.htaccess` (Certifique-se de ativar "Mostrar ficheiros ocultos" no seu explorador/cPanel)
4. Comprima esses itens num ficheiro ZIP (ex: `site-pronto.zip`).
5. Aceda ao cPanel:
   - Abra o **Gestor de Ficheiros** (File Manager).
   - No canto superior direito, clique em **Definições** (Settings) e ative a opção: **"Mostrar ficheiros ocultos (dotfiles)"**.
   - Abra a pasta **`public_html`**.
   - Se houver ficheiros antigos de teste, remova-os ou faça backup.
   - Clique em **Carregar** (Upload) e envie o `site-pronto.zip`.
   - Clique com o botão direito no zip no cPanel e selecione **Extrair** (Extract).
6. Confirme que o ficheiro `index.html` está imediatamente dentro de `public_html`.
7. Abra o seu domínio no navegador e faça `Ctrl + F5` (ou `Cmd + Shift + R`) para limpar a cache do navegador.
8. O site carregará instantaneamente com design e funcionalidades 100% operacionais!

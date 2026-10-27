# GUIA COMPLETO DE HOSPEDAGEM — BOM SAMARITANO AGÊNCIA DE VIAGENS E TURISMO

Este pacote contém todos os ficheiros necessários para colocar o site da **BOM Samaritano** online em qualquer serviço de alojamento/hospedagem web.

---

## 📁 QUAL FICHEIRO ZIP ESCOLHER?

1. **`bomsamaritano-dist-pronto-hospedagem.zip`** (RECOMENDADO para Hospedagem Web / cPanel / Hostinger):
   - Já vem compilado e pronto para uso imediato (HTML, CSS, JS minificados, imagens).
   - Basta extrair os ficheiros diretamente para a pasta `public_html` da sua hospedagem.
   - Não necessita de instalar Node.js nem de compilar código.
   - Já inclui o `.htaccess` configurado para cPanel/Apache e `_redirects` para Netlify/Cloudflare.

2. **`bomsamaritano-codigo-fonte-completo.zip`** (Para Desenvolvedores / Hospedagem Node.js):
   - Contém todo o código fonte original em TypeScript, React, Vite, Tailwind CSS e o servidor Express (`server.ts`).
   - Ideal para hospedar em VPS (Ubuntu, Debian), Render, Railway, DigitalOcean, Heroku ou para continuar a desenvolver localmente com `npm run dev`.

---

## 🚀 OPÇÃO 1: HOSPEDAGEM TRADICIONAL (cPanel, Hostinger, GoDaddy, Locaweb, etc.)

1. Aceda ao painel da sua hospedagem (ex: **cPanel**).
2. Abra o **Gestor de Ficheiros** (File Manager) e entre na pasta **`public_html`** (ou a pasta do seu domínio).
3. Faça o upload do ficheiro **`bomsamaritano-dist-pronto-hospedagem.zip`**.
4. Clique com o botão direito no ficheiro e escolha **Extrair** (Extract).
5. Certifique-se de que o ficheiro `index.html` e a pasta `assets` fiquem na raiz de `public_html`.
6. O ficheiro `.htaccess` (já incluído no zip) garante que todas as rotas e páginas abram sem erro 404 e ativa a compressão GZIP para máxima rapidez.
7. Pronto! O seu site está no ar com SSL/HTTPS!

---

## ⚡ OPÇÃO 2: HOSPEDAGEM GRATUITA & ULTRA RÁPIDA (Vercel ou Netlify)

### Na Vercel (Recomendado):
1. Aceda a [vercel.com](https://vercel.com) e crie uma conta gratuita.
2. Pode conectar o seu repositório GitHub ou arrastar a pasta descompactada para a Vercel.
3. Se fizer upload do código fonte completo:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. A Vercel atribui um link HTTPS imediato e permite ligar o seu domínio próprio gratuitamente.

### No Netlify:
1. Aceda a [netlify.com](https://netlify.com).
2. Vá até a aba "Sites" e simplesmente **arraste e solte a pasta `dist`** no Netlify Drop.
3. O site é publicado em menos de 10 segundos!

---

## 🖥️ OPÇÃO 3: HOSPEDAGEM COM SERVIDOR NODE.JS (VPS / Render / Railway)

Para ter o backend Express a rodar as APIs em tempo real:
1. No seu servidor VPS com Node.js 18+:
   ```bash
   # Extrair o zip do código fonte
   unzip bomsamaritano-codigo-fonte-completo.zip
   cd bomsamaritano

   # Instalar dependências
   npm install

   # Compilar projeto
   npm run build

   # Iniciar o servidor de produção
   npm start
   ```
2. Para manter o processo ativo continuamente 24/7, instale e use o **PM2**:
   ```bash
   npm install -g pm2
   pm2 start dist/server.cjs --name "bomsamaritano"
   pm2 startup
   pm2 save
   ```
3. Aponte o Nginx com proxy reverso para `http://localhost:3000`.

---

## 📞 CONTACTOS E SUPORTE DA AGÊNCIA
- **Agência:** BOM Samaritano — Agência de Viagens e Turismo
- **Endereço:** Av. Eduardo Mondlane, Paragem Belita, Maputo, Moçambique
- **Telefone:** +258 865 606 060
- **WhatsApp:** +258 852 808 080
- **E-mail:** bomsamaritanoavt@outlook.com

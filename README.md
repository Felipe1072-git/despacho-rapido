# Despacho Rápido

Ferramenta pra despachante: cola a mensagem do cliente no WhatsApp e/ou anexa os documentos, confere os dados e gera a **procuração particular em PDF**, sempre no mesmo layout.

**Abrir:** https://felipe1072-git.github.io/despacho-rapido/

## O que ele lê

- **Mensagem do WhatsApp**, do jeito que veio (com data, hora e nome do contato).
- **ATPV-e** em PDF: comprador (vira o outorgante) e veículo. Os dados do vendedor ficam de fora.
- **CRLV-e** em PDF: dados do veículo.
- **CNH digital** (PDF do gov.br): nome, CPF e RG, lidos da imagem do cartão (OCR).
- **Word (.docx)**: fichas com rótulos tipo "Nome: ..." ou em tabela.

Os campos aparecem coloridos: verde, quando veio da mensagem ou do documento; amarelo, quando é bom conferir; vermelho, quando está faltando ou inválido.

## Primeira vez

1. Abra o link no Chrome ou no Edge e clique em **Instalar no computador**, se quiser o ícone na área de trabalho.
2. Em **⚙ Meus dados**, clique em **Importar do meu modelo Word** e escolha a sua procuração em .docx. O app pega os outorgados, os logos do cabeçalho e o rodapé.
3. Clique em **Salvar backup** e guarde o arquivo. Se trocar de computador ou limpar o navegador, é só restaurar.

## Privacidade

Tudo roda no próprio navegador. Mensagens, documentos dos clientes e "Meus dados" **não são enviados pra nenhum servidor**; o site só entrega o código da página. "Meus dados" fica guardado no navegador de quem usa.

## Atualizações

Quando o app muda, a versão nova chega sozinha na próxima vez que abrir. Não precisa reinstalar.

## Outras formas de usar (se não quiser este endereço)

O app é só uma pasta com arquivos (`index.html`, `tessdata/`, `icons/`, `sw.js`, `manifest.webmanifest`). Dá pra hospedar em qualquer lugar:

| Opção | Endereço | Custo | Observação |
|---|---|---|---|
| Como está hoje | felipe1072-git.github.io/despacho-rapido | Grátis | Atualizações feitas pelo Paulo |
| GitHub próprio | seu-usuario.github.io/despacho-rapido | Grátis | Cria uma conta no GitHub e o repositório é transferido pra ela |
| Domínio próprio | ex.: despachorapido.com.br | ~R$ 40/ano no Registro.br | Aponta o domínio pro GitHub Pages ou pra Cloudflare Pages (grátis) |
| Cloudflare Pages + login | ex.: despacho.pages.dev | Grátis | Dá pra exigir login por e-mail pra abrir (Cloudflare Access) |
| Pasta no computador | abre o `index.html` direto | Grátis | Precisa de internet pra carregar as bibliotecas e não atualiza sozinho |

Em todas as opções, os dados dos clientes continuam só no computador de quem usa.

## Como funciona (técnico)

Página única (`index.html`), sem build:

- leitura da mensagem por regras (regex), sem IA;
- PDFs lidos com pdf.js (rótulo e o valor logo abaixo dele);
- Word lido com mammoth e JSZip;
- OCR com tesseract.js, usando o idioma português em `tessdata/por.js`;
- PDF gerado com pdf-lib.

O `sw.js` guarda uma cópia do app pra abrir sem internet.

# Agenda Psi · Bárbara Serra

Aplicativo de agenda e prontuário para psicologia (CRP 20/13.134), com pacientes, protocolos, financeiro e compromissos pessoais.

**App:** https://psibarbaraserra-art.github.io/agenda-psi/
**Ficha de cadastro para pacientes:** https://psibarbaraserra-art.github.io/agenda-psi/ficha/

## Instalar no celular
- **Android (Chrome):** abra o link, menu ⋮ → *Instalar aplicativo* / *Adicionar à tela inicial*.
- **iPhone (Safari):** abra o link, botão Compartilhar → *Adicionar à Tela de Início*.

## Trazer os dados do artefato
1. No artefato antigo: rodapé → **Baixar cópia de segurança**.
2. No app: rodapé → **Importar cópia de segurança** e escolha o arquivo.

## Cuidados
- Os dados ficam **só neste aparelho** (não sincronizam entre celular e computador).
- Faça a cópia de segurança com frequência; limpar os dados do navegador apaga tudo.
- Anexos (PDF/imagem) ficam no aparelho e **não** entram na cópia de segurança.

## Cadastro direto (sem código)
O paciente preenche a ficha e o cadastro vai para uma planilha do Google da psicóloga. O app busca os cadastros novos ao abrir (e no botão **Buscar cadastros recebidos**, na aba Pacientes).

1. Crie uma planilha no Google Sheets. Em **Extensões > Apps Script**, apague o conteúdo e cole o arquivo `receber-cadastros.gs`.
2. Troque `TROQUE-AQUI` por uma senha só sua.
3. **Implantar > Nova implantação > Aplicativo da Web**: executar como **Eu**, acesso para **Qualquer pessoa**. Autorize e copie o endereço terminado em `/exec`.
4. No GitHub, edite o arquivo `config.js` e cole o endereço entre as aspas de `endpoint`.
5. No app, toque em **Buscar cadastros recebidos** e digite a senha uma vez.

Se a conexão do paciente falhar, a ficha mostra o código de cadastro para enviar pelo WhatsApp, como antes.

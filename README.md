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

## Atividades terapêuticas
**Link:** https://psibarbaraserra-art.github.io/agenda-psi/atividades/ (também na aba Pacientes da Agenda → *Abrir atividades*)

Biblioteca com 44 atividades interativas de **TCC**, **Psicologia Humanista** (ACP, Gestalt, Existencial) e **DBT**, com filtro por abordagem e demanda, referência bibliográfica em cada uma e versão para imprimir.

1. Na **Biblioteca**, toque em *Selecionar* nas atividades (use *Ver e testar* para preencher como paciente).
2. Em **Enviar**, escreva o primeiro nome do paciente, um recado e o prazo, e toque em *Gerar link* → *Enviar pelo WhatsApp*.
3. O paciente aceita o termo de consentimento, faz as atividades (fica salvo no celular dele) e toca em *Enviar*.
4. Em **Respostas**, toque em *Buscar respostas* (ou cole a mensagem do WhatsApp) e use *Imprimir / PDF* para guardar no prontuário.

Para receber direto na planilha, atualize o Apps Script com o novo `receber-cadastros.gs` (versão 4) e faça *Nova versão* da implantação. As respostas vão para a aba "Atividades"; os cadastros continuam funcionando como antes.

Para incluir ou mudar atividades, edite `atividades/catalogo.js` (o formato está explicado no topo do arquivo).

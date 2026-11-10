# Agenda Psi · Bárbara Serra

Aplicativo de agenda e prontuário para psicologia (CRP 20/13.134), com pacientes, protocolos, financeiro e compromissos pessoais.

**App:** https://psibarbaraserra-art.github.io/agenda-psi/

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

## Cadastro de pacientes
O cadastro (nome, CPF, nascimento etc.) é feito **só pela psicóloga**, no botão **Novo paciente** da aba Pacientes. A antiga ficha pública que o paciente preenchia foi desativada: o endereço `ficha/` agora mostra apenas um aviso.

## Atividades terapêuticas
**Link:** https://psibarbaraserra-art.github.io/agenda-psi/atividades/ (também na aba Pacientes da Agenda → *Abrir atividades*)

Biblioteca com 44 atividades interativas de **TCC**, **Psicologia Humanista** (ACP, Gestalt, Existencial) e **DBT**, com filtro por abordagem e demanda, referência bibliográfica em cada uma e versão para imprimir.

1. Na **Biblioteca**, toque em *Selecionar* nas atividades (use *Ver e testar* para preencher como paciente).
2. Em **Enviar**, escreva o primeiro nome do paciente, um recado e o prazo, e toque em *Gerar link* → *Enviar pelo WhatsApp*.
3. O paciente aceita o termo de consentimento, faz as atividades (fica salvo no celular dele) e toca em *Enviar*.
4. Em **Respostas**, toque em *Buscar respostas* (ou cole a mensagem do WhatsApp) e use *Imprimir / PDF* para guardar no prontuário.

Para receber direto na planilha, atualize o Apps Script com o novo `receber-cadastros.gs` (versão 5) e faça *Nova versão* da implantação. As respostas vão para a aba "Atividades". Essa versão não aceita mais cadastros de pacientes.

Para incluir ou mudar atividades, edite `atividades/catalogo.js` (o formato está explicado no topo do arquivo).

## Cópias de segurança do aplicativo
A cada atualização publicada, o GitHub guarda sozinho um .zip com todos os arquivos do app em **Releases** (página do repositório → *Releases*, ou https://github.com/psibarbaraserra-art/agenda-psi/releases). As cópias antigas ficam guardadas.
Para fazer uma cópia na hora: aba **Actions → Cópia de segurança → Run workflow**.

Atenção: essa cópia é do **aplicativo**. Os dados dos pacientes ficam no seu aparelho; continue usando **Baixar cópia de segurança** no rodapé da Agenda.

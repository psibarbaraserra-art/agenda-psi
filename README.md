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
- Os dados ficam no aparelho. Para usar no celular e no computador com os mesmos dados, ative a **sincronização** (veja abaixo).
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

Para receber direto na planilha, atualize o Apps Script com o novo `receber-cadastros.gs` (versão 6) e faça *Nova versão* da implantação. As respostas vão para a aba "Atividades". Essa versão não aceita mais cadastros de pacientes.

Para incluir ou mudar atividades, edite `atividades/catalogo.js` (o formato está explicado no topo do arquivo).

## Cópias de segurança do aplicativo
A cada atualização publicada, o GitHub guarda sozinho um .zip com todos os arquivos do app em **Releases** (página do repositório → *Releases*, ou https://github.com/psibarbaraserra-art/agenda-psi/releases). As cópias antigas ficam guardadas.
Para fazer uma cópia na hora: aba **Actions → Cópia de segurança → Run workflow**.

Atenção: essa cópia é do **aplicativo**. Os dados dos pacientes ficam no seu aparelho; continue usando **Baixar cópia de segurança** no rodapé da Agenda.

## Sincronizar celular e computador
1. Atualize o Apps Script da planilha com o `receber-cadastros.gs` **versão 6** (mantendo a sua senha) e faça *Implantar → Gerenciar implantações → lápis → Nova versão → Implantar*.
2. No aparelho que já tem os dados, vá ao rodapé da Agenda e toque em **Sincronizar com outros aparelhos**. Digite a senha da planilha e crie uma **senha de sincronização** (mínimo 8 caracteres).
3. No outro aparelho, faça o mesmo e digite a **mesma** senha de sincronização. Os dados aparecem sozinhos.

Depois disso a Agenda sincroniza sozinha: ao abrir, ao voltar para o app, a cada 3 minutos e alguns segundos depois de cada mudança.

- Os dados são **criptografados no aparelho** antes de irem para a planilha (aba "Sincronizacao"): o Google só vê um texto embaralhado.
- **Guarde a senha de sincronização.** Sem ela não é possível recuperar a cópia sincronizada (a cópia de segurança em arquivo continua valendo).
- Anexos (PDF e imagens) **não** são sincronizados.

## Avaliações (escalas de rastreio)
Em **Atividades → Avaliações** (ou Pacientes → *Avaliações (escalas)*): PHQ-9, GAD-7, DASS-21, WHO-5, SRQ-20, AUDIT e Escala de Autoestima de Rosenberg, todas de uso livre. Envie pelo mesmo link das atividades; na aba **Respostas** aparecem o escore, a faixa e os alertas (ex.: ideação suicida). O paciente não vê o resultado.

São instrumentos de rastreio: não substituem a avaliação psicológica e não são testes do SATEPSI. Antes do primeiro uso, confira os textos dos itens com os artigos de validação citados em cada escala. Para incluir uma escala, edite `atividades/avaliacoes.js`.

## TDAH, questionários e documentos
- **Avaliações → Escalas:** também ASRS-18 (adulto), SNAP-IV (pais ou professores; desatenção, hiperatividade e oposição) e Tabela exploratória TDAH adulto.
- **Avaliações → Questionários e anamneses:** anamnese adulto, anamnese infantil (responsáveis), entrevista para responsáveis/escola e perguntas sobre atenção (adulto). Não pedem nome, CPF, nascimento, endereço nem telefone.
- **Documentos:** modelos de declaração, atestado, relatório, relatório de TDAH (infantil), laudo e o roteiro de entrevista de rastreamento de TDAH, com cabeçalho e assinatura para imprimir ou salvar em PDF. Ao digitar o nome, os dados do cadastro da Agenda são sugeridos. Também tem os materiais de apoio (ferramentas digitais e legislação sobre TDAH).
- Escalas de Conners não foram incluídas (direitos autorais da MHS).
Para editar: `atividades/avaliacoes.js`, `atividades/questionarios.js` e `atividades/documentos.js`.
- **Documentos (início do atendimento):** anamnese completa (adulto), termo de consentimento, contrato terapêutico e plano terapêutico. **Criança e adolescente:** anamnese infantil completa, autorização dos responsáveis e termo de ciência e orientações sobre sigilo. Os termos saem com assinatura do paciente ou do responsável, e todos podem ser impressos em branco.
- Para o paciente, as escalas aparecem como **rastreio**, os questionários como **questionário** e as atividades como **atividade**.

## TEA (autismo)
- **Rastreios → TEA:** QA/AQ-50 (adultos, versão brasileira 2017) e ATA (Escala de Avaliação de Traços Autísticos), com correção automática.
- **Questionários → TEA:** anamnese TEA (responsáveis), entrevista TEA adulto e 20 perguntas norteadoras.
- **Documentos → TEA:** relatório de avaliação de TEA, anamnese TEA e entrevista TEA adulto com identificação, e roteiro de observação de sinais em bebês.
- Não incluídos (pagos, com treinamento ou com direitos autorais): CARS/CARS-2, GARS-2, ADI-R, Portage, M-CHAT-R/F digital, ABC/ICA e avaliação intraverbal. Eles aparecem listados na aba Rastreios.
- Os rastreios e questionários agora aparecem agrupados por tema.

## Bipolaridade, burnout e borderline
- **Rastreios:** MDQ (bipolaridade), CBI – Inventário de Burnout de Copenhague e MSI-BPD (borderline), com correção automática e alerta de autolesão no MSI-BPD.
- Na lista "Escalas que não estão no app", cada instrumento pago ou com licença tem o link de onde adquirir ou solicitar (MBI, SCID-5-PD, PAI, Beck, IDATE, CARS, ADI-R etc.).

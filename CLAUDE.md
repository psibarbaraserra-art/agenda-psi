# Agenda Psi · instruções para o Claude

## Cópia de segurança (sempre)
Antes de alterar qualquer arquivo deste projeto:
1. Gere uma cópia completa do estado atual: `git archive --format=zip --prefix=agenda-psi/ -o <scratchpad>/agenda-psi-backup-$(date +%Y-%m-%d_%H%M).zip HEAD` e envie o .zip para a usuária.
2. Só depois faça as mudanças.

Ao publicar na versão principal (`main`), o workflow `.github/workflows/copia-de-seguranca.yml`
guarda automaticamente uma cópia .zip em Releases. Não apague nem desative esse workflow nem as Releases `copia-*`.

## Contexto
- App estático (GitHub Pages) da psicóloga Bárbara Serra Oliveira, CRP 20/13.134. Textos em português do Brasil.
- Dados dos pacientes ficam só no aparelho (localStorage); a cópia desses dados é feita pela própria usuária no app ("Baixar cópia de segurança").
- Não coletar dados pessoais (nome completo, CPF, nascimento) em páginas abertas ao paciente: o cadastro é feito só pela psicóloga na Agenda.

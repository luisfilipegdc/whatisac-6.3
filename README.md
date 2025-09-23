# **WhaTicket SaaS**

Plataforma de atendimento **Whaticket Gold** com módulo Kanban, modo noturno e integrações avançadas. Distribuído por Launcher & Co.

### **✨ Funcionalidades e Integrações**

  * **Kanban** para gestão de tickets
  * **Modo noturno**
  * **Integrações:**
      * DialogFlow
      * N8N
      * WebHooks
      * TypeBot
      * ChatGPT

### **💻 Requisitos do Sistema**

Para um bom desempenho, recomendamos um servidor com as seguintes especificações mínimas:

  * **Sistema Operacional:** Ubuntu 22.04 LTS
  * **vCores:** 4 ou mais
  * **RAM:** 8 GB ou mais
  * **Latência:** Idealmente entre 10ms e 150ms. Evite latência muito baixa < 10ms (servidores locais) ou muito alta > 200ms.
  * **Observação:** A versão NodeJS 20 é necessária para a instalação.

#### **Opções de VPS Recomendadas:**

| Provedor | Plano | vCores | RAM | SSD NVMe | Preço Mensal | Cupom de Desconto |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Peramix** | Basic | 4 | 6 GB | 100 GB | $4.99 USD | `WHATICKET` (25% no 1º pagamento) |
| **Peramix** | Standard | 6 | 12 GB | 200 GB | $9.99 USD | `WHATICKET` (25% no 1º pagamento) |
| **Netcup** | VPS 1000 G11 | 4 | 8 GB | 256 GB | €5.75 | `36nc17542354680` (5 euros de voucher) |
| **Netcup** | VPS 2000 G11 | 8 | 16 GB | 512 GB | €12.60 USD | `36nc17542354680` (5 euros de voucher) |

Você pode adquirir os planos através dos links:

  * [Peramix](https://control.peramix.com/?affid=14)
  * [Netcup](https://www.netcup.com/en/?ref=283810)

### **🔄 Histórico de Versões**

#### **Versão 6.3.0** (`20/09/2025`)

  * Correção de bugs relacionados a JID/LID.

#### **Versão 6.0.0** (`16/04/2025`)

  * **Interface:**
      * Aprimoramentos no Dark Mode (mensagens).
      * Botão `Light/Dark` movido para o perfil do usuário.
      * Dashboard: alteração nos estilos dos cards (botão de impressão removido).
      * Estilo de ticket alterado.
      * Layouts reformulados para: Respostas Rápidas, Página de Conexão, Tela de Login e Tela de Signup.
      * Adicionada opção de `SuperAdmin`.
  * **Funcionalidades:**
      * Botão de tradução adicionado.
      * Aviso exibido quando o ticket de um contato está aberto.
  * **Correções:**
      * Correção no envio de menu de filas (na 3ª tentativa, o ticket é enviado para a 1ª fila).
      * Agendamento agora envia imagem com texto e suporta ciclos.
      * Correção de vazamento no WebSocket.

#### **Versão 5.5.0** (`13/12/2024`)

  * **Interface:**
      * Dashboard, Kanban e página de relatórios reformulados.
      * Validação de número em `ContactModal`.
  * **Funcionalidades:**
      * Recusa automática de chamadas.
      * Filas da conexão ao requisitar novo QR Code.
      * Áudio no iPhone.
      * Regressão OpenAI.
  * **Correções:**
      * Correção ao redimensionar a área de tickets.

#### **Versão 5.3.5** (`07/11/2024`)

  * **Funcionalidades:**
      * Automações não são mais enviadas para grupos.
      * Botão `disableBot` para desativar bots ou automações.
      * Permissão para conexões com o mesmo nome.
      * Opção de selecionar e deletar contatos na página de Contatos.
      * Atualização automática do valor na lista do Financeiro após alteração de plano.
  * **Correções:**
      * Correção da data de vencimento no topo (agora fixa).
      * Correção na mensagem citada.
      * Correção no envio de áudio OGG em respostas rápidas.
      * Expiração automática de conexões ao vencer a empresa.
  * **Alterações:**
      * Abas de visualização de tickets fechados e grupos por operador removidas do painel de usuários.

#### **Versão 5.2.6** (`24/07/2024`)

  * Fechamento de todos os tickets abertos ou em espera.
  * Capacidade de reagir a mensagens e encaminhá-las para outro ticket.
  * Notificação no chat quando uma mensagem é apagada no WhatsApp.
  * Aparência do menu aprimorada, com adição do botão `Sair`.
  * Indicação "Digitando" ou "Gravando" no canto inferior direito do ticket.
  * API atualizada.
  * Novo layout da página de login.
 
### **📚 Documentação e Suporte**

  * **Suporte:** Suporte técnico está disponível apenas para compradores. Ao realizar a compra, entre em contato via WhatsApp para liberação de acesso.
  * **Documentação:** [launcher-and-co.gitbook.io/whaticketsaas/](https://launcher-and-co.gitbook.io/whaticketsaas/)
 
  **Você pode adquirir o pacote de suporte através das nossas plataformas parceiras:**
  
  InfinitePay
  [Loja InfinitePay](https://loja.infinitepay.io/launcher-tecnologia/aep0253-script-crm-whaticket-gold-com-saas-e-kanba/)
  
  Kirvano
  [Checkout Kirvano](https://pay.kirvano.com/a5103244-08d5-418f-8221-717289dd65f)
  
  DFG
  [Anúncio DFG](https://www.dfg.com.br/pt/outros/script-crm-whaticket-gold-com-saas-e-kanban-inclusos-939289065)

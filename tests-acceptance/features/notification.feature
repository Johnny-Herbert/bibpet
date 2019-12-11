Feature: As a petiano
         I want to receber notificacoes
         So that para saber com quem meu livro esta ou para quem vou entregar o livro

Scenario: Notificação de posse
Given que loguei como
Given que loguei como "Jose Guilherme" com login "jgnvs@pet.com.br" e a senha "123456"
And eu tendo reservado o livro "Calculo I" de Id "444" do dia "2019-10-20" ate "2019-10-26"
And o livro "Calculo I" de Id "444" sendo do petiano com login "som3@pet.com.br"
When eu confirmo que recebi o livro "Cálculo I"
Then eu vejo na tela uma mensagem de de sucesso no procedimento
And o petiano com login "som3@pet.com.br" vai receber um email informando que "Guilherme" está com o livro "Cálculo I"

Scenario: Reserva nos 7 dias posteriores ao término da reserva
Given que loguei como "Jose Guilherme" com login "jgnvs@pet.com.br" e a senha "123456"  
And estando o livro "Cálculo I" de Id "444" com o petiano "Samuel" com login "som3@pet.com.br" do dia "2019-10-13" ate "2019-10-20"
When solicito a reserva do livro "Cálculo I"  de Id "444" do dia "22/10/2019" ate "26/10/2019"
Then é confirmada a reserva do livro "Cálculo I" para o petiano "Guilherme" do dia "22/10/2019" ate "26/10/2019"
And o petiano com login "som3@pet.com.br" vai receber um email informando que "Guilherme" reservou o livro "Cálculo I" do dia "22/10/2019" ate "26/10/2019"

Scenario: Reservas múltiplas nos 7 dias posteriores ao término da reserva - Enviar
Given que loguei como "Jose Guilherme" com login "jgnvs@pet.com.br" e a senha "123456"
And havendo uma reserva do livro "Cálculo I" de Id "444" pelo petiano "Samuel" com login "som3@pet.com.br"  do dia "24/10/2019" ate "26/10/2019"
And estando o livro "Cálculo I" de Id "444" com o petiano "Vitor" com login "vss2@pet.com.br" do dia "2019-10-13" ate "2019-10-20"
When solicito a reserva do livro "Cálculo I" de Id "444" do dia "22/10/2019" ate "26/10/2019"
Then é confirmada a reserva do livro "Cálculo I" para o petiano "Guilherme" do dia "22/10/2019" ate "26/10/2019"
And o petiano com login "som3@pet.com.br" vai receber um email informando que "Guilherme" reservou o livro "Cálculo I" do dia "22/10/2019" ate "26/10/2019"

Scenario: Reservas múltiplas nos 7 dias posteriores ao término da reserva - Não Enviar
Given que loguei como "Jose Guilherme" com login "jgnvs@pet.com.br" e a senha "123456"  
And havendo uma reserva do livro "Cálculo I" de Id "444" pelo petiano "Samuel" com login "som3@pet.com.br"  do dia "24/10/2019" ate "26/10/2019"
And estando o livro "Cálculo I" de Id "444" com o petiano "Vitor" com login "vss2@pet.com.br" do dia "2019-10-13" ate "2019-10-20"
When solicito a reserva do livro "Cálculo I" de Id "444" do dia "25/10/2019" ate "27/10/2019".
Then é confirmada a reserva do livro "Cálculo I" para o petiano "Guilherme" do dia "25/10/2019" ate "27/10/2019".
And o petiano com login "som3@pet.com.br" não vai receber um email informando que "Guilherme" reservou o livro "Cálculo I" do dia "25/10/2019" ate "27/10/2019"


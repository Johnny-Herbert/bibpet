Feature: Como um usuario
         Eu quero ser notificado durante o processo de emprestimo
         Para que eu saiba com quem o livro está

Scenario: Notificação de posse
Given que estou logado como "Guilherme" 
And tendo reservado o livro "Cálculo I" para "20/10/2019"
And o livro "Cálculo I" sendo do petiano "Cesar"
When "Guilherme" confirmar que recebeu o livro "Cálculo I" de "Samuel"
Then e confirmada o empréstimo do livro "Cálculo I" ao petiano "Guilherme"
And "Cesar" vai receber uma notificação informando que "Guilherme" está com o livro "Cálculo I"

Scenario: Reserva nos 7 dias posteriores ao término da reserva
Given que estou logado como "Guilherme" 
And não há nenhuma reserva para o livro "Cálculo I"
And estando o livro "Cálculo I" com o petiano "Samuel"
And o ultimo dia do emprestimo sendo "20/10/2019"
When solicito a reserva do livro "Cálculo I" do dia "22/10/2019" até "26/10/2019"
Then e confirmada a reserva do livro "Cálculo I" para o petiano "Guilherme" do dia "22/10/2019" até "26/10/2019"
And "Samuel" vai receber uma notificação informando que "Guilherme" reservou o livro "Cálculo I" do dia "22/10/2019" até "26/10/2019"

Scenario: Reservas múltiplas nos 7 dias posteriores ao término da reserva
Given que estou logado como "Guilherme"
And havendo uma reserva do livro "Cálculo I" pelo petiano "Cesar" do dia "24/10/2019" até "26/10/2019"
And estando o livro "Cálculo I" com o petiano "Samuel"
And o ultimo dia do emprestimo sendo "20/10/2019"
When solicito a reserva do livro "Cálculo I" do dia "22/10/2019" até "26/10/2019"
Then e confirmada a reserva do livro "Cálculo I" para o petiano "Guilherme" do dia "22/10/2019" até "26/10/2019"
And "Samuel" vai receber uma notificação informando que "Guilherme" reservou o livro "Cálculo I" do dia "22/10/2019" até "26/10/2019"


Scenario: Reservas múltiplas nos 7 dias posteriores ao término da reserva
Given que estou logado como "Guilherme" 
And havendo uma reserva do livro "Cálculo I" pelo petiano "Cesar" do dia "24/10/2019" até "26/10/2019".
And estando o livro "Cálculo I" com o petiano "Samuel".
And o último dia do emprestimo sendo "20/10/2019".
When solicito a reserva do livro "Cálculo I" do dia "25/10/2019" até "27/10/2019".
Then e confirmada a reserva do livro "Cálculo I" para o petiano "Guilherme" do dia "25/10/2019" até "27/10/2019".
And "Samuel" não vai receber nenhuma notificação informando que "Guilherme" reservou o livro "Cálculo I" do dia "25/10/2019" até "27/10/2019".

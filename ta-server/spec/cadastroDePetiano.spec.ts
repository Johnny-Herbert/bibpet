
describe("o cadastro de petianos", () => {
  let cadastroPetianos: CadastroDePetianos;

  const cadastrarPetiano = (nome : string, cpf : string, email : string, senha : string) => {
    let petiano: Ṕetiano= new Petiano();
    petiano.nome = "Samuel Oliveira";
    petiano.cpf = "12991451233"
    petiano.email = "sam@pet.ufpe.br";
    petiano.senha = "1234"
    cadastroPetianos.cadastrar(petiano);
  }

  const

  beforeEach(() => cadastroPetianos = new CadastroDePetianos())

  it ("cadastra alunos corretamente", () => {
    
    cadastrarPetiano("Samuel Miranda", "12991656444", "sam@pet.ufpe.br", "1234pet");

    expect(cadastroPetianos.getPetianos().length).toBe(1);
    let petiano = cadastroPetianos.getAlunos()[0];
    expect(petiano.nome).toBe("Samuel Oliveira");
    expect(petiano.cpf).toBe("12991656444");
    expect(petiano.email).toBe("sam@pet.ufpe.br");
    expect(petiano.senha).toBe("1234pet");

  })

  it("atualiza informações sobre o petiano corretamente", () => {

    cadastrarPetiano("Samuel Miranda", "12991656444", "sam@pet.ufpe.br", "1234pet")

    let petiano = new Petiano();
    petiano.cpf = "12991451233"
    petiano.senha = "1234"
  })

})
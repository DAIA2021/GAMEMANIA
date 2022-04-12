//Você esqueceu de adicionar um argumento (" ") para o email e senha

//Aqui teve um erro GRAVE, vocês colocaram o elemento do db.json como "senha" mas no db.json é "password". O login nunca iria identificar se a senha estava correta ou não
//pois o nome do elemento estava errado

export class User {
    constructor (
        public email:string = "",
        public password:string = ""
    ){}
}

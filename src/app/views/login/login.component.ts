import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*você esqueceu de adicionar (fazer uma injeção) do router no constructor. 
  eu fiz a injeção do router abaixo e o import dele foi feito automaticamente acima
  no import {router}*/

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  //Não etendi poque você adicionou o orgumento (" ") abaixo no User, isso deveria ser feito no user.ts que é onde você referencia os elementos da classe User

  userModel = new User();

  mensagem = ""

  usuarioLogado = ""

  onSubmit (){
    console.log (this.userModel)

    //código para evitar o SQL Injection no form. Foi adicionado os principais comandos do SQL para fazer a query de dados.
    //Isso é necessário para evitar roubo de dados e acesso ao banco de dados

    let erroEncontrado = 0;

    const listaPalavras: string[] = ["select ", "from ", "drop ", "or ", "having ", "group ", "insert ", "exec ", "\"", "\'", "--", "#", "*", ";"]

    listaPalavras.forEach(palavra => {
      console.log("palavra atual:", palavra)

      if(this.userModel.email.toLowerCase().includes(palavra)) {
        console.log("Palavra encontrada:", palavra)
        this.mensagem = "Dados inválidos: " + palavra;

        erroEncontrado = 1;
      }    

    })

    //Código do login, onde o mesmo irá verificar se o email e senha estão corretos. Caso estejam, o usuário será redirecionado para uma página que eu criei.
    //Caso a senha ou email estejam errados, uma mensagem na tela (caixa de mensagem) irá dizer se o email ou senha estão errados
    //a Jéssica colocou essa mensagem para aparecer na página, eu achei melhor colocar na caixa de mensagem.

    //Criei um usuário e senha de teste no dbjson. O email é teste@email.com, senha: abc123

    if (erroEncontrado == 0) {
      this.loginService.login(this.userModel).subscribe( (response) => {
        this.usuarioLogado = response.body.user.nome
        window.alert("Logado com Sucesso: " + this.usuarioLogado)      
        this.router.navigateByUrl('welcome')
      }, (respostaErro) => {        
        this.mensagem = respostaErro.error
        window.alert(this.usuarioLogado + this.mensagem)

      })      
    }
  }

    
}


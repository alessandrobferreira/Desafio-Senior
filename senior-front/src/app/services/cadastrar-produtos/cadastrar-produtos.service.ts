import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastrarProdutosService {
  constructor(private http: HttpClient) {}

  enviarSolicitacao(
    nome: string,
    descricao: string,
    urlImagem: string,
    valor: number
  ): Observable<any> {
    console.log(
      `nome: ${nome}, descricao: ${descricao}, urlImagem: ${urlImagem}, valor: ${valor},`
    );

    const body = {
      nome: nome,
      descricao: descricao,
      url: urlImagem,
      precoProduto: valor,
      situacao: false,
      viewAlmoxarife: true,
    };
    return this.http.post<any>('http://localhost:3000/produto/insert', body);
  }

  atualizarSolicitacao(
    nome: string,
    descricao: string,
    urlImagem: string,
    valor: number,
    situacao: boolean,
    idUser: number,
    observacao: string
    // viewAlmoxarife: boolean
  ): Observable<any> {
    console
      .log
      // `CHEGOU NO SERVICE COM OS DADOS: nome: ${nome}, descricao: ${descricao}, urlImagem: ${urlImagem}, valor: ${valor}, situacao: ${situacao}, observacao: ${observacao}`
      ();

    const body = {
      nome: nome,
      descricao: descricao,
      url: urlImagem,
      precoProduto: valor,
      situacao: situacao,
      observacao: observacao,
      viewAlmoxarife: true,
    };
    return this.http.put<any>(
      `http://localhost:3000/produto/update/${idUser}`,
      body
    );
  }

  getProdutos(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/produtos');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastrarProdutosService } from '../../services/cadastrar-produtos/cadastrar-produtos.service';
import { first } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  fieldBusca = '';
  url = '';
  nome = '';
  text = '';
  price = '';
  produtos: any = [];
  produtosNew: any = [];
  copiAllDataNew: any;
  clientes: any;
  copiaProdutos: any;
  copiAllData: any;
  handleFind = false;

  ngOnInit(): void {
    this.getProdutos();
  }

  constructor(
    private router: Router,
    private cadastrarProdutosService: CadastrarProdutosService
  ) {}

  buscar() {
    if (this.fieldBusca.length > 0) {
      this.handleFind = true;

      this.produtos = this.copiaProdutos.produto.filter(
        (produto: any) =>
          produto.situacao
            .toLowerCase()
            .includes(this.fieldBusca.toLowerCase()) ||
          produto.nome.toLowerCase().includes(this.fieldBusca.toLowerCase()) ||
          produto.precoProduto
            .toLowerCase()
            .includes(this.fieldBusca.toLowerCase()) ||
          produto.descricao
            .toLowerCase()
            .includes(this.fieldBusca.toLowerCase())
      );
      console.log('RESULTADO RESULTADO: ', this.produtos);
    } else if (this.fieldBusca.length === 0) {
      this.handleFind = false;
      this.produtos = this.copiAllData;
    }
  }

  clearBusca() {
    this.handleFind = false;
    this.fieldBusca = '';
    this.produtos = this.copiAllData;
  }

  getProdutos() {
    this.cadastrarProdutosService
      .getProdutos()
      .pipe()
      .subscribe((response: any) => {
        response.produto.forEach((item: any) => {
          // Verifique se a propriedade 'situacao' existe diretamente em 'item'
          if (item.viewAlmoxarife === 1) {
            this.produtosNew.push(item);
          }
          console.log('ALESSANDRO ', this.produtosNew);
        });

        this.produtos = response;
        this.copiAllData = response;
        this.produtos.produto.forEach((item: any) => {
          if (item.situacao === 0) {
            item.situacao = 'Reprovado';
          } else if (item.situacao === 1) {
            item.situacao = 'Aprovado';
          }
        });

        this.copiaProdutos = this.produtos;
        // this.copiaProdutos = this.produtos.produto;
        console.log(`A RESPOSTA DA REQUISIÇÃO GET É: `, this.produtos);

        // Swal.fire({
        //   title: 'Solicitação realizado com sucesso!',
        //   text: 'Sua solicitação foi concluída com sucesso.',
        //   icon: 'success',
        //   confirmButtonColor: '#3085d6',
        //   confirmButtonText: 'OK',
        // });
      });
  }
}

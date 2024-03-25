import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CadastrarProdutosService } from '../../services/cadastrar-produtos/cadastrar-produtos.service';

@Component({
  selector: 'app-almoxarife',
  templateUrl: './almoxarife.component.html',
  styleUrl: './almoxarife.component.scss',
})
export class AlmoxarifeComponent {
  nameProduto = 'Pilha Duracell AAA';
  descProduto = 'Produto de excelente Qualidade';
  showImage = true;
  urlImg =
    'https://eletronicasantana.vteximg.com.br/arquivos/ids/59363-1000-1000/  Pilha-Alcalina-Palito-AAA-com-4-Unidades---Duracell.jpg?v=636572429103430000';
  valueProduto = '14,90';
  state = 'Selecione uma opção';
  showObserver = false;
  observacao = '';
  produtos: any = [];
  valueSituacao!: boolean;
  statusVerificado: any = [];

  // opcoes: any = [{ option: 'aprovado' }, { option: 'reprovado' }];
  opcoes: any[] = [{ option: 'aprovar' }, { option: 'reprovar' }];

  opcoesSelecionadas: any[] = [];

  constructor(
    private router: Router,
    private cadastrarProdutosService: CadastrarProdutosService
  ) {}

  ngOnInit() {
    this.getProdutos();
  }

  ngChangeImage() {
    if (this.urlImg.length > 10) {
      this.showImage = true;
    }
  }

  fieldFormat() {
    const valueTrat = `${this.valueProduto.slice(
      0,
      -2
    )},${this.valueProduto.slice(-2)}`;
    this.valueProduto = valueTrat;
  }

  save(param: any) {
    console.log('OS DADOS DESTE PRODUTO É: ', param);

    // this.state
    // this.observacao

    // if (
    //   this.nameProduto.trim() == '' ||
    //   this.descProduto.trim() == '' ||
    //   this.urlImg.trim() == '' ||
    //   this.valueProduto.trim() == ''
    // ) {
    //   Swal.fire({
    //     title: 'Os campos devem ser preenchidos!',
    //     text: 'Por favor, preencha todos os campos obrigatórios.',
    //     icon: 'error',
    //     confirmButtonColor: '#3085d6',
    //     confirmButtonText: 'OK',
    //   });
    //   return;
    // }
    console.log('O VALOR DA SITUAÇÃO É: ', this.valueSituacao);

    this.cadastrarProdutosService
      .atualizarSolicitacao(
        param.nome,
        param.descricao,
        param.url,
        parseFloat(param.precoProduto),
        this.valueSituacao,
        param.id,
        this.observacao
      )
      .subscribe((response) => {
        console.log(response);
        this.getProdutos();
        Swal.fire({
          title: 'Sucesso!',
          text: 'Atualização concluída com sucesso.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        // this.nameProduto = '';
        // this.descProduto = '';
        // this.urlImg = '';
        // this.valueProduto = '';
      });
  }

  getProdutos() {
    this.cadastrarProdutosService
      .getProdutos()
      .pipe()
      .subscribe((response: any) => {
        this.produtos = response;

        this.produtos.produto.forEach((item: any) => {
          if (item.viewAlmoxarife == 0 || item.viewAlmoxarife == null) {
            this.statusVerificado.push(item);
          }
        });

        // Swal.fire({
        //   title: 'Solicitação realizado com sucesso!',
        //   text: 'Sua solicitação foi concluída com sucesso.',
        //   icon: 'success',
        //   confirmButtonColor: '#3085d6',
        //   confirmButtonText: 'OK',
        // });
      });
  }

  submit() {
    // this.state
    // this.observacao
  }

  aprovarProduto(param: any) {
    console.log(param);
  }

  reprovarProduto(param: any) {
    console.log(param);
  }

  onChangeState(param: any) {
    console.log(param);

    this.valueSituacao = !this.valueSituacao;

    console.log('O VALOR DA SITUAÇÃO É: ', this.valueSituacao);
    // if (this.state === 'reprovar') {
    //   this.showObserver = true;
    //   this.valueSituacao = false;
    // } else if (this.state === 'aprovar') {
    //   this.showObserver = false;
    //   this.valueSituacao = true;
    //   // this.observacao = '';
    // }
  }

  cancel() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Sair sem Salvar? Esta alteração não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    });
  }
}

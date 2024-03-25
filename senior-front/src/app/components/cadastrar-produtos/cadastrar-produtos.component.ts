import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CadastrarProdutosService } from '../../services/cadastrar-produtos/cadastrar-produtos.service';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrl: './cadastrar-produtos.component.scss',
})
export class CadastrarProdutosComponent {
  nameProduto = '';
  descProduto = '';
  showImage = false;
  urlImg = '';
  valueProduto = '';

  opcoesSelecionadas: any[] = [];

  constructor(
    private router: Router,
    private cadastrarProdutosService: CadastrarProdutosService
  ) {}

  ngOnInit() {}

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

  save() {
    if (
      this.nameProduto.trim() == '' ||
      this.descProduto.trim() == '' ||
      this.urlImg.trim() == '' ||
      this.valueProduto.trim() == ''
    ) {
      Swal.fire({
        title: 'Os campos devem ser preenchidos!',
        text: 'Por favor, preencha todos os campos obrigatórios.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }

    // this.cadastrarProdutosService;
    this.cadastrarProdutosService
      .enviarSolicitacao(
        this.nameProduto,
        this.descProduto,
        this.urlImg,
        parseFloat(this.valueProduto)
      )
      .subscribe((response) => {
        console.log(response);
        Swal.fire({
          title: 'Cadastro realizado com sucesso!',
          text: 'Seu cadastro foi concluído com sucesso.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        this.nameProduto = '';
        this.descProduto = '';
        this.urlImg = '';
        this.valueProduto = '';
      });
  }

  cancel() {
    this.nameProduto = '';
    this.descProduto = '';
    this.urlImg = '';
    this.valueProduto = '';
    // Swal.fire({
    //   title: 'Tem certeza?',
    //   text: 'Sair sem Salvar? Esta alteração não poderá ser desfeita!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Sim',
    //   cancelButtonText: 'Cancelar',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.router.navigate(['/']);
    //   }
    // });
  }
}

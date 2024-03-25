import { TestBed } from '@angular/core/testing';

import { CadastrarProdutosService } from './cadastrar-produtos.service';

describe('CadastrarProdutosService', () => {
  let service: CadastrarProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

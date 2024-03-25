import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastrarProdutosComponent } from './components/cadastrar-produtos/cadastrar-produtos.component';
import { AlmoxarifeComponent } from './components/almoxarife/almoxarife.component';

export const routes: Routes = [
  { path: '', redirectTo: '/solicitar', pathMatch: 'full' },
  { path: 'administrativo', component: HomeComponent },
  { path: 'solicitar', component: CadastrarProdutosComponent },
  { path: 'almoxarife', component: AlmoxarifeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

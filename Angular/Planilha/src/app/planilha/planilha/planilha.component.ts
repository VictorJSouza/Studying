import {Component,ElementRef,Input,OnInit, ViewChild} from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-planilha',
  templateUrl: './planilha.component.html',
  styleUrls: ['./planilha.component.css']
})
export class PlanilhaComponent implements OnInit {

  public modalAddDespesa: boolean = false;
  public modalEditDespesa: boolean = false;
  public tabela: boolean = true;
  public total: boolean = false;
  public errorNome: boolean = false;
  public editDespesa: boolean = false;
  public graficos: boolean = false;
  public list: any[] = [];
  public totalDespesasDia05: number = 0;
  public totalDespesasDia15: number = 0;
  public editIndex: number = 0;
  public name: string = "";
  public value1: number = 0;
  public value2: number = 0;
  public editName: string = "";
  public editValue1: string = "";
  public editValue2: string = "";
  public saldoApos05: number = 0;
  public saldoApos15: number = 0;
  public despesaNome: string = "";
  public despesaValor1: string = "";
  public despesaValor2: string = "";
  public saldoAposColor1: string = "";
  public saldoAposColor2: string = "";
  public barChartOptions ={
    scaleShowVerticalLines: false,
    responsive: true,
  }
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012']
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ]

  constructor() {}

  ngOnInit(){
   
  }

  public addDespesaModal() {
    this.tabela = false;
    this.modalAddDespesa = true;
    this.errorNome = false;
  }

  public voltar() {
    this.tabela = true;
    this.modalAddDespesa = false;
    this.modalEditDespesa = false;
  }

  public voltarDespesa(){
    this.editDespesa = false;
  }

  public addDespesa(despesaNome: string = this.despesaNome, despesaValor1: string, despesaValor2: string) {
    if(!despesaNome || !despesaValor1 && !despesaValor2){
      this.errorNome = true;
      return;
    }
    let despesaValor1Num1 = parseFloat(despesaValor1);
    let despesaValor1Num2 = parseFloat(despesaValor2);
    if(!despesaValor1){
      despesaValor1Num1 = 0;
    }else if(!despesaValor1Num2){
      despesaValor1Num2 = 0;
    }
    this.list.push({
      name: despesaNome,
      value1: despesaValor1Num1,
      value2: despesaValor1Num2,
      id: this.list.length
    });
    this.somaTotalDespesasDia05();
    this.somaTotalDespesasDia15();
    this.totalDespesaOrder();
    this.refreshData();
    this.voltar();
  }

  public somaTotalDespesasDia05(){
      let soma = this.list.reduce( (prevNum, posNum) =>
      prevNum + posNum.value1, 0);
      this.totalDespesasDia05 = soma;
      this.saldoApos05 = this.value1 - soma;
  }
  public somaTotalDespesasDia15(){
      let soma = this.list.reduce( (prevNum, posNum) =>
      prevNum + posNum.value2, 0)
      this.totalDespesasDia15 = soma;
      this.saldoApos15 = this.value2 - soma;
  }

  public deleteDespesa(id: number, despesaNome: string, value1: string, value2: string){
    this.list = this.list.filter(item => item.id !== id);
    this.list = this.list.filter(item => item.name !== despesaNome);
    this.list = this.list.filter(item => item.value1 !== value1);
    this.list = this.list.filter(item => item.value2 !== value2);
    this.totalDespesaOrder();
    this.somaTotalDespesasDia05();
    this.somaTotalDespesasDia15();
    this.refreshData();
  }

  public totalDespesaOrder(){
    if(this.list.length >= 2){
      this.total = true;
    }else{
      this.total = false;
    }
  }

  public refreshData(){
    this.totalDespesaOrder();
    this.somaTotalDespesasDia05();
    this.somaTotalDespesasDia15();
    this.totalDespesaOrder();
    if(this.saldoApos05 >= 0){
      this.saldoAposColor1 = "bg-success";
    }else{
      this.saldoAposColor1 = "bg-danger";
    }
    if(this.saldoApos15 >= 0){
      this.saldoAposColor2 = "bg-success";
    }else{
      this.saldoAposColor2 = "bg-danger";
    }
  }

  public editDespensaModal(){
    if(this.list.length == 0){
      alert("Sem despesa para editar!");
      return
    }
    this.tabela = false;
    this.modalAddDespesa = false;
    this.modalEditDespesa = true;
  }

  public editarDespesa(index: number, editName: string, editValue1: string, editValue2:string){
    this.editName = editName;
    this.editValue1 = editValue1;
    this.editValue2 = editValue2;
    this.editIndex = index;
    this.editDespesa = true;
  }

  public salvarDespesa(){
    this.deleteDespesa(this.editIndex, this.editName, this.editValue1, this.editValue2);
    this.addDespesa(this.editName, this.editValue1, this.editValue2);
    this.voltar();
    this.voltarDespesa();
  }

  public switchDespesas(index: any,despesaNome: any ,despesaValor1: any, despesaValor2:any){
    this.deleteDespesa(index, despesaNome, despesaValor1, despesaValor2)
    this.list.push({
      name: despesaNome,
      value1: despesaValor2,
      value2: despesaValor1
    });
    this.refreshData();
  }

}

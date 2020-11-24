import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {Reminder} from 'src/app/models/reminder';
import { CadastroService } from 'src/app/services/cadastro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {


  form: FormGroup;
  reminders: Array<Reminder> = new Array<Reminder>();
  remindersTemp = this.reminders;

  prioritys = [{
    "id":1,
    "name":"Baixa"
  },
  {
    "id":2,
    "name":"Media"
  },
  {
    "id":3,
    "name":"Alta"
  }
];

  /* Responsável pela paginação da listagem de colaboradores */
  page: number = 1;

  /* Responsável por controlar a quantidade de colaboradores por pagina */
  itemsPage: number = 6;
  reminderId: any = null;
    
  

  @ViewChild('modalReminder', { static: false }) modalReminder: TemplateRef<any>;
  // Referencia para a modal
  modalReminderRef: BsModalRef;
  constructor(private cadastroService: CadastroService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getReminder();
  }

  initFormGroup()
  {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null,Validators.required),
      priority: new FormControl(null,Validators.required)
    })
  }
  initFormGroupEdit(reminder: Reminder)
  {
    this.form = new FormGroup({
      title: new FormControl(reminder.title, Validators.required),
      content: new FormControl(reminder.content,Validators.required),
      priority: new FormControl(reminder.priority,Validators.required)
    })
  }


  getReminder() {
    this.cadastroService.get().subscribe(
      (response) => {
        Object.assign(this.reminders, response);
      },
      (error) => {
        Swal.fire('Error', 'Não foi possível Carregar os Colaboradores', 'error');
      }
    );
  }
  /**Envia para a Api o novo colaborador para que ela faça a criação */ 
  saveReminder() {
    let employeeForm = this.form.value as Reminder;
    this.cadastroService.save(employeeForm).subscribe(
      (response) => {
        Swal.fire('Success', 'Colaborador Cadastrado com Sucesso', 'success');
        this.getReminder();
      },
      (error) => {
        Swal.fire('Error', 'Não foi possível Cadastrar o Colaborador', 'error');
      }
    );
    this.form.reset();
  }
  /**Envia para a Api o colaborador que foi deletado */ 
  deleteReminder(reminder: Reminder) 
  {
    Swal.fire({
      text: `Deseja deletar o colaborador ${reminder.title}?`,
      icon:"warning",
      confirmButtonColor: "#f05050",
      confirmButtonText: "Deletar Colaborador",
      cancelButtonColor: "Cancelar",
      iconColor: "#f05050",
      showCancelButton: true,
    }).then((result) =>
    {
      if(result.value)
      {
        this.cadastroService.delete(reminder._id).subscribe(
          (response) => {
            /*Exclui da lista de reminder */
            let find = this.reminders.find(x => x._id == reminder._id);
            let index = this.reminders.indexOf(find);
            this.reminders.splice(index,1);
            Swal.fire('Success', 'Colaborador Excluido com Sucesso', 'success');
            
          },
          (error) => {
            Swal.fire('Error', 'Não foi possível Excluir o Colaborador', 'error');
          }
        );
      }
    });

  }

  /**Envia para a api o colaborador que foi editado e suas alterações */ 
  editReminder() {

    let reminder = this.form.value as Reminder;
    reminder._id = this.reminderId;
    this.cadastroService.edit(reminder).subscribe(
      (response) => {
        Swal.fire('Success', 'Colaborador Editado com Sucesso', 'success');
        this.reminderId = null;
        this.getReminder();
      },
      (error) => {
        Swal.fire('Error', 'Não foi possível editar o Colaborador', 'error');
      }
    );
    
  }

  openModalReminder(reminder: Reminder) {
    let config = {
      keyboard: false,
      ignoreBackdropClick: true
    };
    if(reminder == null){
      this.initFormGroup();
    }
    else{
      this.reminderId = reminder._id;
      this.initFormGroupEdit(reminder);
    }
    
    this.modalReminderRef = this.modalService.show(this.modalReminder, config);

  }
  /**Fecha a modal */ 
  closeModal(modalRef: BsModalRef)
  {
    modalRef.hide();
  }

  checkSaveOrEdit()
  {
    this.closeModal(this.modalReminderRef);
    if(this.reminderId == null){
      this.saveReminder();
    }
    else{
      this.editReminder();
    }
  }

  filter(value){
    this.reminders = this.remindersTemp;
    this.reminders = this.reminders.filter(x=> x.content.toLowerCase().indexOf(value.target.value.toLowerCase())>-1);
  }


}

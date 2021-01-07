import { Component, OnInit } from '@angular/core';
import { Estudiante } from "../models/estudiante";
import { EstudianteService } from "../services/estudiante.service";
import { ToastController } from "@ionic/angular";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public myForm: FormGroup;
  student: Estudiante;

  constructor(private service: EstudianteService,
    private actroute: ActivatedRoute,
    private router: Router,
    private toast: ToastController, private fb: FormBuilder) {
    this.actroute.queryParams.subscribe(
      params => {
        if (params && params.special) {
          this.student = JSON.parse(params.special) as Estudiante;
          console.log(this.student);
        }
      }
    );
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [''],
      controlnumber: [''],
      curp: [''],
      age: [0],
      active: [false]
    });
    this.cleanInputs();
  }

  create() {
    this.student = {
      name: this.myForm.controls.name.value,
      controlnumber: this.myForm.controls.controlnumber.value,
      age: this.myForm.controls.age.value,
      curp: this.myForm.controls.curp.value,
      active: this.myForm.controls.active.value
    };
    this.service.createStudent(this.student);
    this.cleanInputs();
    alert('Alumno modificado con exito');
  }

  private cleanInputs(): void {
    const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.myForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
      controlnumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      age: [0, Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      curp: ['', Validators.compose([Validators.required, Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
      )])],
      active: [true, Validators.compose([Validators.required])],
    });
  }

}

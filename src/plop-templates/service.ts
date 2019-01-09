// jshint ignore: start
/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { {{pascalCase name}} } from '../../models/{{dashCase name}}';


@Injectable({
  providedIn: 'root'
})
export class {{pascalCase name}}Service {

  private {{camelCase name}}Collection: AngularFirestoreCollection<{{pascalCase name}}>;

  constructor(private afs: AngularFirestore) { 
    this.{{camelCase name}}Collection = afs.collection<{{pascalCase name}}>('{{dashCase name}}s');
  }

  createNew{{pascalCase name}}(data: any): Promise<void> {
      const {{camelCase name}}ID = this.afs.createId();
      data.{{camelCase name}}ID = {{camelCase name}}ID;
      return this.{{camelCase name}}Collection
        .doc({{camelCase name}}ID)
        .set(data);
  }

  getAll{{pascalCase name}}s(): Observable<{{pascalCase name}}[]> {
    return this.{{camelCase name}}Collection
      .valueChanges();
  }

  getOne{{pascalCase name}}({{camelCase name}}ID: string): Observable<any> {
    return this.{{camelCase name}}Collection
      .doc({{camelCase name}}ID)
      .valueChanges();
  }

  update{{pascalCase name}}({{camelCase name}}Obj: any): Promise<void> {
    const {{camelCase name}}ID = {{camelCase name}}Obj.{{camelCase name}}ID;
    return this.{{camelCase name}}Collection
      .doc({{camelCase name}}ID)
      .update({{camelCase name}}Obj);
  }

  delete{{pascalCase name}}({{camelCase name}}ID: string): Promise<void> {
    return this.{{camelCase name}}Collection
      .doc({{camelCase name}}ID)
      .delete();
  }
  
}
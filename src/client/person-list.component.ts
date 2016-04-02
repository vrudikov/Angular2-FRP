import {Component} from 'angular2/core'
import {Validators, FormBuilder,Control, ControlGroup} from 'angular2/common';
import {Observable} from 'rxjs/Rx';
import {Person} from './bmi.model';
import {BmiComponent} from './bmi.component';
import 'rxjs/Rx';


@Component({
    selector: "site",
    templateUrl: 'templates/person-list.html',
    directives: [BmiComponent]
})
export class PersonListComponent {
    form: ControlGroup;
    
    people: Observable<Person[]>;
    
    constructor(fb: FormBuilder) {
       
        const peopleSignal: Observable<{}> = Observable.create(observer => {
            this.addNewPerson = () => observer.next();
        });
        
        const people =  peopleSignal.map(() => [new Person()])
        .startWith([new Person()])
        .scan((acc: Person[], value: Person[]) => acc.concat(value));
        
        this.people = people; 
    }
    
    addNewPerson: () => any;
    
}
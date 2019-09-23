import {Card} from "./Card";

export class CheckBoxCard  extends Card{
    static RemoveCheckBoxCard(event){
        console.log('check rem');
    }
    static MoreCheckBoxCard(event){
        console.log('check more');

    }
    static ChangeCheckBoxCard(event){
        console.log('check change');

    }
}
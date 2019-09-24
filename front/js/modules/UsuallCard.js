import {Card} from "./Card";

export class UsuallCard extends Card{

    static RemoveUsualCard(event){
        console.log('usual rem');
    }
    static MoreUsualCard(event){
        window.location.href = 'notes/' + event.target.parentElement.id
    }
    static ChangeUsualCard(event){
        console.log('usual change');

    }
}
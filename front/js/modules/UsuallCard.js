import {Card} from "./Card";

export class UsuallCard extends Card{

    static RemoveUsualCard(event){
        console.log('usual rem');
    }
    static MoreUsualCard(event){
        window.location.href = 'notes/' + event.target.parentElement.id
    }
    static ChangeUsualCard(event){
        event.preventDefault();

        event.target.classList.toggle('btn-warning');
        event.target.classList.toggle('btn-primary');
        event.target.innerText = 'Submit changes';

        $('#title').prop('disabled', false);
        $('#text').prop('disabled', false);
    }
}
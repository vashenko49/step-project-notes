import {Card} from "./Card";
import {Authorizatoin} from "./Authorizatoin";

export class UsuallCard extends Card{
    static createUsualNote(event) {
        event.preventDefault();

        $.post({
            url: '/api/notes',
            data: {
                id_client: Authorizatoin.GetIdClient(),
                data: {
                    title: $('#title').val(),
                    text: $('#text').val()
                }
            }
        })
            .done(function(res) {
            window.location = '/';
        })
            .fail(function(err) {
            throw new Error(err);
        })

    }

    static RemoveUsualCard(event){
        $.ajax({
            type: 'DELETE',
            url: '/api/notes/' + window.location.pathname.split('/')[2]
        })
            .done(function(res){
            window.location = '/';
        })
            .fail(function(err) {
            throw new Error(err);
        })
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
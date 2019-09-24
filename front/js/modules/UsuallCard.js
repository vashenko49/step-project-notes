import {Card} from "./Card";
import {Authorizatoin} from "./Authorizatoin";

export class UsuallCard extends Card{
    static createUsualNote(event) {
        event.preventDefault();

        const sendData = {
            id_client: Authorizatoin.GetIdClient(),
            data: {
                title: '',
                text: ''
            }
        };

        const form = $(this).parent('form');
        $(form).find('input').each(function() {
            const input = $(this);
            if (input.id === 'title') {
                sendData.data.title = input.value;
            } else if (input.id === 'text') {
                sendData.data.text = input.value
            }
        });

        $.ajax({
            type: 'POST',
            url: '/api/notes',
            data: sendData
        })
            .done(function(res) {
            window.location = '/';
        })
            .fail(function(err) {
            throw new Error(err);
        })

    }

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
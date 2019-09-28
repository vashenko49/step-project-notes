import {Card} from "./Card";
import {Authorizatoin} from "./Authorizatoin";
import {UploadImg} from "../modules/UploadImg";

export class UsuallCard extends Card{
    static createUsualNote(event) {
        event.preventDefault();

        let form_data = new FormData($("#formID")[0]);

        const checkImg = UploadImg.upload('FormControlFile');
        if (!checkImg.status) {
            $('#FormControlFile')
                    .attr({
                        'data-toggle': 'popover',
                        'data-placement': 'bottom',
                        'data-content' :checkImg.msg
                    })
                    .popover('show');
        } else {

            if ($('#text').val()) {
                form_data.append('id_client', Authorizatoin.GetIdClient());
                $.ajax({
                    type: 'POST',
                    url: '/api/notes',
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false
                })
                .done(function(res) {
                    window.location = '/';
                })
                .fail(function(err) {
                    throw new Error(err);
                })
            } else {
                $('#text')
                    .attr({
                        'data-toggle':'popover',
                        'data-placement':'bottom',
                        'data-content':'must be required'
                    })
                    .popover('show');
            }
        }
    }

    static RemoveImg(){
        $(".visibleUploadImg").toggleClass('visibleUploadImg');
        $('.imgCard').toggleClass('imgRemove');
    }

    static RemoveUsualCard(event){
        event.preventDefault();
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
        $('.visibleBtnImg').toggleClass('visibleBtnImg');
        $(event.target)
            .toggleClass('btn-warning')
            .toggleClass('btn-primary')
            .html('Submit changes')
            .attr('id', 'btnDetailViewSubmitChange');

        $('[disabled]').prop('disabled', false);
    }

    static SubmitChangeUsualCard(event) {
        event.preventDefault();

        if ($('#text').val()) {
            $.ajax({
                type: 'PUT',
                url: '/api/notes/' + window.location.pathname.split('/')[2],
                data: {
                    id_client: window.location.pathname.split('/')[2],
                    data: {
                        title: $('#title').val(),
                        text: $('#text').val()
                    }
                }
            })
                .done(function(res){
                    window.location = '/';
                })
                .fail(function(err) {
                    throw new Error(err);
                })
        } else {
            $('#text')
                .attr({
                    'data-toggle':'popover',
                    'data-placement':'bottom',
                    'data-content':'must be required'
                })
                .popover('show');
        }
    }
}

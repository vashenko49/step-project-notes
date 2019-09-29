import {Card} from "./Card";
import {Authorizatoin} from "./Authorizatoin";
import {UploadImg} from "../modules/UploadImg";
import {Services} from "./Services";

export class UsuallCard extends Card{
    static createUsualNote(event) {
        event.preventDefault();
        let form_data = new FormData($("#formID")[0]);
        const checkImg = UploadImg.upload('FormControlFile');
        if (!checkImg.status) {
            Services.popover('#FormControlFile', checkImg.msg)
        } else {
            let text = $('#text');
            let title = $('#title');
            if (text.val() && title.val()) {
                form_data.append('id_client', Authorizatoin.GetIdClient());
                $.ajax({
                    type: 'POST',
                    url: '/api/notes',
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false
                }).done(function(res) {
                    window.location = '/';
                }).fail(function(err) {
                    throw new Error(err);
                })
            } else {
                !text.val()?Services.popover(text, 'must be required'):Services.popover(title, 'must be required');
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
        }).done(function(res){
            window.location = '/';
        }).fail(function(err) {
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
        let form_data = new FormData($("#formID")[0]);
        const checkImg = UploadImg.upload('FormControlFile');
        if (!checkImg.status) {
            Services.popover('#FormControlFile', checkImg.msg)
        } else {
            let text = $('#text');
            let title = $('#title');
            if (text.val() && title.val()) {
                form_data.append('id_client', Authorizatoin.GetIdClient());
                form_data.append('removeImg',($(".imgRemove").length !== 0));

                $.ajax({
                    type: 'PUT',
                    url: '/api/notes/' + window.location.pathname.split('/')[2],
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false
                }).done(function(res){
                    window.location = '/';
                }).fail(function(err) {
                    throw new Error(err);
                })
            } else {
                !text.val()?Services.popover(text, 'must be required'):Services.popover(title, 'must be required');
            }
        }

    }
}

import {Card} from "./Card";
import {Authorizatoin} from "./Authorizatoin";

export class UsuallCard extends Card{
    static createUsualNote(event) {
        event.preventDefault();

        let name = $('#FormControlFile').prop('files')[0].name;
        let form_data = new FormData($("#formID")[0]);
        let ext = name.split('.').pop().toLowerCase();
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) === -1)
        {
            alert("Invalid Image File");
        }else {

            let oFReader = new FileReader();
            oFReader.readAsDataURL($('#FormControlFile').prop('files')[0]);
            let f = $('#FormControlFile').prop('files')[0];
            let fsize = f.size||f.fileSize;
            if(fsize > 2000000)
            {
                alert("Image File Size is very big");
            }else {

                if ($('#text').val()) {
                    form_data.append('id_client', Authorizatoin.GetIdClient())
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
                                'data-placement':'top',
                                'data-content':'must be required'
                            })
                            .popover('show');
                }

            }
        }



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
                    'data-placement':'top',
                    'data-content':'must be required'
                })
                .popover('show');
        }
    }
}

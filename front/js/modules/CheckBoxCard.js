import {Card} from "./Card";
import {UploadImg} from "./UploadImg";
import {Services} from "./Services";
import {Authorizatoin} from "./Authorizatoin";

export class CheckBoxCard  extends Card{
    static RemoveCheckBoxCard(event){
        event.preventDefault();

        $.ajax({
            type: 'DELETE',
            url: `/api/list/${window.location.pathname.split('/')[2]}`
        }).done(function(res){
            window.location = '/';
        }).fail(function(err) {
            throw new Error(err);
        })
    }
    static MoreCheckBoxCard(){
        window.location.href = `list/${ $(this).parent().attr('id') }`;

    }
    static ChangeCheckBoxCard(event){
        event.preventDefault();

        $('.visibleBtnImg').toggleClass('visibleBtnImg');

        $("input[disabled]").each(function(){
            $(this).removeAttr('disabled');
        });

        $('input[name="itemList"]').each(function(index) {
            const btnAdd = `<span class="input-group-append">
                                <button class="btn btn-${index > 0 ? 'danger' : 'primary'} btn-add" type="button" id="${index > 0 ? 'removeItemList' : 'addNewItemList'}">
                                    <span class="fa fa-${index > 0 ? 'minus' : 'plus'}"></span>
                                </button>
                            </span>`;
               $(this).parent().append(btnAdd);
        });
        
        $(this).toggleClass('btn-warning')
            .toggleClass('btn-primary')
            .html('Submit changes')
            .attr('id', 'submitBtnDetailChangeList');
    }

    static SubmitChangeCheckBoxCard(event) {
        event.preventDefault();

        const check_box= [];

        $('.dynamic-form-input').each(function(index) {
            if ( $(this).find('[name="itemList"]').val().length > 0 ) {
                check_box.push({
                    text: $(this).find('[name="itemList"]').val(),
                    done: $(this).find('[type="checkbox"]').prop('checked') ? true : false
                })
            }
        });

        let form_data = new FormData($("#formID")[0]);
        const checkImg = UploadImg.upload('FormControlFile');
        if (!checkImg.status) {
            Services.popover('#FormControlFile', checkImg.msg)
        } else {
            form_data.append('id_client', Authorizatoin.GetIdClient());
            form_data.append('removeImg',($(".imgRemove").length !== 0));
            form_data.append('check_box',JSON.stringify(check_box));

            if (check_box.length > 0 ) {
                $.ajax({
                    type: 'PUT',
                    url: `/api/list/${window.location.pathname.split('/')[2]}`,
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
                $('input[name="itemList"]').each(function(){
                    Services.popover(this, 'must be required' );
                });
            }

        }


        // const sendData = {
        //     id: window.location.pathname.split('/')[2],
        //     data: {
        //         title: $('#title').val(),
        //         check_box: []
        //     }
        // };


    }
}
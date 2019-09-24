import {Card} from "./Card";

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
        
        $("input[disabled]").each(function(){
            $(this).removeAttr('disabled');
        });

        $('input[name="itemList"').each(function(index) {
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

        const sendData = {
            id: window.location.pathname.split('/')[2],
            data: {
                title: $('#title').val(),
                check_box: []
            }
        }

        $('.dynamic-form-input').each(function(index) {
            sendData.data.check_box.push({
                text: $(this).find('[name="itemList"').val(),
                done: $(this).find('[type="checkbox"]').attr('checked') ? true : false
            })
        });

        console.log(sendData)


        $.ajax({
            type: 'PUT',
            url: `/api/list/${window.location.pathname.split('/')[2]}`,
            data: sendData
        })
    }
}
import { Authorizatoin } from './Authorizatoin';

export class CreateList {

    static addItemList (event) {
        event.preventDefault();

        const dynamicForm = $(this).parents('.form-group'),
        currentField = $(this).parents('.dynamic-form-input'),
        newField = $(currentField.clone()).appendTo(dynamicForm);

        newField.find('input[type="text"').val('');
        newField.find('input[type="checkbox"') ? newField.find('input[type="checkbox"').attr('checked', false) : null;
        newField.find('.btn-add')
            .attr("id", 'removeItemList')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-primary').addClass('btn-danger')
            .html('<span class="fa fa-minus"></span>');
    }

    static removeItemList (event) {
        event.preventDefault();

        $(this).parents('.dynamic-form-input').remove();
    }

    static createListCard (event) {
        event.preventDefault();

        const sendData = {
            id_client: Authorizatoin.GetIdClient(),
            data: {
                title: '',
                check_box: []
            }
        };
        
        const form = $(this).parent('form');
        $(form).find('input').each(function() {
            const input = $(this);
            if (input.attr('name').toLowerCase() === 'title') {
                sendData.data.title = input.val();
            } else if (input.val().length > 0) {
                sendData.data.check_box.push({
                    text: input.val(),
                    done: 'false'
                })
            }
        });

        $.ajax({
            type: "POST",
            url: `/api/list/`,
            data: sendData
        }).done(function(res) {
            window.location = '/';
        }).fail(function(err) {
            throw new Error(err);
        })

    }
}
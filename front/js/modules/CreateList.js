import { Authorizatoin } from './Authorizatoin';
import {UploadImg} from "./UploadImg";

export class CreateList {

    static addItemList (event) {
        event.preventDefault();

        const dynamicForm = $(this).parents('.form-group'),
        currentField = $(this).parents('.dynamic-form-input'),
        newField = $(currentField.clone()).appendTo(dynamicForm);

        newField.find('input[type="text"').val('');
        newField.find('input[type="checkbox"') ? newField.find('input[type="checkbox"').prop('checked', false) : null;
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
        const form = $(this).parent('form')[0];
        let form_data = new FormData(form);
        form_data.append('id_client', Authorizatoin.GetIdClient());


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

            if (form_data.get('itemList').length > 0) {

                $.ajax({
                    type: "POST",
                    url: `/api/list/`,
                    data: form_data,
                    cache: false,
                    processData: false,
                    contentType: false
                }).done(function (res) {
                    window.location = '/';
                }).fail(function (err) {
                    throw new Error(err);
                })
            } else {
                $('input[name="itemList"]').each(function () {
                    $(this)
                        .attr({
                            'data-toggle': 'popover',
                            'data-placement': 'bottom',
                            'data-content': 'must be required'
                        })
                        .popover('show');
                });
            }
        }

    }
}
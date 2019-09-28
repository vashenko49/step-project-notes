import { Authorizatoin } from './Authorizatoin';
import {UploadImg} from "./UploadImg";
import {Services} from "./Services";

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
        let form_data = new FormData($("#formID")[0]);
        const checkImg = UploadImg.upload('FormControlFile');
        if (!checkImg.status) {
            Services.popover('#FormControlFile', checkImg.msg)
        } else {
            if (!checkImg.status) {
                Services.popover('#FormControlFile', checkImg.msg)
            } else {
                if (form_data.get('itemList').length > 0) {
                    form_data.append('id_client', Authorizatoin.GetIdClient());
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
                        Services.popover(this, "must be required");
                    });
                }
            }
        }

    }
}
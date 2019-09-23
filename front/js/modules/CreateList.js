export class CreateList {

    static addItemList (event) {
        event.preventDefault();

        const dynamicForm = $(this).parents('.form-group'),
        currentField = $(this).parents('.dynamic-form-input'),
        newField = $(currentField.clone()).appendTo(dynamicForm);

        newField.find('input').val('');
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

    static createListCard () {

    }
}
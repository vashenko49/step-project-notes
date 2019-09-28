export class Card {
    static removeCard(id){
        $(`#${id}`).parent().parent().remove();
    }

    static removeCard(id){
        $(`#${id}`).parent().parent().remove();
    }
    static RemoveImg(){
        $(".visibleUploadImg").toggleClass('visibleUploadImg');
        $('.imgCard').toggleClass('imgRemove');
    }
}
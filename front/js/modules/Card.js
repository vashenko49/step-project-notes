export class Card {
    static RemoveImg(){
        $(".visibleUploadImg").toggleClass('visibleUploadImg');
        $('.imgCard').toggleClass('imgRemove');
    }
}
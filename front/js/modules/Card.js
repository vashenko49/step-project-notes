export class Card {
    static removeCard(id){
        $(`#${id}`).parent().parent().remove();
    }

}
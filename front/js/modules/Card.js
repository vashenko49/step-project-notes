export class Card {
    constructor(title="Empty",is_img=false){
        this.title = title;
        this.is_img = is_img;
    }
    static eventOnButton(event){
        let $target = $(event.target);
        let type = $target.attr('data-typeBtn').toUpperCase();
        if(type){
            let idCard = $target.parent().attr('id');
            console.log(idCard);
            if(type==="remove-card".toUpperCase()){
                if($target.parent().attr('data-type').toUpperCase()==="UsuallCard".toUpperCase()){
                    console.log('rem usua');
                    

                }else {
                    console.log('rem check');


                }
            }else if(type==="change-card".toUpperCase()){
                if($target.parent().attr('data-type').toUpperCase()==="UsuallCard".toUpperCase()){
                    console.log('change usua');


                }else {
                    console.log('change check');


                }
            }else if(type==='more-information'.toUpperCase()){
                if($target.parent().attr('data-type').toUpperCase()==="UsuallCard".toUpperCase()){
                    console.log('more usua');


                }else {
                    console.log('more check');


                }
            }
        }
    }

    static removeCard(id){
        $(`#${id}`).parent().parent().remove();
    }

}
const pug = require('pug');

module.exports = class RenderCards {
   static renderUsualCard(id,title, text,typeCard, img){
       let card = pug.compileFile('./views/cards/usuallCard.pug');
        card = card({
            typeCard:typeCard,
            id_card:id,
            title:title,
            text:text,
            img
        });
       return card;
   }
   static renderCheckBox(id,title, arrayCheckBox,typeCard,img){
       let card = pug.compileFile('./views/cards/CheckBoxCard.pug');
       card = card({
           typeCard:typeCard,
           id_card:id,
           title:title,
           array:arrayCheckBox,
           img
       });
       return card;
   }
};
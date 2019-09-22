const pug = require('pug');

module.exports = class RenderCards {
   static renderUsualCard(id,title, text){
       let card = pug.compileFile('./views/cards/usuallCard.pug');
        card = card({
            id_card:id,
            title:title,
            text:text
        });
       return card;
   }
   static renderCheckBox(id,title, arrayCheckBox){
       let card = pug.compileFile('./views/cards/CheckBoxCard.pug');
       card = card({
           id_card:id,
           title:title,
           array:arrayCheckBox
       });
       return card;
   }
};
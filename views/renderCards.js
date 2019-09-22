const pug = require('pug');

module.exports = class RenderCards {
   static renderUsualCard(title, text){
       let card = pug.compileFile('./views/cards/usuallCard.pug');
        card = card({
            title:title,
            text:text
        });
       return card;
   }
   static renderCheckBox(title, arrayCheckBox){
       let card = pug.compileFile('./views/cards/CheckBoxCard.pug');
       card = card({
           title:title,
           array:arrayCheckBox
       });
       return card;
   }
};
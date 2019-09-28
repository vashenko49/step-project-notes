export class Services {
  static getCard(id){
      return $.ajax({
          type:"POST",
          url:'/getcard/all',
          data: {
              id_client: id
          }
      }).done(res=>{
          return res;
      })
  }

  static popover(selector, message){
      $(selector).attr({
          'data-toggle': 'popover',
          'data-placement': 'bottom',
          'data-content' :message
      }).popover('show');
  }

  static homeNavLink(e){
      window.location.href = '/';
  }
  static createUsualCardNavLink(e){
      window.location.href = '/notes';
  }
  static createCheckBoxСardNavLink(e){
      window.location.href = '/list';
  }
}
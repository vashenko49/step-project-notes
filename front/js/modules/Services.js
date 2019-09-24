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
  static LogOut(){
      document.cookie="authorization=0; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      window.location.reload();
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
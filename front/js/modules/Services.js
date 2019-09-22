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
}
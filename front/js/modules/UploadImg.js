export class UploadImg {
    static upload(id){
        id = `#${id}`;

        if ($(id).prop('files').length > 0) {
            let name = $(id).prop('files')[0].name;
            let ext = name.split('.').pop().toLowerCase();
            if (jQuery.inArray(ext, ['gif','png','jpg','jpeg']) === -1) {
                return {
                    status: false,
                    msg: 'Invalid Image File'
                }
            } else {
                let oFReader = new FileReader();
                oFReader.readAsDataURL($(id).prop('files')[0]);
                let f = $(id).prop('files')[0];
                let fsize = f.size||f.fileSize;
                if (fsize > 2) {
                    return {
                        status: false,
                        msg: 'Image File Size is very big'
                    }
                }
                return {
                    status: true,
                    msg: 'ok'
                }
            }
        } else {
            return {
                status: true,
                msg: 'not found'
            }
        }
    }
}
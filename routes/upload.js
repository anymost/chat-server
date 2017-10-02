const router = require('koa-router')();
const multer = require('koa-multer');
const fs = require('fs');
const path = require('path');
const randomName = require('../tools').randomName;
const upload = multer({ dest: path.join(__dirname, '../images/avatar') });


router.prefix('/api');

router.post('/upload', upload.single('file'), async (ctx) => {
    try {
        let name = path.join(__dirname, '../images/avatar/', ctx.req.file.filename);
        const filePath = randomName();
        await fs.createReadStream(name).pipe(fs.createWriteStream(filePath));
        fs.unlink(name);
        ctx.body = {
            code: 200,
            message: '图片上传成功',
            data: {
                name: filePath
            }
        };
    } catch (error) {
        ctx.body = {
            code: 401,
            message: '文件上传失败'
        };
    }


});

module.exports = router;
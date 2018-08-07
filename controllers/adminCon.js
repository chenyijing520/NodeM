// 创建模块
var adminCon = {};
// 分类添加模板
var classModel = require('../model/classModel');
// 添加歌单模板
var articleModel = require('../model/articleModel');
// 友链模板
var linkModel = require('../model/linkModel');

// 后台首页
adminCon.index = function (req, res) {
    if(!req.session.user) res.redirect('/admin/login');
    res.render('admin/index');
}
// 分类添加页面
adminCon.classAdd = function (req, res) {
    res.render('admin/classAdd');
    // res.render('admin/classAdd');
}
// 添加分类
adminCon.classInsert = function (req, res) {
    classModel.create(req.body, function (err) {
        if (err) {
            console.log('数据插入失败')
        } else {
            res.redirect('/admin/classAdd')
        }
    })
}
// 查看分类
adminCon.classList = function (req, res) {
    classModel.find().sort({ order: 1 }).exec(function (err, data) {
        if (err) {
            console.log('查看失败')
        } else {
            res.render('admin/classList', { dataList: data })
        }
    })

}
// 删除分类
adminCon.classDel = function (req, res) {
    classModel.remove({ _id: req.params._id }, function (err) {
        if (err) {
            console.log('删除失败')
        } else { res.redirect('/admin/classList'); }

    })
}
// 查看一个分类
adminCon.clasEdit = function (req, res) {
    classModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            console.log('查询一条数据失败')
        } else {
            res.render('admin/classEdit', { data: data[0] })
            // res.redirect('/admin/classAdd')
        }

    })
}
// 跟新分类
adminCon.classUp = function (req, res) {
    classModel.update({ _id: req.body._id }, req.body, function (err) {
        if (err) {
            console.log('跟新失败')
        } else {
            res.redirect('/admin/classList')
        }
    })
}
// 响应添加歌单
adminCon.articleAdd = function (req, res) {
    classModel.find().exec(function (error, data) {
        if (error) {
            console.log('查询分类失败')
        } else {
            res.render('admin/articleAdd', { datalist: data })
        }
    })
}
// 添加歌单
adminCon.articleInsert = function (req, res) {
    // req.body  文本数据

    // 引入图片上传配置
    var imgUpload = require('../configs/imgConfigs.js');

    // 文件上传的路径
    var imgPath = 'imgUp';
    // 允许用户上传的图片
    var imgArr = ['image/jpeg', 'image/png', 'image/gif'];
    // 定义文件大小
    var fileSize = 1024 * 1024 * 4;

    // 图片上传
    var upload = imgUpload(imgPath, imgArr, fileSize).single('imgurl');
    upload(req, res, function (err) {
        if (err) {
            res.send('图片上传失败');
        } else {
            // res.send('数据插入成功');
            // 把用户上传的图片路径写到 req.body 里
            req.body.imgurl = req.file.filename;
            // console.log(req.body)
            //  // 插入数据到数据库
            articleModel.create(req.body, function (error) {
                console.log(req.body);
                if (error) {
                    console.log('数据添加数据失败');
                } else {
                    // 跳转到首页 
                    res.redirect('/admin/articleAdd')
                }
            })
        }
    })
}
// 查看歌单分类
adminCon.articleList = function (req, res) {
    // 每次查多少条数据
    var pageSize = 3;
    // 当前页
    var page = req.query.page ? req.query.page : 1;
    articleModel.find().count(function (errr, total) {
        // 最大的页吗
        var maxPage = Math.ceil(total / pageSize);
        if (page < 1) page = 1;
        if (page > maxPage) page = maxPage;
        // 偏移量（从多少页开始查）
        var offset = pageSize * (page - 1)

        articleModel.find().limit(pageSize).skip(offset).populate('classId', { name: 1 }).exec(function (err, data) {
            if (err) {
                console.log('查询一条数据失败');
            } else {
                res.render('admin/articleList', { listdata: data, maxPage: maxPage, page: Number(page) });
                // console.log(req.params)

            }
        })
    })
}
// 删除一条歌单
adminCon.articleDel = function (req, res) {
    articleModel.remove({ _id: req.params._id }, function (err) {
        if (err) {
            console.log('删除失败')
        } else { res.redirect('/admin/articleList'); }

    })
}
// 查看一条歌单数据
adminCon.articleEdit = function (req, res) {
    articleModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            console.log('查询失败')
        } else {
            classModel.find().exec(function (err, data1) {
                if (err) {
                    console.log('查询数据失败');
                } else {
                    res.render('admin/articleEdit', { datalist: data[0], data1: data1 });
                }
            })

        }
    })
}
//  更新一条歌单信息
adminCon.articleUp = function (req, res) {
    articleModel.update({ _id: req.body._id }, req.body, function (error) {
        if (error) {
            console.log('更新失败');
        } else {
            res.redirect('/admin/articleList');
        }
    })
}
//  查看歌单封面
adminCon.imgEdit = function (req, res) {
    articleModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            console.log('查看封面失败')
        } else {
            res.render('admin/imgEdit', { data: data[0] })
        }
    })
}
// 跟新封面
adminCon.imgUp = function (req, res) {
    // 引入图片上传配置
    var imgUpload = require('../configs/imgConfigs.js');

    // 文件上传的路径
    var imgPath = 'imgUp';
    // 允许用户上传的图片
    var imgArr = ['image/jpeg', 'image/png', 'image/gif'];
    // 定义文件大小
    var fileSize = 1024 * 1024 * 4;

    // 图片上传
    var upload = imgUpload(imgPath, imgArr, fileSize).single('imgurl');
    upload(req, res, function (err) {
        if (err) {
            res.send('图片上传失败');
        } else {
            articleModel.update({ _id: req.body._id }, { $set: { imgurl: req.file.filename } }, function (err) {
                // console.log(req.body)
                if (err) {
                    res.send('插入失败');
                } else {
                    // res.send('图片上传');
                    res.redirect('/admin/articleList');
                }
            })
        }

    })
}
// 管理员登陆
adminCon.login = function (req, res) {
    res.render('admin/login')
}
// 验证码
adminCon.code = function (req, res) {
    // 需要引入 验证码模块
    var captchapng = require('captchapng');
    var code = parseInt(Math.random() * 9000 + 1000);

    // 存到 session 里
    req.session.code = code;
    // console.log(req.session.code);
    var p = new captchapng(80, 30, code); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    // 生成  base64 编码的图片
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.send(imgbase64)
}
// 登陆
adminCon.doLogin = function (req, res) {
    var textModel=require('../model/textModel');
    var md5 = require('md5');
    if (req.body.code != req.session.code) {
        console.log('验证码错误')
        res.redirect('/admin/login');
        return;
    }
    var username = req.body.username.trim();
    var password = md5(req.body.password.trim());
    textModel.findOne({username:username},function(err,data){
        if (data == null) {
            console.log('用户名错误')
    //         res.redirect('/admin/login');
        } else {
            // console.log('1234567890')
            if (password == data.password) {
                
                req.session.user = data;
                res.redirect('/admin');
                // console.log('密码')
            } else {
                console.log('密码错误');
                res.redirect('/admin/login');
            }
        }
    })
}
// 退出登陆
adminCon.logout=function(req,res){
    req.session.user=null;
    res.redirect('/admin/login');
}


// 友情链接
adminCon.linkAdd = function (req, res) {
    res.render('admin/linkAdd')
}
// 添加友情链接
adminCon.linkInsert = function (req, res) {
    linkModel.create(req.body, function (err) {
        if (err) {
            res.send('友链插入失败')
        } else {
            res.render('admin/linkAdd')
        }
    })
}
// 查看友情链接
adminCon.linkList = function (req, res) {
    linkModel.find().sort({ order: 1 }).exec(function (err, data) {
        if (err) {
            console.log('查询数据失败');
        } else {
            res.render('admin/linkList', { listdata: data })
        }
    })
}
// 查看一条友情链接的信息
adminCon.linkEdit = function (req, res) {
    linkModel.find({ _id: req.params._id }).exec(function (err, data) {
        if (err) {
            console.log('查询数据失败');
        } else {
            res.render('admin/linkEdit', { data: data[0] });
        }
    })

}
// 更新链接
adminCon.linkUp = function (req, res) {
    linkModel.update({ _id: req.body._id }, req.body, function (err) {
        if (err) {
            res.send('插入失败');
        } else {
            res.redirect('/admin/linkList');
        }
    })
}
// 删除链接
adminCon.linkDel = function (req, res) {
    linkModel.remove({ _id: req.params._id }, function (err) {
        if (err) {
            res.send('删除链接成功')
        } else {
            res.redirect('/admin/linkList');
        }
    })
}
// 暴露模块
module.exports = adminCon;

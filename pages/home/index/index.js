// pages/home/index/index.js

const util=require('../../../utils/util.js');

Component({

  data:{
    imgUrls:[
      '../../../resource/images/a.jpg',
      '../../../resource/images/b.jpg' ,
      '../../../resource/images/c.jpg' 
    ],
    listType:[
      {imgsrc:'../../../resource/images/list1.png',text:'今日特价'},
      {imgsrc:'../../../resource/images/list2.png',text:'水果生鲜'},
      {imgsrc:'../../../resource/images/list3.png',text:'零食饮料'},
      {imgsrc:'../../../resource/images/list4.png',text:'代取快递'},
      {imgsrc:'../../../resource/images/list5.png',text:'啵啵套餐'}
    ],
    infoSrc:'../../../resource/images/tongzhi.png',
    goodsList:''
  },
  ready: function () {
    const __t = this;
    const request=util.request({url:'home/index'}).then(res=>{
      __t.setData({
        goodsList: res
      })
    });
    
  },
  methods:{
    switchDetail(e){
      const id=e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/home/category/goodDetail/goodDetail?id='+id
      })
    }
  }
})
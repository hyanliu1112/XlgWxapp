// pages/home/category/category.js
const util = require('../../../utils/util.js');

Component({

  data: {
    width: '',
    height:'',
    rightWidth:'',
    catalogList:'',//左侧分类列表
    currentSubCategory:'',//当前分类的子目录
    currentgoodsList:[],//当前分类列表
    currentCategoryTd: ''
  },

  ready(){
    const __t = this;

    this.setData({
      width: wx.getSystemInfoSync().windowWidth-100,
      height: wx.getSystemInfoSync().windowHeight - 55,
      rightWidth: wx.getSystemInfoSync().windowWidth - 100-90
    })
    
    const request = util.request({ url: 'catalog/index' }).then(res => {
    
      __t.setData({
        catalogList: res,
        currentCategoryTd: res.currentCategory.id
      })
    
      __t.getGoodList(res.currentCategory.id);
      
      
    });

    
  },

  methods:{
    getGoodList(goodsId){
      const __t=this;
      util.request({ url: 'catalog/current', data: { id: goodsId } }).then(res => {

        __t.setData({
          currentSubCategory: res.currentSubCategory
        })
        __t.setData({ currentgoodsList: [] })
        for (let i = 0; i < res.currentSubCategory.length; i++) {
          util.request({ url: 'goods/list', data: { categoryId: res.currentSubCategory[i].id, page: 1, size: 1000 } }).then(res => {
            __t.setData({
              currentgoodsList: __t.data.currentgoodsList.concat(res.goodsList)
            })
          })
        }
      })
    },
    switchTab(e){
      
      const goodsId=e.currentTarget.dataset.id;
      const __t=this;
     
      this.setData({
        currentCategoryTd:goodsId,
      })
      this.getGoodList(goodsId);
    }
  },
  
    
})
Component({
  properties:{
    title:{
      type: String,
      value:'请输入文字'
    }
  },
  methods:{
    confirm(){
      this.triggerEvent('dealpage')
    },
    cancel(){
      this.triggerEvent('cancel')
    }
  }
})
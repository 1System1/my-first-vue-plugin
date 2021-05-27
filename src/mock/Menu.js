export default class Menu{

  // 菜单
  static MENUS= [
    {
      text:"案例",
      isLeaf:0, // 是不是叶子节点，叶子节点没有子节点
      icon:"",
      path:"1",
      children:[
        {
          text:"指标管理",
          isLeaf:0,
          icon:"",
          path:"1-1",
          children:[
            {
              text:"指标管理",
              isLeaf:1,
              icon:"",
              path:"indicator",
            },
            {
              text:"测试",
              isLeaf:1,
              icon:"",
              path:"test",
            },
          ]
        },
        {
          text:"目录1-3",
          isLeaf:1,
          icon:"",
          path:"test1",
        },
        {
          text:"目录1-4",
          isLeaf:1,
          icon:"",
          path:"1-4",
        },
        {
          text:"目录1-5",
          isLeaf:1,
          icon:"",
          path:"1-5",
        },
        {
          text:"目录1-6",
          isLeaf:1,
          icon:"",
          path:"1-6",
        }
      ]
    },
    {
      text:"目录2",
      isLeaf:0, // 是不是叶子节点，叶子节点没有子节点
      icon:"",
      path:"2",
      children:[
        {
          text:"目录2-1",
          isLeaf:1,
          icon:"",
          path:"2-1",
        }
      ]
    },
    {
      text:"目录3",
      isLeaf:1, // 是不是叶子节点，叶子节点没有子节点
      icon:"",
      path:"3",
    }
  ]

  // 是否是路由
  static isRouter = true

  // 是否折叠
  static isCollapse = false

}

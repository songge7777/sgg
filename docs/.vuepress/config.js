module.exports = {
  title: "尚硅谷",
  base: "/",
  themeConfig: {
    editLinkText: "编辑此页",
    lastUpdated: "上次更新",
    nav: [
      {
        text: "vx",
        link: "/vx/"
      },
      {
        text: "uniapp",
        link: "/uniapp/"
      }
    ],
    sidebar: {
      "/vx/": [
      {
        title: '第一天课',
        collapsable: false,
        children: [
          "one",
        ]
      },
      {
        title: '第二天课',
        collapsable: false,
        children: [
          "two",
        ]
      },
      {
        title: '第三天课',
        collapsable: false,
        children: [
          "three",
        ]
      },
      {
        title: '第四天课',
        collapsable: false,
        children: [
          "four",
        ]
      },
      {
        title: '第五天课',
        collapsable: false,
        children: [
          "five",
        ]
      }
    ],
    
    "/uniapp/": [
      {
        title: '第一天课',
        collapsable: false,
        children: [
          "one",
        ]
      },
      {
        title: '第二天课',
        collapsable: false,
        children: [
          "two",
        ]
      },
      {
        title: '第三天课',
        collapsable: false,
        children: [
          "three",
        ]
      }
    ]
    }
  }
};
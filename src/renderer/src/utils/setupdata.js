//  动画的内容
export const setArrAnimationData = [
  // 动画1
  [
    {
      name: "cover", // 首页动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "放大进入",
          value: "zoomIn",
          time: 500, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "放大进入",
          value: "zoomIn",
          time: 800, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 800, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 800, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "catalog", // 目录动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 800, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向下长距浮入",
          value: "backInRight",
          time: 700, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "session", // 标题动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "zoomIn",
          time: 600, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "slideInRight",
          time: 600, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 600, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "content", // 内容动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向左长距浮入",
          value: "eraseText",
          time: 1000, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向左长距浮入",
          value: "fadeInRightBig",
          time: 1000, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "end", // 结尾动画
      triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "zoomIn",
          time: 500, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "zoomIn",
          time: 500, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
  ],
  // 动画2
  [
    {
      name: "cover", // 首页动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "catalog", // 目录动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向下长距浮入",
          value: "fadeInUp",
          time: 1000, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "session", // 标题动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "content", // 内容动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向左长距浮入",
          value: "fadeInRightBig",
          time: 1000, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向左长距浮入",
          value: "fadeInRightBig",
          time: 1000, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "end", // 结尾动画
      triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 2000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 2000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
  ],
  // 动画3
  [
    {
      name: "cover", // 首页动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "放大进入",
          value: "zoomIn",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "combinedAnimation",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "revealText",
          time: 1200, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "revealText",
          time: 1200, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "catalog", // 目录动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "fadeInUp",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向下长距浮入",
          value: "zoomIn",
          time: 800, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "session", // 标题动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向上长距浮入",
          value: "zoomIn",
          time: 800, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "lightSpeedInRight",
          time: 800, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "fadeInUpBig",
          time: 800, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "content", // 内容动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "向左长距浮入",
          value: "combinedAnimation",
          time: 800, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向左长距浮入",
          value: "zoomIn",
          time: 800, //动画时间
          triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
    {
      name: "end", // 结尾动画
      triggerCondition: "1", // 0:所有元素一起触发 1:一个一个触发
      dataArr: [
        {
          name: "放大进入",
          value: "zoomIn",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "zoomIn",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "zoomIn",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
        {
          name: "向上长距浮入",
          value: "zoomIn",
          time: 1000, //动画时间
          triggerCondition: "0", // 0:所有元素一起触发 1:一个一个触发
        },
      ],
    },
  ],
];

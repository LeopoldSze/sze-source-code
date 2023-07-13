module.exports = [
  {
    type: "input",
    message: "请输入你的项目名称",
    name: "projectName",
    validate(val) {
      if (val.trim() === '') {
        return '项目名称不能为空'
      } else {
        return true
      }
    }
  },
  {
    type: "list",
    message: "请选择你的框架",
    name: "frame",
    choices: [
      {
        name: "Vue",
        value: "Vue"
      },
      {
        name: "Angular",
        value: "Angular"
      },
      {
        name: "React",
        value: "React"
      },
      {
        name: "jQuery",
        value: "jQuery"
      }
    ],
    filter(value) {
      return value.toLocaleLowerCase()
    }
  },
  {
    type: "confirm",
    message: "是否需要生成html文件",
    name: "isHtml",
    default: true,
  },
  {
    type: "list",
    message: "请选择你的包管理工具",
    name: "package",
    choices: [
      {
        name: "Pnpm",
        value: "Pnpm"
      },
      {
        name: "Npm",
        value: "Npm"
      },
      {
        name: "Yarn",
        value: "Yarn"
      }
    ],
    filter(value) {
      return value.toLocaleLowerCase()
    }
  }
]
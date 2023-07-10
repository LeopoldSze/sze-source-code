class A {
  type!: boolean
  changeType(): void {
    this.type = !this.type
  }
}

class B {
  name!: string
  getName(): string {
    return this.name
  }
}

class C implements A, B {
  type = false
  name = 'sze'
  changeType!: () => void
  getName!: () => string
}

mixins(C, [A, B])
function mixins(curClass: any, itemClass: any[]) {
  itemClass.forEach(cl => {
    Object.getOwnPropertyNames(cl.prototype).forEach(name => {
      console.log('name:', name)
      curClass.prototype[name] = cl.prototype[name]
    })
  })
}
class HelloWorld extends HTMLElement {
  constructor() {
    // 组件构建时的逻辑hook
    super();
    
    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 10px;
          background-color: #ccc;
        }
      </style>
      <h5>Hello, world</h5>
    `;
  }
  
  /**
   * 当自定义元素首次被渲染到文档时候调用
   */
  connectedCallback() {
    console.log('root:', this.shadowRoot)
  }
  
  
  disconnectedCallback() {
    // 组件销毁时的逻辑hook
  }
  
  adoptedCallback() {
    // 组件移动时的逻辑hook
  }
  
  attributeChangedCallback() {
    // 组件属性变化时的逻辑hook
  }
  
}

// 注册组件
customElements.define("hello-world", HelloWorld);
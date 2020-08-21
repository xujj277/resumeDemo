!function () {
  var view = document.querySelector('section.message')

  var model = {
    init: function () {
      AV.init({
        appId: "XVbzyDebFnnP5Uy8eF0xneIa-gzGzoHsz",
        appKey: "7nqQD9CVL87Mi8aV2syrqUCh",
        serverURL: "https://xvbzydeb.lc-cn-n1-shared.com"
      });
    },
    // 获取数据
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find()
    },
    // 创建数据
    save: function (name, content) {
      let Message = AV.Object.extend('Message')
      let message = new Message();
      return message.save({
        'name': name,
        'content': content
      })
    }
  }

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model
      this.model.init()
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#postMessageForm')
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function () {
      this.model.fetch().then((message) => {
        let array = message.map((item) => item.attributes)
        array.forEach((item) => {
          let li = document.createElement('li')
          li.innerText = `${item.name}: ${item.content}`
          this.messageList.appendChild(li)
        })
      });
    },
    bindEvents: function () {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
      })
    }
  }
  controller.init(view, model)
}()
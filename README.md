# 用react实现经典案例 - TodoMVC
TodoMVC是一个经典案例,任何一个js框架/库,都会实现TodoMVC.
[官网地址](http://todomvc.com/)

# 目标和分析
在开始动手之前,先分析清楚需要做什么,要达到什么样的目标.  
站在如下三个角度进行分析:
1. 功能
2. 组件划分
3. 确定状态

## 1. 功能
- 添加todo任务
- 显示todo列表
- 删除指定todo任务
- 切换指定todo的完成情况
- 批量切换todos的完成情况
- 统计未完成的todos
- 根据条件来显示对应的todos列表
- 清除已完成的todos
- 编辑todo

## 2. 组件划分
![组件划分图示](http://ounwp2434.bkt.clouddn.com/%E7%BB%84%E4%BB%B6%E7%9A%84%E5%88%92%E5%88%86.png)

## 3. 确定状态
**todos**:表示todos的任务,属于根组件  
**visibility**:表示可见性,是筛选的条件,有 *all*, *active*, *completed* 三种状态.属于根组件.  
**editing**:表示是否是编辑状态,属于todo组件.

# 构建项目结构
使用Facebook官方提供的脚手架工具: [create-react-app](https://github.com/facebookincubator/create-react-app) 进行结构搭建.  
使用方法很简单:
```javascript
creat-react-app todos
``` 
安装需要一点时间,跟网速有关系.  
安装完成后,按照给出的提示:
```javascript
cd todos
npm start
```
稍等一会儿,就会出现这个页面,就表示结构已经搭建完成.  
![初识化之后的效果页面](http://ounwp2434.bkt.clouddn.com/%E9%A1%B9%E7%9B%AE%E5%88%9D%E5%A7%8B%E5%8C%96.png)

## 处理项目结构
现在打开todos文件夹,就可以看到里面的文件,每个文件的作用如下:  
![结构说明](http://ounwp2434.bkt.clouddn.com/%E7%9B%AE%E5%BD%95%E4%BD%9C%E7%94%A8%E5%88%86%E6%9E%90.png)

**初始化之后的目录中有些文件和内容是不需要的,去掉**  
如下所示:  
![处理之后的目录](http://ounwp2434.bkt.clouddn.com/%E5%A4%84%E7%90%86%E4%B9%8B%E5%90%8E%E6%96%87%E6%A1%A3%E7%BB%93%E6%9E%84%E5%9B%BE.png)

## 定义各个组件
各个组件的内容如下:
### 1. AddTodo组件
```javascript
import React, { Component } from 'react';

export default class AddTodo extends Component {
    render() {
        return (
            <div className="header">
                <h1>todos</h1>
                <input type="text" placeholder="你的下一个计划是什么?" className="new-todo"/>
            </div>
        )
    }
}
```
### 2. Todo组件
```javascript
import React,{ Component } from 'react';

export default class Todo extends Component {
    render() {
        return (
            <li className="todo">
                <div className="view">
                    <input type="checkbox" className="toggle"/>
                    <label>vue.js</label>
                    <button className="destroy"></button>
                </div>
                <input type="text" className="edit" style={{display: "none"}}/>
            </li>
        )
    }
}
```
### 3. TodoList组件
```javascript
import React,{ Component } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
    render() {
        return (
            <section className="main">
                <input type="checkbox" className="toggle-all"/>
                <ul className="todo-list">
                    <Todo />
                    <Todo />
                    <Todo />
                </ul>
            </section>
        )
    }
}
```
### 4. Footer组件
```javascript
import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>1</strong>items left
                </span>
                <ul className="filters">
                    <li><a href="" className="selected">all</a></li>
                    <li><a href="" className="">active</a></li>
                    <li><a href="" className="">completed</a></li>
                </ul>
                <buttom className="clear-completed">clear completed</buttom>
            </footer>
        )
    }
}
```
### 5. App组件
```javascript
import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

export default class App extends Component {
    render() {
        return (
            <section className="todoapp">
                <AddTodo />
                <TodoList />
                <Footer />
            </section>
        )
    }
        
}
```
按照上述进行设置后,页面显示效果如下:  
![设置组件后,页面的显示效果](http://ounwp2434.bkt.clouddn.com/%E8%AE%BE%E7%BD%AE%E5%90%84%E4%B8%AA%E7%BB%84%E4%BB%B6%E4%B9%8B%E5%90%8E,%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%98%BE%E7%A4%BA%E6%95%88%E6%9E%9C.png)

## 引入CSS样式
将CSS文件存放到`src/styles`目录下  
**建议直接使用我提供的css文件,可以节省时间**
在`App.js`组件中引入CSS文件:  
```javascript
import '../styles/todo-mvc.css'
```
页面效果如下:  
![引入CSS文件后的页面](http://ounwp2434.bkt.clouddn.com/%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%8A%9F%E8%83%BD%E8%AE%BE%E7%BD%AE%E5%AE%8C%E4%B9%8B%E5%90%8E%E7%9A%84%E6%95%88%E6%9E%9C.png)

接下来逐个实现todo-list的功能.

# 显示todos列表

## 首先在根组件`APP.js`中初始化状态
如下:  
```javascript
constructor(props){
        super(props);
        // 初始化状态
        this.state = {
            todos: [
                // 此处text表示要做的事项,done表示该事项完成的状态
                {text: "吃饭",done: true}, // true表示已经完成
                {text: "睡觉",done: false}, // false表示未完成
                {text: "遛狗",done: false}, // false表示未完成
            ]
        }
    }
```
并且,传递到`TodoList.js`组件中:  
```javascript
<TodoList todos={this.state.todos} />
```
## 在`TodoList.js`组件中进行接收,并再次向下传递
```javascript
// 引入prop-types
import PropTypes from 'prop-types';
```
校验接收到的属性:  
```javascript
// 在接收属性时,最好是设置一下校验规则
TodoList.propTypes = {
    todos: PropTypes.array.isRequired
};
```
再次向下传递,传递给`Todo.js`组件
```javascript
<ul className="todo-list">
    {/*使用map方法,输出todos里的所有todo*/}
    {this.props.todos.map( (todo,index) => <Todo todo={todo} key={index} />)}
</ul>
```

## 在`Todo.js`组件中进行接收,并显示每个`todo`的内容
```javascript
// 引入prop-types
import PropTypes from 'prop-types';
```
校验接收到的属性:  
```javascript
// 在接收属性时,最好设置一下校验规则
Todo.propTypes = {
    todo: PropTypes.object.isRequired
};
```
显示每个`todo`的内容:  
```javascript
<div className="view">
    {/*checked表示该事项完成的状态,true表示已完成,false表示未完成*/}
    <input type="checkbox" className="toggle" checked={this.props.todo.done} />
    {/*显示事项的内容*/}
    <label>{this.props.todo.text}</label>
    <button className="destroy"></button>
</div>
```
页面效果如下:  
![第一个功能实现之后的效果](图片链接)

# 添加`todo`任务
在文本框中,输入内容后,按下enter键,就能够实现任务的添加.  
**实现方法:在父组件`APP.js`中定义好添加的方法,然后传递给子组件`AddTodo.js`,在子组件中进行调用该方法.

## 在父组件`APP.js`中定义该方法,并传递给子组件`AddTodo.js`

定义方法:  
```javascript
addTodo(text){
    // 新添加的任务默认状态为未完成,并把新任务添加到todos
    this.state.todos.push({text,done: false});
    // 使用setState方法进行状态的更改
    this.setState({
        todos: this.state.todos
    })
}
```
传递给子组件:  
```javascript
{/*把addTodo方法传递给子组件AddTodo*/}
<AddTodo  addTodo={this.addTodo.bind(this)} />
```
## 在子组件`AddTodo.js`中接收并调用方法
```javascript
// 在接收属性时,设置校验规则
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
};
```
注册事件:  
```javascript
<input type="text" placeholder="你的下一个计划是什么?" className="new-todo" onKeyUp={ this.handleKeyup.bind(this) } />
```
调用该方法:  
```javascript
handleKeyup(e){
    // 获取新添加任务的内容
    let text = e.target.value.trim();
    // 如果enter键按下,则执行如下操作
    if (e.keyCode === 13) {
        // 如果输入内容为空,则返回
        if (!text) return;
        this.props.addTodo(text);
        // 新任务添加后,清空输入框中内容
        e.target.value = '';
    }
}
```
至此,该功能实现完毕.

# 删除指定`todo`
点击某个`todo`右侧的**X**号,能够实现删除该`todo`项的功能.  
**该功能实现过程**:在根组件`APP.js`中定义`deleteTodo()`方法,传递给子组件` TodoList.js`,继续传递给子组件`Todo.js`.在子组件`Todo.js`中调用该方法,实现功能.

## 在`App.js`中定义方法,并传递
定义`deleteTodo`方法:  
```javascript
// 删除todo方法
deleteTodo(todo) {
    // 获取需要删除的todo的index值
    let index = this.state.todos.findIndex( item => item === todo );
    // 删除该todo
    this.state.todos.splice(index,1);
    // 使用setState方法修改todos状态
    this.setState({
        todos: this.state.todos
    })
}
```
传递给子组件`TodoList.js`组件:  
```javascript
{/*把deleteTodo方法传递给子组件TodoList*/}
<TodoList todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)} />
```

## 在`TodoList.js`组件中接收,并继续传递给子组件`Todo.js`
同样,在接收`deleteTodo()`方法的时候,最好校验一下.  
把方法`deleteTodo()`传递给子组件:  
```javascript
{/*传递deleteTodo方法给子组件Todo.js*/}
{this.props.todos.map( (todo,index) =>
    <Todo todo={todo} key={index}
          deleteTodo={this.props.deleteTodo}
/>)}
```
## 在子组件`Todo.js`中接收并使用
同样,在接收`deleteTodo()`方法的时候,最好校验一下.   
在`button`上注册`click`事件,当被点击时,删除当前的`todo`:  
```javascript
{/*在按钮上注册click事件,当按钮被点击时,调用deleteTodo方法,删除当前todo*/}
<button className="destroy" onClick={ () => this.props.deleteTodo(this.props.todo) }></button>
```
该功能到此就完成了.

# 切换指定`todo`状态
点击某个`todo`左侧的复选框,能够**切换**对应`todo`的状态.  
**实现方法**:先在根组件`APP.js`中定义好`toggleTodo`方法,传递给子组件`TodoList.js`,继续传递给子组件`Todo.js`.在`Todo.js`中调用该方法,改变状态.

## 在`APP.js`中定义`toggleTodo()`方法,并传递给组件`TodoList.js`
定义`toggleTodo()`方法:  
```javascript
 // 切换todo的状态
toggleTodo(todo){
    // 获取需要切换状态的todo的index值
    let index = this.state.todos.findIndex( item => item === todo );
    // 把index值对应的todo的状态取反
    this.state.todos[index].done = !this.state.todos[index].done;
    // 使用setState方法改变todos的状态
    this.setState({
        todos: this.state.todos
    })
}
```
传递给子组件`TodoList.js`:  
```javascript
{/*把toggleTodo方法传递给子组件TodoList*/}
<TodoList todos={this.state.todos}
          deleteTodo={this.deleteTodo.bind(this)}
          toggleTodo={this.toggleTodo.bind(this)}
/>
```
## 在组件`TodoList.js`组件中接收,并传递给子组件`Todo.js`
```javascript
{/*传递ToggleT方法给子组件Todo.js*/}
{this.props.todos.map( (todo,index) =>
    <Todo todo={todo} key={index}
          deleteTodo={this.props.deleteTodo}
          toggleTodo={this.props.toggleTodo}
    />)}
```
## 在组件`Todo.js`中接收并使用
```javascript
{/*注册点击事件,当点击复选框时,调用toggleTodo方法,切换对应的todo状态*/}
<input type="checkbox" className="toggle"
       checked={this.props.todo.done}
       onClick={ () => this.props.toggleTodo(this.props.todo) }
/>
```
到此,该功能已经完成实现.

# 批量切换`todo`状态

**需要实现的功能**:点击页面中的![向下的三角形](http://ounwp2434.bkt.clouddn.com/%E6%89%B9%E9%87%8F%E6%93%8D%E4%BD%9C%E6%8C%89%E9%92%AE.png),能够试下`todo`的批量选中或取消.当`todo`全部选中,或取消时,![下拉箭头](http://ounwp2434.bkt.clouddn.com/%E6%89%B9%E9%87%8F%E6%93%8D%E4%BD%9C%E6%8C%89%E9%92%AE.png)的状态也会跟随变化.  
## 在组件`App.js`中定义`toggleAll()`方法,并传递给子组件`TodoList.js`

在组件`app.js`中设置`toggleAll()`方法:  
```javascript
// 批量切换todo状态
toggleAll(done){
    this.state.todos.forEach(todo => todo.done = done);
    this.setState({
        todos: this.state.todos
    })
}
```
传递给子组件`TodoList.js`:  
```javascript
{/*把toggleAll方法传递给子组件TodoList*/}
<TodoList todos={this.state.todos}
          deleteTodo={this.deleteTodo.bind(this)}
          toggleTodo={this.toggleTodo.bind(this)}
          toggleAll={this.toggleAll.bind(this)}
/>
```
## 在子组件`TodoList.js`中注册并使用
```javascript
{/*注册click事件,调用toggleAll方法*/}
<input type="checkbox" className="toggle-all"
       onClick={(e) => this.props.toggleAll(e.target.checked)}
/>
```
## 在父组件`APP.js`中定义`allChecked()`方法,并传递给子组件`Todol.js`
注册`allChecked()`方法:  
```javascript
// 是否所有的todo任务都已完成
allChecked(){
    // 如果所有的todo的状态均为true,则返回true,否则,返回false
    return this.state.todos.every(todo => todo.done)
}
```
把`allChecked()`方法的返回值传递给子组件`Todolist.js`
```javascript
{/*把allChecked()方法的返回值传递给子组件Todolist*/}
<TodoList todos={this.state.todos}
          deleteTodo={this.deleteTodo.bind(this)}
          toggleTodo={this.toggleTodo.bind(this)}
          toggleAll={this.toggleAll.bind(this)}
          allChecked={this.allChecked()}
/>
```
## 在子组件`TodoList.js`中使用`allChecked()`的返回值
```javascript
{/*使全选按钮的状态,跟随allChecked的值变化*/}
<input type="checkbox" className="toggle-all"
       onClick={(e) => this.props.toggleAll(e.target.checked)}
       checked={this.props.allChecked}
/>
```
至此,该功能已经实现.

# 统计未完成的`todo`
未完成的数量,需要能够根据实际状况动态的显示.  
如图:  
![未完成的todo数量](http://ounwp2434.bkt.clouddn.com/%E6%9C%AA%E5%AE%8C%E6%88%90%E7%9A%84todo%E6%95%B0%E9%87%8F.png)  
**实现的方法**:在父组件`app.js`中定义方法,统计未完成的`todo`数量,并传递给子组件`Footer.js`
## 在父组件`APP.js`中定义方法`leftTodos`,并传递给子组件`Footer.js`
定义方法:  
```javascript
// 统计未完成的todo数量
leftTodos(){
    return this.state.todos.filter( todo => !todo.done ).length
}
```
把该方法的返回值传递给子组件`Footer.js`
```javascript
{/*把leftTodos()的返回值传递给子组件Footer*/}
<Footer leftTodos={this.leftTodos()} />
```
## 在子组件`Footer.js`中接收并使用
接收:  
```javascript
// 在接收属性时,最好设置一下校验规则
Footer.propTypes = {
    leftTodos: PropTypes.number.isRequired
};
```
使用:  
```javascript
<span className="todo-count">
    {/*动态显示未完成的todo数量*/}
    <strong>{this.props.leftTodos}</strong>items left
</span>
```
至此,该功能已经完成.

# 删除已完成的`todo`  

要完成的功能:  
1. 当没有处于完成状态的`todo`时,不显示`clear completed`按钮
2. 点击`clear completed`按钮,处于完成状态的`todo`全部被删除  

需要在`app.js`组件中定义两个方法来实现上述的功能.

## 在`APP.js`组件中定义`finishedTodo()`方法和`removeTodos()`方法
定义方法:  
```javascript
// 获取已完成todo的数量
finishedTodos(){
    return this.state.todos.filter( todo => todo.done ).length
}
// 批量删除已完成的todo
removeTodos(){
    let todos = this.state.todos.filter( todo => !todo.done );
    this.setState({
        todos // 这是一种简写方法
    })
}
```
传递给组件`Footer.js`
```javascript
{/*把finishedTodos()的返回值和removeTodos()方法传递给子组件Footer*/}
<Footer leftTodos={this.leftTodos()}
        finishedTodos={this.finishedTodos()}
        removeTodos={this.removeTodos.bind(this)}
/>
```

## 在子组件`Footer.js`中使用
```javascript
{/*当finishedTodos不为零时,显示button按钮,否则不显示*/}
{/*注册click事件,点击button时,调用removeTodos方法,删除已完成的todos*/}
{this.props.finishedTodos > 0 ?
    <buttom className="clear-completed" onClick={ () => this.props.removeTodos() }>clear completed</buttom> : ""
}
```

至此,该功能已经完成.

# 设置可见性并显示对应的`todos`
需要实现的功能:  
1. 点击`all`按钮,显示全部的`todo`
2. 点击`active`按钮,显示未完成的`todo`
3. 点击`completed`按钮,显示已完成的`todo`  

需要在根组件`APP.js`中添加一个状态值:`visibility: "all"`.  
改变`visibility`的值,就可以实现可见性的设置.  

## 在根组件`app.js`中定义`filterTodos()`方法和`setVisibity()`方法

设置`filterTodos()`方法
```javascript
// 设置可见性并显示对应的todos
filterTodos() {
    switch(this.state.visibility) {
        case "all":
            return this.state.todos;
        case "active":
            return this.state.todos.filter( todo => !todo.done );
        case "completed":
            return this.state.todos.filter( todo => todo.done );
    }
}
```
更改传递给组件`TodoList.js`的`todos`的值:`todos={this.filterTodos()}`  

设置`setVisibility()`方法:  
```javascript
// 设置setvisibility方法
setVisibility(filter){
    this.setState({
        visibility: filter
    })
}
```
把`visibility`的状态值传递给子组件`Footer.js`:`visibility={this.state.visibility}`

## 在子组件`Footer.js`中接收并使用
```javascript
{/*注册click事件,调用setvisibility()方法,并传参*/}
{/*设置clssName的值*/}
<li><a href="javascript:;" className={this.props.visibility === 'all' ? 'selected' : ''}
       onClick={() => this.props.setVisibility('all')} >all</a></li>
<li><a href="javascript:;" className={this.props.visibility === 'active' ? 'selected' : ''}
       onClick={() => this.props.setVisibility('active')}>active</a></li>
<li><a href="javascript:;" className={this.props.visibility === 'completed' ? 'selected' : ''}
       onClick={() => this.props.setVisibility('completed')}>completed</a></li>
```
至此,该功能已经完成.

# 编辑`todo`
需要实现的功能:对于已经添加的`todo`,对其双击,能够实现再次编辑.

## 在根组件`APP.js`中定义`updateTodo()`方法
定义`updateTodo`方法:  
```javascript
// 编辑todo
updateTodo(todo,text){
    let index = this.state.todos.findIndex( item => item === todo );
    this.state.todos[index].text = text;
    this.setState({
        todos: this.state.todos
    })
}
```
传递给子组件`Todolist.js` : `updateTodo={this.updateTodo.bind(this)}`

## 在子组件`TodoList.js`中接收,并再次传递
传递给子组件`todo.js` : `updateTodo={this.props.updateTodo}`

## 组件`Todo.js`中需要进行的设置
### 设置状态`todo`的编辑状态值`editing`:
```javascript
constructor(props){
    super(props);
     this.state = {
         editing: false
     }
 }
```
根据`editing`的值来渲染组件:  
```javascript
className={this.state.editing ? "todo editing" : "todo"}
```
```javascript
style={{display: this.state.editing ? "block" : "none"}}
```
### 注册双击事件,修改`editing`的值
```javascript
onDoubleClick={this.handleClick.bind(this)}
```
```javascript
handleClick(){
    this.setState({editing: true},() =>
        // 当状态发生变化时,执行此代码
        this.refs.todo.focus()
    )
}
```
### 当`input`框失去焦点,或者按下`enter`键时,执行更新操作
注册`onBlur`事件:
```javascript
onBlur={this.handleBlur.bind(this)}
```
```javascript
handleBlur(e){
    // 获取输入的文本内容
    let text = e.target.value.trim();
    // 调用updateTodo方法
    this.props.updateTodo(this.props.todo,text);
    // 把状态设置为不可编辑
    this.setState({
        editing: false
    })
}
```
注册`onKeyUp`事件:
```javascript
onKeyUp={this.handleKeyUp.bind(this)}
```
```javascript
handleKeyUp(e){
    let text = e.target.value.trim();
    if (e.keyCode === 13) {
        // 如果按下的是回车键,则更新todo内容,并重置editing状态
        this.props.updateTodo(this.props.todo,text);
        this.setState({
            editing: false
        })
    } else if (e.keyCode === 27) {
        // 如果按下的是esc键,则保持todo内容不变,并重置editing状态
        e.target.value = e.target.defaultValue;
        this.setState({
            editing: false
        })
    } else {

    }
}
```
至此,该todomvc的所有功能都已完成.  

---

因为中午喝了点米酒,现在都疼,为了赶紧写完休息,很多地方都很仓促,代码也没有优化整理.  
**如果有错误的地方,非常欢迎指正**  
**祝各位看到这里的朋友,福如东海,寿比南山** :kissing_heart: 

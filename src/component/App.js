import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

import '../styles/todo-mvc.css';

export default class App extends Component {
    constructor(props){
        super(props);
        // 初始化状态
        this.state = {
            todos: [
                // 此处text表示要做的事项,done表示该事项完成的状态
                {text: "吃饭",done: true}, // true表示已经完成
                {text: "睡觉",done: false}, // false表示未完成
                {text: "遛狗",done: false}, // false表示未完成
            ],
            visibility: "active"
        }
    }
    // 添加todo方法
    addTodo(text){
        // 新添加的任务默认状态为未完成,并把新任务添加到todos
        this.state.todos.push({text,done: false});
        // 使用setState方法进行状态的更改
        this.setState({
            todos: this.state.todos
        })
    }
    // 删除todo方法
    deleteTodo(todo) {
        // 获取需要删除的todo的index值
        let index = this.state.todos.findIndex( item => item === todo );
        // 删除该todo
        this.state.todos.splice(index,1);
        //splice(a,b,c)  删除从下标为a开始的b个元素，用c替换这些被删除的元素
        
        // 使用setState方法修改todos状态
        this.setState({
            todos: this.state.todos
        })
    }
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
    // 批量切换todo状态
    toggleAll(done){
        this.state.todos.forEach(todo => todo.done = done);
        this.setState({
            todos: this.state.todos
        })
    }
    // 是否所有的todo任务都已完成
    allChecked(){
        // 如果所有的todo的状态均为true,则返回true,否则,返回false
        return this.state.todos.every(todo => todo.done)
    }
    // 统计未完成的todo数量
    leftTodos(){
        return this.state.todos.filter( todo => !todo.done ).length
    }
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
    // 设置setvisibility方法
    setVisibility(filter){
        this.setState({
            visibility: filter
        })
    }
    // 编辑todo
    updateTodo(todo,text){
        let index = this.state.todos.findIndex( item => item === todo );
        this.state.todos[index].text = text;
        this.setState({
            todos: this.state.todos
        })
    }
    render() {
        return (
            <section className="todoapp">

                {/*把addTodo方法传递给子组件AddTodo*/}
                <AddTodo  addTodo={this.addTodo.bind(this)} />

                {/*把deleteTodo方法传递给子组件TodoList*/}
                {/*把toggleTodo方法传递给子组件TodoList*/}
                {/*把toggleAll方法传递给子组件TodoList*/}
                {/*把allChecked方法的返回值传递给子组件Todolist*/}
                {/*修改todos属性值,使用filterTodos()返回值代替*/}
                {/*把updateTodo方法传递给子组件TodoList*/}
                <TodoList todos={this.filterTodos()}
                          deleteTodo={this.deleteTodo.bind(this)}
                          toggleTodo={this.toggleTodo.bind(this)}
                          toggleAll={this.toggleAll.bind(this)}
                          allChecked={this.allChecked()}
                          updateTodo={this.updateTodo.bind(this)}
                />

                {/*把leftTodos()的返回值传递给子组件Footer*/}
                {/*把finishedTodos()的返回值和removeTodos()方法传递给子组件Footer*/}
                {/*把setVisibility()方法传递给子组件Footer*/}
                {/*把状态值visibility传递给子组件Footer*/}
                <Footer leftTodos={this.leftTodos()}
                        finishedTodos={this.finishedTodos()}
                        removeTodos={this.removeTodos.bind(this)}
                        setVisibility={this.setVisibility.bind(this)}
                        visibility={this.state.visibility}
                />
            </section>
        )
    }
}
import React,{ Component } from 'react';
// 引入`prop-types`
import PropTypes from 'prop-types';
import Todo from './Todo';

export default class TodoList extends Component {
    render() {
        return (
            <section className="main">
                {/*注册click事件,调用toggleAll方法*/}
                {/*使全选按钮的状态,跟随allChecked的值变化*/}
                <input type="checkbox" className="toggle-all"
                       onClick={(e) => this.props.toggleAll(e.target.checked)}
                       checked={this.props.allChecked}
                />
                <ul className="todo-list">
                    {/*使用map方法,输出todos里的所有todo*/}
                    {/*传递deleteTodo方法给子组件Todo.js*/}
                    {/*传递ToggleT方法给子组件Todo.js*/}
                    {/*传递updateTodo方法给子组件Todo.js*/}
                    {this.props.todos.map( (todo,index) =>
                        <Todo todo={todo} key={index}
                              deleteTodo={this.props.deleteTodo}
                              toggleTodo={this.props.toggleTodo}
                              updateTodo={this.props.updateTodo}
                        />)}
                </ul>
            </section>
        )
    }
}
// 在接收属性时,最好是设置一下校验规则
TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    allChecked: PropTypes.bool.isRequired,
    updateTodo: PropTypes.func.isRequired
};
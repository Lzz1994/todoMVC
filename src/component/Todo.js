import React,{ Component } from 'react';
// 引入prop-types
import PropTypes from 'prop-types';

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false
        }
    }
    handleClick(){
        this.setState({editing: true},() =>
            // 当状态发生变化时,执行此代码
            this.refs.todo.focus()
        )
    }
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
    render() {
        return (
            <li className={this.state.editing ? "todo editing" : "todo"}>
                <div className="view">
                    {/*checked表示该事项完成的状态,true表示已完成,false表示未完成*/}
                    {/*注册点击事件,当点击复选框时,调用toggleTodo方法,切换对应的todo状态*/}
                    <input type="checkbox" className="toggle"
                           checked={this.props.todo.done}
                           onClick={ () => this.props.toggleTodo(this.props.todo) }
                    />
                    {/*显示事项的内容*/}
                    {/*注册双击事件*/}
                    <label onDoubleClick={this.handleClick.bind(this)}>{this.props.todo.text}</label>
                    {/*在按钮上注册click事件,当按钮被点击时,调用deleteTodo方法,删除当前todo*/}
                    <button className="destroy" onClick={ () => this.props.deleteTodo(this.props.todo) }></button>
                </div>
                <input type="text" ref="todo" className="edit"
                       defaultValue={this.props.todo.text}
                       style={{display: this.state.editing ? "block" : "none"}}
                       onBlur={this.handleBlur.bind(this)}
                       onKeyUp={this.handleKeyUp.bind(this)}
                />
            </li>
        )
    }
}
// 在接收属性时,最好设置一下校验规则
Todo.propTypes = {
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
};
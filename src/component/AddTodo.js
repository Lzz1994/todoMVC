import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddTodo extends Component {
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
    render() {
        return (
            <div className="header">
                <h1>todos</h1>
                <input type="text" placeholder="你的下一个计划是什么?" className="new-todo" onKeyUp={ this.handleKeyup.bind(this) } />
            </div>
        )
    }
}

// 在接收属性时,设置校验规则
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
};
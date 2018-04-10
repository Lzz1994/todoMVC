import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">
                    {/*动态显示未完成的todo数量*/}
                    <strong>{this.props.leftTodos}</strong>items left
                </span>
                <ul className="filters">
                    {/*注册click事件,调用setvisibility()方法,并传参*/}
                    {/*设置clssName的值*/}
                    <li><a href="javascript:;" className={this.props.visibility === 'all' ? 'selected' : ''}
                           onClick={() => this.props.setVisibility('all')} >all</a></li>
                    <li><a href="javascript:;" className={this.props.visibility === 'active' ? 'selected' : ''}
                           onClick={() => this.props.setVisibility('active')}>active</a></li>
                    <li><a href="javascript:;" className={this.props.visibility === 'completed' ? 'selected' : ''}
                           onClick={() => this.props.setVisibility('completed')}>completed</a></li>
                </ul>
                {/*当finishedTodos不为零时,显示button按钮,否则不显示*/}
                {/*注册click事件,点击button时,调用removeTodos方法,删除已完成的todos*/}
                {this.props.finishedTodos > 0 ?
                    <buttom className="clear-completed" onClick={ () => this.props.removeTodos() }>clear completed</buttom> : ""
                }

            </footer>
        )
    }
}
// 在接收属性时,最好设置一下校验规则
Footer.propTypes = {
    leftTodos: PropTypes.number.isRequired,
    finishedTodos: PropTypes.number.isRequired,
    removeTodos: PropTypes.func.isRequired,
    setVisibility: PropTypes.func.isRequired,
    visibility: PropTypes.string.isRequired
};
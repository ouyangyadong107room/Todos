/**
 * Created by LUO on 2015/12/28.
 */
var ContentBox = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            status:0//0表示全部 1 表示未完成 2 表示已完成
        };
    },
    addNewTodo:function(todo){
        var data = this.state.data.slice();
        data.push(todo);
        this.setState({
            data: data,
        });
    },
    deleteData:function(txt,flag){
          var data = this.state.data;
          data.forEach(function (comment, i) {
              if (comment === txt) {
                  data.splice(i, 1);
              }
          })
          this.setState({data: data});
    },
    handleChange:function(content,flag,index){
        var data=this.state.data;
        for(var i=0;i<data.length;i++){
          if(i==index){
            if(flag){
                data[i].isChecked=true;
            }else{
                data[i].isChecked=false;
            }
          }
        }
        this.setState({
          data:data
        })
    },
    clearCom:function(){
      var data=this.state.data;
      var index=data.length;
      while(index){
        for(var i=0;i<data.length;i++){
          if(data[i].isChecked){
            data.splice(i,1);
            i--;
          }
        }
        index--;
      }
      this.setState({data:data});
    },
    msgChange:function(msg,index){
      var data=this.state.data;
      data[index].context=msg;
      this.setState({data:data});
    },
    changeStatus:function(s){
      this.setState({status:s});
    },
    number:function(){
      var data=this.state.data;
      var num=0;
      for(var i=0;i<data.length;i++){
        if(data[i].isChecked==false){
          num++;
        }
      }
      return num;
    },
    render: function(){
        return(
                <div className="contentBox">
                    <Header ref="header" data={this.state.data} addNewTodo={this.addNewTodo}/>
                    <Section data={this.state.data} deleteData={this.deleteData} handleChange={this.handleChange} msgChange ={this.msgChange} nowStatus={this.state.status} isAll={this.state.isAll} isComplete={this.state.isComplete} isActive={this.state.isActive}/>
                    <Footer number={this.number()} CompleteClick={this.changeStatus.bind(this,2)} ActiveClick={this.changeStatus.bind(this,1)} AllClick={this.changeStatus.bind(this,0)} Clear={this.clearCom} changeStatus={this.changeStatus}/>
                </div>
            )
    }
})
var Header = React.createClass({
    handleKeyDown: function(e){
        var key = e.which;
        var val= e.target.value;
        var date=new Date().getTime();
        var txt={context:val,isChecked:false,id:date};
        if (key == 13) {
            e.preventDefault();
            this.props.addNewTodo(txt);
        }
    },
    render: function(){
        return (
            <header>
                <input ref="input" className="newTodo" placeholder="What needs to be done?" autofocus onKeyDown={this.handleKeyDown}/>
            </header>
            );
    }
});
var Section = React.createClass({
    render:function(){
        var cur=this;
        var flag=true;
        var todoNodes=this.props.data.map(function(comment, index){
            var style={};
            var deleteData=function(e){
                cur.props.deleteData(comment);
            };
            var handleChange=function(e){
                cur.props.handleChange(comment.context,e.target.checked,index);
            };
            var msgChange=function(e){
              cur.props.msgChange(e.target.value,index)
            }
            var s=comment.isChecked ? {color:"#ddd",textDecoration:"line-through"} : {};
            switch (cur.props.nowStatus) {
              case 0:
                style={display:"block"};
                break;
              case 1:
                style= comment.isChecked ? {display:"none"}:{display:"block"};
                break;
              case 2:
                style=comment.isChecked ? {display:"block"}:{display:"none"};
                break;
              default:
            }
            return(
                <li key={comment.id} style={style}>
                    <div className="view">
                        <input className="toggle"  type="checkbox" onChange={handleChange} />
                        <input type="text" style={s} value={comment.context} className="msg" onChange={msgChange}/>
                        <button className="destroy" onClick={deleteData}></button>
                    </div>
                </li>
                )
        }.bind(this))
        return (
            <section className="main">
                <ul className="todo-list">
                {todoNodes}
                </ul>
            </section>
            )
    }
})
var Footer = React.createClass({
    render:function(){
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.number}</strong>
                      items left
                </span>
                <ul className="filters">
                    <li>
                      <a className="selected" href="#/" onClick={this.props.AllClick}>All</a>
                    </li>
                    <li>
                      <a href="#/active" onClick={this.props.ActiveClick}>Active</a>
                    </li>
                    <li>
                      <a href="#/completed" onClick={this.props.CompleteClick}>Completed</a>
                    </li>
                </ul>
                <button className="clear-completed" onClick={this.props.Clear}>Clear completed</button>
            </footer>
            )
    }
})
ReactDOM.render(
    <ContentBox />,
    document.getElementById("todoapp")
)

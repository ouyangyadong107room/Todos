/**
 * Created by LUO on 2015/12/28.
 */
var ContentBox = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            number:0,
            isComplete:false,
            isAll:true,
            isActive:false
        };
    },
    addNewTodo:function(todo){
        var data = this.state.data.slice();
        data.push(todo);
        this.setState({
            data: data,
            number:data.length
        });
    },
    deleteData:function(txt,flag){
          var data = this.state.data;
          var num=this.state.number;
          var k=0;
          data.forEach(function (comment, i) {
              if (comment.author == txt) {
                  data.splice(i, 1);
              }
          })
          for(var i=0;i<data.length;i++){
              if(data[i].isChecked==false){
                k++;
              }
          }
          this.setState({data: data,number:k});
    },
    handleChange:function(content,flag,index){
        var num=Number(this.state.number);
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
        var conTxt={author:content};
        if(flag){
          num--;
        }else{
          num++;
        }
        this.setState({number:num});
    },
    showComplete:function(){
      this.setState({isComplete:true,isAll:false,isActive:false})
    },
    showActive:function(){
      this.setState({isComplete:false,isAll:false,isActive:true})
    },
    showAll:function(){
      this.setState({isComplete:false,isAll:true,isActive:false})
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
    render: function(){
        return(
                <div className="contentBox">
                    <Header ref="header" data={this.state.data} addNewTodo={this.addNewTodo}/>
                    <Section data={this.state.data} deleteData={this.deleteData} handleChange={this.handleChange} isAll={this.state.isAll} isComplete={this.state.isComplete} isActive={this.state.isActive}/>
                    <Footer number={this.state.number} CompleteClick={this.showComplete} ActiveClick={this.showActive} AllClick={this.showAll} Clear={this.clearCom}/>
                </div>
            )
    }
})
var Header = React.createClass({
    handleKeyDown: function(e){
        var key = e.which;
        var val= e.target.value;
        var date=new Date().getTime();
        var txt={author:val,isChecked:false,id:date};
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
        var d=this.props.deleteData;
        var change=this.props.handleChange;
        var flag=true;
        var isAll=this.props.isAll;
        var isComplete=this.props.isComplete;
        var isActive=this.props.isActive;
        var todoNodes=this.props.data.map(function(comment, index){
            var style={};
            var deleteData=function(e){
                d(comment.author);
            };
            var handleChange=function(e){
                change(comment.author,e.target.checked,index);
            };
            var s=comment.isChecked ? {color:"#ddd",textDecoration:"line-through"} : {};
            if(isAll){
              style={display:"block"}
            }
            if(isComplete){
              style=comment.isChecked ? {display:"block"}:{display:"none"}
            }
            if(isActive){
              style= comment.isChecked ? {display:"none"}:{display:"block"}
            }
            return(
                <li key={comment.id} style={style}>
                    <div className="view">
                        <input className="toggle"  type="checkbox" onChange={handleChange} />
                        <label style={s}>{comment.author}</label>
                        <button className="destroy" onClick={deleteData}></button>
                    </div>
                </li>
                )
        })
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
                    <strong ref="number">{this.props.number}</strong>
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

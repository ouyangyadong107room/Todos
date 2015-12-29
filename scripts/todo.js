/**
 * Created by LUO on 2015/12/28.
 */

var data=[
];

var ContentBox = React.createClass({
    getInitialState: function() {
        return {
            data: []
           // isChecked:false
        };
    },
    addNewTodo:function(todo){
        var data2 = this.state.data.slice();
        data2.push(todo);
        this.setState({
            data: data2
        });
        data=this.state.data;
    },
    deleteData:function(txt,flag){
        if(flag) {
            var data = this.state.data;
            data.forEach(function (comment, i) {
                if (comment.author == txt) {
                    data.splice(i, 1);
                }
            })
            this.setState({data: data});
        }
    },
    render: function(){
        return(
                <div className="contentBox">
                    <Header ref="header" data={this.state.data} addNewTodo={this.addNewTodo}/>
                    <Section data={this.state.data} deleteData={this.deleteData} />
                    <Footer />
                </div>
            )
    }
})
var Header = React.createClass({
    handleKeyDown: function(e){
        var key = e.which;
        var val= e.target.value;
        var txt={author:val};
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

        var todoNodes=this.props.data.map(function(comment, index){
            var flag=false;
            var deleteData=function(){
                d(comment.author,flag);
            };
            var handleChange=function(e){
                flag= e.target.checked;
            };
            return(
                <li key={comment.author}>
                    <div className="view">
                        <input className="toggle"  type="checkbox" onChange={handleChange}/>
                        <label>{comment.author}</label>
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
                <span className="todo-count"></span>
            </footer>
            )
    }
})
ReactDOM.render(
    <ContentBox />,
    document.getElementById("todoapp")
)

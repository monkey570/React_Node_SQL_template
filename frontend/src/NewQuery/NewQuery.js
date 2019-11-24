import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';


class NewQuery extends Component {
    constructor(props) {
      super(props);
      this.state = {
        query: '',
        queryResult: [] };
      };


 
  async ClickGet(e){
    e.preventDefault();
    try {
      let r =  await fetch('http://localhost:8081/', 
                            {method: 'post',
                            headers: { 'Accept': 'application/json',
                                       'Content-Type': 'application/json'},
                            body: JSON.stringify({query: this.state.query})});
      let queryResult = await r.json();
      this.setState({ queryResult: queryResult });
    } catch (error) {
      console.log(error);
    }
  };


  findHeadings = (queryResult) => {
    var headings =[];
    if (queryResult !== []) {
        var count=0
    for(var i in queryResult){
        var val = queryResult[i];
        if (count<1){
        for(var j in val){
            var sub_key = j;
            headings.push(sub_key)
                }
            }
        count=1
        }
    }
    return headings
  }

  findRows = (queryResult) => {
    var dat = [];    
    var data = [];
    Object.entries(queryResult).forEach(([key1, obj]) => {
        {Object.entries(obj).forEach(([key2, value]) => {
            dat.push(<td key={key2}>{value}</td>);
        })};
        data.push(<tr key={key1}>{dat}</tr>);
        dat = [];
    });
    return data
  }


render() {

  const headingsMySQL = this.findHeadings(this.state.queryResult).map((item, index)=>{
      return (<th> {item} </th>)
  });

  const dataMySQL = this.findRows(this.state.queryResult).map((item,index)=>{
    return (item)
  });
//
  return (
   <div className="container">
   <Zoom>
     <center style={{margin:'25px'}}>
        <h3>React Express SQL</h3>
        <form>
            <div className="form-group" style={{margin:'15px'}}>
                <input className="form-control" type="text" id="queryText" 
                    ref={ inquery => this.inputQuery = inquery }
                    onChange={e => this.setState({query:e.target.value})}
                    placeholder="Input your query"/> 
            </div>

            <button className="btn btn-primary" style={{margin:'15px', width:'150px'}}
                onClick={this.ClickGet.bind(this)}>Get</button>
    
            
        </form>

        <div className="container-fluid">
        <div className="row">
          {this.state.data === null && <p>Loading records...</p>}
          {
            <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead> 
                <tr key={0}> 
                  {headingsMySQL}
                </tr>
                </thead>
                
                <tbody>
                  {dataMySQL}
                </tbody>
            </table>
            </div>
          }
        </div>
      </div>

     </center>
    </Zoom>
   </div>
  );
 }
 }

export default NewQuery;


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Grid, Row, Col
} from 'react-bootstrap';

/* component */
// import PageTitile from '../../component/pageTitle.js';

import { render } from "react-dom";
import _ from "lodash";


// Import React Table
import ReactTable from "react-table";


const rawData = [{
	"aliasName": "quantity",
	"email": "stove@yahoo.com.tw",
	"age": 23,
	"visits": 50,
	"progress": 93,
	"status": "complicated"
}, {
	"aliasName": "rose",
	"email": "rabbits",
	"age": 20,
	"visits": 59,
	"progress": 94,
	"status": "single",
	
}, {
	"aliasName": "guide",
	"email": "basket",
	"age": 2,
	"visits": 40,
	"progress": 0,
	"status": "single"

}, {
	"aliasName": "wheel",
	"email": "pleasure",
	"age": 16,
	"visits": 4,
	"progress": 32,
	"status": "complicated"
}, {
	"aliasName": "disease",
	"email": "lunch",
	"age": 29,
	"visits": 86,
	"progress": 89,
	"status": "complicated"
	
}, {
	"aliasName": "coast",
	"email": "religion",
	"age": 3,
	"visits": 7,
	"progress": 21,
	"status": "single"
	
}, {
	"aliasName": "side",
	"email": "category",
	"age": 3,
	"visits": 44,
	"progress": 52,
	"status": "relationship"
}, {
	"aliasName": "joke",
	"email": "market",
	"age": 21,
	"visits": 8,
	"progress": 75,
	"status": "complicated"

}, {
	"aliasName": "needle",
	"email": "temper",
	"age": 10,
	"visits": 84,
	"progress": 72,
	"status": "complicated"
}, {
	"aliasName": "air",
	"email": "affair",
	"age": 21,
	"visits": 28,
	"progress": 26,
	"status": "complicated"
}];

const requestData = (pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;

    // You can use the filters in your request, but you are responsible for applying them.
    if (filtered.length) {
      filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
        return filteredSoFar.filter(row => {
          return (row[nextFilter.id] + "").includes(nextFilter.value);
        });
      }, filteredData);
    }
    // You can also use the sorting in your request, but again, you are responsible for applying it.
    const sortedData = _.orderBy(
      filteredData,
      sorted.map(sort => {
        return row => {
          if (row[sort.id] === null || row[sort.id] === undefined) {
            return -Infinity;
          }
          return typeof row[sort.id] === "string"
            ? row[sort.id].toLowerCase()
            : row[sort.id];
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );

    // You must return an object containing the rows of the current page, and optionally the total pages number.
    const res = {
      rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };

    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData(state, instance) {
	  console.log("account fetchData");
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }

  componentDidUpdate() {
		  
		let group = ReactDOM.findDOMNode(this).getElementsByClassName("rt-tr-group");
		let thread = ReactDOM.findDOMNode(this).getElementsByClassName("rt-th");
		
		//let tbody = ReactDOM.findDOMNode(this).getElementsByClassName("rt-tbody");
		console.log('account componentDidMount '+group.length+",thread LENHTH="+thread.length+",rawData length="+rawData.length);
		for (let i = 0; i < group.length; i++) {
			group.item(i).style.borderBottom = '0px solid black';
			
		}

		for (let i = 0; i < thread.length; i++) {
			thread.item(i).style.borderBottom = '0px solid black';
		
		}
	
	}

	
 render() {
	const { data, pages, loading } = this.state;
	const mTableStyle={border:'3px solid rgba(0,0,0,1)'};

    return (
      <div>
        <ReactTable style= {mTableStyle}
          columns={[
            {
              Header: "Alias Name",
              accessor: "aliasName",
              width:'20%',
			  style: {'border-right':'3px solid rgba(0,0,0,1)',color:'black'},
			  headerStyle: {'border-right':'3px solid rgba(0,0,0,1)',color:'black'},
            },
            {
              Header: "E-mail",
              id: "lastName",
              accessor: d => d.email,
              width:'20%',
			  headerStyle: {color:'black'},
              Cell: row => (
                <div  
				style={{
							color:'black'        
							//width: `0.5%`,
				// 			height:'100%',
                //            display:'table-cell',
                //            'border-left': '5px solid rgba(0,0,0,1)',
                //             transition: 'all .2s ease-out'
                        }}
                    > {row.value}
                 
                
                </div>
           
                
             )
            },
            // {
            //   Header: "Age",
            //   accessor: "age",
            //   width:'60%'
            // }
          ]}
        //   manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
        //   pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
        //   filterable
          defaultPageSize={rawData.length}
		  showPagination= {false}
          className="-striped -highlight"
	
		//   minRows= {rawData[0].length()}
        />
        <br />
 
      </div>
    );
  }
}


<style jsx>
{`
	&.-headerGroups
	background: #000000
	border-bottom: 1px solid black
`}</style>
  
export default Account;
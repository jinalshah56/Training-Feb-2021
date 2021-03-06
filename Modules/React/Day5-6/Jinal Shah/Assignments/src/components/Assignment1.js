import React, { Component } from 'react'
import IDcard from './IDcard1'
import StudentsData from './StudentData'

export default class Student1 extends Component {
 
 state = {
  studentData : StudentsData
 }
 
  handleDelete = id => {
    const sortedData = this.state.studentData.filter((item) => item.id !== id)
    console.log(sortedData);

    this.setState({
      studentData : sortedData
    }) 
  }

  render() {
    return (
      <div className="container mt-5">
        <div class="row">
          <div class="card-group">
            {this.state.studentData.map(item => ( 
              <IDcard key={item.id} info={item} handleDelete={this.handleDelete}>
                <p class="text-danger">Student details</p>
              </IDcard> ) )
            }
          </div>
        </div>
      </div>
    )
  }
}








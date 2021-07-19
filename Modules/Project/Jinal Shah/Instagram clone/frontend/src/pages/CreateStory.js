import React, { useState, useContext } from 'react'
import UserService from '../services/UserServices'
import Navbar from '../components/Navbar'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/Context'

export default function CreatePost() {

   //const { userID } = useContext(UserContext)
   const [image, setImage] = useState("")
   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault()

      let obj1 = new FormData();
      obj1.append("photo", image)
      obj1.append("postedBy", localStorage.getItem('user'))

      const t1 = localStorage.getItem('token')

      UserService.addStory(obj1, t1)
         .then(res => {
            history.push('/home')
         })
         .catch(err => { console.log(err) })
   }

   return (
      <div>
         <Navbar />
         <div className="container">
            <div className="row">
               <div className="col-9 d-flex justify-content-center mx-auto col-md-8 mt-5">
                  <div className="flex-row ">
                     <div className="card shadow border-rounded border-primary mt-2 mb-3" style={{ minWidth: '320px' }} >
                        <div className="card-title pt-3">
                           <h2 className="blink text-center" >Add New Story !!</h2>
                        </div>
                        <div className="card-body ">

                           <form onSubmit={handleSubmit} >

                              <div className="form-group row mt-2 text-center mx-auto">
                                 <label className="col-sm-4 col-form-label">Uplaod Image</label>
                                 <div className="col-sm-8" >
                                    <input
                                       type="file"
                                       className="form-control rounded-pill"
                                       name="Pic"
                                       onChange={(e) => setImage(e.target.files[0])}
                                       required
                                    />
                                 </div>
                              </div>

                              <div className="form-group row pt-4 text-center">
                                 <div className="col-sm-4"></div>
                                 <div className="col-sm-8"></div>
                                 <button type="submit" className="btn btn-block rounded-pill btn-primary col-sm-4 py-3 text-uppercase" >
                                    Submit Post
                                 </button>
                              </div>

                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

import React, { useState, useContext } from 'react'
import UserService from '../services/UserServices'
import Navbar from '../components/Navbar'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/Context'

export default function CreatePost() {

   //const { userID } = useContext(UserContext)
   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")
   const [image, setImage] = useState("")
   const history = useHistory();

   const handleSubmit = (e) => {

      console.log(image)
      e.preventDefault()

      let obj1 = new FormData();
      obj1.append("title", title);
      obj1.append("body", body)
      obj1.append("pic", image)
      obj1.append("postedBy", localStorage.getItem('user'))

      const t1 = localStorage.getItem('token')
      UserService.addPost(obj1, t1)
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
               <div className="col-10 d-flex justify-content-center mx-auto col-md-8 mt-5">
                  <div className="flex-row">
                     <div className="card shadow border-rounded border-primary mb-3" style={{ minWidth: '320px' }} >
                        <div className="card-title pt-3">
                           <h2 className="blink text-center" >Add New Post !!</h2>
                        </div>
                        <div className="card-body">

                           <form onSubmit={handleSubmit} >

                              <div className="form-group row mr-2 text-center">
                                 <label className="col-sm-4 col-form-label">Title</label>
                                 <div className="col-sm-8" >
                                    <input
                                       type="text"
                                       className="form-control rounded-pill"
                                       placeholder="title"
                                       value={title}
                                       onChange={(e) => setTitle(e.target.value)}
                                       required
                                    />
                                 </div>
                              </div>

                              <div className="form-group row py-2 mr-2 text-center">
                                 <label className="col-sm-4 col-form-label">Caption</label>
                                 <div className="col-sm-8" >
                                    <input
                                       type="text"
                                       className="form-control rounded-pill"
                                       placeholder="body"
                                       value={body}
                                       onChange={(e) => setBody(e.target.value)}
                                       required
                                    />
                                 </div>
                              </div>

                              <div className="form-group row py-2 mr-2 text-center ">
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

                              <div className="form-group row py-2 text-center">
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

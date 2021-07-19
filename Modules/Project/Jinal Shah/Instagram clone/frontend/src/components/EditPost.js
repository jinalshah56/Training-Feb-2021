import React, { useState, useEffect, useContext } from 'react'
import '../stylesheets/CreatePost.scss'
import UserService from '../services/UserServices'
import Navbar from './Navbar'
//import { UserContext } from '../context/Context'

export default function CreatePost(props) {

   const id1 = props.match.params.id
   //const { userID } = useContext(UserContext)

   const [title, setTitle] = useState("")
   const [body, setBody] = useState("")

   useEffect(() => {

      const t1 = localStorage.getItem('token')

      UserService.getPostById(t1, id1)
         .then(res => {
            const t1 = res.data[0].title
            const t2 = res.data[0].body
            setTitle(t1)
            setBody(t2)
         })
         .catch(err => console.log(err))
   }, [id1])

   const handleSubmit = (e) => {

      e.preventDefault()
      const postdata = {
         title: title,
         body: body,
         postedBy: localStorage.getItem('user')
      }
      const t1 = localStorage.getItem('token')

      UserService.updatePost(t1, id1, postdata)
         .then(res => props.history.push('/home'))

   }

   return (
      <>
         <Navbar />
         <div className="container">
            <div className="row">
               <div className="col-10 mx-auto d-flex justify-content-center col-md-8 mt-5">
                  <div className="col-10 flex-row">
                     <div className="card shadow border-rounded border-primary mb-3" >
                        <div className="card-title pt-3">
                           <h2 className="blink text-center" >Edit Your Post !!</h2>
                        </div>
                        <div className="card-body">

                           <form onSubmit={handleSubmit} >

                              <div className="text-muted text-center m-2 pb-3">
                                 You can't change your image uploaded...
                              </div>

                              <div className="form-group row py-2 mr-2 text-center">
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

                              <div className="form-group row py-2 text-center">
                                 <div className="col-sm-4"></div>
                                 <div className="col-sm-8"></div>
                                 <button type="submit" className="btn btn-block btn-success col-sm-4 mt-3 text-uppercase rounded-pill" >
                                    Save changes
                                 </button>
                              </div>

                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

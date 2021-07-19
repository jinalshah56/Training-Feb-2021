import React, { useState, useContext } from 'react'
import UserService from '../services/UserServices'
import { UserContext } from '../context/Context'

export default function UpdateProfilePic(props) {

   const [image, setImage] = useState("")
   const { userID } = useContext(UserContext)

   const handleSubmit = (e) => {

      console.log(image)
      e.preventDefault()

      const obj1 = new FormData();
      obj1.append("profilePic", image)
      obj1.append("postedBy", userID)

      const t1 = localStorage.getItem('token')
      UserService.updateProfilePic(t1, obj1)
         .then(result => {
            console.log(result)
            props.history.push('/profile')
         })
         .catch(err => console.log(err))

   }

   return (
      <div>

         <div className="container">
            <div className="row">
               <div className="col-10 mx-auto col-md-8 mt-5">
                  <div className="mb-5 pb-5">
                     <h2 className="blink text-center" >Instagram Profile Pic !!</h2>
                     <div className="card border-rounded border-primary mb-3" >
                        <div className="card-body">

                           <form onSubmit={handleSubmit} >


                              <div className="form-group row pt-4 mr-2 text-center ">
                                 <label className="col-sm-4 col-form-label">Uplaod Image</label>
                                 <div className="col-sm-8" >
                                    <input
                                       type="file"
                                       className="form-control"
                                       name="profilePic"
                                       onChange={(e) => setImage(e.target.files[0])}
                                       required
                                    />
                                 </div>
                              </div>

                              <div className="form-group row py-2 text-center">
                                 <div className="col-sm-4"></div>
                                 <div className="col-sm-8"></div>
                                 <button type="submit" className="btn btn-block btn-primary rounded-pill col-sm-4 mt-3 text-uppercase" >
                                    Save Changes
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






   /*  return (
       <div>
          <form onSubmit={handleSubmit} >
 
             <div className="form-group row py-2 mr-2 text-center ">
                <label className="col-sm-4 col-form-label">Uplaod Image</label>
                <div className="col-sm-8" >
                   <input
                      type="file"
                      className="form-control"
                      name="Pic"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                   />
                </div>
             </div>
 
             <div className="form-group row py-2 text-center">
                <div className="col-sm-4"></div>
                <div className="col-sm-8"></div>
                <button type="submit" className="btn btn-block btn-primary col-sm-4 mt-3 text-uppercase" >
                   Submit Post
                                  </button>
             </div>
 
          </form>
       </div>
    ) */
}

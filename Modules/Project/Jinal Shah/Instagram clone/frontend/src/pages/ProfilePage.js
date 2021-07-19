import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import UserService from '../services/UserServices'
import { imgURL } from '../services/UserServices'
import { UserContext } from '../context/Context'

export default function Profile(props) {

   const t1 = localStorage.getItem('token')
   //const { userID } = useContext(UserContext)
   //const postedBy = userID
   const postedBy = localStorage.getItem('user')

   const [mypics, setPics] = useState([])
   const [following, setFolllowing] = useState([])
   const [followers, setFolllowers] = useState([])
   const [info, setInfo] = useState([])

   useEffect(() => {

      UserService.getUserById(t1, postedBy)
         .then(result => {
            setInfo(result.data.users[0])
            setFolllowing(result.data.users[0].following)
            setFolllowers(result.data.users[0].followers)
         })
         .catch(err => console.log(err))

      UserService.mypost(t1, postedBy)
         .then(result => {
            setPics(result.data.mypost)
         })
   }, [])

   const handleLink = (ida) => {
      console.log(ida)
      props.history.push(`/profile/${ida}`)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      props.history.push('/profile/updateProfilePic')
   }

   return (

      <div>
         <Navbar />

         <div className="container justify-content-center mt-5">
            <div className="col-9 justify-content-between align-items-center my-0 mx-auto " >

               <div className="mx-0 my-3 " style={{ borderBottom: "1px solid grey" }}>
                  <div className="d-flex my-3 justify-content-around " >
                     <div >
                        <div className="pt-2">
                           <img style={{ width: "170px", height: "170px", borderRadius: "80px" }} src={`${imgURL}/${info.profilePic}`} />
                        </div>

                        {/* <button className="btn btn-block btn-outline-secondary my-3 mr-4 ml-0" onClick={handleSubmit} data-toggle="modal" data-target="#exampleModal">
                           Update Profile Pic
                        </button> */}

                     </div>
                     <div className=" ml-2 mt-2">
                        <h4>{info.userID}</h4>
                        <h5>{info.userName}</h5>
                        <h5>{info.email}</h5>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                           <h6>{mypics.length} posts</h6>

                           <h6>{followers.length}</h6>
                           <h6 data-toggle="modal" data-target=".bd-example-modal1-sm"> followers</h6>

                           <div className="modal fade bd-example-modal1-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-sm modal-dialog-centered">
                                 <div className="modal-content">
                                    <div className="modal-header" style={{ backgroundColor: 'skyblue' }}>
                                       <h5 className="modal-title " id="exampleModalLongTitle">Followers</h5>
                                       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                       </button>
                                    </div>
                                    <div className="modal-body">
                                       {followers.length > 0 ?

                                          <div>
                                             {followers.map(item => {
                                                return (
                                                   <div className="row m-2">
                                                      <div className="rounded-circle">
                                                         <img className="rounded-circle border border-dark mr-3" src={`${imgURL}/${item.profilePic}`} height="40px" width="40px" />
                                                      </div>

                                                      <div className="font-weight-bold mt-2" data-dismiss="modal" onClick={() => handleLink(item._id)}>

                                                         {item.userID}

                                                      </div>
                                                   </div>
                                                )
                                             })}
                                          </div>
                                          :
                                          <div>
                                             0 followers
                                          </div>
                                       }
                                    </div>

                                 </div>
                              </div>
                           </div>


                           <h6>{following.length} </h6>
                           <h6 data-toggle="modal" data-target=".bd-example-modal2-sm">
                              following
                           </h6>

                           <div className="modal fade bd-example-modal2-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-sm modal-dialog-centered">
                                 <div className="modal-content">
                                    <div className="modal-header" style={{ backgroundColor: 'skyblue' }}>
                                       <h5 className="modal-title " id="exampleModalLongTitle">Followings</h5>
                                       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                       </button>
                                    </div>
                                    <div className="modal-body">

                                       {following ?

                                          <div>
                                             {following.map(item => {
                                                return (
                                                   <div className="row m-2">
                                                      <div >
                                                         <img className="rounded-circle border border-dark mr-3" src={`${imgURL}/${item.profilePic}`} height="40px" width="40px" />
                                                      </div>

                                                      <div className="font-weight-bold mt-2" data-dismiss="modal" onClick={() => handleLink(item._id)}>

                                                         {item.userID}

                                                      </div>
                                                   </div>
                                                )
                                             })}
                                          </div>
                                          :
                                          <div>
                                             0 followings
                                          </div>
                                       }
                                    </div>

                                 </div>
                              </div>
                           </div>



                        </div>
                        <button className="btn btn-block btn-outline-secondary my-3 mr-4 ml-0" onClick={handleSubmit} data-toggle="modal" data-target="#exampleModal">
                           Update Profile Pic
                        </button>
                        {/*  <button className=" btn btn-block btn-outline-secondary  my-4">
                           Update Profile info
                        </button> */}
                     </div>
                  </div>
               </div>
            </div>


            <div className="container d-flex justify-content-center mb-5" >
               <div className=" justify-content-between align-items-center my-0 mx-auto">
                  <div className="row">
                     {mypics.length > 0 ?
                        mypics.map(item => {
                           return (
                              <div className="col-lg-4 col-md-6 col-sm-12 h-50 py-3" style={{ minWidth: '18rem', minHeight: '18rem' }}>

                                 <img className="w-100" src={`${imgURL}/${item.photo}`} alt={item.photo} style={{ height: '300px' }} />
                              </div>
                           )
                        })

                        :
                        <div className="col-12 justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                           <h1>No posts yet</h1>
                        </div>
                     }
                  </div>
               </div>
            </div>

         </div>
      </div>

   )
}


